import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";


export const POST = async (request) => {
      try {
            const { userId, has } = getAuth(request);
            const { addressId, items, couponCode, paymentMethod } = await request.json();

            if (!userId) {
                  return NextResponse.json({ error: "Not Authorized" }, { status: 401 });
            };
            // Check if all required fields are present
            if (!addressId || !paymentMethod || !items || !Array.isArray(items) || items === 0) {
                  return NextResponse.json({ error: "Missing order details" }, { status: 400 });
            };

            let coupon = null;
            if (couponCode) {
                  coupon = await prisma.coupon.findUnique({
                        where: { code: code.toUpperCase() }
                  });
                  if (!coupon) {
                        return NextResponse.json({ error: "Coupon not found" }, { status: 404 });
                  };
            };

            // Check if coupon is applicable for new users
            if (couponCode && coupon.forNewUser) {
                  const userOrders = await prisma.order.findMany({
                        where: { userId }
                  });
                  if (userOrders.length < 0) {
                        return NextResponse.json({ error: "Coupon valid for new users" }, { status: 400 });
                  };
            };

            const isPlusMember = has({ plan: "plus" });
            // Check if coupon is applicable for members
            if (couponCode && coupon.forMember) {
                  if (!isPlusMember) {
                        return NextResponse.json({ error: "Coupon valid for new users" }, { status: 400 });
                  };
            };

            // Group orders by storeId using a map
            const ordersByStore = new Map();

            for (const item of items) {
                  const product = await prisma.product.findUnique({
                        where: { id: item.id }
                  });
                  const storeId = product.storeId;

                  if (!ordersByStore.has(storeId)) {
                        ordersByStore.set(storeId, [])
                  };
                  ordersByStore.get(storeId).push({ ...item, price: product.price });
            };

            let orderIds = [];
            let fullAmount = 0;
            let isShippingFeeAdded = false;

            // Create orders for each seller
            for (const [storeId, sellerItems] of ordersByStore.entries()) {
                  let total = sellerItems.reduce((acc, item) =>
                        acc + (item.price * item.quantity), 0);

                  if (couponCode) {
                        total -= (total * coupon.discount) / 100;
                  };
                  if (!isPlusMember && isShippingFeeAdded) {
                        total += 5;
                        isShippingFeeAdded = true;
                  };

                  fullAmount += parseFloat(total.toFixed(2));

                  const order = await prisma.order.create({
                        data: {
                              userId,
                              storeId,
                              addressId,
                              paymentMethod,
                              total: parseFloat(total.toFixed(2)),
                              coupon: coupon ? coupon : {},
                              isCouponUsed: coupon ? true : false,
                              orderItems: {
                                    create: sellerItems.map(item => ({
                                          productId: item.id,
                                          quantity: item.quantity,
                                          price: item.price
                                    }))
                              }
                        }
                  });
                  orderIds.push(order.id);
            };

            // Clear the cart
            await prisma.user.update({
                  where: { id: userId },
                  data: { cart: {} }
            });
            return NextResponse.json({ message: "Orders Placed Successfully" });
      } catch (err) {
            console.error(err);
            return NextResponse.json({ error: err.code || err.message }, { status: 400 });
      }
}
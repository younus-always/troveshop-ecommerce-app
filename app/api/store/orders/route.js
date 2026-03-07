import prisma from "@/lib/prisma";
import authSeller from "@/middlewares/authSeller";
import { getAuth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server";

// Update seller order status
export const POST = async (request) => {
      try {
            const { userId } = getAuth(request);
            const storeId = await authSeller(userId);

            if (!storeId) {
                  return NextResponse.json({ error: "Not authorized" }, { status: 401 });
            };

            const { orderId, status } = await request.json();
            await prisma.order.update({
                  where: { id: orderId, storeId },
                  data: { status }
            });

            return NextResponse.json({ message: "Order status updated" });
      } catch (err) {
            console.error(err);
            return NextResponse.json({ error: err?.code || err.message }, { status: 400 });
      }
};

// Get all orders for a seller
export const GET = async (request) => {
      try {
            const { userId } = getAuth(request);
            const storeId = await authSeller(userId);

            if (!storeId) {
                  return NextResponse.json({ error: "Not authorized" }, { status: 401 });
            };

            const orders = await prisma.order.findMany({
                  where: { storeId },
                  include: {
                        user: true,
                        address: true,
                        orderItems: {
                              include: {
                                    product: true
                              }
                        }
                  },
                  orderBy: { createdAt: "desc" }
            });

            return NextResponse.json({ orders });
      } catch (err) {
            console.error(err);
            return NextResponse.json({ error: err?.code || err.message }, { status: 400 });
      }
};
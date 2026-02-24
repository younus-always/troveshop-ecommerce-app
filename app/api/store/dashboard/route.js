import prisma from "@/lib/prisma";
import authSeller from "@/middlewares/authSeller";
import { getAuth } from "@clerk/nextjs/dist/types/server";
import { NextResponse } from "next/server";

// get dashboard data for seller
export const GET = async (request) => {
      try {
            const { userId } = getAuth(request);
            const storeId = await authSeller(userId);

            if (!storeId) {
                  return NextResponse.json({ error: "" }, { status: 400 });
            };
            // get all orders for seller
            const orders = await prisma.order.findMany({
                  where: { storeId }
            });
            // get all products with ratings for seller
            const products = await prisma.product.findMany({
                  where: { storeId }
            });

            const ratings = await prisma.rating.findMany({
                  where: {
                        productId: {
                              in: products.map(product => product.id)
                        }
                  },
                  include: { user: true, product: true }
            });

            const dashboardData = {
                  ratings,
                  totalOrders: orders.length,
                  totalEarings: Math.round(orders.reduce((acc, order) => acc + order.total, 0)),
                  totalProducts: products.length
            };

            return NextResponse.json({ dashboardData });
      } catch (err) {
            console.log(err);
            return NextResponse.json(
                  { error: err.code || err.message },
                  { status: 400 }
            );
      }
};
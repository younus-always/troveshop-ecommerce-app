import prisma from "@/lib/prisma";
import { authAdmin } from "@/middlewares/authAdmin";
import { getAuth } from "@clerk/nextjs/dist/types/server";
import { NextResponse } from "next/server";


// Get dashboard data for admin(total orders, total products, total stores, total revenue)
export const GET = async (request) => {
      try {
            const { userId } = getAuth(request);
            const isAdmin = await authAdmin(userId);

            if (!isAdmin) {
                  return NextResponse.json({ error: "Not authorized" }, { status: 401 })
            };

            // total orders
            const orders = await prisma.order.count();
            // total stores on app
            const stores = await prisma.store.count();
            // all orders include only createdAt and total & calculate total revenue
            const allOrders = await prisma.order.findMany({
                  select: {
                        createdAt: true,
                        total: true
                  }
            });

            let totalRevenue = 0;
            allOrders.forEach(order => totalRevenue += order.total);

            const revenue = totalRevenue.toFixed(2);
            // total products on app
            const products = await prisma.product.count();
            const dashboardData = {
                  orders,
                  stores,
                  products,
                  revenue,
                  allOrders
            };

            return NextResponse.json({ dashboardData });
      } catch (err) {
            console.error(err);
            NextResponse.json({ error: err.code || err.message }, { status: 400 });
      }
}

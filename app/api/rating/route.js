import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


// Add new rating
export const POST = async (request) => {
      try {
            const { userId } = getAuth(request);
            const { orderId, productId, rating, review } = request.json();
            const order = await prisma.order.findUnique({
                  where: { id: orderId, userId }
            });

            if (!order) {
                  return NextResponse.json({ error: "Order not found" }, { status: 404 });
            };
            const isAlreadyRated = await prisma.rating.findFirst({
                  where: { productId, orderId }
            });

            if (isAlreadyRated) {
                  return NextResponse.json({ error: "Product already rated" }, { status: 400 });
            };

            const response = await prisma.rating.create({
                  data: { userId, productId, orderId, rating, review }
            });

            return NextResponse.json({ message: "Rating added successfully", rating: response });
      } catch (err) {
            console.error(err);
            return NextResponse.json({ error: err?.response?.data?.error || err.message });
      }
};

// Get all ratings for a user
export const GET = async (request) => {
      try {
            const { userId } = getAuth(request);
            if (!userId) {
                  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
            };

            const ratings = await prisma.rating.findMany({
                  where: { userId }
            });
            return NextResponse.json({ ratings });
      } catch (err) {
            console.error(err);
            return NextResponse.json({ error: err?.response?.data?.error || err.message });
      }
};
import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Update user cart
export const POST = async (request) => {
      try {
            const { userId } = getAuth(request);
            const { cart } = await request.json();

            // Save the cart to the user object
            await prisma.user.update({
                  where: { id: userId },
                  data: { cart }
            });

            return NextResponse.json({ message: "Card updated successfully" });
      } catch (err) {
            console.error(err);
            return NextResponse.json({ error: err.message }, { status: 400 });
      }
};

// Get user cart
export const GET = async (request) => {
      try {
            const { userId } = getAuth(request);

            const user = await prisma.user.findUnique({
                  where: { id: userId }
            });

            return NextResponse.json({ cart: user.cart });
      } catch (err) {
            console.error(err);
            return NextResponse.json({ error: err.message }, { status: 400 });
      }
}
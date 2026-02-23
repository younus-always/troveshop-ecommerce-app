import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


// get store info & products
export const GET = async (request) => {
      try {
            // get store username from query params 
            const { searchParams } = new URL(request.url);
            const username = searchParams.get("username").toLowerCase();

            if (!username) {
                  return NextResponse.json({ error: "Missing username" }, { status: 400 });
            };

            // get store info & inStock products with ratings
            const store = await prisma.store.findUnique({
                  where: { username, isActive: true },
                  include: {
                        Product: {
                              include: { rating: true }
                        }
                  }
            });

            if (!store) {
                  return NextResponse.json({ error: "Store not found" }, { status: 404 });
            };

            return NextResponse.json({ store });
      } catch (err) {
            console.log(err);
            return NextResponse.json(
                  { error: err.code || err.message },
                  { status: 400 }
            );
      }
};
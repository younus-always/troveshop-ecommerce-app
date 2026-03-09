import prisma from "@/lib/prisma"
import { NextResponse } from "next/server";

export const GET = async (request) => {
      try {
            let products = await prisma.product.findMany({
                  where: { inStock: true },
                  include: {
                        rating: {
                              select: {
                                    createdAt: true,
                                    rating: true,
                                    review: true,
                                    user: {
                                          select: {
                                                name: true,
                                                image: true
                                          }
                                    }
                              }
                        },
                        store: true,
                  },
                  orderBy: { createdAt: "desc" }
            });

            // Remove products with store isActive false
            products = products.filter(product => product.store.isActive);
            return NextResponse.json({ products });
      } catch (err) {
            console.error(err);
            return NextResponse.json({ error: "An internal server error occured" }, { status: 500 });
      }
}
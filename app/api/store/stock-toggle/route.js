import prisma from "@/lib/prisma";
import authSeller from "@/middlewares/authSeller";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// toggle stock of a product
export const POST = async (request) => {
      try {
            const { userId } = getAuth(request);
            const productId = await request.json();
            const storeId = await authSeller(userId);

            if (!productId) {
                  return NextResponse.json({ error: "Missing details: Product" }, { status: 404 });
            };
            if (!storeId) {
                  return NextResponse.json({ error: "Not authorized" }, { status: 401 });
            };

            // check if product exists
            const product = await prisma.product.findFirst({
                  where: { id: productId, storeId }
            });

            if (!product) {
                  return NextResponse.json({ error: "No product found" }, { status: 404 });
            };

            await prisma.product.update({
                  where: { id: productId },
                  data: { inStock: !product.inStock }
            });

            return NextResponse.json({ message: "Product stock updated successfully" });
      } catch (err) {
            console.log(err);
            return NextResponse.json(
                  { error: err.code || err.message },
                  { status: 400 }
            );
      }
};
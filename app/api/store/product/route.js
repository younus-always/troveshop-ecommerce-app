import imagekit from "@/configs/imageKit";
import prisma from "@/lib/prisma";
import authSeller from "@/middlewares/authSeller";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// add a new product
export const POST = async (request) => {
      try {
            const { userId } = getAuth(request);
            const storeId = authSeller(userId);

            if (!storeId) {
                  return NextResponse.json({ error: "Not authorized" }, { status: 401 });
            };
            // get the data from the form
            const formData = await request.formData();
            const name = formData.get("name");
            const images = formData.get("images");
            const category = formData.get("category");
            const mrp = Number(formData.get("mrp"));
            const price = Number(formData.get("price"));
            const description = formData.get("description");

            if ((!name || !images || !category || !description || !mrp || !price) < 1) {
                  return NextResponse.json({ error: "Missing product details" }, { status: 400 });
            };

            // uploading images to imageKit
            const imagesUrl = await Promise.all(
                  images.map(async (image) => {
                        const buffer = Buffer.from(await image.arrayBuffer());
                        const response = await imagekit.upload({
                              file: buffer,
                              fileName: image.name,
                              folder: "products"
                        });
                        const url = imagekit.url({
                              path: response.filePath,
                              transformation: [
                                    { quality: "auto" },
                                    { format: "webp" },
                                    { width: "1024" }
                              ]
                        });
                        return url;
                  })
            );

            await prisma.product.create({
                  data: {
                        name,
                        description,
                        mrp,
                        price,
                        category,
                        storeId,
                        images: imagesUrl
                  }
            });
            return NextResponse.json({ message: "Product added successfully" });
      } catch (err) {
            console.log(err);
            return NextResponse.json(
                  { error: err.code || err.message },
                  { status: 400 }
            )
      }
};
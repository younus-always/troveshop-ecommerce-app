import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// create the store
export const POST = async (request) => {
      try {
            const { userId } = getAuth();
            // Get the data from the form
            const formData = await request.formData();

            const name = formData.get("name");
            const email = formData.get("email");
            const username = formData.get("username");
            const contact = formData.get("contact");
            const address = formData.get("address");
            const image = formData.get("image");
            const description = formData.get("description");

            const notMatch = !name || !email || !username || !image || !contact || !address || !description;
            if (notMatch) {
                  return NextResponse.json({ error: "missing store info" }, { status: 400 })
            };

            // Check is user have already registered a store
            const store = await prisma.store.findFirst({
                  where: { userId }
            });

            // If store is already registered then send status of store
            if (store) {
                  return NextResponse.json({ status: store.status })
            };

            // Check if username is already taken
            const isUsernameTaken = await prisma.store.findFirst({
                  where: { username: username.toLowerCase() }
            });

            if (isUsernameTaken) {
                  return NextResponse.json({ error: "username already taken" }, { status: 400 })
            };


      } catch (error) {
            console.log(error);
            return NextResponse.json({ error: error.code || error.message }, { status: 400 });
      }
};
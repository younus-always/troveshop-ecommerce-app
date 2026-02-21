import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// create the store
export const POST = async (request) => {
      try {
            const { userId } = getAuth(request);
            // get the data from the form
            const formData = await request.formData();

            const name = formData.get("name");
            const email = formData.get("email");
            const username = formData.get("username");
            const image = formData.get("image");
            const address = formData.get("address");
            const contact = formData.get("contact");
            const description = formData.get("description");

            const notMatch = !name || !email || !username || !image || !contact || !address || !description;

            if (notMatch) {
                  return NextResponse.json(
                        { error: "Missing store info" },
                        { status: 400 }
                  );
            };

            //   check if user have already registered a store
            const store = await prisma.store.findFirst({
                  where: { userId }
            });

            // if store is already registered then send status of store
            if (store) {
                  return NextResponse.json({ status: store.status })
            };

            // check is username already taken
            const isUsernameTaken = await prisma.store.findFirst({
                  where: { username: username.toLowerCase() }
            });

            if (isUsernameTaken) {
                  return NextResponse.json(
                        { error: "Username already taken" },
                        { status: 400 }
                  )
            };


      } catch (err) {

      }
};
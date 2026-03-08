import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Add new address
export const POST = async (request) => {
      try {
            const { userId } = getAuth(request);
            const { address } = await request.json();
            address.userId = userId;

            const newAddress = await prisma.address.create({
                  data: address
            });

            return NextResponse.json({ newAddress, message: "Address added successfully" });
      } catch (err) {
            console.error(err);
            return NextResponse.json({ error: err.code || err.message }, { status: 400 });
      }
};

// Get all addresses for a user
export const GET = async (request) => {
      try {
            const { userId } = getAuth(request);

            const addresses = await prisma.address.findMany({
                  where: { userId }
            });

            return NextResponse.json({ addresses });
      } catch (err) {
            console.error(err);
            return NextResponse.json({ error: err.code || err.message }, { status: 400 });
      }
};

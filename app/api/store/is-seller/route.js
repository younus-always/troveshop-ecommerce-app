import prisma from "@/lib/prisma";
import authSeller from "@/middlewares/authSeller";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// auth seller
export const GET = async (request) => {
      try {
            const { userId } = getAuth(request);
            const isSeller = await authSeller(userId);

            if (!isSeller) {
                  return NextResponse.json({ error: "Not authorized" }, { status: 401 });
            };

            const storeInfo = await prisma.store.findUnique({
                  where: { userId }
            });

            return NextResponse.json({ isSeller, storeInfo });
      } catch (err) {
            console.log(err);
            return NextResponse.json(
                  { error: err.code || err.message },
                  { status: 400 }
            );
      }
};
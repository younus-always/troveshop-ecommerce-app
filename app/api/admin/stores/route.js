import prisma from "@/lib/prisma";
import { authAdmin } from "@/middlewares/authAdmin";
import { getAuth } from "@clerk/nextjs/dist/types/server";
import { NextResponse } from "next/server";


// Get all approved stores
export const GET = async (request) => {
      try {
            const { userId } = getAuth(request);
            const isAdmin = await authAdmin(userId);

            if (!isAdmin) {
                  return NextResponse.json({ error: "Not authorized" }, { status: 401 })
            };

            const stores = await prisma.store.findMany({
                  where: { status: "approved" },
                  include: { user: true }
            });

            NextResponse.json({ stores });
      } catch (err) {
            console.error(err);
            NextResponse.json({ error: err?.request?.data?.error || err.message }, { status: 400 });
      }
}
import prisma from "@/lib/prisma";
import { authAdmin } from "@/middlewares/authAdmin";
import { getAuth } from "@clerk/nextjs/dist/types/server";
import { NextResponse } from "next/server";


// Toggle store isActive
export const POST = async (request) => {
      try {
            const { userId } = getAuth(request);
            const isAdmin = await authAdmin(userId);
            const { storeId } = await request.json();

            if (!isAdmin) {
                  return NextResponse.json({ error: "Not authorized" }, { status: 401 })
            };
            if (!storeId) {
                  return NextResponse.json({ error: "Missing storeId" }, { status: 400 })
            };

            const store = await prisma.store.findUnique({
                  where: { id: storeId }
            });

            if (!store) {
                  return NextResponse.json({ error: "Store not found" }, { status: 400 })
            };

            await prisma.store.update({
                  where: { id: storeId },
                  data: { isActive: !store.isActive }
            });

            return NextResponse.json({ message: "Store updated successfully" });
      } catch (err) {
            console.error(err);
            NextResponse.json({ error: err?.request?.data?.error || err.message }, { status: 400 });
      }
}
import prisma from "@/lib/prisma";
import { authAdmin } from "@/middlewares/authAdmin";
import { getAuth } from "@clerk/nextjs/dist/types/server";
import { NextResponse } from "next/server";

// Approve selller
export const POST = async (request) => {
      try {
            const { userId } = getAuth(request);
            const isAdmin = await authAdmin(userId);

            if (!isAdmin) {
                  return NextResponse.json({ error: "Not authorized" }, { status: 401 });
            };

            const { storeId, status } = await request.json();
            if (status === "approved") {
                  await prisma.store.update({
                        where: { id: storeId },
                        data: { status: "approved", isActive: true }
                  });
            };
            if (status === "rejected") {
                  await prisma.store.update({
                        where: { id: storeId },
                        data: { status: "rejected" }
                  });
            };

            return NextResponse.json({ message: status + "successfully" });
      } catch (err) {
            console.error(err);
            NextResponse.json({ error: err?.request?.data?.error || err.message }, { status: 400 });
      }
};
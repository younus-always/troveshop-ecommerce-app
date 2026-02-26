import { authAdmin } from "@/middlewares/authAdmin";
import { getAuth } from "@clerk/nextjs/dist/types/server";
import { NextResponse } from "next/server";

// Auth admin
export const GET = async (request) => {
      try {
            const { userId } = getAuth(request);
            const isAdmin = await authAdmin(userId);

            if (!isAdmin) {
                  return NextResponse.json({ error: "Not authorized" }, { status: 401 });
            };

            return NextResponse.json({ isAdmin });
      } catch (err) {
            console.error(err);
            NextResponse.json({ error: err?.request?.data?.error || err.message }, { status: 400 });
      }
};
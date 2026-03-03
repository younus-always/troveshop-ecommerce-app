import prisma from "@/lib/prisma";
import { authAdmin } from "@/middlewares/authAdmin";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Add new coupon
export const POST = async (request) => {
      try {
            const { userId } = getAuth();
            const isAdmin = await authAdmin(userId);

            if (!isAdmin) {
                  return NextResponse.json({ error: "Not authorized" }, { status: 401 });
            };

            const { coupon } = await request.json();
            coupon.code = coupon.code.toUpperCase();

            await prisma.coupon.create({ data: coupon });
            return NextResponse.json({ message: "Coupon added successfully" });
      } catch (err) {
            console.error(err);
            return NextResponse.json({ error: err.code || err.message }, { status: 400 });
      }
};

// Delete coupon  /api/coupon?id=couponId
export const DELETE = async (request) => {
      try {
            const { userId } = getAuth();
            const isAdmin = await authAdmin(userId);

            if (!isAdmin) {
                  return NextResponse.json({ error: "Not authorized" }, { status: 401 });
            };

            const { searchParams } = request.nextUrl;
            const code = searchParams.get("code");

            await prisma.coupon.delete({ where: { code } });
            return NextResponse.json({ message: "Message deleted successfully" });
      } catch (err) {
            console.error(err);
            return NextResponse.json({ error: err.code || err.message }, { status: 400 });
      }
};

// Get all coupons
export const GET = async (request) => {
      try {
            const { userId } = getAuth();
            const isAdmin = await authAdmin(userId);

            if (!isAdmin) {
                  return NextResponse.json({ error: "Not authorized" }, { status: 401 });
            };

            const coupons = await prisma.coupon.findMany({});
            return NextResponse.json({ coupons });
      } catch (err) {
            console.error(err);
            return NextResponse.json({ error: err.code || err.message }, { status: 400 });
      }
};
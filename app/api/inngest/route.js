import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import {
      createUserFunction,
      updateUserFunction,
      deleteUserFunction,
      deleteCouponOnExpiry,
} from "@/inngest/functions";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const handler = serve({
      client: inngest,
      functions: [
            createUserFunction(inngest),
            updateUserFunction(inngest),
            deleteUserFunction(inngest),
            deleteCouponOnExpiry(inngest),
      ],
});

export const GET = handler;
export const POST = handler;
export const PUT = handler;
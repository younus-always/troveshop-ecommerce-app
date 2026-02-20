import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import {
      createUserFunction,
      updateUserFunction,
      deleteUserFunction,
} from "@/inngest/functions";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const handler = serve({
      client: inngest,
      functions: [
            createUserFunction(inngest),
            updateUserFunction(inngest),
            deleteUserFunction(inngest),
      ],
});

export const GET = handler;
export const POST = handler;
export const PUT = handler;
import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import {
      createUserFunction,
      deleteUserFunction,
      updateUserFunction
} from "@/inngest/functions";

export const dynamic = "force-dynamic";

export const { GET, POST, PUT } = serve({
      client: inngest,
      functions: [
            createUserFunction(inngest),
            updateUserFunction(inngest),
            deleteUserFunction(inngest),
      ],
});
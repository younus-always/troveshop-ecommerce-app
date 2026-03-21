import { openai } from "@/configs/openai";
import authSeller from "@/middlewares/authSeller";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


const main = async (base64Image, mimeType) => {
      const messages = [
            {
                  "role": "system",
                  "content": `
                        You are a product listing assistant for an e-commerce store.
                        Your job is to analyze an image of a product and generate structured data.

                        Respond ONLY with raw JSON (no code block, no markdown, no explanation).

                        {
                        "name": string,              // Short product name
                        "description": string,       // Marketing-friendly
                        description of the product
                        }

                  `
            },
            {
                  "role": "user",
                  "content": [
                        {
                              "type": "text",
                              "text": "Analyze this image and return name + description."
                        },
                        {
                              "type": "image_url",
                              "image_url": {
                                    "data": `data:${mimeType};base64,${base64Image}`
                              }
                        }
                  ]
            }
      ];

      const response = await openai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages
      });
      const raw = response.choices[0].message.content;

      // remove ```json or ```wrappers if present
      const cleaned = raw.replace(/```json|```/g, "").trim();

      let parsed;
      try {
            parsed = JSON.parse(cleaned);
      } catch (err) {
            throw new Error("AI didn't return valid JSON")
      };

      return parsed;
};


export const POST = async (request) => {
      try {
            const { userId } = getAuth(request);
            const isSeller = await authSeller();

            if (!isSeller) {
                  return NextResponse.json({ error: "Not Authorized" }, { status: 401 })
            };

            const { mimeType, base64Image } = await request.json();

      } catch (err) {

      }
};
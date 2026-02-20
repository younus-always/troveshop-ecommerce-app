import prisma from "@/lib/prisma";

// Factory functions (receive inngest as parameter)

export const createUserFunction = (inngest) =>
      inngest.createFunction(
            { id: "sync-user-create" },
            { event: "clerk/user.created" },
            async ({ event }) => {
                  const { data } = event;

                  await prisma.user.create({
                        data: {
                              id: data.id,
                              email: data.email_addresses[0].email_address,
                              name: `${data.first_name} ${data.last_name}`,
                              image: data.image_url
                        },
                  });
            }
      );

export const updateUserFunction = (inngest) =>
      inngest.createFunction(
            { id: "sync-user-update" },
            { event: "clerk/user.updated" },
            async ({ event }) => {
                  const { data } = event;

                  await prisma.user.update({
                        where: { id: data.id },
                        data: {
                              email: data.email_addresses[0].email_address,
                              name: `${data.first_name} ${data.last_name}`,
                              image: data.image_url
                        },
                  });
            }
      );

export const deleteUserFunction = (inngest) =>
      inngest.createFunction(
            { id: "sync-user-delete" },
            { event: "clerk/user.deleted" },
            async ({ event }) => {
                  const { data } = event;

                  await prisma.user.delete({
                        where: { id: data.id }
                  });
            }
      );
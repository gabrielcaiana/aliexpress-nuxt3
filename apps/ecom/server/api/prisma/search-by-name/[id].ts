import { prisma } from "@/server/db";

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;

  if (!id) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Missing id parameter",
      }),
    );
  }

  const items = await prisma.products.findMany({
    take: 5, // Max rows
    where: {
      title: {
        contains: id,
        mode: "insensitive",
      },
    },
  });

  return items;
});

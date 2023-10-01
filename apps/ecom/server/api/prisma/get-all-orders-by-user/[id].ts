import { prisma } from "@/server/db";

export default defineEventHandler(async (event) => {
  const userId = event.context.params?.userId;

  if (!userId) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Missing userId parameter",
      }),
    );
  }

  const orders = await prisma.orders.findMany({
    where: { userId },
    orderBy: { id: "desc" },
    include: {
      orderItem: {
        include: {
          product: true,
        },
      },
    },
  });
  return orders;
});

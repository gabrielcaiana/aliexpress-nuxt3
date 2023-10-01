import { prisma } from "@/server/db";

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params?.id);

  if (!id) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Missing id parameter",
      }),
    );
  }

  const product = await prisma.products.findFirst({
    where: { id },
  });
  return product;
});

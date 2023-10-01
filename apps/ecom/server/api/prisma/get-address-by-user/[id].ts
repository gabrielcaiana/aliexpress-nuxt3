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

  const res = await prisma.addresses.findFirst({
    where: { userId: id },
  });
  return res;
});

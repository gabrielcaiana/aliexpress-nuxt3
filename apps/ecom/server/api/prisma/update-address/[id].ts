import { prisma } from "@/server/db";
import { Address } from "~/types/address";

export default defineEventHandler(async (event) => {
  const body: Partial<Address> = await readBody(event);

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

  const res = await prisma.addresses.update({
    where: { id },
    data: body,
  });

  return res;
});

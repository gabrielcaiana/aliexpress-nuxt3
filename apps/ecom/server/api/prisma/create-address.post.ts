import { prisma } from "@/server/db";
import { Address } from "~/types/address";

export default defineEventHandler(async (event) => {
  const body: Address = await readBody(event);

  const address = await prisma.addresses.create({
    data: body,
  });

  return address;
});

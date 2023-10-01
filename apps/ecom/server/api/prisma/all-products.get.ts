import { prisma } from "~/server/db";
import { Product } from "~/types/product";

export default defineEventHandler(async () => {
  const products = await prisma.products.findMany();
  return products as Product[];
});

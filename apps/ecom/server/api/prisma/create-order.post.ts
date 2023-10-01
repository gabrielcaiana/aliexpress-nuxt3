import { prisma } from "@/server/db";
import { Order } from "~/types/order";
import { Product } from "~/types/product";

interface Body {
  order: Order;
  products: Product[];
}

export default defineEventHandler(async (event) => {
  const body: Body = await readBody(event);

  const order = await prisma.orders.create({
    data: {
      ...body.order,
    },
  });

  body.products.forEach(async (product) => {
    await prisma.orderItem.create({
      data: {
        orderId: order.id,
        productId: product.id,
      },
    });
  });

  return order;
});

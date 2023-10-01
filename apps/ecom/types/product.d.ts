import { OrderItem } from "./order";

export interface Product {
  id: number;
  title: string;
  description: string;
  url: string;
  price: number;
  created_at: Date;
  orderItems: OrderItem[];
}

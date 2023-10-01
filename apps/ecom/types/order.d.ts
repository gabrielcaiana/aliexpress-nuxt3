export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  order: Order;
  created_at: Date;
}

export interface Order {
  id: number;
  userId: string;
  stripeId: string;
  name: string;
  address: string;
  zipcode: string;
  city: string;
  country: string;
  created_at: Date;
  orderItems: OrderItem[];
}
export interface Address {
  id: number;
  userId: string;
  name: string;
  address: string;
  zipcode: string;
  city: string;
  country: string;
  created_at: Date | string;
}
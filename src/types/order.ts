export type OrderItem = {
  _id: string;
  total_amount: number;
  order_date: Date;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  customer_id: string;  
  product_id: string;   
  quantity: number;
  createdAt: Date;
};
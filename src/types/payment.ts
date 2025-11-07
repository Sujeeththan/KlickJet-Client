export type PaymentItem = {
  _id: string;
  customer_id: string;
  order_id: string;
  payment_method: "cash" | "credit_card" | "online" | "upi";
  createdAt: Date;
  updatedAt: Date;
};
export type DeliveryItem = {
  _id: string;
  address: string;
  delivered_date?: Date;
  order_id: string;      
  deliverer_id?: string; 
  status: "pending" | "in_transit" | "delivered" | "cancelled";
  createdAt: Date;
};
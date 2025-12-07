export interface OrderItem {
    product: string; // or Product populated
    quantity: number;
    price: number;
}

export interface Order {
    _id: string;
    user: string;
    items: OrderItem[];
    totalAmount: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    shippingAddress: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateOrderData {
    items: { product: string; quantity: number }[];
    shippingAddress: string;
}

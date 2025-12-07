export interface CartItem {
    product: string; // or populated Product object
    quantity: number;
    _id?: string;
}

export interface Cart {
    _id: string;
    user: string;
    items: CartItem[];
    createdAt?: string;
    updatedAt?: string;
}

export interface OrderItem {
    id: number;
    created_at: string; 
    quantity: number;
    unit_price: number;
    subtotal: number;
    name: string;
    image: string;
    category: string;
    order_id: number;
  }
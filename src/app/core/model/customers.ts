export interface Customer {
  shop_id: number;
  name: string;
  address: string;
  afm: string;
  telephone: string;
  image: string;
  postal_code: string;
  order_id: number;
  latest_order_created_at: string; // ISO date string
  latest_order_total_cost: number;
  supplier_id: number;
  total_orders: number;
  total_cost: number;
  }

  
  export class PaginatedCustomer {
    content: Customer[] = [];
    totalElements: number = 0;
    constructor(data: Partial<PaginatedCustomer>) {
      Object.assign(this, data);
    }
  }
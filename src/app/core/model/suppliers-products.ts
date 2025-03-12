export interface SuppliersProduct {
    product_id: number;
  name: string;
  quantity: number; 
  price: number;
  cost_price?: number | null; 
  discount: number;
  status: boolean;
  sales_count?: number | null; 
  provider?: string | null; 
  supplier_id: number;
  category_id: number;
  category_name: string;
  image: string;
  }
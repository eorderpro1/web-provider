
export interface Order {
  order_id: string; 
  total_cost: number; 
  order_created_at: string; 
  status: string; 
  shop_name: string; 
  shop_image: string; 
  shop_address: string; 
  day_of_week: string; 
  start_time: string; 
  end_time: string; 
  postal_code: string; 
  supplier_id: number; 
  is_draft: boolean;
  id: number;
  payment_method: string;
  is_paid: boolean;
  
    
  }
  
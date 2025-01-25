
export class Shop {
  id: number;
  afm: string;
  name: string;
  image: string;
  address: string;
  telephone: string;
  created_at: string; 
  postal_codes_id: number;

  constructor(data: any) {
    this.id = data.id;
    this.afm = data.afm;
    this.name = data.name;
    this.image = data.image;
    this.address = data.address;
    this.telephone = data.telephone;
    this.created_at = data.created_at;
    this.postal_codes_id = data.postal_codes_id;
  }
}


export class Order {
    id: number;
    created_at: string;
    supplier_id: number;
    shop_id: number;
    is_draft: boolean;
    is_delivered: boolean;
    total_cost: number;
    order_id: string;
    date_to_be_delivered:  string; 
    shops: Shop; 

    constructor(data: any) {
      this.id = data.id;
      this.created_at = data.created_at;
      this.supplier_id = data.supplier_id;
      this.shop_id = data.shop_id;
      this.is_draft = data.is_draft;
      this.is_delivered = data.is_delivered;
      this.total_cost = data.total_cost;
      this.order_id = data.order_id;
      this.date_to_be_delivered = new Date(data.date_to_be_delivered * 1000).toISOString().split('T')[0];
      this.shops = new Shop(data.shops);
    }
    
  }
  
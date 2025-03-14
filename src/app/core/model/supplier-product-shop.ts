export interface SupplierProductShop {
    id: number;
    shop_id: number;
    enable: boolean;
    discount: number;
    price: number;
    supplier_id: number;
    product_id: number;
    shopname:string ;
}

export class PaginatedSupplierProductShop {
  content: SupplierProductShop[] = [];
  totalElements: number = 0;
  constructor(data: Partial<PaginatedSupplierProductShop>) {
    Object.assign(this, data);
  }
}
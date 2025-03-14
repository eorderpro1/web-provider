export interface SupplierProductPostalCode {
    id: number;
    postal_code_id: number;
    enable: boolean;
    discount: number;
    price: number;
    supplier_id: number;
    product_id: number;
    postal_code: string;
}

export class PaginatedSupplierProductPostalCode {
  content: SupplierProductPostalCode[] = [];
  totalElements: number = 0;
  constructor(data: Partial<PaginatedSupplierProductPostalCode>) {
    Object.assign(this, data);
  }
}
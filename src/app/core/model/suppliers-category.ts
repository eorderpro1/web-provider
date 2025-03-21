export interface SupplierCategory {
    id: number;
    supplier_id: number;
    category: string;
    image: string;
  }

  export class PaginatedSupplierCategory {
    content: SupplierCategory[] = [];
    totalElements: number = 0;
    constructor(data: Partial<PaginatedSupplierCategory>) {
      Object.assign(this, data);
    }
  }
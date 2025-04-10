export interface Customer {
    id: number;
    name: string;
    address: string;
    afm: string;
    telephone: string;
    image: string;
    postal_code: string;
    supplier_id: number;
  }

  
  export class PaginatedCustomer {
    content: Customer[] = [];
    totalElements: number = 0;
    constructor(data: Partial<PaginatedCustomer>) {
      Object.assign(this, data);
    }
  }
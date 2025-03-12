import { SuppliersProduct } from "./suppliers-products";

export class PaginatedSuppliersProduct {
  content: SuppliersProduct[] = [];
  totalElements: number = 0;
  constructor(data: Partial<PaginatedSuppliersProduct>) {
    Object.assign(this, data);
  }
}
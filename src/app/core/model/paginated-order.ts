import { Order } from "./order";

export class PaginatedOrder {
  content: Order[] = [];
  totalElements: number = 0;
  constructor(data: Partial<PaginatedOrder>) {
    Object.assign(this, data);
  }
}
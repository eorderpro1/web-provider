import { Category } from "./category";
import { MeasurementType } from "./measurements";

export interface CreateProductByCategory {

    id: number;
    image?: string | null; 
    erpId: string;
    productName: string;
    productPrice: string;
    supplier: string;
    category: Category | null;
    quantity: number;
    measurementType: MeasurementType | null;
}
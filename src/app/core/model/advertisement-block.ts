export interface AdvertisementBlock {
    category: string;
    useAllProducts: boolean;
    selectedProducts: string[];
    image: string | null;
    adText: string;
    callToAction: string;
    startDate: string;
    endDate: string;
    costPerDay: number;
    id:number;
  }
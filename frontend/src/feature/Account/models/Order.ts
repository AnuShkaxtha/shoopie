
export interface Order {
    id: string;
    attributes: {
      createdAt: string;
      products: {
        productName: string;
        quantity: number;
      }[];
      price: number;
      status: string;
    };
  }   
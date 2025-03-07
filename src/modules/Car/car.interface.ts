export type CarType = {
  brand: string;
  model: string;
  year: number;
  price: number;
  // category: 'Sedan' | 'SUV' | 'Truck' | 'Coupe' | 'Convertible';
  category: string;
  description: string;
  quantity: number;
  inStock: boolean;
};

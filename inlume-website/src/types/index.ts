export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  wattage: number;
  voltage: string;
  lumens?: string;
  colorTemp?: string;
  body?: string;
  ipRating?: string;
  cri?: string;
  warranty?: string;
  features: string[];
  image: string;
  badge?: string;
}

export type ProductCategory =
  | 'street-light'
  | 'rgb-flood-light'
  | 'dob-flood-light'
  | 'well-glass-light'
  | 'high-bay-light';

export interface Category {
  id: ProductCategory;
  name: string;
  description: string;
  image: string;
  productCount?: number;
}

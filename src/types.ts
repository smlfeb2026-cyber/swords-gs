export type CategoryType = 
  | 'all'
  | 'japanese'
  | 'western'
  | 'movie'
  | 'firearms'
  | 'armour'
  | 'knives'
  | 'maintenance';

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: CategoryType;
  categoryLabel: string;
  subCategory?: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockCount: number;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isCollectorGrade?: boolean;
  icVerificationRequired: boolean;
  sharpness: 'Display (Unsharpened)' | 'Battle-Ready (Sharp)' | 'Semi-Edged' | 'Non-Firing Replica';
  steelType?: string;
  overallLength?: string;
  bladeLength?: string;
  weight?: string;
  fittings?: string;
  scabbard?: string;
  description: string;
  historicalContext?: string;
  images: string[];
  features: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  customEngraving?: string;
  includeDisplayStand?: boolean;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  verified: boolean;
  title: string;
  comment: string;
  productName: string;
}

// Product Types
export interface Product {
  id: string;
  sku: string;
  title: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  categories: string[];
  tags: string[];
  vendor: string;
  images: string[];
  stock: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  seoTitle?: string;
  seoDescription?: string;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  order: number;
}

// User Types
export interface User {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Order Types
export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  shippingAddress: Address;
  billingAddress: Address;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  title: string;
}

export interface Address {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}

// Blog Types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  authorTitle?: string;
  featuredImage?: string;
  readingTime: number;
  viewCount: number;
  publishedAt: Date;
  updatedAt: Date;
  isPublished: boolean;
  isFeatured: boolean;
  aiGenerated: boolean;
}

// AI Persona Types
export interface AIPersona {
  id: string;
  name: string;
  slug: string;
  role: string;
  description: string;
  avatar: string;
  bio: string;
  videos: PersonaVideo[];
  socialMedia?: SocialMedia;
}

export interface PersonaVideo {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  duration: number;
  category: string;
}

export interface SocialMedia {
  instagram?: string;
  tiktok?: string;
  youtube?: string;
  twitter?: string;
}

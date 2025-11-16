export interface Category {
  _id: string;
  name: string;
  description?: string;
  slug: string;
  isActive: boolean;
  image?: string;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  _id: string;
  name: string;
  description?: string;
  slug: string;
  categoryId: string | Category;
  images: string[];
  mainImage: string;
  type: 'BlackWhite' | 'Color';
  artist?: string;
  isActive: boolean;
  viewCount: number;
  relatedImages: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  _id: string;
  title: string;
  content?: string;
  slug: string;
  excerpt?: string;
  thumbnail?: string;
  author?: string;
  status: 'draft' | 'published' | 'archived';
  tags: string[];
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Admin {
  _id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  permissions: string[];
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  admin: Omit<Admin, 'password' | 'permissions'>;
}

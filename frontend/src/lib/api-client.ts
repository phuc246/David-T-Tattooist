import axios, { AxiosInstance, AxiosError } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Categories endpoints
  async getCategories() {
    return this.client.get('/api/categories');
  }

  async getCategory(id: string) {
    return this.client.get(`/api/categories/${id}`);
  }

  async createCategory(data: any) {
    return this.client.post('/api/categories', data);
  }

  async updateCategory(id: string, data: any) {
    return this.client.put(`/api/categories/${id}`, data);
  }

  async deleteCategory(id: string) {
    return this.client.delete(`/api/categories/${id}`);
  }

  // Products endpoints
  async getProducts(type?: string) {
    const params = type ? { type } : {};
    return this.client.get('/api/products', { params });
  }

  async getProduct(id: string) {
    return this.client.get(`/api/products/${id}`);
  }

  async getProductsByCategory(categoryId: string) {
    return this.client.get(`/api/products/category/${categoryId}`);
  }

  async createProduct(data: any) {
    return this.client.post('/api/products', data);
  }

  async updateProduct(id: string, data: any) {
    return this.client.put(`/api/products/${id}`, data);
  }

  async deleteProduct(id: string) {
    return this.client.delete(`/api/products/${id}`);
  }

  // Posts endpoints
  async getPosts() {
    return this.client.get('/api/posts');
  }

  async getPost(id: string) {
    return this.client.get(`/api/posts/${id}`);
  }

  async getPublishedPosts() {
    return this.client.get('/api/posts/published');
  }

  async getPostBySlug(slug: string) {
    return this.client.get(`/api/posts/slug/${slug}`);
  }

  async createPost(data: any) {
    return this.client.post('/api/posts', data);
  }

  async updatePost(id: string, data: any) {
    return this.client.put(`/api/posts/${id}`, data);
  }

  async deletePost(id: string) {
    return this.client.delete(`/api/posts/${id}`);
  }
}

export const apiClient = new ApiClient();
export default apiClient;

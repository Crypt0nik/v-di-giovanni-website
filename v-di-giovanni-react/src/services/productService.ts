// Service pour la gestion des produits
import apiClient from './api';
import type { 
  Product, 
  PaginatedResponse, 
  CreateProductRequest, 
  UpdateProductRequest 
} from './types';

export class ProductService {
  
  /**
   * Récupère tous les produits avec pagination optionnelle (avec cache)
   */
  static async getProducts(params?: {
    page?: number;
    per_page?: number;
    category_id?: number;
    search?: string;
  }): Promise<Product[] | PaginatedResponse<Product>> {
    const searchParams = new URLSearchParams();
    
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.per_page) searchParams.append('per_page', params.per_page.toString());
    if (params?.category_id) searchParams.append('category_id', params.category_id.toString());
    if (params?.search) searchParams.append('search', params.search);
    
    const queryString = searchParams.toString();
    const endpoint = queryString ? `/products?${queryString}` : '/products';
    
    // Utiliser le cache pour les requêtes sans paramètres de recherche
    if (!params?.search) {
      return apiClient.getCached<Product[] | PaginatedResponse<Product>>(endpoint, {
        ttl: 2 * 60 * 1000, // 2 minutes pour les listes de produits
      });
    }
    
    return apiClient.get<Product[] | PaginatedResponse<Product>>(endpoint);
  }

  /**
   * Récupère un produit par son ID (avec cache)
   */
  static async getProduct(id: number): Promise<Product> {
    return apiClient.getCached<Product>(`/products/${id}`, {
      ttl: 5 * 60 * 1000, // 5 minutes pour un produit individuel
    });
  }

  /**
   * Crée un nouveau produit (admin seulement)
   */
  static async createProduct(data: CreateProductRequest): Promise<Product> {
    const result = await apiClient.post<Product>('/products', data);
    // Invalider le cache des produits après création
    apiClient.invalidateCache('/products');
    return result;
  }

  /**
   * Met à jour un produit (admin seulement)
   */
  static async updateProduct(id: number, data: UpdateProductRequest): Promise<Product> {
    const result = await apiClient.put<Product>(`/products/${id}`, data);
    // Invalider le cache du produit et des listes après mise à jour
    apiClient.invalidateCache(`/products/${id}`);
    apiClient.invalidateCache('/products');
    return result;
  }

  /**
   * Supprime un produit (admin seulement)
   */
  static async deleteProduct(id: number): Promise<void> {
    const result = await apiClient.delete<void>(`/products/${id}`);
    // Invalider le cache après suppression
    apiClient.invalidateCache(`/products/${id}`);
    apiClient.invalidateCache('/products');
    return result;
  }

  /**
   * Recherche de produits par nom ou description
   */
  static async searchProducts(query: string): Promise<Product[]> {
    return apiClient.get<Product[]>(`/products?search=${encodeURIComponent(query)}`);
  }

  /**
   * Récupère les produits par catégorie
   */
  static async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return apiClient.get<Product[]>(`/products?category_id=${categoryId}`);
  }

  /**
   * Récupère les produits en stock seulement
   */
  static async getInStockProducts(): Promise<Product[]> {
    const products = await this.getProducts();
    const productList = Array.isArray(products) ? products : products.data;
    return productList.filter(product => product.stock_quantity > 0 && product.is_active);
  }

  /**
   * Vérifie la disponibilité d'un produit
   */
  static async checkAvailability(productId: number, quantity: number = 1): Promise<boolean> {
    try {
      const product = await this.getProduct(productId);
      return product.is_active && product.stock_quantity >= quantity;
    } catch (error) {
      return false;
    }
  }
}

export default ProductService;

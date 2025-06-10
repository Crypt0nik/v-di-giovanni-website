// Service pour la gestion des catégories de produits
import apiClient from './api';
import type { Category } from './types';

export interface CreateCategoryRequest {
  name: string;
  description?: string;
}

export interface UpdateCategoryRequest extends Partial<CreateCategoryRequest> {}

export class CategoryService {
  
  /**
   * Récupère toutes les catégories (avec cache)
   */
  static async getCategories(): Promise<Category[]> {
    return apiClient.getCached<Category[]>('/categories', {
      ttl: 10 * 60 * 1000, // 10 minutes pour les catégories
    });
  }

  /**
   * Récupère une catégorie par son ID (avec cache)
   */
  static async getCategory(id: number): Promise<Category> {
    return apiClient.getCached<Category>(`/categories/${id}`, {
      ttl: 10 * 60 * 1000, // 10 minutes pour une catégorie individuelle
    });
  }

  /**
   * Crée une nouvelle catégorie (admin seulement)
   */
  static async createCategory(data: CreateCategoryRequest): Promise<Category> {
    const result = await apiClient.post<Category>('/categories', data);
    // Invalider le cache des catégories après création
    apiClient.invalidateCache('/categories');
    return result;
  }

  /**
   * Met à jour une catégorie (admin seulement)
   */
  static async updateCategory(id: number, data: UpdateCategoryRequest): Promise<Category> {
    const result = await apiClient.put<Category>(`/categories/${id}`, data);
    // Invalider le cache après mise à jour
    apiClient.invalidateCache(`/categories/${id}`);
    apiClient.invalidateCache('/categories');
    return result;
  }

  /**
   * Supprime une catégorie (admin seulement)
   */
  static async deleteCategory(id: number): Promise<void> {
    const result = await apiClient.delete<void>(`/categories/${id}`);
    // Invalider le cache après suppression
    apiClient.invalidateCache(`/categories/${id}`);
    apiClient.invalidateCache('/categories');
    return result;
  }

  /**
   * Récupère les catégories avec le nombre de produits
   */
  static async getCategoriesWithProductCount(): Promise<(Category & { product_count: number })[]> {
    return apiClient.getCached<(Category & { product_count: number })[]>('/categories?with_product_count=true', {
      ttl: 5 * 60 * 1000, // 5 minutes pour les stats
    });
  }
}

export default CategoryService;

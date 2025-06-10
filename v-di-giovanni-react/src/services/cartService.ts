// Service pour la gestion du panier d'achat intégré avec l'API
import apiClient from './api';
import type { Cart, CartItem, AddToCartRequest } from './types';

export interface UpdateCartItemRequest {
  quantity: number;
}

export class CartService {
  
  /**
   * Récupère le panier de l'utilisateur connecté
   */
  static async getCurrentCart(): Promise<Cart> {
    return apiClient.get<Cart>('/cart');
  }

  /**
   * Ajoute un produit au panier
   */
  static async addToCart(data: AddToCartRequest): Promise<CartItem> {
    const result = await apiClient.post<CartItem>('/cart/items', data);
    // Invalider le cache du panier après ajout
    apiClient.invalidateCache('/cart');
    return result;
  }

  /**
   * Met à jour la quantité d'un article dans le panier
   */
  static async updateCartItem(itemId: number, data: UpdateCartItemRequest): Promise<CartItem> {
    const result = await apiClient.put<CartItem>(`/cart/items/${itemId}`, data);
    // Invalider le cache du panier après mise à jour
    apiClient.invalidateCache('/cart');
    return result;
  }

  /**
   * Supprime un article du panier
   */
  static async removeFromCart(itemId: number): Promise<void> {
    const result = await apiClient.delete<void>(`/cart/items/${itemId}`);
    // Invalider le cache du panier après suppression
    apiClient.invalidateCache('/cart');
    return result;
  }

  /**
   * Vide complètement le panier
   */
  static async clearCart(): Promise<void> {
    const result = await apiClient.delete<void>('/cart');
    // Invalider le cache du panier après vidage
    apiClient.invalidateCache('/cart');
    return result;
  }

  /**
   * Calcule le total du panier
   */
  static calculateCartTotal(cart: Cart): number {
    if (!cart.items || cart.items.length === 0) {
      return 0;
    }
    
    return cart.items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }

  /**
   * Calcule le nombre total d'articles dans le panier
   */
  static calculateCartItemCount(cart: Cart): number {
    if (!cart.items || cart.items.length === 0) {
      return 0;
    }
    
    return cart.items.reduce((count, item) => {
      return count + item.quantity;
    }, 0);
  }

  /**
   * Vérifie si un produit est déjà dans le panier
   */
  static isProductInCart(cart: Cart, productId: number): boolean {
    if (!cart.items || cart.items.length === 0) {
      return false;
    }
    
    return cart.items.some(item => item.product_id === productId);
  }

  /**
   * Récupère l'article du panier pour un produit donné
   */
  static getCartItemByProduct(cart: Cart, productId: number): CartItem | null {
    if (!cart.items || cart.items.length === 0) {
      return null;
    }
    
    return cart.items.find(item => item.product_id === productId) || null;
  }

  /**
   * Valide le panier avant commande
   */
  static async validateCart(): Promise<{
    isValid: boolean;
    errors: string[];
    warnings: string[];
  }> {
    try {
      const cart = await this.getCurrentCart();
      const errors: string[] = [];
      const warnings: string[] = [];

      if (!cart.items || cart.items.length === 0) {
        errors.push('Le panier est vide');
        return { isValid: false, errors, warnings };
      }

      // Vérifier la disponibilité de chaque produit
      for (const item of cart.items) {
        if (!item.product) {
          errors.push(`Produit introuvable pour l'article ${item.id}`);
          continue;
        }

        if (!item.product.is_active) {
          errors.push(`Le produit "${item.product.name}" n'est plus disponible`);
          continue;
        }

        if (item.product.stock_quantity < item.quantity) {
          if (item.product.stock_quantity === 0) {
            errors.push(`Le produit "${item.product.name}" est en rupture de stock`);
          } else {
            warnings.push(`Stock limité pour "${item.product.name}": ${item.product.stock_quantity} disponible(s), ${item.quantity} demandé(s)`);
          }
        }
      }

      return {
        isValid: errors.length === 0,
        errors,
        warnings,
      };
    } catch (error) {
      return {
        isValid: false,
        errors: ['Erreur lors de la validation du panier'],
        warnings: [],
      };
    }
  }
}

export default CartService;

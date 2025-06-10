// Hook pour la gestion du panier dans les composants React
import { useState, useEffect, useCallback } from 'react';
import CartService from './cartService';
import ErrorHandlerService from './errorHandlerService';
import type { Cart, CartItem, AddToCartRequest, UpdateCartItemRequest, ApiError } from './types';

export interface UseCartResult {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
  itemCount: number;
  total: number;
  addToCart: (data: AddToCartRequest) => Promise<void>;
  updateCartItem: (itemId: number, data: UpdateCartItemRequest) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  validateCart: () => Promise<{ isValid: boolean; errors: string[]; warnings: string[] }>;
  refreshCart: () => Promise<void>;
  isProductInCart: (productId: number) => boolean;
  getCartItemByProduct: (productId: number) => CartItem | null;
}

export function useCart(): UseCartResult {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fonctions calculées
  const itemCount = cart ? CartService.calculateCartItemCount(cart) : 0;
  const total = cart ? CartService.calculateCartTotal(cart) : 0;

  const refreshCart = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const currentCart = await CartService.getCurrentCart();
      setCart(currentCart);
    } catch (err) {
      const apiError = err as ApiError;
      if (apiError.status === 401) {
        // Utilisateur non connecté, panier vide
        setCart(null);
        setError(null);
      } else {
        setError(apiError.message || 'Erreur lors du chargement du panier');
        ErrorHandlerService.handleApiError(apiError, 'Chargement du panier');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const addToCart = useCallback(async (data: AddToCartRequest) => {
    try {
      await CartService.addToCart(data);
      await refreshCart();
      
      ErrorHandlerService.success(
        'Produit ajouté',
        'Le produit a été ajouté à votre panier',
        3000
      );
    } catch (err) {
      const apiError = err as ApiError;
      ErrorHandlerService.handleApiError(apiError, 'Ajout au panier');
      throw err;
    }
  }, [refreshCart]);

  const updateCartItem = useCallback(async (itemId: number, data: UpdateCartItemRequest) => {
    try {
      await CartService.updateCartItem(itemId, data);
      await refreshCart();
      
      ErrorHandlerService.success(
        'Panier mis à jour',
        'La quantité a été modifiée',
        2000
      );
    } catch (err) {
      const apiError = err as ApiError;
      ErrorHandlerService.handleApiError(apiError, 'Mise à jour du panier');
      throw err;
    }
  }, [refreshCart]);

  const removeFromCart = useCallback(async (itemId: number) => {
    try {
      await CartService.removeFromCart(itemId);
      await refreshCart();
      
      ErrorHandlerService.success(
        'Produit retiré',
        'Le produit a été retiré de votre panier',
        3000
      );
    } catch (err) {
      const apiError = err as ApiError;
      ErrorHandlerService.handleApiError(apiError, 'Suppression du panier');
      throw err;
    }
  }, [refreshCart]);

  const clearCart = useCallback(async () => {
    try {
      await CartService.clearCart();
      await refreshCart();
      
      ErrorHandlerService.success(
        'Panier vidé',
        'Votre panier a été vidé',
        3000
      );
    } catch (err) {
      const apiError = err as ApiError;
      ErrorHandlerService.handleApiError(apiError, 'Vidage du panier');
      throw err;
    }
  }, [refreshCart]);

  const validateCart = useCallback(async () => {
    try {
      const result = await CartService.validateCart();
      
      if (result.warnings.length > 0) {
        result.warnings.forEach(warning => {
          ErrorHandlerService.warning(
            'Attention',
            warning,
            5000
          );
        });
      }

      if (result.errors.length > 0) {
        result.errors.forEach(error => {
          ErrorHandlerService.error(
            'Erreur de validation',
            error
          );
        });
      }

      return result;
    } catch (err) {
      const apiError = err as ApiError;
      ErrorHandlerService.handleApiError(apiError, 'Validation du panier');
      return {
        isValid: false,
        errors: ['Erreur lors de la validation'],
        warnings: [],
      };
    }
  }, []);

  const isProductInCart = useCallback((productId: number): boolean => {
    return cart ? CartService.isProductInCart(cart, productId) : false;
  }, [cart]);

  const getCartItemByProduct = useCallback((productId: number): CartItem | null => {
    return cart ? CartService.getCartItemByProduct(cart, productId) : null;
  }, [cart]);

  // Chargement initial du panier
  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  return {
    cart,
    loading,
    error,
    itemCount,
    total,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    validateCart,
    refreshCart,
    isProductInCart,
    getCartItemByProduct,
  };
}

export default useCart;

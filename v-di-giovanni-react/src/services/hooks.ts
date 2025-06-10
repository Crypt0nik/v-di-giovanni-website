// Hooks React pour l'intégration API avec le frontend existant
import { useState, useEffect, useCallback } from 'react';
import { ProductService } from './productService';
import { AuthService } from './authService';
import type { Product, User, ApiError } from './types';

/**
 * Hook pour la gestion des produits
 */
export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await ProductService.getProducts();
      const productList = Array.isArray(result) ? result : result.data;
      setProducts(productList);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Erreur lors du chargement des produits');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
  };
}

/**
 * Hook pour la gestion d'un produit spécifique
 */
export function useProduct(productId: number | null) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = useCallback(async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      const result = await ProductService.getProduct(id);
      setProduct(result);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Erreur lors du chargement du produit');
      setProduct(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (productId) {
      fetchProduct(productId);
    } else {
      setProduct(null);
      setError(null);
    }
  }, [productId, fetchProduct]);

  return {
    product,
    loading,
    error,
    refetch: productId ? () => fetchProduct(productId) : undefined,
  };
}

/**
 * Hook pour la recherche de produits
 */
export function useProductSearch() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchProducts = useCallback(async (query: string) => {
    if (!query.trim()) {
      setProducts([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const results = await ProductService.searchProducts(query);
      setProducts(results);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Erreur lors de la recherche');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setProducts([]);
    setError(null);
  }, []);

  return {
    products,
    loading,
    error,
    searchProducts,
    clearSearch,
  };
}

/**
 * Hook pour la vérification de disponibilité des produits
 */
export function useProductAvailability() {
  const [availabilityCache, setAvailabilityCache] = useState<Record<number, boolean>>({});

  const checkAvailability = useCallback(async (productId: number, quantity: number = 1) => {
    try {
      const isAvailable = await ProductService.checkAvailability(productId, quantity);
      setAvailabilityCache(prev => ({
        ...prev,
        [productId]: isAvailable,
      }));
      return isAvailable;
    } catch (error) {
      setAvailabilityCache(prev => ({
        ...prev,
        [productId]: false,
      }));
      return false;
    }
  }, []);

  return {
    availabilityCache,
    checkAvailability,
  };
}

/**
 * Hook pour la gestion de l'authentification
 */
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setLoading(true);
        const userData = await AuthService.initializeAuth();
        setUser(userData);
      } catch (err) {
        const apiError = err as ApiError;
        setError(apiError.message || 'Erreur d\'authentification');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setError(null);
      const response = await AuthService.login({ email, password });
      setUser(response.user);
      AuthService.saveUserData(response.user);
      return response;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Erreur de connexion');
      throw err;
    }
  }, []);

  const register = useCallback(async (name: string, email: string, password: string, passwordConfirmation: string) => {
    try {
      setError(null);
      const response = await AuthService.register({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      setUser(response.user);
      AuthService.saveUserData(response.user);
      return response;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Erreur d\'inscription');
      throw err;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await AuthService.logout();
      setUser(null);
      setError(null);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Erreur de déconnexion');
    }
  }, []);

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };
}

/**
 * Hook pour la gestion d'état global simple (sans Redux)
 */
export function useApiState() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return {
    isOnline,
  };
}

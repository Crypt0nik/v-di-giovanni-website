// Service API principal pour l'intégration avec le backend Laravel
// Configuration de base pour toutes les requêtes API
import CacheService from './cacheService';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8002/api';

// Debug: afficher l'URL de base utilisée
console.log('🔗 API Base URL configurée:', API_BASE_URL);

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  status: number;
}

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.token = localStorage.getItem('auth_token');
  }

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('auth_token', token);
    } else {
      localStorage.removeItem('auth_token');
    }
  }

  getToken(): string | null {
    return this.token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        ...options.headers,
      },
      ...options,
    };

    if (this.token) {
      config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${this.token}`,
      };
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw {
          message: errorData.message || `HTTP error! status: ${response.status}`,
          errors: errorData.errors || {},
          status: response.status,
        } as ApiError;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error as ApiError) {
        throw error;
      }
      throw {
        message: 'Network error or server unavailable',
        status: 0,
      } as ApiError;
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'GET',
    });
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }

  // Méthodes avec cache
  async getCached<T>(endpoint: string, cacheOptions?: { ttl?: number; stale?: boolean }): Promise<T> {
    const cacheKey = CacheService.generateKey(`GET:${endpoint}`);
    
    return CacheService.cachedRequest(
      cacheKey,
      () => this.get<T>(endpoint),
      cacheOptions
    );
  }

  // Invalide le cache pour un pattern d'endpoints
  invalidateCache(pattern: string): void {
    CacheService.invalidatePattern(pattern);
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
export default apiClient;

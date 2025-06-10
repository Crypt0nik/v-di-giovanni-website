// Service pour l'authentification
import apiClient from './api';
import type { 
  User, 
  AuthResponse, 
  LoginRequest, 
  RegisterRequest 
} from './types';

export class AuthService {
  
  /**
   * Connexion utilisateur
   */
  static async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/login', credentials);
    
    // Sauvegarde du token dans le client API
    if (response.token) {
      apiClient.setToken(response.token);
    }
    
    return response;
  }

  /**
   * Inscription utilisateur
   */
  static async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/register', userData);
    
    // Sauvegarde du token dans le client API
    if (response.token) {
      apiClient.setToken(response.token);
    }
    
    return response;
  }

  /**
   * Déconnexion utilisateur
   */
  static async logout(): Promise<void> {
    try {
      await apiClient.post<void>('/logout');
    } finally {
      // Suppression du token même si la requête échoue
      apiClient.setToken(null);
      this.clearUserData();
    }
  }

  /**
   * Récupère l'utilisateur actuellement connecté
   */
  static async getCurrentUser(): Promise<User> {
    return apiClient.get<User>('/user');
  }

  /**
   * Vérifie si l'utilisateur est connecté
   */
  static isAuthenticated(): boolean {
    return !!apiClient.getToken();
  }

  /**
   * Récupère le token d'authentification actuel
   */
  static getToken(): string | null {
    return apiClient.getToken();
  }

  /**
   * Définit le token d'authentification
   */
  static setToken(token: string | null): void {
    apiClient.setToken(token);
  }

  /**
   * Supprime toutes les données utilisateur du stockage local
   */
  static clearUserData(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
  }

  /**
   * Sauvegarde les données utilisateur dans le stockage local
   */
  static saveUserData(user: User): void {
    localStorage.setItem('user_data', JSON.stringify(user));
  }

  /**
   * Récupère les données utilisateur du stockage local
   */
  static getUserData(): User | null {
    const userData = localStorage.getItem('user_data');
    return userData ? JSON.parse(userData) : null;
  }

  /**
   * Vérifie la validité du token et récupère les données utilisateur
   */
  static async validateToken(): Promise<User | null> {
    try {
      if (!this.isAuthenticated()) {
        return null;
      }
      
      const user = await this.getCurrentUser();
      this.saveUserData(user);
      return user;
    } catch (error) {
      // Token invalide, suppression des données
      this.clearUserData();
      return null;
    }
  }

  /**
   * Initialise l'authentification au démarrage de l'application
   */
  static async initializeAuth(): Promise<User | null> {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    return this.validateToken();
  }
}

export default AuthService;

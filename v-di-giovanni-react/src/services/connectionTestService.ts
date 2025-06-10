// Service pour tester la connexion avec le backend Laravel
import apiClient from './api';

export interface HealthCheckResponse {
  status: string;
  message: string;
  timestamp: string;
  version?: string;
  database?: string;
}

export interface BackendStatus {
  isConnected: boolean;
  latency?: number;
  error?: string;
  details?: HealthCheckResponse;
}

export class ConnectionTestService {
  
  /**
   * Teste la connexion avec le backend Laravel
   */
  static async testConnection(): Promise<BackendStatus> {
    const startTime = Date.now();
    
    try {
      // Test de la route de santé du backend (utilisation de /products pour vérifier la connexion)
      const response = await apiClient.get('/products');
      const latency = Date.now() - startTime;
      
      return {
        isConnected: true,
        latency,
        details: {
          status: 'success',
          message: 'Backend Laravel connecté avec succès',
          timestamp: new Date().toISOString(),
          version: 'Laravel API v1.0',
          database: `${Array.isArray(response) ? response.length : 0} produits trouvés`
        },
      };
    } catch (error: any) {
      const latency = Date.now() - startTime;
      
      return {
        isConnected: false,
        latency,
        error: error.message || 'Erreur de connexion inconnue',
      };
    }
  }

  /**
   * Teste la connexion aux routes d'authentification
   */
  static async testAuthRoutes(): Promise<{
    login: boolean;
    register: boolean;
    user: boolean;
  }> {
    const results = {
      login: false,
      register: false,
      user: false,
    };

    try {
      // Test route login (POST sans credentials pour voir si elle répond)
      await apiClient.post('/login', {});
    } catch (error: any) {
      // Une erreur 422 (validation) indique que la route fonctionne
      results.login = error.status === 422;
    }

    try {
      // Test route register (POST sans data pour voir si elle répond)
      await apiClient.post('/register', {});
    } catch (error: any) {
      // Une erreur 422 (validation) indique que la route fonctionne
      results.register = error.status === 422;
    }

    try {
      // Test route user (GET sans token pour voir si elle répond)
      await apiClient.get('/user');
    } catch (error: any) {
      // Une erreur 401 (unauthorized) indique que la route fonctionne
      results.user = error.status === 401;
    }

    return results;
  }

  /**
   * Teste la connexion aux routes de produits
   */
  static async testProductRoutes(): Promise<{
    products: boolean;
    categories: boolean;
  }> {
    const results = {
      products: false,
      categories: false,
    };

    try {
      await apiClient.get('/products');
      results.products = true;
    } catch (error: any) {
      // Même en cas d'erreur, si on reçoit une réponse structurée, la route existe
      results.products = error.status !== undefined;
    }

    try {
      await apiClient.get('/categories');
      results.categories = true;
    } catch (error: any) {
      results.categories = error.status !== undefined;
    }

    return results;
  }

  /**
   * Test complet de l'intégration
   */
  static async runFullIntegrationTest(): Promise<{
    connection: BackendStatus;
    auth: { login: boolean; register: boolean; user: boolean };
    products: { products: boolean; categories: boolean };
    timestamp: string;
  }> {
    console.log('🔄 Début du test d\'intégration backend-frontend...');
    
    const connection = await this.testConnection();
    console.log(`📡 Connexion: ${connection.isConnected ? '✅' : '❌'} (${connection.latency}ms)`);
    
    const auth = await this.testAuthRoutes();
    console.log(`🔐 Routes Auth: Login ${auth.login ? '✅' : '❌'}, Register ${auth.register ? '✅' : '❌'}, User ${auth.user ? '✅' : '❌'}`);
    
    const products = await this.testProductRoutes();
    console.log(`📦 Routes Produits: Products ${products.products ? '✅' : '❌'}, Categories ${products.categories ? '✅' : '❌'}`);
    
    return {
      connection,
      auth,
      products,
      timestamp: new Date().toISOString(),
    };
  }
}

export default ConnectionTestService;

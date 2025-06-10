// Service de cache pour optimiser les requêtes API
export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

export interface CacheOptions {
  ttl?: number; // Time to live en millisecondes (défaut: 5 minutes)
  stale?: boolean; // Autoriser les données périmées en cas d'erreur (défaut: true)
}

export class CacheService {
  private static cache: Map<string, CacheEntry<any>> = new Map();
  private static defaultTTL = 5 * 60 * 1000; // 5 minutes

  /**
   * Génère une clé de cache à partir d'une URL et de paramètres
   */
  static generateKey(url: string, params?: Record<string, any>): string {
    const paramString = params ? JSON.stringify(params) : '';
    return `${url}:${paramString}`;
  }

  /**
   * Met en cache une valeur
   */
  static set<T>(key: string, data: T, options: CacheOptions = {}): void {
    const ttl = options.ttl || this.defaultTTL;
    const now = Date.now();
    
    const entry: CacheEntry<T> = {
      data,
      timestamp: now,
      expiresAt: now + ttl,
    };

    this.cache.set(key, entry);
    
    // Nettoyage automatique des entrées expirées (optionnel)
    this.cleanupExpired();
  }

  /**
   * Récupère une valeur du cache
   */
  static get<T>(key: string, options: CacheOptions = {}): T | null {
    const entry = this.cache.get(key) as CacheEntry<T> | undefined;
    
    if (!entry) {
      return null;
    }

    const now = Date.now();
    const isExpired = now > entry.expiresAt;

    if (isExpired && !options.stale) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  /**
   * Vérifie si une clé existe et n'est pas expirée
   */
  static has(key: string): boolean {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return false;
    }

    const now = Date.now();
    const isExpired = now > entry.expiresAt;

    if (isExpired) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  /**
   * Supprime une entrée du cache
   */
  static delete(key: string): boolean {
    return this.cache.delete(key);
  }

  /**
   * Supprime toutes les entrées du cache
   */
  static clear(): void {
    this.cache.clear();
  }

  /**
   * Supprime les entrées expirées
   */
  static cleanupExpired(): void {
    const now = Date.now();
    
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiresAt) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Invalide le cache pour toutes les clés qui correspondent à un pattern
   */
  static invalidatePattern(pattern: string): void {
    const regex = new RegExp(pattern);
    
    for (const key of this.cache.keys()) {
      if (regex.test(key)) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Récupère les statistiques du cache
   */
  static getStats(): {
    totalEntries: number;
    expiredEntries: number;
    validEntries: number;
    memoryUsage: string;
  } {
    const now = Date.now();
    let expiredCount = 0;
    let validCount = 0;

    for (const entry of this.cache.values()) {
      if (now > entry.expiresAt) {
        expiredCount++;
      } else {
        validCount++;
      }
    }

    // Estimation approximative de l'utilisation mémoire
    const memoryUsage = `${Math.round(JSON.stringify([...this.cache.entries()]).length / 1024)} KB`;

    return {
      totalEntries: this.cache.size,
      expiredEntries: expiredCount,
      validEntries: validCount,
      memoryUsage,
    };
  }

  /**
   * Wrapper pour les requêtes avec cache automatique
   */
  static async cachedRequest<T>(
    key: string,
    requestFn: () => Promise<T>,
    options: CacheOptions = {}
  ): Promise<T> {
    // Vérifier le cache d'abord
    const cachedData = this.get<T>(key, options);
    if (cachedData !== null) {
      return cachedData;
    }

    try {
      // Exécuter la requête
      const data = await requestFn();
      
      // Mettre en cache le résultat
      this.set(key, data, options);
      
      return data;
    } catch (error) {
      // En cas d'erreur, essayer de récupérer des données périmées si autorisé
      if (options.stale !== false) {
        const staleData = this.get<T>(key, { stale: true });
        if (staleData !== null) {
          console.warn(`Utilisation de données périmées pour la clé: ${key}`);
          return staleData;
        }
      }
      
      throw error;
    }
  }
}

// Hook pour utiliser le cache dans les composants React
export function useCache() {
  return {
    get: CacheService.get.bind(CacheService),
    set: CacheService.set.bind(CacheService),
    has: CacheService.has.bind(CacheService),
    delete: CacheService.delete.bind(CacheService),
    clear: CacheService.clear.bind(CacheService),
    invalidatePattern: CacheService.invalidatePattern.bind(CacheService),
    getStats: CacheService.getStats.bind(CacheService),
    cachedRequest: CacheService.cachedRequest.bind(CacheService),
  };
}

export default CacheService;

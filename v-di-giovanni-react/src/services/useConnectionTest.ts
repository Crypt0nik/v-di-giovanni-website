// Hook pour tester et surveiller la connexion avec le backend
import { useState, useEffect, useCallback } from 'react';
import ConnectionTestService, { type BackendStatus } from './connectionTestService';
import ErrorHandlerService from './errorHandlerService';

export interface UseConnectionTestResult {
  status: BackendStatus | null;
  isLoading: boolean;
  lastTest: string | null;
  testConnection: () => Promise<void>;
  runFullTest: () => Promise<void>;
  autoTest: boolean;
  setAutoTest: (enabled: boolean) => void;
}

export function useConnectionTest(autoTestInterval?: number): UseConnectionTestResult {
  const [status, setStatus] = useState<BackendStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastTest, setLastTest] = useState<string | null>(null);
  const [autoTest, setAutoTest] = useState(false);

  const testConnection = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await ConnectionTestService.testConnection();
      setStatus(result);
      setLastTest(new Date().toLocaleString());
      
      if (result.isConnected) {
        ErrorHandlerService.success(
          'Connexion réussie',
          `Backend connecté (${result.latency}ms)`,
          3000
        );
      } else {
        ErrorHandlerService.warning(
          'Connexion échouée',
          result.error || 'Impossible de contacter le backend',
          5000
        );
      }
    } catch (error) {
      ErrorHandlerService.error(
        'Erreur de test',
        'Impossible de tester la connexion au backend'
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const runFullTest = useCallback(async () => {
    setIsLoading(true);
    try {
      const results = await ConnectionTestService.runFullIntegrationTest();
      
      const overallSuccess = results.connection.isConnected &&
        results.auth.login && results.auth.register && results.auth.user &&
        results.products.products && results.products.categories;
      
      if (overallSuccess) {
        ErrorHandlerService.success(
          'Tests d\'intégration réussis',
          'Toutes les routes backend sont fonctionnelles',
          5000
        );
      } else {
        const failedTests = [];
        if (!results.connection.isConnected) failedTests.push('Connexion');
        if (!results.auth.login || !results.auth.register || !results.auth.user) failedTests.push('Authentification');
        if (!results.products.products || !results.products.categories) failedTests.push('Produits');
        
        ErrorHandlerService.warning(
          'Tests partiellement échoués',
          `Problèmes détectés: ${failedTests.join(', ')}`,
          0 // Reste affiché jusqu'à fermeture manuelle
        );
      }
      
      setStatus(results.connection);
      setLastTest(new Date().toLocaleString());
    } catch (error) {
      ErrorHandlerService.error(
        'Erreur de test complet',
        'Impossible d\'exécuter les tests d\'intégration'
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Test automatique périodique
  useEffect(() => {
    if (!autoTest) return;

    const interval = autoTestInterval || 30000; // 30 secondes par défaut
    const timer = setInterval(testConnection, interval);

    return () => clearInterval(timer);
  }, [autoTest, autoTestInterval, testConnection]);

  // Test initial au chargement
  useEffect(() => {
    testConnection();
  }, [testConnection]);

  return {
    status,
    isLoading,
    lastTest,
    testConnection,
    runFullTest,
    autoTest,
    setAutoTest,
  };
}

export default useConnectionTest;

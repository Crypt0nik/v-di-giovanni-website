// Test avancé des services d'intégration
import { CacheService } from './src/services/cacheService.js';
import { ErrorHandlerService } from './src/services/errorHandlerService.js';
import { ConnectionTestService } from './src/services/connectionTestService.js';

const API_URL = 'http://127.0.0.1:8002/api';

// Initialiser les services
const cacheService = new CacheService();
const errorHandler = new ErrorHandlerService();
const connectionTest = new ConnectionTestService(API_URL);

console.log('🚀 Test avancé des services d\'intégration\n');

async function testAdvancedIntegration() {
    try {
        // Test 1: Service de cache
        console.log('1️⃣ Test du service de cache...');
        cacheService.set('test-key', { data: 'test-value' }, 60);
        const cachedData = cacheService.get('test-key');
        console.log('✅ Cache fonctionne:', cachedData);

        // Test 2: Test de connexion
        console.log('\n2️⃣ Test du service de connexion...');
        const connectionResult = await connectionTest.testConnection();
        console.log('✅ Résultat connexion:', connectionResult);

        // Test 3: Test des endpoints
        console.log('\n3️⃣ Test des endpoints...');
        const endpointsResult = await connectionTest.testEndpoints();
        console.log('✅ Résultats endpoints:', endpointsResult);

        // Test 4: Test de performance
        console.log('\n4️⃣ Test de performance...');
        const perfResult = await connectionTest.testPerformance();
        console.log('✅ Performance:', perfResult);

        // Test 5: Statistiques du cache
        console.log('\n5️⃣ Statistiques du cache...');
        const cacheStats = cacheService.getStats();
        console.log('✅ Stats cache:', cacheStats);

        console.log('\n🎉 Tous les tests passés avec succès !');

    } catch (error) {
        console.error('💥 Erreur dans les tests:', error);
        errorHandler.handleError(error, { context: 'test-avancé' });
    }
}

// Exécuter les tests
testAdvancedIntegration();

// Composant de test pour l'intégration backend-frontend
import React from 'react';
import { useConnectionTest } from '../services/useConnectionTest';
import { useProducts } from '../services/hooks';
import { CacheService } from '../services/cacheService';

const IntegrationTest: React.FC = () => {
  const { 
    status, 
    isLoading, 
    lastTest, 
    testConnection, 
    runFullTest, 
    autoTest, 
    setAutoTest 
  } = useConnectionTest();
  
  const { products, loading: productsLoading, error: productsError } = useProducts();
  const cacheStats = CacheService.getStats();

  const getStatusColor = (isConnected: boolean) => {
    return isConnected ? '#10B981' : '#EF4444';
  };

  const getStatusText = (isConnected: boolean) => {
    return isConnected ? 'Connecté' : 'Déconnecté';
  };

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f8fafc',
      minHeight: '100vh'
    }}>
      <h1 style={{ 
        fontSize: '24px', 
        fontWeight: 'bold', 
        marginBottom: '20px',
        color: '#1f2937'
      }}>
        Test d'intégration Backend-Frontend
      </h1>

      {/* Status de connexion */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '8px', 
        marginBottom: '20px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px' }}>
          Status de connexion
        </h2>
        
        {status && (
          <div style={{ marginBottom: '15px' }}>
            <span style={{ 
              color: getStatusColor(status.isConnected),
              fontWeight: '600',
              fontSize: '16px'
            }}>
              ● {getStatusText(status.isConnected)}
            </span>
            {status.latency && (
              <span style={{ marginLeft: '10px', color: '#6b7280' }}>
                ({status.latency}ms)
              </span>
            )}
            {status.error && (
              <div style={{ color: '#EF4444', marginTop: '5px' }}>
                Erreur: {status.error}
              </div>
            )}
          </div>
        )}
        
        <div style={{ marginBottom: '15px' }}>
          <button
            onClick={testConnection}
            disabled={isLoading}
            style={{
              backgroundColor: '#3B82F6',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              marginRight: '10px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.6 : 1
            }}
          >
            {isLoading ? 'Test en cours...' : 'Tester la connexion'}
          </button>
          
          <button
            onClick={runFullTest}
            disabled={isLoading}
            style={{
              backgroundColor: '#10B981',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              marginRight: '10px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.6 : 1
            }}
          >
            Test complet
          </button>
          
          <label style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={autoTest}
              onChange={(e) => setAutoTest(e.target.checked)}
              style={{ marginRight: '5px' }}
            />
            Test automatique (30s)
          </label>
        </div>
        
        {lastTest && (
          <div style={{ color: '#6b7280', fontSize: '14px' }}>
            Dernier test: {lastTest}
          </div>
        )}
      </div>

      {/* Informations sur les produits */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '8px', 
        marginBottom: '20px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px' }}>
          Chargement des produits
        </h2>
        
        <div style={{ marginBottom: '10px' }}>
          <span style={{ fontWeight: '500' }}>Status: </span>
          <span style={{ 
            color: productsLoading ? '#F59E0B' : (productsError ? '#EF4444' : '#10B981')
          }}>
            {productsLoading ? 'Chargement...' : (productsError ? 'Erreur' : 'Chargé')}
          </span>
        </div>
        
        {products.length > 0 && (
          <div style={{ marginBottom: '10px' }}>
            <span style={{ fontWeight: '500' }}>Produits trouvés: </span>
            <span style={{ color: '#10B981' }}>{products.length}</span>
          </div>
        )}
        
        {productsError && (
          <div style={{ color: '#EF4444', marginTop: '10px' }}>
            Erreur: {productsError}
          </div>
        )}
        
        {products.length > 0 && (
          <details style={{ marginTop: '15px' }}>
            <summary style={{ cursor: 'pointer', fontWeight: '500' }}>
              Voir les produits ({products.length})
            </summary>
            <div style={{ 
              maxHeight: '200px', 
              overflowY: 'auto', 
              marginTop: '10px',
              padding: '10px',
              backgroundColor: '#f8fafc',
              borderRadius: '6px'
            }}>
              {products.map(product => (
                <div key={product.id} style={{ 
                  padding: '8px', 
                  borderBottom: '1px solid #e5e7eb',
                  fontSize: '14px'
                }}>
                  <strong>{product.name}</strong> - {product.price}€
                  <br />
                  <span style={{ color: '#6b7280' }}>{product.description}</span>
                </div>
              ))}
            </div>
          </details>
        )}
      </div>

      {/* Statistiques du cache */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '8px', 
        marginBottom: '20px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px' }}>
          Cache API
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
          <div>
            <div style={{ fontWeight: '500', color: '#374151' }}>Entrées totales</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#3B82F6' }}>
              {cacheStats.totalEntries}
            </div>
          </div>
          
          <div>
            <div style={{ fontWeight: '500', color: '#374151' }}>Entrées valides</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#10B981' }}>
              {cacheStats.validEntries}
            </div>
          </div>
          
          <div>
            <div style={{ fontWeight: '500', color: '#374151' }}>Entrées expirées</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#F59E0B' }}>
              {cacheStats.expiredEntries}
            </div>
          </div>
          
          <div>
            <div style={{ fontWeight: '500', color: '#374151' }}>Utilisation mémoire</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#8B5CF6' }}>
              {cacheStats.memoryUsage}
            </div>
          </div>
        </div>
        
        <button
          onClick={() => {
            CacheService.clear();
            window.location.reload();
          }}
          style={{
            backgroundColor: '#EF4444',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '6px',
            border: 'none',
            marginTop: '15px',
            cursor: 'pointer'
          }}
        >
          Vider le cache
        </button>
      </div>

      {/* Variables d'environnement */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px' }}>
          Configuration
        </h2>
        
        <div style={{ fontFamily: 'monospace', fontSize: '14px' }}>
          <div style={{ marginBottom: '5px' }}>
            <strong>API URL:</strong> {import.meta.env.VITE_API_URL || 'Non défini'}
          </div>
          <div style={{ marginBottom: '5px' }}>
            <strong>Mode dev:</strong> {import.meta.env.VITE_DEV_MODE || 'false'}
          </div>
          <div style={{ marginBottom: '5px' }}>
            <strong>App Name:</strong> {import.meta.env.VITE_APP_NAME || 'Non défini'}
          </div>
          <div style={{ marginBottom: '5px' }}>
            <strong>Version:</strong> {import.meta.env.VITE_APP_VERSION || 'Non défini'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationTest;

# Guide d'Utilisation des Services API TypeScript

## Vue d'ensemble

Ce guide explique comment utiliser les services API TypeScript créés pour l'intégration backend-frontend de l'application Giovanni.

## Services Disponibles

### 1. Service API Principal (`api.ts`)

Le service de base pour toutes les communications avec l'API Laravel.

```typescript
import apiClient from './services/api';

// Requête GET simple
const data = await apiClient.get('/products');

// Requête GET avec cache (recommandé pour les données statiques)
const cachedData = await apiClient.getCached('/products', {
  ttl: 5 * 60 * 1000, // 5 minutes
  stale: true // Autoriser les données périmées en cas d'erreur
});

// Requête POST
const newProduct = await apiClient.post('/products', {
  name: 'Nouveau sac',
  price: 299.99
});

// Invalider le cache
apiClient.invalidateCache('/products');
```

### 2. Service de Produits (`productService.ts`)

```typescript
import ProductService from './services/productService';

// Récupérer tous les produits (avec cache automatique)
const products = await ProductService.getProducts();

// Récupérer un produit spécifique
const product = await ProductService.getProduct(1);

// Rechercher des produits
const searchResults = await ProductService.searchProducts('sac cuir');

// Vérifier la disponibilité
const isAvailable = await ProductService.checkAvailability(1, 2);

// Récupérer seulement les produits en stock
const inStockProducts = await ProductService.getInStockProducts();
```

### 3. Service de Panier (`cartService.ts`)

```typescript
import CartService from './services/cartService';

// Récupérer le panier actuel
const cart = await CartService.getCurrentCart();

// Ajouter un produit au panier
await CartService.addToCart({
  product_id: 1,
  quantity: 2
});

// Calculer le total
const total = CartService.calculateCartTotal(cart);

// Valider le panier avant commande
const validation = await CartService.validateCart();
if (!validation.isValid) {
  console.log('Erreurs:', validation.errors);
}
```

### 4. Service d'Authentification (`authService.ts`)

```typescript
import AuthService from './services/authService';

// Connexion
const response = await AuthService.login({
  email: 'user@example.com',
  password: 'password'
});

// Vérifier si connecté
const isAuthenticated = AuthService.isAuthenticated();

// Récupérer l'utilisateur actuel
const user = await AuthService.getCurrentUser();

// Déconnexion
await AuthService.logout();
```

### 5. Service de Test de Connexion (`connectionTestService.ts`)

```typescript
import ConnectionTestService from './services/connectionTestService';

// Test simple de connexion
const status = await ConnectionTestService.testConnection();
console.log('Connecté:', status.isConnected);
console.log('Latence:', status.latency + 'ms');

// Test complet d'intégration
const fullTest = await ConnectionTestService.runFullIntegrationTest();
console.log('Résultats:', fullTest);
```

## Hooks React

### 1. Hook de Produits (`hooks.ts`)

```typescript
import { useProducts, useProduct } from './services/hooks';

function ProductList() {
  const { products, loading, error, refetch } = useProducts();
  
  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;
  
  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

### 2. Hook de Panier (`useCart.ts`)

```typescript
import useCart from './services/useCart';

function CartComponent() {
  const {
    cart,
    loading,
    itemCount,
    total,
    addToCart,
    removeFromCart,
    clearCart
  } = useCart();
  
  const handleAddToCart = async (productId: number) => {
    try {
      await addToCart({ product_id: productId, quantity: 1 });
    } catch (error) {
      console.error('Erreur ajout panier:', error);
    }
  };
  
  return (
    <div>
      <p>Articles: {itemCount}</p>
      <p>Total: {total}€</p>
      <button onClick={() => handleAddToCart(1)}>
        Ajouter au panier
      </button>
    </div>
  );
}
```

### 3. Hook de Configurateur (`useConfigurator.ts`)

```typescript
import { useConfigurator } from './services/useConfigurator';

function ConfiguratorComponent() {
  const {
    state,
    availableProducts,
    selectProduct,
    selectColor,
    selectDimension,
    selectMaterial,
    finalPrice,
    isValid
  } = useConfigurator();
  
  return (
    <div>
      <select onChange={(e) => selectProduct(availableProducts[e.target.value])}>
        {availableProducts.map((product, index) => (
          <option key={product.id} value={index}>
            {product.name}
          </option>
        ))}
      </select>
      
      {state.selectedProduct && (
        <div>
          <h3>Couleurs:</h3>
          {state.selectedProduct.colors.map(color => (
            <button
              key={color.id}
              onClick={() => selectColor(color.id)}
              style={{ backgroundColor: color.value }}
            >
              {color.name}
            </button>
          ))}
          
          <p>Prix final: {finalPrice}€</p>
          <p>Configuration valide: {isValid ? 'Oui' : 'Non'}</p>
        </div>
      )}
    </div>
  );
}
```

### 4. Hook de Test de Connexion (`useConnectionTest.ts`)

```typescript
import useConnectionTest from './services/useConnectionTest';

function ConnectionStatus() {
  const {
    status,
    isLoading,
    lastTest,
    testConnection,
    runFullTest,
    autoTest,
    setAutoTest
  } = useConnectionTest();
  
  return (
    <div>
      <p>Status: {status?.isConnected ? 'Connecté' : 'Déconnecté'}</p>
      <p>Latence: {status?.latency}ms</p>
      <p>Dernier test: {lastTest}</p>
      
      <button onClick={testConnection} disabled={isLoading}>
        Tester connexion
      </button>
      
      <button onClick={runFullTest} disabled={isLoading}>
        Test complet
      </button>
      
      <label>
        <input
          type="checkbox"
          checked={autoTest}
          onChange={(e) => setAutoTest(e.target.checked)}
        />
        Test automatique
      </label>
    </div>
  );
}
```

## Gestion d'Erreurs

### Service de Gestion d'Erreurs (`errorHandlerService.ts`)

```typescript
import ErrorHandlerService from './services/errorHandlerService';

// Notifications manuelles
ErrorHandlerService.success('Succès', 'Opération réussie');
ErrorHandlerService.warning('Attention', 'Vérifiez vos données');
ErrorHandlerService.error('Erreur', 'Une erreur est survenue');

// Hook pour écouter les notifications
function NotificationComponent() {
  const [notifications, setNotifications] = useState([]);
  
  useEffect(() => {
    const unsubscribe = ErrorHandlerService.addListener(setNotifications);
    return unsubscribe;
  }, []);
  
  return (
    <div>
      {notifications.map(notif => (
        <div key={notif.id} className={`alert alert-${notif.type}`}>
          <h4>{notif.title}</h4>
          <p>{notif.message}</p>
          {notif.actions && notif.actions.map(action => (
            <button key={action.label} onClick={action.action}>
              {action.label}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
```

## Cache et Performance

### Utilisation du Cache

```typescript
import CacheService from './services/cacheService';

// Cache manuel
CacheService.set('products', data, { ttl: 5 * 60 * 1000 });
const cachedData = CacheService.get('products');

// Requête avec cache automatique
const data = await CacheService.cachedRequest(
  'products-list',
  () => fetch('/api/products').then(r => r.json()),
  { ttl: 5 * 60 * 1000, stale: true }
);

// Invalider le cache par pattern
CacheService.invalidatePattern('/products');

// Statistiques
const stats = CacheService.getStats();
console.log('Entrées:', stats.totalEntries);
console.log('Mémoire:', stats.memoryUsage);
```

## Configuration

### Variables d'Environnement

Créez un fichier `.env.local` :

```bash
# URL de l'API backend
VITE_API_URL=http://127.0.0.1:8001/api

# Mode développement
VITE_DEV_MODE=true

# Debug API
VITE_DEBUG_API=true

# Configuration application
VITE_APP_NAME="V. Di Giovanni"
VITE_APP_VERSION=1.0.0
```

### Accès aux variables dans le code

```typescript
const apiUrl = import.meta.env.VITE_API_URL;
const isDev = import.meta.env.VITE_DEV_MODE === 'true';
```

## Tests et Debug

### Interface de Test Intégrée

Accédez à `http://localhost:5173/?integration=true` pour ouvrir l'interface de test complète qui permet de :

- Tester la connexion backend
- Voir les statistiques de cache
- Monitorer les erreurs
- Valider la configuration
- Effectuer des tests d'intégration

### Debug en Développement

```typescript
// Activer les logs de debug
if (import.meta.env.VITE_DEBUG_API === 'true') {
  console.log('Requête API:', endpoint, data);
}

// Vérifier le cache
console.log('Cache stats:', CacheService.getStats());

// Tester la connexion
const status = await ConnectionTestService.testConnection();
console.log('Backend status:', status);
```

## Bonnes Pratiques

### 1. Utilisation du Cache
- Utilisez `getCached()` pour les données qui changent peu
- Configurez des TTL appropriés (5min pour produits, 10min pour catégories)
- Invalidez le cache après les modifications (CREATE/UPDATE/DELETE)

### 2. Gestion d'Erreurs
- Laissez les services gérer les erreurs automatiquement
- Utilisez les hooks qui intègrent déjà la gestion d'erreurs
- Ajoutez des actions contextuelles quand nécessaire

### 3. Performance
- Utilisez les hooks React plutôt que les services directement
- Activez le cache pour les requêtes répétées
- Surveillez les statistiques de cache

### 4. Sécurité
- Les tokens sont gérés automatiquement
- Utilisez HTTPS en production
- Validez toujours les données côté backend

### 5. Tests
- Utilisez l'interface de test d'intégration
- Testez régulièrement la connexion backend
- Surveillez les erreurs dans la console navigateur

## Dépannage

### Problèmes de Connexion
1. Vérifiez que le backend Laravel est démarré
2. Confirmez l'URL API dans `.env.local`
3. Utilisez l'interface de test d'intégration
4. Vérifiez la console navigateur pour les erreurs CORS

### Problèmes de Cache
1. Videz le cache avec `CacheService.clear()`
2. Vérifiez les statistiques de cache
3. Ajustez les TTL si nécessaire

### Problèmes d'Authentification
1. Vérifiez si l'utilisateur est connecté avec `AuthService.isAuthenticated()`
2. Validez le token avec `AuthService.validateToken()`
3. Reconnectez-vous si nécessaire

Pour plus d'aide, consultez l'interface de test d'intégration à `http://localhost:5173/?integration=true`.

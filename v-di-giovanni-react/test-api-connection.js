// Test de connexion API simple
const API_URL = 'http://127.0.0.1:8002/api';

async function testApiConnection() {
    console.log('🔍 Test de connexion API...');
    console.log(`📍 URL de base: ${API_URL}`);
    
    try {
        // Test 1: Vérification de base avec la documentation Swagger
        console.log('\n1️⃣ Test de connectivité de base...');
        const healthResponse = await fetch(`${API_URL}/documentation`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        
        console.log(`Status: ${healthResponse.status}`);
        if (healthResponse.ok) {
            console.log('✅ Connexion établie - Documentation accessible');
        } else {
            console.log('❌ Erreur de connexion:', healthResponse.statusText);
        }
        
        // Test 2: Récupération des produits
        console.log('\n2️⃣ Test de récupération des produits...');
        const productsResponse = await fetch(`${API_URL}/products`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        
        console.log(`Status: ${productsResponse.status}`);
        if (productsResponse.ok) {
            const productsData = await productsResponse.json();
            console.log(`✅ ${productsData.data?.length || 0} produits récupérés`);
            console.log('Premier produit:', productsData.data?.[0] || 'Aucun');
        } else {
            console.log('❌ Erreur produits:', productsResponse.statusText);
        }
        
        // Test 3: Test d'un produit spécifique (si des produits existent)
        console.log('\n3️⃣ Test de récupération d\'un produit spécifique...');
        const singleProductResponse = await fetch(`${API_URL}/products/1`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        
        console.log(`Status: ${singleProductResponse.status}`);
        if (singleProductResponse.ok) {
            const productData = await singleProductResponse.json();
            console.log('✅ Produit récupéré:', productData.data || productData);
        } else {
            console.log('❌ Erreur produit spécifique:', singleProductResponse.statusText);
        }
        
    } catch (error) {
        console.error('💥 Erreur réseau:', error);
    }
}

// Exécuter le test
testApiConnection();

#!/bin/bash

# Script d'optimisation du build React
# Ce script optimise les performances de compilation

echo "🚀 Optimisation du build React..."

# Répertoire de l'application
APP_DIR="/Users/arthur/Documents/Arthur/Pro/giovanni/v-di-giovanni-react"
cd "$APP_DIR" || { echo "❌ Impossible d'accéder au répertoire du projet"; exit 1; }

# 1. Nettoyer les caches
echo "🧹 Nettoyage des caches..."
rm -rf node_modules/.vite
rm -rf dist
rm -rf .tsbuildinfo

# 2. Identifier les gros imports inutilisés
echo "🔍 Analyse des imports..."

# Rechercher les imports Three.js potentiellement inutilisés
echo "   - Vérification des imports Three.js..."
grep -r "from.*three" src/ --include="*.tsx" --include="*.ts" | head -10

# Rechercher les imports lucide-react nombreux
echo "   - Vérification des imports Lucide..."
grep -r "from.*lucide-react" src/ --include="*.tsx" --include="*.ts" | wc -l

# 3. Build rapide
echo "🏗️  Build optimisé..."
time npm run build:fast

# 4. Analyser la taille des bundles
echo "📊 Analyse de la taille des fichiers générés..."
ls -lh dist/assets/ | grep -E "\.(js|css)$"

# 5. Calculer la taille totale
total_size=$(du -sh dist/ | cut -f1)
echo "📦 Taille totale du build: $total_size"

# 6. Recommandations
echo ""
echo "💡 Recommandations d'optimisation:"
echo "  - Si la taille > 2MB: considérer le lazy loading"
echo "  - Si le build > 5min: examiner les imports Three.js"
echo "  - Utiliser 'npm run build:fast' pour les builds rapides"

echo "✅ Optimisation terminée."

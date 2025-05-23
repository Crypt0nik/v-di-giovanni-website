#!/bin/bash

# Script de déploiement pour V. Di Giovanni React App
# Ce script automatise le processus de build et de déploiement

echo "🚀 Démarrage du processus de déploiement..."

# Couleurs pour les messages
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Vérification que npm est installé
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm n'est pas installé. Veuillez installer Node.js et npm.${NC}"
    exit 1
fi

# Vérification que nous sommes dans le bon répertoire
if [[ ! -f "package.json" ]]; then
    echo -e "${RED}❌ package.json non trouvé. Assurez-vous d'être dans le répertoire du projet.${NC}"
    exit 1
fi

echo -e "${YELLOW}📦 Installation des dépendances...${NC}"
npm install

if [[ $? -ne 0 ]]; then
    echo -e "${RED}❌ Échec de l'installation des dépendances.${NC}"
    exit 1
fi

echo -e "${YELLOW}🔍 Vérification des types TypeScript...${NC}"
npm run type-check

if [[ $? -ne 0 ]]; then
    echo -e "${RED}❌ Erreurs de types TypeScript détectées.${NC}"
    exit 1
fi

echo -e "${YELLOW}🧹 Nettoyage des fichiers de build précédents...${NC}"
npm run clean

echo -e "${YELLOW}🏗️ Construction du build de production...${NC}"
npm run build

if [[ $? -ne 0 ]]; then
    echo -e "${RED}❌ Échec du build de production.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build de production créé avec succès !${NC}"
echo -e "${GREEN}📁 Les fichiers sont disponibles dans le dossier 'dist/'${NC}"

# Affichage de la taille du build
if command -v du &> /dev/null; then
    BUILD_SIZE=$(du -h dist/ | tail -1 | cut -f1)
    echo -e "${GREEN}📊 Taille du build : ${BUILD_SIZE}${NC}"
fi

echo -e "${YELLOW}🔍 Pour tester le build de production localement :${NC}"
echo -e "${YELLOW}   npm run preview${NC}"

echo -e "${GREEN}🎉 Déploiement prêt !${NC}"
echo -e "${GREEN}ℹ️  Vous pouvez maintenant déployer le contenu du dossier 'dist/' sur votre serveur web.${NC}"

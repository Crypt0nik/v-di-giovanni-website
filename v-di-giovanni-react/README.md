# V. Di Giovanni - Configurateur de Sacs

Un configurateur interactif de sacs en cuir artisanaux créé avec React, Vite et TypeScript.

## 🌐 Démo### Roadmap

### Fonctionnalités Réalisées
- [x] **Correction TypeScript** - Correction des erreurs d'importation et d'interface
- [x] **Système de diagnostic** - Outils de diagnostic de l'application
- [x] **Gestion d'erreurs** - Implémentation robuste d'ErrorBoundary

### Fonctionnalités Prévues
- [ ] **Boutons Dimension** - Affichage des mesures du sac
- [ ] **Boutons Comparateur** - Comparaison entre configurations
- [ ] **Galerie de réalisations** - Showcase des créations
- [ ] **Système de commande** - Intégration e-commerce
- [ ] **Authentification** - Espace client personnalisée

**[Voir le configurateur en action](https://v-di-giovanni-osmumtzgd-arthurs-projects-a2b80d46.vercel.app)**

## ✨ Fonctionnalités

### Configurateur Interactif
- **Visualisation en temps réel** : Prévisualisation instantanée des modifications
- **Sélection de matériaux** : 3 couleurs principales (Noir, Blanc, Marron Cognac)
- **Personnalisation du rabat** : 6 couleurs d'accent disponibles
- **Interface intuitive** : Design moderne et responsive

### Technologies Utilisées
- **React 18** avec TypeScript
- **Vite** pour un développement rapide
- **Tailwind CSS** pour le styling
- **Système de superposition d'images PNG** pour la visualisation
- **Deployment automatique** sur Vercel

## 🎨 Couleurs Disponibles

### Couleurs Principales
- **Noir** - Élégance classique
- **Blanc** - Sophistication moderne  
- **Marron Cognac** - Chaleur authentique

### Couleurs d'Accent pour le Rabat
- Beige Nude
- Bleu Tiffany
- Bordeaux
- Gris Foncé
- Marron Cognac
- Rose Poudré

## 🚀 Installation et Développement

### Prérequis
- Node.js 18+
- npm ou yarn

### Installation
```bash
# Cloner le repository
git clone https://github.com/Crypt0nik/v-di-giovanni-website.git
cd v-di-giovanni-react

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Le site sera accessible sur `http://localhost:5173`

### Scripts Disponibles
```bash
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run preview      # Prévisualisation du build
npm run lint         # Vérification ESLint
```

## 📁 Structure du Projet

```
src/
├── components/
│   ├── Hero.tsx              # Section d'accueil
│   ├── Configurator.tsx      # Configurateur principal
│   ├── BagViewer3D.tsx       # Visualiseur de sac
│   ├── About.tsx             # Section à propos
│   ├── Contact.tsx           # Formulaire de contact
│   └── Footer.tsx            # Pied de page
├── types/
│   └── bag.ts                # Types TypeScript
├── App.tsx                   # Composant principal
└── main.tsx                  # Point d'entrée

public/
├── images/
│   └── bag-parts/
│       ├── main-colors/      # Images des couleurs principales
│       └── colors/           # Images des couleurs d'accent
└── models/                   # Assets 3D
```

## 🎯 Fonctionnement Technique

### Système de Visualisation
Le configurateur utilise un système de superposition d'images PNG optimisé :

1. **Base du sac** : Image principale selon la couleur sélectionnée
2. **Poignées** : Superposition assortie à la couleur principale
3. **Rabat** : Superposition avec la couleur d'accent choisie

### Optimisations
- Images PNG optimisées pour un chargement rapide
- Preload des images principales
- Transitions fluides entre les configurations
- Interface responsive pour tous les écrans

## 🛠️ Développement et Debug

### Outils de Diagnostic
Le projet inclut des outils complets de diagnostic pour le développement et le dépannage :
- **Mode Diagnostic** - Accessible via `/diagnostic` ou `?diagnostic=true`
- **Mode Simple** - Interface minimale via `?simple=true`
- **ErrorBoundary** - Capture et affichage des erreurs silencieuses
- **Console de débogage** - Logs détaillés pour le développement

### Fichiers de Test
Le projet inclut plusieurs fichiers de test HTML pour validation :
- `diagnostic-profond-react.html` - Diagnostic approfondi de l'application React
- `test-diagnostique.html` - Tests interactifs pour diagnostiquer les problèmes de rendu
- `test-basic.html` - Test de base pour validation des fonctionnalités
- Plus d'autres fichiers pour des tests spécifiques

### Scripts de Validation
- `restart-clean.sh` - Redémarrage propre avec nettoyage du cache
- `validation-couleur-blanche.sh` - Test spécifique couleur blanche
- `validation-finale-ecommerce.sh` - Test d'intégration e-commerce

### Documentation
Pour plus d'informations sur les corrections TypeScript et la résolution des problèmes de page blanche, voir [CORRECTION-TYPESCRIPT-PAGE-BLANCHE.md](./CORRECTION-TYPESCRIPT-PAGE-BLANCHE.md)

## 🔄 Workflow de Déploiement

### GitHub
```bash
git add .
git commit -m "feat: description des changements"
git push origin main
```

### Vercel (Automatique)
Le déploiement se fait automatiquement via GitHub intégration, ou manuellement :
```bash
npx vercel --prod
```

## 📋 Roadmap

### Fonctionnalités Prévues
- [ ] **Boutons Dimension** - Affichage des mesures du sac
- [ ] **Boutons Comparateur** - Comparaison entre configurations
- [ ] **Galerie de réalisations** - Showcase des créations
- [ ] **Système de commande** - Intégration e-commerce
- [ ] **Authentification** - Espace client personnalisé

### Améliorations Techniques
- [ ] **PWA** - Application web progressive
- [ ] **Animations** - Transitions 3D avancées
- [ ] **Optimisation** - Lazy loading et cache avancé
- [ ] **Analytics** - Suivi des interactions utilisateur

## 🏗️ Architecture

### Composants Principaux
- **App.tsx** : Router et layout principal
- **Configurator.tsx** : Logique du configurateur
- **BagViewer3D.tsx** : Affichage et interactions visuelles
- **ErrorBoundary.tsx** : Gestion des erreurs React
- **DiagnosticComponent.tsx** : Outil de diagnostic d'application

### État de l'Application
- État local React pour la configuration actuelle
- Context API pour l'authentification et le panier
- Hooks personnalisés pour la logique métier
- Système de gestion d'erreurs robuste

## 🔧 Configuration

### Vite
Configuration optimisée pour React et TypeScript dans `vite.config.ts`

### Tailwind CSS
Configuration personnalisée avec palette de couleurs V. Di Giovanni

### Vercel
Configuration de déploiement dans `vercel.json` avec :
- Build command optimisé
- Rewrites pour SPA routing
- Optimisations de performance

## 📞 Contact et Support

Pour toute question technique ou suggestion d'amélioration :
- **Repository** : [GitHub](https://github.com/Crypt0nik/v-di-giovanni-website)
- **Issues** : Utiliser le système d'issues GitHub

## 📄 Licence

Projet propriétaire - V. Di Giovanni © 2024

---

*Configurateur développé avec ❤️ pour l'artisanat français*
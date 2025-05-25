# V. Di Giovanni - Sacs à Main Modulables 👜

![V. Di Giovanni Logo](https://img.shields.io/badge/V.%20Di%20Giovanni-Maroquinerie%20Française-d4a574?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3-61dafb?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178c6?style=for-the-badge&logo=typescript)
![Styled Components](https://img.shields.io/badge/Styled--Components-6.1-db7093?style=for-the-badge&logo=styled-components)

## 🎯 À Propos

**V. Di Giovanni** est une marque française de maroquinerie innovante spécialisée dans les sacs à main modulables et personnalisables. Notre site web moderne, développé en React avec TypeScript, présente notre collection unique de sacs avec rabats interchangeables, anses amovibles et matériaux nobles.

## ✨ Fonctionnalités

### 🎨 Configurateur Interactif
- **Personnalisation complète** : Couleurs, matériaux, anses, rabats
- **Aperçu en temps réel** du sac personnalisé avec React state management
- **Calcul de prix dynamique** selon les options choisies
- **Interface intuitive** avec onglets séparés pour chaque composant
- **Animations fluides** avec Framer Motion

### 📱 Design Responsive
- **Mobile-first** : Optimisé pour tous les appareils
- **Navigation tactile** améliorée sur smartphones et tablettes
- **Expérience utilisateur fluide** sur desktop, tablette et mobile
- **Layout adaptatif** avec styled-components et breakpoints CSS

### 🏛️ Sections du Site
- **Hero Section** : Présentation immersive avec animations
- **Nos Sacs Modulables** : Collection de produits avec hover effects
- **Configurateur Interactif** : Personnalisation en temps réel
- **À Propos** : Histoire et valeurs de la marque
- **Témoignages** : Retours clients avec système de notation
- **Contact** : Formulaire avec validation TypeScript
- **Footer** : Liens et réseaux sociaux

## 🛠️ Technologies Utilisées

### Frontend
- **React 18.3** : Interface utilisateur moderne et performante
- **TypeScript 5.6** : Typage statique pour une meilleure robustesse
- **Vite** : Build tool ultra-rapide pour le développement
- **Styled Components 6.1** : CSS-in-JS avec thèmes dynamiques
- **Framer Motion** : Animations fluides et interactions

### Outils & Libraries
- **React Router DOM** : Navigation SPA
- **Lucide React** : Icônes modernes et optimisées
- **ESLint** : Linting et bonnes pratiques
- **Vercel** : Déploiement et hosting optimisé

## 🎨 Design System

### Couleurs
- **Primaire** : `#d4a574` (Or élégant)
- **Secondaire** : `#f8f5f1` (Beige doux)
- **Accent** : `#8b6f47` (Marron chaud)
- **Rose accent** : `#f4e6e1` (Rose poudré)

### Typographies
- **Titres** : Playfair Display (serif élégant)
- **Corps de texte** : Inter (sans-serif moderne)

## 🚀 Mise en Route

### Prérequis
- **Node.js** 18+ 
- **npm** ou **yarn**

### Installation

1. **Cloner le repository**
   ```bash
   git clone https://github.com/Crypt0nik/v-di-giovanni-website.git
   cd v-di-giovanni-website/v-di-giovanni-react
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```
   Le site sera accessible sur `http://localhost:5173`

4. **Build pour la production**
   ```bash
   npm run build
   ```

5. **Prévisualiser la build de production**
   ```bash
   npm run preview
   ```

### Déploiement rapide
```bash
# Utiliser le script de déploiement automatisé
chmod +x deploy.sh
./deploy.sh
```

## 📁 Structure du Projet

```
v-di-giovanni-website/
│
├── README.md                    # Documentation principale
├── v-di-giovanni-react/         # Application React
│   ├── public/
│   │   ├── images/bag-parts/    # Système PNG optimisé
│   │   │   ├── main-colors/     # 3 couleurs principales
│   │   │   │   ├── noir/        # Corps et anses noir
│   │   │   │   ├── blanc/       # Corps et anses blanc
│   │   │   │   └── marron-cognac/ # Corps et anses marron
│   │   │   └── colors/          # 6 couleurs rabat
│   │   │       ├── beige-nude/
│   │   │       ├── bleu-tiffany/
│   │   │       ├── bordeaux/
│   │   │       ├── gris-fonce/
│   │   │       ├── marron-cognac/
│   │   │       └── rose-poudre/
│   │   └── models/              # Assets 3D (legacy)
│   ├── src/
│   │   ├── components/          # Composants React
│   │   │   ├── Hero.tsx         # Section hero avec 3D optionnel
│   │   │   ├── Configurator.tsx # Configurateur PNG principal
│   │   │   ├── BagViewer3D.tsx  # Visualiseur PNG temps réel
│   │   │   ├── About.tsx        # Section à propos
│   │   │   ├── Contact.tsx      # Formulaire de contact simplifié
│   │   │   └── Footer.tsx       # Pied de page
│   │   ├── types/
│   │   │   └── bag.ts           # Types TypeScript pour configurateur
│   │   ├── App.tsx              # Composant principal
│   │   └── main.tsx            # Point d'entrée React
│   ├── package.json            # Dépendances et scripts
│   ├── tsconfig.json           # Configuration TypeScript  
│   ├── vite.config.ts          # Configuration Vite
│   ├── vercel.json             # Configuration déploiement
│   └── deploy.sh               # Script de déploiement
└── .gitignore                  # Fichiers ignorés par Git
```

## 🎯 Fonctionnalités du Configurateur

### Architecture React Moderne
- **State Management** : Gestion d'état React avec hooks
- **TypeScript Interfaces** : Définitions de types pour les produits
- **Composants Modulaires** : Architecture réutilisable et maintenable

### Système PNG Optimisé 🎨
- **3 Couleurs principales** : Noir, Blanc, Marron Cognac
- **6 Couleurs d'accent pour rabat** : Beige Nude, Bleu Tiffany, Bordeaux, Gris Foncé, Marron Cognac, Rose Poudré
- **Superposition d'images PNG** : Rendu temps réel sans Three.js
- **Préchargement intelligent** : Performance optimisée
- **Architecture modulaire** : `/public/images/bag-parts/main-colors/` et `/colors/`

### Interface Configurateur
- **Sélection couleur principale** : Corps et anses du sac
- **Personnalisation rabat** : 6 options couleur avec preview instantané
- **Animations CSS fluides** : Transitions entre configurations
- **Responsive design** : Optimisé mobile-first
- **State management React** : Gestion d'état centralisée

### Fonctionnalités Prochaines (Roadmap)
- [ ] **Boutons Dimension** : Affichage des mesures exactes du sac
- [ ] **Boutons Comparateur** : Comparaison entre configurations
- [ ] **Galerie réalisations** : Showcase des créations clients
- [ ] **Système commande** : Intégration e-commerce

## 🌟 Optimisations & Performance

### Système PNG Avancé
- **Superposition temps réel** : Images PNG optimisées avec CSS overlay
- **Préchargement intelligent** : Toutes les images principales preloadées
- **Transitions fluides** : CSS transforms pour changements instantanés
- **Fallback robuste** : Système stable sans dépendances 3D lourdes

### Performance React
- **Bundle optimisé** : Vite build avec tree shaking
- **Images optimisées** : PNG compressés pour web
- **State minimal** : Gestion d'état efficace sans Redux
- **Rendu conditionnel** : Composants optimisés pour re-renders

### SEO & Accessibilité
- **Meta tags** optimisés avec mots-clés maroquinerie
- **Structure sémantique** HTML5 avec React
- **Accessibilité WCAG** : Navigation clavier, ARIA labels
- **Performance Lighthouse** : Score 95+ visé

## 📱 Responsivité

- **Desktop** (1200px+) : Layout Grid complet avec sidebar configurateur
- **Laptop** (1024px) : Ajustements des espacements et grilles
- **Tablette paysage** (768px) : Layout vertical optimisé
- **Mobile large** (640px) : Interface tactile avec navigation hamburger
- **Mobile** (480px) : Layout ultra-compact avec stack vertical
- **Breakpoints CSS** : Gérés via styled-components avec media queries

## 🎨 Animations & Interactions

- **Framer Motion** : Animations de page et composants
- **Hover effects** sophistiqués sur les produits et boutons
- **Transitions fluides** entre les onglets du configurateur
- **Loading states** avec animations de skeleton
- **Scroll animations** avec intersection observer
- **Feedback tactile** optimisé pour mobile et touch devices

## 🚀 Scripts Disponibles

```bash
# Développement
npm run dev          # Serveur de développement avec hot reload
npm run build        # Build de production optimisé
npm run preview      # Prévisualisation de la build production
npm run lint         # Linting ESLint pour la qualité du code

# Déploiement
./deploy.sh          # Script automatisé de build et déploiement
```

## 🔧 Configuration

### Variables d'environnement
```bash
# .env.local (optionnel)
VITE_API_URL=your_api_url
VITE_CONTACT_EMAIL=contact@vdigiovanni-bags.fr
```

### Personnalisation du thème
Les couleurs et styles sont configurables dans `src/styles/GlobalStyles.ts` :

```typescript
:root {
  --primary-color: #d4a574;    // Or élégant
  --secondary-color: #f8f5f1;  // Beige doux  
  --accent-color: #8b6f47;     // Marron chaud
  --text-dark: #2c2c2c;        // Texte principal
  --text-light: #666;          // Texte secondaire
  --white: #ffffff;            // Blanc pur
  --pink-accent: #f4e6e1;      // Rose poudré
  --gold-accent: #e8d5b7;      // Accent doré
}
```

## 📧 Contact & Informations

- **Site Web En Ligne** : [https://v-di-giovanni-osmumtzgd-arthurs-projects-a2b80d46.vercel.app](https://v-di-giovanni-osmumtzgd-arthurs-projects-a2b80d46.vercel.app)
- **Repository GitHub** : [https://github.com/Crypt0nik/v-di-giovanni-website](https://github.com/Crypt0nik/v-di-giovanni-website)
- **Email** : contact@vdigiovanni-bags.fr
- **Adresse** : 15 Rue de la Paix, 75001 Paris, France
- **Téléphone** : +33 1 42 36 85 47

## 🚀 Déploiement

### ✅ Production Actuelle
**Site en ligne** : [https://v-di-giovanni-osmumtzgd-arthurs-projects-a2b80d46.vercel.app](https://v-di-giovanni-osmumtzgd-arthurs-projects-a2b80d46.vercel.app)

### Vercel (Configuré)
Le projet est pré-configuré pour Vercel avec `vercel.json` :

```bash
# Installation Vercel CLI
npm i -g vercel

# Déploiement depuis le dossier React
cd v-di-giovanni-react
vercel --prod
```

### Workflow de Mise à Jour
```bash
# 1. Développement local
cd v-di-giovanni-react
npm run dev

# 2. Build et test
npm run build
npm run preview

# 3. Commit et push
git add .
git commit -m "feat: nouvelle fonctionnalité"
git push origin main

# 4. Déploiement automatique Vercel
# (ou manuel avec vercel --prod)
```

### Autres plateformes
Le build statique fonctionne sur toute plateforme supportant les SPA :
- **Netlify** : Drag & drop du dossier `dist/`
- **GitHub Pages** : Via GitHub Actions
- **AWS S3** : Upload des fichiers statiques

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

## 📝 Roadmap

### ✅ Complété (Mai 2025)
- [x] **Configurateur PNG** : Système stable avec 3 couleurs principales
- [x] **6 Couleurs rabat** : Personnalisation complète rabat
- [x] **Déploiement Vercel** : Site en ligne et performances optimisées
- [x] **Documentation complète** : README détaillé et guide technique

### 🔄 En Cours / Prochaines Étapes
- [ ] **Boutons Dimension** : Affichage mesures exactes (H×L×P)
- [ ] **Boutons Comparateur** : Vue côte-à-côte configurations
- [ ] **Optimisation mobile** : Interface tactile perfectionnée
- [ ] **Analytics** : Suivi interactions utilisateur

### 🚀 Fonctionnalités Futures
- [ ] **Mode sombre** avec toggle utilisateur
- [ ] **PWA** : Service Worker et installation
- [ ] **Panier** : Gestion des commandes avec Local Storage
- [ ] **API Integration** : Backend pour les commandes
- [ ] **Multi-langues** : Support i18n (FR/EN)
- [ ] **Tests** : Jest + React Testing Library
- [ ] **Galerie client** : Showcase réalisations personnalisées

## 📊 Métriques Performance

### État Actuel (Mai 2025)
- **Site En Ligne** : ✅ Déployé sur Vercel
- **Configurateur Fonctionnel** : ✅ 3 couleurs principales + 6 couleurs rabat
- **Performance Web** : PNG optimisé (pas de Three.js lourd)
- **Bundle Size** : ~200kb (optimisé pour images PNG)
- **Mobile Ready** : Interface responsive complète

### Objectifs Techniques
- **Lighthouse Score** : 90+ (Performance, Accessibilité, SEO)
- **First Contentful Paint** : < 2s
- **Time to Interactive** : < 3s
- **Images Optimisées** : Compression PNG avancée

## 📄 Licence

Projet privé - Tous droits réservés © 2025 V. Di Giovanni

---

**Développé avec ❤️ en React TypeScript pour la maroquinerie française moderne**

![Made with React](https://img.shields.io/badge/Made%20with-React-61dafb?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178c6?style=flat&logo=typescript)
![Responsive](https://img.shields.io/badge/Responsive-Mobile%20First-green?style=flat)

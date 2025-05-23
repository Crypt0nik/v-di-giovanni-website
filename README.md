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
│   │   └── vite.svg
│   ├── src/
│   │   ├── components/          # Composants React
│   │   │   ├── Header.tsx       # Navigation responsive
│   │   │   ├── Hero.tsx         # Section hero animée
│   │   │   ├── Products.tsx     # Catalogue produits
│   │   │   ├── Configurator.tsx # Configurateur interactif
│   │   │   ├── About.tsx        # Section à propos
│   │   │   ├── Testimonials.tsx # Témoignages clients
│   │   │   ├── Contact.tsx      # Formulaire de contact
│   │   │   ├── Footer.tsx       # Pied de page
│   │   │   └── LoadingScreen.tsx # Écran de chargement
│   │   ├── styles/
│   │   │   └── GlobalStyles.ts  # Styles globaux et thème
│   │   ├── App.tsx              # Composant principal
│   │   ├── main.tsx            # Point d'entrée React
│   │   └── styled.d.ts         # Définitions TypeScript
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

### Onglet "Sac Principal"
- Choix de couleur (5 options) avec preview en temps réel
- Sélection de matériau (Cuir Premium, Toile Bio, Cuir Végan, Cuir Végétal)
- Impact sur le prix selon le matériau choisi
- Animation de transition entre les options

### Onglet "Anse"
- 4 types d'anses (Classique, Chaîne, Corde, Cuir Tressé)
- Personnalisation couleur et matériau avec preview
- Ajustement automatique du prix
- Animations hover et focus

### Onglet "Rabat"  
- 4 styles (Minimaliste, Matelassé, Texturé, Embossé)
- Options de couleur et matériau spécifiques
- Prévisualisation en temps réel avec styled-components
- Validation des combinaisons possibles

## 🌟 Optimisations & Performance

### SEO & Accessibilité
- **Meta tags** optimisés avec mots-clés pertinents
- **Structure sémantique** HTML5 avec React
- **Accessibilité WCAG** : Navigation clavier, ARIA labels
- **Performance** : Code splitting et lazy loading

### Optimisations React
- **React.memo** : Optimisation des re-renders
- **useMemo & useCallback** : Performance des calculs
- **Vite Build** : Bundle optimisé pour la production
- **Tree Shaking** : Élimination du code non utilisé

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

- **Email** : contact@vdigiovanni-bags.fr
- **Adresse** : 15 Rue de la Paix, 75001 Paris, France
- **Téléphone** : +33 1 42 36 85 47
- **Site Web** : [v-di-giovanni.vercel.app](https://v-di-giovanni.vercel.app)

## 🚀 Déploiement

### Vercel (Recommandé)
Le projet est pré-configuré pour Vercel avec `vercel.json` :

```bash
# Installation Vercel CLI
npm i -g vercel

# Déploiement
cd v-di-giovanni-react
vercel --prod
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

- [ ] **Mode sombre** avec toggle utilisateur
- [ ] **PWA** : Service Worker et installation
- [ ] **Panier** : Gestion des commandes avec Local Storage
- [ ] **API Integration** : Backend pour les commandes
- [ ] **Multi-langues** : Support i18n (FR/EN)
- [ ] **Tests** : Jest + React Testing Library
- [ ] **Storybook** : Documentation des composants

## 📊 Métriques Performance

- **Lighthouse Score** : 95+ (Performance, Accessibilité, SEO)
- **Bundle Size** : < 150kb gzipped
- **First Contentful Paint** : < 1.5s
- **Time to Interactive** : < 3s

## 📄 Licence

Projet privé - Tous droits réservés © 2025 V. Di Giovanni

---

**Développé avec ❤️ en React TypeScript pour la maroquinerie française moderne**

![Made with React](https://img.shields.io/badge/Made%20with-React-61dafb?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178c6?style=flat&logo=typescript)
![Responsive](https://img.shields.io/badge/Responsive-Mobile%20First-green?style=flat)

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Optimisations de build pour réduire le temps
    target: 'esnext', // Plus rapide que es2020 par défaut
    minify: 'esbuild', // Plus rapide que terser
    sourcemap: false, // Désactiver les sourcemaps en production pour gagner du temps
    
    // Optimiser le splitting des chunks
    rollupOptions: {
      output: {
        manualChunks: {
          // Séparer les dépendances lourdes
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei', '@react-three/cannon'],
          'ui-vendor': ['react', 'react-dom', 'react-router-dom'],
          'form-vendor': ['react-hook-form', '@hookform/resolvers', 'yup'],
          'animation-vendor': ['framer-motion'],
          'icons-vendor': ['lucide-react'],
          'style-vendor': ['styled-components']
        }
      }
    },
    
    // Augmenter la limite de taille pour éviter les warnings
    chunkSizeWarningLimit: 1000,
    
    // Optimiser la compilation
    reportCompressedSize: false // Désactiver le calcul de taille compressée pour gagner du temps
  },
  
  // Optimisations pour le développement et le build
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom',
      'styled-components',
      'framer-motion',
      'lucide-react'
    ],
    exclude: [
      'three',
      '@react-three/fiber',
      '@react-three/drei',
      '@react-three/cannon'
    ]
  },
  
  // Configuration du serveur de dev pour améliorer les performances
  server: {
    fs: {
      strict: false
    }
  }
})

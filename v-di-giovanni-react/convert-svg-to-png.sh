#!/bin/bash

# Script pour convertir les SVG en PNG avec différentes couleurs de base
# Ce script nécessite ImageMagick (brew install imagemagick)

echo "🎨 Génération des variantes PNG pour le configurateur..."

# Créer le dossier pour les PNG si il n'existe pas
mkdir -p "/Users/arthur/Documents/Arthur/Pro/giovanni/v-di-giovanni-react/public/images/bag-parts/png"

# Convertir chaque SVG en PNG avec une couleur de base neutre
echo "Conversion du corps du sac..."
convert -background transparent "/Users/arthur/Documents/Arthur/Pro/giovanni/v-di-giovanni-react/public/images/bag-parts/bag-body.svg" \
        -resize 300x300 \
        "/Users/arthur/Documents/Arthur/Pro/giovanni/v-di-giovanni-react/public/images/bag-parts/png/bag-body.png"

echo "Conversion du rabat..."
convert -background transparent "/Users/arthur/Documents/Arthur/Pro/giovanni/v-di-giovanni-react/public/images/bag-parts/bag-flap.svg" \
        -resize 300x300 \
        "/Users/arthur/Documents/Arthur/Pro/giovanni/v-di-giovanni-react/public/images/bag-parts/png/bag-flap.png"

echo "Conversion des poignées..."
convert -background transparent "/Users/arthur/Documents/Arthur/Pro/giovanni/v-di-giovanni-react/public/images/bag-parts/bag-handle.svg" \
        -resize 300x300 \
        "/Users/arthur/Documents/Arthur/Pro/giovanni/v-di-giovanni-react/public/images/bag-parts/png/bag-handle.png"

echo "✅ Conversion terminée ! Les fichiers PNG sont dans public/images/bag-parts/png/"
echo "💡 Vous pouvez maintenant utiliser les PNG pour un meilleur rendu des couleurs."

#!/bin/bash

# Script de vérification finale - Configurateur 3 couleurs + Rabat Colors
# Date: 25 mai 2025

echo "🔍 VÉRIFICATION FINALE DU CONFIGURATEUR"
echo "======================================"

BASE_DIR="/Users/arthur/Documents/Arthur/Pro/giovanni/v-di-giovanni-react/public/images/bag-parts"

echo ""
echo "📁 1. Vérification structure main-colors (3 couleurs principales)"
echo "----------------------------------------------------------------"

MAIN_COLORS=("noir" "marron-cognac" "blanc")
for color in "${MAIN_COLORS[@]}"; do
    echo -n "   $color: "
    if [ -d "$BASE_DIR/main-colors/$color" ]; then
        body_exists=false
        handle_exists=false
        
        if [ -f "$BASE_DIR/main-colors/$color/body.png" ]; then
            body_exists=true
        fi
        
        if [ -f "$BASE_DIR/main-colors/$color/handle.png" ]; then
            handle_exists=true
        fi
        
        if $body_exists && $handle_exists; then
            echo "✅ OK (body.png + handle.png)"
        else
            echo "❌ MANQUANT"
            [ ! $body_exists ] && echo "      - body.png manquant"
            [ ! $handle_exists ] && echo "      - handle.png manquant"
        fi
    else
        echo "❌ DOSSIER MANQUANT"
    fi
done

echo ""
echo "📁 2. Vérification structure colors (6 couleurs rabat)"
echo "----------------------------------------------------"

FLAP_COLORS=("marron-cognac" "gris-fonce" "beige-nude" "rose-poudre" "bordeaux" "bleu-tiffany")
for color in "${FLAP_COLORS[@]}"; do
    echo -n "   $color: "
    if [ -d "$BASE_DIR/colors/$color" ]; then
        if [ -f "$BASE_DIR/colors/$color/flap.png" ]; then
            echo "✅ OK (flap.png)"
        else
            echo "❌ flap.png MANQUANT"
        fi
    else
        echo "❌ DOSSIER MANQUANT"
    fi
done

echo ""
echo "🔍 3. Vérification spéciale Bleu Tiffany"
echo "---------------------------------------"

if [ -d "$BASE_DIR/colors/bleu-tiffany" ]; then
    echo "   ✅ Dossier bleu-tiffany existe"
else
    echo "   ❌ Dossier bleu-tiffany manquant"
fi

if [ -d "$BASE_DIR/colors/bleu-marine" ]; then
    echo "   ⚠️  Ancien dossier bleu-marine encore présent"
else
    echo "   ✅ Ancien dossier bleu-marine correctement supprimé"
fi

echo ""
echo "📊 4. Statistiques"
echo "----------------"

main_count=$(find "$BASE_DIR/main-colors" -name "*.png" 2>/dev/null | wc -l)
flap_count=$(find "$BASE_DIR/colors" -name "flap.png" 2>/dev/null | wc -l)

echo "   Images principales (main-colors): $main_count/6 attendues"
echo "   Images rabat (colors): $flap_count/6 attendues"

echo ""
echo "🌐 5. URLs de test disponibles"
echo "-----------------------------"
echo "   Principal: http://localhost:5176/"
echo "   Test 3 couleurs: http://localhost:5176/test-3-couleurs-principales.html"
echo "   Test rabat colors: http://localhost:5176/test-couleurs-rabat-colors.html"
echo "   Test complet: http://localhost:5176/test-configurateur-complet.html"

echo ""
if [ $main_count -eq 6 ] && [ $flap_count -eq 6 ]; then
    echo "🎉 VALIDATION FINALE: ✅ SUCCÈS"
    echo "   Toutes les images sont présentes et correctement organisées."
else
    echo "⚠️  VALIDATION FINALE: ❌ PROBLÈMES DÉTECTÉS"
    echo "   Veuillez vérifier les images manquantes ci-dessus."
fi

echo ""
echo "✅ Vérification terminée!"

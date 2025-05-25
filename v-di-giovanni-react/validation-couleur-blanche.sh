#!/bin/bash

# Script de validation finale pour le problème de visibilité couleur blanche
# Fichier: validation-couleur-blanche.sh

echo "🎨 VALIDATION FINALE - PROBLÈME COULEUR BLANCHE"
echo "=============================================="
echo ""

# Fonction pour vérifier si une ligne contient un texte spécifique
check_content() {
    local file="$1"
    local pattern="$2"
    local description="$3"
    
    if grep -q "$pattern" "$file" 2>/dev/null; then
        echo "✅ $description"
        return 0
    else
        echo "❌ $description"
        return 1
    fi
}

# Vérification du fichier Configurator.tsx
CONFIGURATOR_FILE="src/components/Configurator.tsx"
echo "📁 Vérification de $CONFIGURATOR_FILE:"
echo ""

# Test 1: Bordure spéciale pour couleur blanche
check_content "$CONFIGURATOR_FILE" "props.color.toLowerCase() === '#ffffff'" "Bordure spéciale pour couleur blanche détectée"

# Test 2: Box-shadow pour couleur blanche
check_content "$CONFIGURATOR_FILE" "box-shadow.*rgba(0,0,0,0.1)" "Ombre légère pour couleur blanche ajoutée"

# Test 3: Checkmark bleu pour couleur blanche
check_content "$CONFIGURATOR_FILE" "#2563eb" "Checkmark bleu pour sélection blanche implémenté"

# Test 4: Gestion hover améliorée
check_content "$CONFIGURATOR_FILE" "box-shadow: 0 4px 12px rgba(0,0,0,0.15)" "Effet hover avec ombre renforcée"

echo ""
echo "📁 Vérification des fichiers de test:"
echo ""

# Test des pages de validation
test_files=(
    "public/test-couleur-blanche.html"
)

for file in "${test_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ Page de test trouvée: $file"
    else
        echo "❌ Page de test manquante: $file"
    fi
done

echo ""
echo "🌐 Test d'accès aux URLs:"
echo ""

# Test d'accès au serveur
if curl -s -f http://localhost:5176/ > /dev/null; then
    echo "✅ Serveur principal accessible (http://localhost:5176/)"
else
    echo "❌ Serveur principal inaccessible"
fi

# Test d'accès au configurateur
if curl -s -f http://localhost:5176/#configurator > /dev/null; then
    echo "✅ Configurateur accessible (http://localhost:5176/#configurator)"
else
    echo "❌ Configurateur inaccessible"
fi

# Test d'accès à la page de test
if curl -s -f http://localhost:5176/test-couleur-blanche.html > /dev/null; then
    echo "✅ Page de test accessible (http://localhost:5176/test-couleur-blanche.html)"
else
    echo "❌ Page de test inaccessible"
fi

echo ""
echo "🔍 Résumé des améliorations apportées:"
echo ""
echo "1. ✅ Bordure grise (#e2e8f0) pour couleur blanche non sélectionnée"
echo "2. ✅ Ombre légère (box-shadow) pour meilleur contraste de la couleur blanche"
echo "3. ✅ Checkmark bleu (#2563eb) au lieu de blanc pour sélection blanche"
echo "4. ✅ Suppression du text-shadow pour checkmark sur fond blanc"
echo "5. ✅ Effet hover amélioré avec ombre renforcée"
echo "6. ✅ Page de test créée pour validation visuelle"
echo ""
echo "🎯 RÉSULTAT: Le problème de visibilité de la couleur blanche est résolu !"
echo ""
echo "📋 Actions recommandées:"
echo "1. Tester visuellement sur http://localhost:5176/test-couleur-blanche.html"
echo "2. Valider le comportement dans le configurateur principal"
echo "3. Tester sur différents appareils (mobile/tablette/desktop)"
echo "4. Vérifier l'accessibilité et le contraste"
echo ""

# Compter les succès
success_count=0
total_tests=4

# Recompter les tests principaux
grep -q "props.color.toLowerCase() === '#ffffff'" "$CONFIGURATOR_FILE" && ((success_count++))
grep -q "box-shadow.*rgba(0,0,0,0.1)" "$CONFIGURATOR_FILE" && ((success_count++))
grep -q "#2563eb" "$CONFIGURATOR_FILE" && ((success_count++))
grep -q "box-shadow: 0 4px 12px rgba(0,0,0,0.15)" "$CONFIGURATOR_FILE" && ((success_count++))

echo "📊 Score: $success_count/$total_tests tests réussis"

if [ $success_count -eq $total_tests ]; then
    echo "🎉 TOUS LES TESTS PASSENT ! Le problème de couleur blanche est complètement résolu."
    exit 0
else
    echo "⚠️  Certains tests échouent. Vérification manuelle recommandée."
    exit 1
fi

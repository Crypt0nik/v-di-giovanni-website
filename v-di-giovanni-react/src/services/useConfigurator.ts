// Hook spécialisé pour le configurateur intégré avec l'API
import { useState, useEffect, useCallback } from 'react';
import { ConfiguratorService, type ConfiguratorState, type ConfiguratorProduct } from './configuratorService';

export function useConfigurator() {
  const [state, setState] = useState<ConfiguratorState>(ConfiguratorService.createInitialState());
  const [availableProducts, setAvailableProducts] = useState<ConfiguratorProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Chargement initial des produits configurables
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const products = await ConfiguratorService.getConfigurableProducts();
        setAvailableProducts(products);
        
        // Sélectionner automatiquement le premier produit si disponible
        if (products.length > 0 && !state.selectedProduct) {
          setState(prevState => 
            ConfiguratorService.updateState(prevState, { 
              selectedProduct: products[0] 
            })
          );
        }
      } catch (err) {
        setError('Erreur lors du chargement des produits configurables');
        console.error('Erreur configurateur:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Actions du configurateur
  const selectProduct = useCallback((product: ConfiguratorProduct) => {
    setState(prevState => 
      ConfiguratorService.updateState(prevState, { 
        selectedProduct: product,
        // Réinitialiser les autres sélections lors du changement de produit
        selectedColor: null,
        selectedDimension: null,
        selectedMaterial: null,
      })
    );
  }, []);

  const selectColor = useCallback((colorId: string) => {
    if (!state.selectedProduct) return;
    
    const color = state.selectedProduct.colors.find(c => c.id === colorId);
    if (color) {
      setState(prevState => 
        ConfiguratorService.updateState(prevState, { selectedColor: color })
      );
    }
  }, [state.selectedProduct]);

  const selectDimension = useCallback((dimensionId: string) => {
    if (!state.selectedProduct) return;
    
    const dimension = state.selectedProduct.dimensions.find(d => d.id === dimensionId);
    if (dimension) {
      setState(prevState => 
        ConfiguratorService.updateState(prevState, { selectedDimension: dimension })
      );
    }
  }, [state.selectedProduct]);

  const selectMaterial = useCallback((materialId: string) => {
    if (!state.selectedProduct) return;
    
    const material = state.selectedProduct.materials.find(m => m.id === materialId);
    if (material) {
      setState(prevState => 
        ConfiguratorService.updateState(prevState, { selectedMaterial: material })
      );
    }
  }, [state.selectedProduct]);

  const resetConfiguration = useCallback(() => {
    setState(ConfiguratorService.createInitialState());
  }, []);

  const getOrderData = useCallback(() => {
    try {
      return ConfiguratorService.getOrderConfiguration(state);
    } catch (error) {
      return null;
    }
  }, [state]);

  return {
    // État du configurateur
    state,
    availableProducts,
    loading,
    error,
    
    // Actions
    selectProduct,
    selectColor,
    selectDimension,
    selectMaterial,
    resetConfiguration,
    
    // Utilitaires
    getOrderData,
    configurationDescription: ConfiguratorService.getConfigurationDescription(state),
    isValid: state.isValid,
    finalPrice: state.finalPrice,
  };
}

// Service d'intégration pour connecter le configurateur avec l'API Laravel
import type { Product } from './types';
import { ProductService } from './productService';

export interface ConfiguratorProduct {
  id: number;
  name: string;
  price: number;
  baseImageUrl?: string;
  description: string;
  colors: ConfiguratorColor[];
  dimensions: ConfiguratorDimension[];
  materials: ConfiguratorMaterial[];
}

export interface ConfiguratorColor {
  id: string;
  name: string;
  value: string; // Couleur hex ou CSS
  available: boolean;
}

export interface ConfiguratorDimension {
  id: string;
  name: string;
  width: number;
  height: number;
  depth: number;
  priceModifier: number; // Modification du prix en pourcentage
  available: boolean;
}

export interface ConfiguratorMaterial {
  id: string;
  name: string;
  priceModifier: number;
  available: boolean;
}

export interface ConfiguratorState {
  selectedProduct: ConfiguratorProduct | null;
  selectedColor: ConfiguratorColor | null;
  selectedDimension: ConfiguratorDimension | null;
  selectedMaterial: ConfiguratorMaterial | null;
  finalPrice: number;
  isValid: boolean;
}

export class ConfiguratorService {
  
  // Couleurs disponibles pour les sacs (à personnaliser selon vos besoins)
  private static readonly AVAILABLE_COLORS: ConfiguratorColor[] = [
    { id: 'black', name: 'Noir', value: '#2c2c2c', available: true },
    { id: 'brown', name: 'Marron', value: '#8B4513', available: true },
    { id: 'cognac', name: 'Cognac', value: '#A0522D', available: true },
    { id: 'beige', name: 'Beige', value: '#F5F5DC', available: true },
    { id: 'white', name: 'Blanc', value: '#FFFFFF', available: true },
    { id: 'navy', name: 'Bleu Marine', value: '#2E4A62', available: true },
  ];

  // Dimensions disponibles (à personnaliser selon vos produits)
  private static readonly AVAILABLE_DIMENSIONS: ConfiguratorDimension[] = [
    { 
      id: 'small', 
      name: 'Petit', 
      width: 25, 
      height: 20, 
      depth: 10, 
      priceModifier: -10, 
      available: true 
    },
    { 
      id: 'medium', 
      name: 'Moyen', 
      width: 30, 
      height: 25, 
      depth: 12, 
      priceModifier: 0, 
      available: true 
    },
    { 
      id: 'large', 
      name: 'Grand', 
      width: 35, 
      height: 30, 
      depth: 15, 
      priceModifier: 15, 
      available: true 
    },
  ];

  // Matériaux disponibles
  private static readonly AVAILABLE_MATERIALS: ConfiguratorMaterial[] = [
    { id: 'leather', name: 'Cuir véritable', priceModifier: 0, available: true },
    { id: 'premium_leather', name: 'Cuir premium', priceModifier: 25, available: true },
    { id: 'exotic_leather', name: 'Cuir exotique', priceModifier: 50, available: true },
  ];

  /**
   * Convertit un produit Laravel en produit configurateur
   */
  static convertToConfiguratorProduct(product: Product): ConfiguratorProduct {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      baseImageUrl: product.image_url,
      description: product.description,
      colors: this.AVAILABLE_COLORS,
      dimensions: this.AVAILABLE_DIMENSIONS,
      materials: this.AVAILABLE_MATERIALS,
    };
  }

  /**
   * Récupère les produits configurables depuis l'API
   */
  static async getConfigurableProducts(): Promise<ConfiguratorProduct[]> {
    try {
      const products = await ProductService.getInStockProducts();
      return products.map(product => this.convertToConfiguratorProduct(product));
    } catch (error) {
      console.error('Erreur lors du chargement des produits configurables:', error);
      return [];
    }
  }

  /**
   * Récupère un produit configurable par ID
   */
  static async getConfigurableProduct(productId: number): Promise<ConfiguratorProduct | null> {
    try {
      const product = await ProductService.getProduct(productId);
      return this.convertToConfiguratorProduct(product);
    } catch (error) {
      console.error('Erreur lors du chargement du produit:', error);
      return null;
    }
  }

  /**
   * Calcule le prix final basé sur la configuration
   */
  static calculateFinalPrice(state: ConfiguratorState): number {
    if (!state.selectedProduct) return 0;

    let basePrice = state.selectedProduct.price;
    let totalModifier = 0;

    if (state.selectedDimension) {
      totalModifier += state.selectedDimension.priceModifier;
    }

    if (state.selectedMaterial) {
      totalModifier += state.selectedMaterial.priceModifier;
    }

    return Math.round(basePrice * (1 + totalModifier / 100));
  }

  /**
   * Valide si la configuration actuelle est complète et valide
   */
  static validateConfiguration(state: ConfiguratorState): boolean {
    return !!(
      state.selectedProduct &&
      state.selectedColor &&
      state.selectedDimension &&
      state.selectedMaterial &&
      state.selectedColor.available &&
      state.selectedDimension.available &&
      state.selectedMaterial.available
    );
  }

  /**
   * Crée l'état initial du configurateur
   */
  static createInitialState(): ConfiguratorState {
    return {
      selectedProduct: null,
      selectedColor: null,
      selectedDimension: null,
      selectedMaterial: null,
      finalPrice: 0,
      isValid: false,
    };
  }

  /**
   * Met à jour l'état du configurateur
   */
  static updateState(
    currentState: ConfiguratorState,
    updates: Partial<ConfiguratorState>
  ): ConfiguratorState {
    const newState = { ...currentState, ...updates };
    newState.finalPrice = this.calculateFinalPrice(newState);
    newState.isValid = this.validateConfiguration(newState);
    return newState;
  }

  /**
   * Génère une description de la configuration pour affichage
   */
  static getConfigurationDescription(state: ConfiguratorState): string {
    if (!this.validateConfiguration(state)) {
      return 'Configuration incomplète';
    }

    const parts = [
      state.selectedProduct!.name,
      state.selectedColor!.name,
      state.selectedDimension!.name,
      state.selectedMaterial!.name,
    ];

    return parts.join(' - ');
  }

  /**
   * Génère les données de configuration pour une potentielle commande
   */
  static getOrderConfiguration(state: ConfiguratorState) {
    if (!this.validateConfiguration(state)) {
      throw new Error('Configuration invalide pour la commande');
    }

    return {
      product_id: state.selectedProduct!.id,
      color: state.selectedColor!.id,
      dimension: state.selectedDimension!.id,
      material: state.selectedMaterial!.id,
      final_price: state.finalPrice,
      configuration_description: this.getConfigurationDescription(state),
    };
  }
}

export default ConfiguratorService;

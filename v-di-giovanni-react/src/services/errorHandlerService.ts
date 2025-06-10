// Service de gestion des erreurs API et notification
export interface ErrorNotification {
  id: string;
  type: 'error' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: number;
  duration?: number;
  actions?: ErrorAction[];
}

export interface ErrorAction {
  label: string;
  action: () => void;
  variant?: 'primary' | 'secondary';
}

export class ErrorHandlerService {
  private static notifications: ErrorNotification[] = [];
  private static listeners: ((notifications: ErrorNotification[]) => void)[] = [];

  /**
   * Ajoute un listener pour les notifications
   */
  static addListener(listener: (notifications: ErrorNotification[]) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  /**
   * Notifie tous les listeners
   */
  private static notifyListeners() {
    this.listeners.forEach(listener => listener([...this.notifications]));
  }

  /**
   * Ajoute une notification
   */
  static addNotification(notification: Omit<ErrorNotification, 'id' | 'timestamp'>) {
    const newNotification: ErrorNotification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
    };

    this.notifications.unshift(newNotification);
    
    // Auto-suppression après la durée spécifiée
    if (notification.duration && notification.duration > 0) {
      setTimeout(() => {
        this.removeNotification(newNotification.id);
      }, notification.duration);
    }

    this.notifyListeners();
    return newNotification.id;
  }

  /**
   * Supprime une notification
   */
  static removeNotification(id: string) {
    this.notifications = this.notifications.filter(n => n.id !== id);
    this.notifyListeners();
  }

  /**
   * Supprime toutes les notifications
   */
  static clearAll() {
    this.notifications = [];
    this.notifyListeners();
  }

  /**
   * Gère les erreurs API et crée des notifications appropriées
   */
  static handleApiError(error: any, context?: string) {
    let title = 'Erreur API';
    let message = 'Une erreur est survenue';
    let type: ErrorNotification['type'] = 'error';

    if (error?.status) {
      switch (error.status) {
        case 400:
          title = 'Requête invalide';
          message = error.message || 'Les données envoyées sont invalides';
          break;
        case 401:
          title = 'Non autorisé';
          message = 'Vous devez vous connecter pour accéder à cette ressource';
          type = 'warning';
          break;
        case 403:
          title = 'Accès refusé';
          message = 'Vous n\'avez pas les droits pour effectuer cette action';
          break;
        case 404:
          title = 'Ressource introuvable';
          message = 'La ressource demandée n\'existe pas';
          break;
        case 422:
          title = 'Données invalides';
          message = this.formatValidationErrors(error.errors) || error.message;
          break;
        case 429:
          title = 'Trop de requêtes';
          message = 'Veuillez patienter avant de réessayer';
          type = 'warning';
          break;
        case 500:
          title = 'Erreur serveur';
          message = 'Une erreur interne est survenue sur le serveur';
          break;
        case 0:
          title = 'Connexion impossible';
          message = 'Impossible de contacter le serveur. Vérifiez votre connexion.';
          break;
        default:
          title = `Erreur ${error.status}`;
          message = error.message || 'Une erreur inattendue est survenue';
      }
    } else if (error?.message) {
      message = error.message;
    }

    if (context) {
      title = `${title} - ${context}`;
    }

    const actions: ErrorAction[] = [];

    // Ajouter des actions contextuelles
    if (error?.status === 401) {
      actions.push({
        label: 'Se connecter',
        action: () => {
          // Redirection vers la page de connexion
          window.location.href = '/login';
        },
        variant: 'primary',
      });
    }

    if (error?.status === 0 || error?.status >= 500) {
      actions.push({
        label: 'Réessayer',
        action: () => {
          window.location.reload();
        },
        variant: 'secondary',
      });
    }

    return this.addNotification({
      type,
      title,
      message,
      duration: type === 'error' ? 0 : 5000, // Les erreurs restent jusqu'à fermeture manuelle
      actions: actions.length > 0 ? actions : undefined,
    });
  }

  /**
   * Formate les erreurs de validation Laravel
   */
  private static formatValidationErrors(errors?: Record<string, string[]>): string {
    if (!errors || typeof errors !== 'object') {
      return '';
    }

    const messages: string[] = [];
    Object.entries(errors).forEach(([field, fieldErrors]) => {
      if (Array.isArray(fieldErrors)) {
        fieldErrors.forEach(error => {
          messages.push(`${field}: ${error}`);
        });
      }
    });

    return messages.join('\n');
  }

  /**
   * Ajoute une notification de succès
   */
  static success(title: string, message: string, duration = 3000) {
    return this.addNotification({
      type: 'success',
      title,
      message,
      duration,
    });
  }

  /**
   * Ajoute une notification d'information
   */
  static info(title: string, message: string, duration = 5000) {
    return this.addNotification({
      type: 'info',
      title,
      message,
      duration,
    });
  }

  /**
   * Ajoute une notification d'avertissement
   */
  static warning(title: string, message: string, duration = 5000) {
    return this.addNotification({
      type: 'warning',
      title,
      message,
      duration,
    });
  }

  /**
   * Ajoute une notification d'erreur
   */
  static error(title: string, message: string, actions?: ErrorAction[]) {
    return this.addNotification({
      type: 'error',
      title,
      message,
      duration: 0, // Les erreurs restent jusqu'à fermeture manuelle
      actions,
    });
  }

  /**
   * Récupère toutes les notifications
   */
  static getNotifications(): ErrorNotification[] {
    return [...this.notifications];
  }
}

export default ErrorHandlerService;

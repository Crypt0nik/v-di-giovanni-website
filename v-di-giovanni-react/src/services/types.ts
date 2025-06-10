// Types TypeScript pour les entités de l'API Laravel

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category_id: number;
  image_url?: string;
  stock_quantity: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  category?: Category;
}

export interface CartItem {
  id: number;
  cart_id: number;
  product_id: number;
  quantity: number;
  price: number;
  created_at: string;
  updated_at: string;
  product?: Product;
}

export interface Cart {
  id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  items?: CartItem[];
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
  created_at: string;
  updated_at: string;
  product?: Product;
}

export interface Order {
  id: number;
  user_id: number;
  total_amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shipping_address: string;
  billing_address: string;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
}

export interface WishlistItem {
  id: number;
  wishlist_id: number;
  product_id: number;
  created_at: string;
  updated_at: string;
  product?: Product;
}

export interface Wishlist {
  id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  items?: WishlistItem[];
}

export interface Review {
  id: number;
  product_id: number;
  user_id: number;
  rating: number;
  comment: string;
  created_at: string;
  updated_at: string;
  user?: User;
  product?: Product;
}

export interface Payment {
  id: number;
  order_id: number;
  amount: number;
  payment_method: string;
  payment_status: 'pending' | 'completed' | 'failed' | 'refunded';
  transaction_id?: string;
  created_at: string;
  updated_at: string;
}

// Types pour les requêtes API
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  token_type: string;
  expires_in?: number;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  category_id: number;
  image_url?: string;
  stock_quantity: number;
  is_active?: boolean;
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {}

export interface AddToCartRequest {
  product_id: number;
  quantity: number;
}

export interface UpdateCartItemRequest {
  quantity: number;
}

export interface CreateOrderRequest {
  shipping_address: string;
  billing_address: string;
}

export interface CreateReviewRequest {
  rating: number;
  comment: string;
}

// Types pour les réponses paginées
export interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
  links: {
    first: string;
    last: string;
    prev?: string;
    next?: string;
  };
}

// Type pour les erreurs d'API
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  details?: any;
}

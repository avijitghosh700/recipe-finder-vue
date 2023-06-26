export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isOAuthLoading: boolean;
}

export interface User {
  token: string;
  name: string;
  email: string;
  avatar: string;
  [k: string]: any;
}

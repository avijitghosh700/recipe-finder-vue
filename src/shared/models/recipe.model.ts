export interface RecipeResponse {
  count: number;
  results: Record<string, any>[];
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  image: string;
  ingredients?: string[];
}

export interface RecipeState {
  loading: boolean;
  loaded: boolean;
  failed: boolean;

  loadMoreActive: boolean;

  recipe?: Recipe | null;
}

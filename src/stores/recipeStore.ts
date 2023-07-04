import { defineStore } from "pinia";

import type { Recipe, RecipeState } from "@/shared/models/recipe.model";

const useRecipeStore = defineStore("Recipe", {
  state: () => {
    const initialState: RecipeState = {
      loading: false,
      loaded: false,
      failed: false,

      loadMoreActive: false,

      recipe: null,
    };

    return initialState;
  },

  actions: {
    recipeLoading() {
      this.loading = true;
      this.loaded = false;
      this.failed = false;
    },
    recipeLoadingSuccess() {
      this.loaded = true;
      this.loading = false;
      this.failed = false;
    },
    recipeLoadingFailed() {
      this.failed = true;
      this.loading = false;
      this.loaded = false;
    },

    recipeLoadMoreActive() {
      this.loadMoreActive = true;
    },
    recipeLoadMoreInactive() {
      this.loadMoreActive = false;
    },

    setRecipe(recipe: Recipe) {
      this.recipe = recipe;
    },
  },

  getters: {
    isLoading: (state) => state.loading,
    isLoaded: (state) => state.loaded,
    isFailed: (state) => state.failed,
    isLoadMoreActive: (state) => state.loadMoreActive,
    currentRecipe: (state) => state.recipe,
  },
});

export default useRecipeStore;

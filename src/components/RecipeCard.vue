<style scoped lang="scss">
.recipeCard {
  width: 100%;
  max-height: 300px;

  &__thumb {
    height: 150px;
    width: 100%;
  }
}
</style>

<template>
  <figure class="recipeCard border rounded-[10px] overflow-hidden shadow-sm">
    <div class="recipeCard__thumb">
      <img
        :src="recipe.image"
        :alt="recipe.name"
        class="h-full w-full object-cover"
        loading="lazy"
      />
    </div>

    <figcaption class="recipeCard__caption p-4 border-t">
      <h3 class="headerCard__heading line-clamp-2 text-md mb-1" :title="recipe.name">{{ recipe.name }}</h3>

      <p class="recipeCard__description text-xs font-light line-clamp-4">
        {{ recipe.description }}
      </p>
    </figcaption>
  </figure>
</template>

<script setup lang="ts">
import type { Recipe } from "@/shared/models/recipe.model";

const { recipe } = defineProps<{
  recipe: Recipe;
}>();
</script>

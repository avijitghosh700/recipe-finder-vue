<style scoped lang="scss">
@import "src/styles/_var.scss";

.dashboard {
  &__search {
    height: 250px;
    @apply grid;
    @apply place-items-center;
  }

  &__searchBox {
    max-width: 400px;
    width: 100%;
    padding: 20px;
  }
}
</style>

<template>
  <main class="main dashboard">
    <section
      class="dashboard__search bg-cover bg-center p-4"
      :style="{ backgroundImage: `url(${randomBgProvider})` }"
    >
      <div class="dashboard__searchBox rounded shadow bg-white">
        <div class="credential credential__search">
          <input
            type="text"
            :placeholder="searchPlaceholder.current"
            class="credential__input"
            id="searchRecipe"
            v-model="searchValue"
            @input="findRecipes(searchValue)"
            @blur="handleOnBlur"
            @focus="handleOnFocus"
          />

          <button
            type="button"
            class="searchClearBtn"
            @click="clearSearch()"
            v-if="searchValue"
          >
            <vue-feather type="x" class="h-[16px] w-[16px]"></vue-feather>
          </button>
        </div>
      </div>
    </section>

    <section class="dashboard__recipes py-5">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <template v-if="recipeState.isLoading">
            <CardSkeleton v-for="count of skeletonCount" :key="count" />
          </template>

          <template v-if="recipeState.isLoaded">
            <div
              class="cardContainer"
              v-for="recipe of recipes"
              :key="recipe.id"
            >
              <RecipeCard :recipe="recipe" />
            </div>
          </template>

          <template v-if="recipeState.isLoadMoreActive">
            <CardSkeleton v-for="count of skeletonCount" :key="count" />
          </template>
        </div>

        <div
          class="flex items-center mt-4"
          v-if="recipeState.isLoaded && recipes.length"
        >
          <button
            type="button"
            class="btn btn__secondary outlined rounded-full px-4 mx-auto"
            :disabled="recipeState.isLoadMoreActive"
            @click="loadMoreRecipes"
          >
            Load more
          </button>
        </div>

        <div class="text-center">
          <NotFoundIcon
            message="No recipes found"
            v-if="recipeState.isLoaded && !recipes.length"
          />
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";

import { useDebounceFn, useThrottleFn } from "@vueuse/core";

import useRecipeStore from "@/stores/recipeStore";

import {
  getRecipes,
  getMoreRecipes,
  searchRecipes,
} from "@/shared/services/recipeService";

import type { Recipe, RecipeResponse } from "@/shared/models/recipe.model";

import RecipeCard from "@/components/RecipeCard.vue";

import BG1 from "../../assets/images/dashboard_bg_1.jpg";
import BG2 from "../../assets/images/dashboard_bg_2.jpg";
import BG3 from "../../assets/images/dashboard_bg_3.jpg";
import BG4 from "../../assets/images/dashboard_bg_4.jpg";
import { toast } from "vue3-toastify";

const recipeState = useRecipeStore();

const skeletonCount = ref(12);
const searchValue = ref("");
const recipes = ref<Recipe[]>([]);

const searchPlaceholder = reactive({
  base: "Search recipes",
  focued: "E.g. Pizza, burger, etc.",
  current: "Search recipes",
});

const randomBgProvider = computed(() => {
  const bgArray = [BG1, BG2, BG3, BG4];

  return bgArray[Math.floor(Math.random() * bgArray.length)];
});

// Placeholder handler
const placeholderUpdater = (eventType: string) => {
  switch (eventType) {
    case "focus":
      searchPlaceholder.current = searchPlaceholder.focued;
      break;

    case "blur":
      searchPlaceholder.current = searchPlaceholder.base;
      break;

    default:
      searchPlaceholder.current = searchPlaceholder.base;
      break;
  }
};
// END

const handleOnFocus = (event: FocusEvent) => {
  if (event.type !== "focus") return;

  placeholderUpdater(event.type);
};

const handleOnBlur = (event: FocusEvent) => {
  if (event.type !== "blur") return;

  placeholderUpdater(event.type);
};

const clearSearch = () => {
  searchValue.value = "";

  fetchRecipes();
};

const recipeDataFormatter = (data: RecipeResponse): Recipe[] => {
  if (data && data.results && data.results.length) {
    return data.results.map((recipe) => ({
      id: recipe.id,
      name: recipe.name,
      description: recipe.description,
      image: recipe.thumbnail_url,
    }));
  }

  return [];
};

const fetchRecipes = async () => {
  recipeState.recipeLoading();

  try {
    const res = await getRecipes();
    const data: RecipeResponse = JSON.parse(res.data);

    recipes.value = recipeDataFormatter(data);

    recipeState.recipeLoadingSuccess();
  } catch (error) {
    recipeState.recipeLoadingFailed();
    console.log(error);
  }
};

const findRecipes = useDebounceFn(async (query: string) => {
  recipeState.recipeLoading();

  try {
    const res = await searchRecipes(query);
    const data = JSON.parse(res.data);

    recipes.value = recipeDataFormatter(data);

    recipeState.recipeLoadingSuccess();
  } catch (error) {
    recipeState.recipeLoadingFailed();
    console.log(error);
  }
}, 500);

const loadMoreRecipes = useThrottleFn(async () => {
  recipeState.recipeLoadMoreActive();

  try {
    const from = recipes.value.length + 1;

    const res = await getMoreRecipes(from, searchValue.value);
    const data: RecipeResponse = JSON.parse(res.data);

    recipes.value = [...recipes.value, ...recipeDataFormatter(data)];

    recipeState.recipeLoadMoreInactive();
  } catch (error) {
    recipeState.recipeLoadMoreInactive();

    toast("Something went wrong", { type: "error" });

    console.log(error);
  }
}, 300);

onMounted(() => {
  fetchRecipes();
});
</script>

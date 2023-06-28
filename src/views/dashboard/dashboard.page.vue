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

    <section class="dashboard__recipes"></section>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";

import { useDebounceFn } from "@vueuse/core";

import { getRecipes, searchRecipes } from "@/shared/services/recipeService";

import BG1 from "../../assets/images/dashboard_bg_1.jpg";
import BG2 from "../../assets/images/dashboard_bg_2.jpg";
import BG3 from "../../assets/images/dashboard_bg_3.jpg";
import BG4 from "../../assets/images/dashboard_bg_4.jpg";

const searchValue = ref("");

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

const clearSearch = () => (searchValue.value = "");

const recipes = async () => {
  try {
    const res = await getRecipes();
    const recipes = JSON.parse(res.data);

    console.log(recipes);
  } catch (error) {
    console.log(error);
  }
};

const findRecipes = useDebounceFn(async (query: string) => {
  try {
    const res = await searchRecipes(query);
    const recipes = JSON.parse(res.data);

    console.log(recipes);
  } catch (error) {
    console.log(error);
  }
}, 200);

onMounted(() => {
  // recipes();
});
</script>

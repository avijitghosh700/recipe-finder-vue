<style scoped lang="scss">
.error {
  &__item {
    font-size: 12px;
  }
}
</style>

<template>
  <div class="error mt-1" v-if="errors && errors.length">
    <div
      class="error__item text-red-600"
      v-for="error of errors"
      :key="error.$uid"
    >
      {{ error.$message || "" }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  errors: Array<{
    $propertyPath: string;
    $property: string;
    $validator: string;
    $uid: string;
    $message: string;
    $params: {
      type: string;
    };
    $response: boolean;
    $pending: boolean;
  }>,
});
</script>

<template>
  <div
    v-if="!product?.length"
    class="p-5 align-items-center text-danger d-flex flex-column"
  >
    <div
      class="p-2 rounded text-secondary d-flex flex-column align-items-center"
    >
      <span class="material-symbols-outlined fs-1"> cancel </span>
      <span class="fs-5"> No Result Found </span>
    </div>
    <button class="btn btn-secondary mt-2" @click="$emit('clearSearch')">
      Clear Filter
    </button>
  </div>
</template>
<script lang="ts">
export default {
  props: ["product"],
};
</script>

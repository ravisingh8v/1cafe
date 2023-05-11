<template>
  <section>
    <h3 class="fs-3">Bakery</h3>
    <div class="row mt-3 gx-5 gy-5">
      <BaseProductItem
        v-for="(bakery, index) in allBakeryProduct"
        :key="index"
        :product="bakery"
        @getDetails="$emit('getDetails', $event)"
      ></BaseProductItem>
      <div
        v-if="!allBakeryProduct?.length"
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
    </div>
  </section>
</template>
<script lang="ts">
import BaseProductItem from "@/ui/BaseProductItem.vue";
import { inject } from "vue";
export default {
  // props: ["allBakeryProduct"],
  components: { BaseProductItem },
  setup() {
    const allBakeryProduct: any = inject("allBakeryProduct");
    return { allBakeryProduct: allBakeryProduct };
  },
};
</script>

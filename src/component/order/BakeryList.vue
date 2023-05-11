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

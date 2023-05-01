<template>
  <section>
    <h3 class="fs-3">Bakery</h3>
    <div class="row mt-3 gx-5 gy-5">
      <BakeryItem
        v-for="bakery in allBakeryProduct"
        :key="bakery.id"
        :bakery="bakery"
        @getDetails="$emit('getDetails', $event)"
      ></BakeryItem>
    </div>
  </section>
</template>
<script lang="ts">
import BakeryItem from "./BakeryItem.vue";
import { inject } from "vue";
export default {
  //   props: ["allBakeryProduct"],
  components: { BakeryItem },
  setup() {
    const allBakeryProduct: any = inject("allBakeryProduct");
    return { allBakeryProduct: allBakeryProduct };
  },
};
</script>

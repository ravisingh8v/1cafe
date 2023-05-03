<template>
  <section class="">
    <h3 class="fs-3">Breakfast</h3>
    <div class="row mt-3 gx-5 gy-5">
      <BreakfastItem
        v-for="(breakfast, index) in allBreakfastProduct"
        :key="index"
        :breakfast="breakfast"
        @getDetails="$emit('getDetails', $event)"
      ></BreakfastItem>
    </div>
  </section>
</template>
<script lang="ts">
import { inject, defineComponent } from "vue";
import BreakfastItem from "./BreakfastItem.vue";
export default defineComponent({
  components: { BreakfastItem },
  //   props: ["allBreakfastProduct"],
  setup() {
    const allBreakfastProduct: any = inject("allBreakfastProduct");
    return { allBreakfastProduct: allBreakfastProduct };
  },
});
</script>

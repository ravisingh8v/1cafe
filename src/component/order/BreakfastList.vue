<template>
  <section class="">
    <h3 class="fs-3">Breakfast</h3>
    <div class="row mt-3 gx-5 gy-5">
      <BaseProductItem
        v-for="(breakfast, index) in allBreakfastProduct"
        :key="index"
        :product="breakfast"
        @getDetails="$emit('getDetails', $event)"
      ></BaseProductItem>
      <BaseItemNotFound
        :product="allBreakfastProduct"
        @clearSearch="$emit('clearSearch')"
      ></BaseItemNotFound>
      <!-- <div
        v-if="!allBreakfastProduct?.length"
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
      </div> -->
    </div>
  </section>
</template>
<script lang="ts">
import { inject, defineComponent } from "vue";
import BaseProductItem from "@/ui/BaseProductItem.vue";
import BaseItemNotFound from "@/ui/BaseItemNotFound.vue";
export default defineComponent({
  components: { BaseProductItem, BaseItemNotFound },
  //   props: ["allBreakfastProduct"],
  setup() {
    const allBreakfastProduct: any = inject("allBreakfastProduct");
    return { allBreakfastProduct: allBreakfastProduct };
  },
});
</script>

<template>
  <section class="">
    <h3 class="fs-3">Breakfast</h3>

    <div class="row mt-3 gx-5 gy-5">
      <div
        class="col-4"
        v-for="breakfast in allBreakfastProduct"
        :key="breakfast.id"
      >
        <div class="border product_card shadow card p-3">
          <div class="product_image_wrapper rounded">
            <img :src="breakfast.imageUrl" alt="" />
          </div>
          <div class="mt-3">
            <h5 class="fs-5">{{ breakfast.title }}</h5>
            <p class="">
              {{
                breakfast.description.length > 50
                  ? breakfast.description.substring(0, 50 - 3) + "..."
                  : breakfast.description
              }}
            </p>
            <span>${{ breakfast.price }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { inject } from "vue";
export default {
  //   props: ["allBreakfastProduct"],
  setup() {
    const allBreakfastProduct: any = inject("allBreakfastProduct");
    console.log(allBreakfastProduct);

    return { allBreakfastProduct };
  },
};
</script>

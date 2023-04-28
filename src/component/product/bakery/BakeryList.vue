<template>
  <section>
    <h3 class="fs-3">Bakery</h3>
    <div class="row mt-3 gx-5 gy-5">
      <div class="col-4" v-for="bakery in allBakeryProduct" :key="bakery.id">
        <div class="border product_card shadow card p-3">
          <div class="product_image_wrapper rounded">
            <img :src="bakery.imageUrl" alt="" />
          </div>
          <div class="mt-3">
            <h5 class="fs-5">{{ bakery.title }}</h5>
            <p class="">
              {{
                bakery.description.length > 50
                  ? bakery.description.substring(0, 50 - 3) + "..."
                  : bakery.description
              }}
            </p>
            <span>${{ bakery.price }}</span>
          </div>
        </div>
      </div>
      <!-- <div class="col-4">
        <div class="border product_card shadow card p-3">
          <div class="product_image_wrapper"></div>
          <div class="mt-3">
            <h5 class="fs-5">Croissant (Plain/Chocolate)</h5>
            <p class="">
              I’m a dish description. Click “Edit Menu” to open the Restaurant
              Menu editor and change my text.
            </p>
            <span>$6</span>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="border product_card shadow card p-3">
          <div class="product_image_wrapper"></div>
          <div class="mt-3">
            <h5 class="fs-5">Croissant (Plain/Chocolate)</h5>
            <p class="">
              I’m a dish description. Click “Edit Menu” to open the Restaurant
              Menu editor and change my text.
            </p>
            <span>$6</span>
          </div>
        </div>
      </div> -->
    </div>
  </section>
</template>
<script lang="ts">
import { inject } from "vue";
export default {
  //   props: ["allBakeryProduct"],
  setup() {
    const allBakeryProduct: any = inject("allBakeryProduct");
    return { allBakeryProduct };
  },
};
</script>

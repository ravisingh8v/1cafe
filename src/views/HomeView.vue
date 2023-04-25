<template>
  <div class="home">
    <!-- hero wrapper  -->
    <section class="hero-section ps-5 d-flex align-items-center text-white">
      <div class="hero_overlay"></div>
      <!-- hero content  -->
      <div class="ps-4 hero_content">
        <span class="d-inline-block mb-2 fs-4">Cafe & Restaurant Est.2035</span>
        <div class="my-2">
          <h2 class="d-flex flex-column">
            <span>Your Go-to Spot for</span>
            <span>Delicious Eats & Coffee</span>
          </h2>
        </div>
        <div class="my-4">
          <button class="btn btn-outline-secondary">Order Now</button>
        </div>
      </div>
    </section>
    <!-- carousel imported here  -->
    <hero-carousel></hero-carousel>
    <main class="home_main_wrapper">
      <div class="row gx-0">
        <div
          class="col-6 items d-flex align-items-center justify-content-center"
        >
          <div class="w-50 d-flex flex-column">
            <h2 class="mb-3">Eats.</h2>
            <span class="mb-3 fs-5"
              >Breakfast, Lunch and Artisanal Pastries</span
            >
            <p class="mb-3 fw-light">
              I'm a paragraph. here we can write about our Product and Details
              of our product this is dummy text here.
            </p>
            <div>
              <button class="btn btn-outline-secondary">See More</button>
            </div>
          </div>
        </div>
        <div class="col-6 items food"></div>
      </div>
      <div class="row gx-0">
        <div class="col-6 items drink"></div>
        <div
          class="col-6 items d-flex align-items-center justify-content-center"
        >
          <div class="w-50 d-flex flex-column">
            <h2 class="mb-3">Drink.</h2>
            <span class="mb-3 fs-5">The Freshest Cup in Town </span>
            <p class="mb-3 fw-light">
              I'm a paragraph. here we can write about our Product and Details
              of our product this is dummy text here.
            </p>
            <div>
              <button class="btn btn-outline-secondary">See More</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import HeroCarousel from "./../component/home/HeroCarousel.vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: { HeroCarousel },
});
</script>

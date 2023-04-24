<template>
  <div class="home">
    <!-- hero wrapper  -->
    <section class="hero-section ps-5 d-flex align-items-center text-white">
      <!-- hero content  -->
      <div class="ps-4">
        <span class="d-inline-block mb-2 fs-4">Cafe & Restaurant Est.2035</span>
        <div class="my-2">
          <h2 class="d-flex flex-column">
            <span>Your Go-to Spot for</span>
            <span>Delicious Eats & Coffee</span>
          </h2>
        </div>
        <div class="my-4">
          <button class="btn btn-danger">Order Now</button>
        </div>
      </div>
    </section>
    <!-- carousel imported here  -->
    <hero-carousel></hero-carousel>
    <main class="home_main_wrapper">
      <div class="row">
        <div></div>
        <div></div>
      </div>
      <div class="row">
        <div></div>
        <div></div>
      </div>
    </main>
    <!-- footer section -->
    <footer></footer>
  </div>
</template>

<script lang="ts">
import HeroCarousel from "./../component/home/HeroCarousel.vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: { HeroCarousel },
});
</script>

<template>
  <div class="home">
    <!-- hero section -->
    <home-hero></home-hero>
    <!-- carousel imported here  -->
    <hero-carousel></hero-carousel>
    <main class="home_main_wrapper">
      <!-- feeds  -->
      <home-feed></home-feed>
    </main>
  </div>
</template>

<script lang="ts">
import HomeFeed from "@/component/home/HomeFeed/HomeFeed.vue";
import HeroCarousel from "./../component/home/HeroCarousel.vue";
import { defineComponent } from "vue";
import HomeHero from "@/component/home/HomeHero.vue";
export default defineComponent({
  components: { HeroCarousel, HomeFeed, HomeHero },
});
</script>

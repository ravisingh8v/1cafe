<template>
  <!-- Header  -->
  <the-header></the-header>
  <!-- Router components -->
  <section class="">
    <router-view v-slot="slotProps">
      <transition>
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>
  </section>
</template>
<script lang="ts">
import TheHeader from "./component/layout/TheHeader.vue";
export default {
  components: { TheHeader },
};
</script>
<style lang="scss">
// /
</style>

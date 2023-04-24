<template>
  <!-- Header  -->
  <the-header></the-header>
  <!-- Router components -->
  <section class="">
    <router-view v-slot="slotProps">
      <transition mode="out-in" name="route">
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
.route-enter-from {
  opacity: 0;
}
.route-enter-active {
  transition: all 0.35s ease-out;
}
.route-enter-to {
  opacity: 1;
}
.route-leave-from {
  opacity: 1;
}
.route-leave-active {
  transition: all 0.35s ease-in;
}
.route-leave-to {
  opacity: 0;
}
</style>

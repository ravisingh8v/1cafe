<template>
  <section class="d-flex flex-column h-100">
    <!-- Header  -->
    <the-header :isLogin="isLogin"></the-header>
    <!-- Router components -->
    <section class="flex-grow-1">
      <router-view v-slot="slotProps">
        <transition mode="out-in" name="route">
          <component :is="slotProps.Component"></component>
        </transition>
      </router-view>
    </section>
    <the-footer v-if="!isLogin && footer"></the-footer>
  </section>
</template>
<script lang="ts">
import TheHeader from "./component/layout/TheHeader.vue";
import TheFooter from "./component/layout/TheFooter.vue";
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";

export default {
  components: { TheHeader, TheFooter },
  setup() {
    const route = useRoute();
    // getting current route to hide footer on login page
    const currentRoute = ref("");
    watch(
      () => route.path,
      () => {
        currentRoute.value = route.path;
      }
    );
    const isLogin = computed(() => {
      if (
        currentRoute.value.includes("login") ||
        currentRoute.value.includes("registration")
      ) {
        return currentRoute.value;
      }
      return false;
    });

    // to showing footer when route is ready
    const footer = ref();
    watch(isLogin, () => {
      isLogin.value == false
        ? setTimeout(() => {
            footer.value = true;
          }, 1000)
        : (footer.value = false);
    });

    return {
      isLogin,
      footer,
    };
  },
};
</script>
<style lang="scss">
// route animation
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

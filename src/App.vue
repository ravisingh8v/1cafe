<template>
  <section class="d-flex flex-column h-100">
    <base-spinner v-if="isLoading"></base-spinner>
    <!-- Header  -->
    <transition name="route">
      <the-header
        :isLogin="isLogin"
        :isAuthenticated="isAuthenticated"
        :menu="menu"
        @openMenu="openMenu"
        v-if="!isNotFound"
      ></the-header>
    </transition>
    <!-- Router components -->
    <section class="flex-grow-1" @click="menuFn">
      <router-view v-slot="slotProps">
        <transition mode="out-in" name="route">
          <component :is="slotProps.Component"></component>
        </transition>
      </router-view>
    </section>
    <transition name="route">
      <the-footer v-if="!isLogin && footer && !isNotFound"></the-footer>
    </transition>
  </section>
</template>
<script lang="ts">
import TheHeader from "./component/layout/TheHeader.vue";
import TheFooter from "./component/layout/TheFooter.vue";
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default {
  components: { TheHeader, TheFooter },
  setup() {
    const route = useRoute();
    const store = useStore();
    const isAuthenticated = ref();
    // getting current route to hide footer on login page
    const currentRoute = ref("");
    const isNotFound = ref();
    const checkCurrentRoute = computed(() => {
      return route.path;
    });
    watch(checkCurrentRoute, async () => {
      currentRoute.value = checkCurrentRoute?.value;
      if (route.matched[0]["path"] === "/:notFound(.*)*") {
        isNotFound.value = true;
      } else {
        isNotFound.value = false;
      }
    });
    const isLogin = computed(() => {
      if (
        currentRoute.value.includes("login") ||
        currentRoute.value.includes("registration") ||
        currentRoute.value.includes("/manage-profile")
      ) {
        return currentRoute.value;
      }
      return false;
    });

    // to showing footer when route is ready
    const footer = ref();
    watch(
      isLogin,
      () => {
        isLogin.value == false
          ? setTimeout(() => {
              footer.value = true;
            }, 1000)
          : (footer.value = false);
      },
      { immediate: true }
    );

    // checking authentication
    const isAuth = computed(() => {
      return store.getters["auth/isAuthenticated"];
    });
    watch(
      isAuth,
      () => {
        isAuthenticated.value = isAuth.value;
      },
      { immediate: true }
    );

    // for profile menu close
    const menu = ref();
    function openMenu(value: any) {
      if (value == true) {
        menu.value = true;
      } else {
        menu.value = false;
      }
    }
    function menuFn() {
      menu.value = false;
    }

    // end
    store.dispatch("auth/isAuth");
    store.dispatch("auth/getUserData");
    const isLoading = ref();
    const isLoadings = computed(() => {
      return store.getters.isLoading;
    });
    watch(isLoadings, () => {
      isLoading.value = isLoadings.value;
    });

    return {
      isLogin,
      footer,
      isAuthenticated,
      menu,
      menuFn,
      openMenu,
      isLoading,
      isNotFound,
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

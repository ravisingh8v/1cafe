<template>
  <div class="row gx-0 h-100">
    <div class="col-5">
      <div
        class="h-100 auth_left_section"
        :class="isRouteLogin ? 'login_bg' : 'register_bg'"
      ></div>
    </div>
    <div class="col-7 justify-content-center align-items-center d-flex">
      <div class="auth_right_section w-50">
        <BaseCard>
          <form @submit.prevent="">
            <div class="mb-3">
              <label for="email">Email </label>
              <input
                id="email"
                type="email"
                class="form-control"
                placeholder="Enter your email"
              />
            </div>
            <div class="mb-4 mt-3">
              <label for="password">Password </label>
              <input
                id="password"
                type="password"
                class="form-control"
                placeholder="Enter your password"
              />
            </div>
            <div class="d-flex flex-column">
              <div>
                <button class="btn btn-primary">
                  {{ isRouteLogin ? "Login" : "Submit" }}
                </button>
              </div>

              <span class="mx-2 mt-2">
                <span v-if="isRouteLogin">
                  If you don't have an account click here to
                </span>
                <span v-else>
                  If you already have an account click here to
                </span>
                <RouterLink
                  to="/registration"
                  class="text-primary"
                  v-if="isRouteLogin"
                  >Register</RouterLink
                >
                <RouterLink to="/login" class="text-primary" v-else
                  >login</RouterLink
                >
              </span>
            </div>
          </form>
        </BaseCard>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import BaseCard from "@/ui/BaseCard.vue";
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
export default {
  components: { BaseCard },
  setup() {
    const isRouteLogin = ref();
    const route = useRoute();

    const currentRoute = computed(() => {
      return route.path;
    });

    watch(
      currentRoute,
      () => {
        if (currentRoute.value === "/login") {
          isRouteLogin.value = true;
        } else {
          isRouteLogin.value = false;
        }
      },
      { immediate: true }
    );
    return { isRouteLogin };
  },
};
</script>

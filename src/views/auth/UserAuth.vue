<template>
  <div class="row gx-0 h-100">
    <!-- left section  -->
    <div class="col-5">
      <!-- for background image  -->
      <div
        class="h-100 auth_left_section"
        :class="isRouteLogin ? 'login_bg' : 'register_bg'"
      ></div>
    </div>
    <!-- right section  -->
    <div class="col-7 justify-content-center align-items-center d-flex">
      <div class="auth_right_section w-50">
        <!-- dynamic heading for login or registration page -->
        <h1 class="text-center mb-5">
          {{ isRouteLogin ? "Login" : "Register" }}
        </h1>
        <!-- import slot -->
        <BaseCard>
          <form @submit.prevent="">
            <!-- this div is visible only when route is registration -->
            <div v-if="!isRouteLogin" class="mb-3">
              <!-- profile upload   -->
              <div class="mb-3 profile d-flex align-items-center">
                <label
                  for="profile"
                  class="profile_wrapper overflow-hidden rounded-circle position-relative"
                >
                  <span
                    class="position-absolute label_overlay d-flex justify-content-center align-items-center"
                  >
                    <span>Upload</span>
                  </span>
                  <img
                    src="./../../assets/images/mainSection/drink.webp"
                    alt=""
                  />
                </label>
                <label
                  for="profile"
                  class="mx-3 btn btn-outline-secondary p-0 px-1"
                >
                  upload file
                </label>
                <input type="file" class="d-none" name="" id="profile" />
              </div>
              <div class="row gx-0 g-2">
                <div class="col-6">
                  <label for="firstname">Firstname</label>
                  <input
                    type="text"
                    class="form-control"
                    name="firstname"
                    id="firstname"
                    placeholder="Firstname"
                  />
                </div>
                <div class="col-6">
                  <label for="lastname">lastName</label>
                  <input
                    type="text"
                    class="form-control"
                    name="lastname"
                    id="lastname"
                    placeholder="Lastname"
                  />
                </div>
              </div>
            </div>
            <!-- end -->
            <!-- for login and registration similar fields  -->
            <div class="mb-3">
              <label for="email">Email </label>
              <input
                id="email"
                type="email"
                class="form-control"
                placeholder="ravi.singh@test.com"
              />
            </div>
            <div class="mb-4 mt-3">
              <label for="password">Password </label>
              <input
                id="password"
                type="password"
                class="form-control"
                placeholder="Enter Password"
              />
            </div>
            <div class="d-flex flex-column">
              <!-- submit button  -->
              <div>
                <button class="btn btn-primary">
                  {{ isRouteLogin ? "Login" : "Submit" }}
                </button>
              </div>
              <!-- action -->
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

    // watch on change route to manipulate data according to registration and login
    watch(
      currentRoute,
      () => {
        if (currentRoute.value == "/login") {
          isRouteLogin.value = true;
        } else {
          isRouteLogin.value = false;
        }
      },
      { immediate: true }
    );

    // expose
    return { isRouteLogin };
  },
};
</script>

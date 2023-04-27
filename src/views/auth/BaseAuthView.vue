<template>
  <div class="row gx-0 h-100">
    <!-- Dialog Box For Error  -->
    <base-dialog
      :title="'Something went wrong'"
      @close="handleError"
      :show="!!catchError"
    >
      <p>{{ catchError }}</p>
    </base-dialog>
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
          {{ !isRouteLogin ? "Register" : "login" }}
        </h1>
        <!-- import slot -->
        <base-card>
          <UserRegistration
            @submitForm="submitForm"
            :isLoading="isLoading"
            v-if="!isRouteLogin"
          ></UserRegistration>
          <UserLogin
            @submitForm="submitForm"
            :isLoading="isLoading"
            v-else
          ></UserLogin>
        </base-card>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
// component
import UserRegistration from "./UserRegistration.vue";
import UserLogin from "./UserLogin.vue";
// Setup
import { computed, ref, watch } from "vue";
// routing
import { useRoute, useRouter } from "vue-router";
// for validation
import { FormContext } from "vee-validate";
// store
import { useStore } from "vuex";

export default {
  // components: { Field, Form },
  components: { UserRegistration, UserLogin },

  setup() {
    const router = useRouter();
    const route = useRoute();
    const isLoading = ref();
    const store = useStore();
    const isRouteLogin = ref();
    const currentRoute = computed(() => {
      return route.path;
    });

    watch(isLoading, () => {
      isLoading.value = store.getters["auth/isLoading"];
    });

    watch(
      () => store.getters["auth/isLoading"],
      () => {
        isLoading.value = store.getters["auth/isLoading"];
      }
    );

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

    // forms Data
    const catchError = ref();

    // form method
    // const file = ref("");
    // function uploadFile(event: any) {
    //   const image = event.target.files[0];
    //   console.log(image);
    //   console.log(file);
    // }

    /**
     * sending to store
     * @param value from form
     */
    async function submitForm(value: FormContext["values"]) {
      // click on login
      console.log("work");

      if (isRouteLogin.value) {
        // on Login
        try {
          await store.dispatch("auth/userLogin", {
            email: value.email,
            password: value.password,
          });
          store.dispatch("auth/getUserData");
          console.log("try");
        } catch (error) {
          catchError.value = error;
          return;
        }
        router.push("/");
        console.log("this is login page bro");
      } else {
        /**
         * on registration
         */
        try {
          await store.dispatch("auth/signUpWithEmailPassword", {
            email: value.email,
            password: value.password,
          });
        } catch (error) {
          catchError.value = error;
          return false;
        }
        // if email not exists do this
        await store.dispatch("auth/registration", {
          // profileImage: value.profileImage,
          firstName: value.firstName,
          lastName: value.lastName,
          email: value.email,
          // password: value.password,
        });
        router.push("/login");
      }
    }

    // dialog
    function handleError() {
      catchError.value = "";
    }
    // expose
    return {
      isRouteLogin,
      catchError,
      handleError,
      isLoading,
      // file,
      // uploadFile,
      submitForm,
    };
  },
};
</script>

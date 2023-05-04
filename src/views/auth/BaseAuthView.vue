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
        <h1 class="text-center mb-5" v-if="currentPage !== 'Manage Profile'">
          {{ currentPage }}
        </h1>
        <h1 class="text-center mb-5" v-else>Profile</h1>
        <!-- import slot -->
        <base-card>
          <!-- :isLoading="isLoading" -->
          <UserRegistration
            @submitForm="submitForm"
            :isManageProfileRoute="isManageProfileRoute"
            v-if="!isRouteLogin"
            :manageProfileData="manageProfileData"
          ></UserRegistration>
          <!-- :isLoading="isLoading" -->
          <UserLogin @submitForm="submitForm" v-else></UserLogin>
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
    // const isLoading = ref();
    const store = useStore();
    const isRouteLogin = ref();
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
      // console.log("work");

      // on Login
      if (isRouteLogin.value) {
        try {
          await store.dispatch("auth/userLogin", {
            email: value.email,
            password: value.password,
          });
          store.dispatch("auth/getUserData");
          // console.log("try");
        } catch (error) {
          catchError.value = error;
          return;
        }
        router.push("/");
      } else {
        // on registration sending this to admin dashboard
        if (value.password) {
          try {
            await store.dispatch("auth/signUpWithEmailPassword", {
              email: value.email,
              password: value.password,
            });
          } catch (error) {
            catchError.value = error;
            return false;
          }
          router.push("/login");
        }
        // sending this to database
        await store.dispatch("auth/registration", {
          firstName: value.firstName,
          lastName: value.lastName,
          email: value.email,
        });
      }
    }

    // Data for Patch
    const manageProfileData = ref();

    // Checking currentPage in manage profile ?
    const isManageProfileRoute = ref(false);
    watch(
      () => route.path,
      () => {
        if (route.path.includes("/manage-profile")) {
          isManageProfileRoute.value = true;
          // if route is manage profile, getting active user data
          const getActiveUserData = computed(() => {
            return store.getters["auth/activeUser"];
          });
          watch(
            getActiveUserData,
            () => {
              manageProfileData.value = getActiveUserData.value;
              // console.log(manageProfileData);
            },
            { immediate: true }
          );
        } else {
          isManageProfileRoute.value = false;
          manageProfileData.value = "";
        }
      },
      { immediate: true }
    );

    /**
     * finding route to manipulate dom
     */
    const currentPage = computed(() => {
      if (isRouteLogin.value) {
        return "Login";
      } else if (isManageProfileRoute.value) {
        return "Manage Profile";
      } else {
        return "Register";
      }
    });

    // dialog
    function handleError() {
      catchError.value = "";
    }
    // expose
    return {
      isRouteLogin,
      catchError,
      handleError,
      // isLoading,
      // file,
      // uploadFile,
      submitForm,
      isManageProfileRoute,
      currentPage,
      manageProfileData: manageProfileData,
    };
  },
};
</script>

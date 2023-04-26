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
          {{ isRouteLogin ? "Login" : "Register" }}
        </h1>
        <!-- import slot -->
        <base-card>
          <Form
            @submit="submitForm"
            v-slot="{ errors }"
            :validation-schema="schema"
          >
            <!-- this div is visible only when route is registration -->
            <div v-if="!isRouteLogin" class="mb-3">
              <!-- profile upload   -->
              <!-- <div class="mb-3 profile d-flex align-items-center">
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
                <span>{{ errors.profileImage }}</span>
                <Field
                  type="file"
                  class="d-none"
                  name="profileImage"
                  id="profile"
                  @change="uploadFile"
                  ref="file"
                />
              </div> -->
              <div class="row gx-0 g-2">
                <div class="col-6">
                  <label for="firstname">Firstname</label>
                  <Field
                    type="text"
                    class="form-control"
                    name="firstName"
                    id="firstname"
                    placeholder="Firstname"
                    :class="{ 'is-invalid': errors.firstName }"
                  />
                  <span class="invalid-text text-danger">{{
                    errors.firstName
                  }}</span>
                </div>
                <div class="col-6">
                  <label for="lastname">lastName</label>
                  <Field
                    type="text"
                    class="form-control"
                    name="lastName"
                    id="lastname"
                    placeholder="Lastname"
                    :class="{ 'is-invalid': errors.lastName }"
                  />
                  <span class="invalid-text text-danger">{{
                    errors.lastName
                  }}</span>
                </div>
              </div>
            </div>
            <!-- end -->
            <!-- for login and registration similar fields  -->
            <div class="mb-3">
              <label for="email">Email </label>
              <Field
                id="email"
                type="email"
                name="email"
                class="form-control"
                placeholder="ravi.singh@test.com"
                :class="{ 'is-invalid': errors.email }"
              />
              <span class="invalid-text text-danger">{{ errors.email }}</span>
            </div>
            <div class="mb-4 mt-3">
              <label for="password">Password </label>
              <Field
                id="password"
                type="password"
                class="form-control"
                name="password"
                placeholder="Enter Password"
                :class="{ 'is-invalid': errors.password }"
              />
              <span class="invalid-text text-danger">{{
                errors.password
              }}</span>
            </div>
            <div class="d-flex flex-column">
              <!-- submit button  -->
              <div>
                <button class="btn btn-primary">
                  {{ isRouteLogin ? "Login" : "Submit" }}
                  <span v-if="isLoading"> ....</span>
                </button>
              </div>
              <!-- <div class="my-2">
                <span>{{ catchError }}</span>
              </div> -->
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
          </Form>
        </base-card>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
// component

// Setup
import { computed, ref, watch } from "vue";
// routing
import { useRoute, useRouter } from "vue-router";
// for validation
import * as yup from "yup";
import { Field, FormContext, Form } from "vee-validate";
// store
import { useStore } from "vuex";

export default {
  components: { Field, Form },

  setup() {
    const router = useRouter();
    const route = useRoute();
    const isLoading = ref("" as any);
    const store = useStore();
    const isRouteLogin = ref();
    const currentRoute = computed(() => {
      return route.path;
    });

    // loading
    const isLoadings = computed(() => {
      return store.getters["auth/isLoading"];
    });
    watch(isLoadings, () => {
      isLoading.value = isLoadings.value;
    });
    // watch(isLoading, () => {
    //   isLoading.value = store.getters["auth/isLoading"];
    // });

    // watch(
    //   () => store.getters("auth/isLoading"),
    //   () => {
    //     isLoading.value = store.getters("auth/isLoading");
    //   }
    // );

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
    const schema = yup.object({
      profileImage: yup.string(),
      firstName: yup.string().required("this field is required"),
      lastName: yup.string().required("this field is required"),
      email: yup.string().email().required("this field is required"),
      password: yup.string().required("this field is required").min(6),
    });

    // form method
    // const file = ref("");
    // function uploadFile(event: any) {
    //   const image = event.target.files[0];
    //   console.log(image);
    //   console.log(file);
    // }
    async function submitForm(value: FormContext["values"]) {
      // click on login
      if (isRouteLogin.value) {
        console.log("this is login page bro");
      } else {
        // on registration

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
          // email: value.email,
          password: value.password,
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
      isLoading,
      schema,
      catchError,
      handleError,
      // file,
      // uploadFile,
      submitForm,
    };
  },
};
</script>

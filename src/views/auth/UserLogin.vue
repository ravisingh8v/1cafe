<template>
  <Form
    @submit="$emit('submitForm', $event)"
    v-slot="{ errors }"
    :validation-schema="schema"
  >
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
      <span class="invalid-text text-danger">{{ errors.password }}</span>
    </div>
    <div class="d-flex flex-column">
      <!-- submit button  -->
      <div>
        <button type="submit" class="btn btn-primary">
          Login
          <!-- <span v-if="isLoading"> ....</span> -->
        </button>
      </div>
      <!-- <div class="my-2">
                <span>{{ catchError }}</span>
              </div> -->
    </div>
    <!-- action -->
    <span class="mx-2 mt-2">
      <span> If you don't have an account click here to </span>
      <RouterLink to="/registration" class="text-primary"
        >Registration</RouterLink
      >
    </span>
  </Form>
</template>
<script lang="ts">
import * as yup from "yup";
import { Form, Field } from "vee-validate";
export default {
  components: { Form, Field },
  props: ["isLoading"],
  setup() {
    // validation
    const schema = yup.object({
      email: yup.string().email().required("this field is required"),
      password: yup.string().required("this field is required").min(6),
    });
    return { schema };
  },
};
</script>

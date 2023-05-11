<template>
  <Form
    @submit="$emit('submitForm', $event)"
    v-slot="{ errors }"
    :validation-schema="schema"
  >
    <div class="mb-3">
      <label for="email">Email<span class="text-danger">*</span></label>
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
      <label for="password">Password<span class="text-danger">*</span></label>
      <!-- imported input field with credential show hide functionality  -->
      <BasePasswordField :errors="errors"></BasePasswordField>
      <span class="invalid-text text-danger">{{ errors.password }}</span>
    </div>
    <div class="d-flex flex-column mb-2">
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
    <span class="mt-2">
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
import BasePasswordField from "@/ui/BasePasswordField.vue";
export default {
  components: { Form, Field, BasePasswordField },
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

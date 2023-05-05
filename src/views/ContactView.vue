<template>
  <section class="contact_us theme-p mx-auto d-flex align-items-center h-100">
    <base-dialog :show="!!catchError" @close="handleError" :title="catchError">
      <p>something went wrong please try after sometimes</p>
    </base-dialog>
    <base-card class="w-100" v-if="!submitted">
      <div class="d-flex flex-column align-items-center justify-content-center">
        <h1>Contact Us</h1>
        <div class="w-100">
          <Form
            @submit="onSubmit"
            :validation-schema="schema"
            v-slot="{ errors }"
          >
            <div class="mt-3">
              <label for="" class="my-2"
                >Message <span class="text-danger">*</span>
              </label>
              <Field
                as="textarea"
                name="message"
                class="form-control"
                cols="30"
                rows="5"
                placeholder="Enter your message"
                :class="{ 'is-invalid': errors.message }"
              ></Field>
              <span class="invalid-text text-danger" v-if="errors.message">{{
                errors.message
              }}</span>
            </div>
            <div class="mt-3">
              <button type="submit" class="btn btn-primary me-2 text-nowrap">
                Submit
              </button>
              <button
                class="btn btn-secondary ms-2 text-nowrap"
                type="button"
                @click="$router.back()"
              >
                Back
              </button>
            </div>
          </Form>
        </div>
      </div>
    </base-card>
    <base-card class="w-100" v-else>
      <div class="">
        Form Submitted Successfully Go back to
        <RouterLink to="/" class="text-primary">Home</RouterLink>
      </div>
    </base-card>
  </section>
</template>

<script lang="ts">
import * as yup from "yup";
import { Field, Form, FormContext } from "vee-validate";
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  components: { Field, Form },
  setup() {
    const store = useStore();
    const catchError = ref("");
    const schema = yup.object({
      message: yup.string().required(),
    });
    const submitted = ref(false);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async function onSubmit(value: FormContext["values"]) {
      // getting hour and minute
      const today = new Date();
      const getFullDay =
        today.getDay() +
        "/" +
        (today.getMonth() + 1) +
        "/" +
        today.getFullYear();

      let getHours = today.getHours().toString();
      if (getHours.length < 2) {
        getHours = "0" + getHours;
      }
      let getMinutes = today.getMinutes().toString();
      if (getMinutes.length < 2) {
        getMinutes = "0" + getMinutes;
      }
      const time = getHours + ":" + getMinutes;
      const day = getFullDay;

      try {
        await store.dispatch("contact/sendingUserMessage", {
          message: value.message,
          time: time,
          day: day,
        });
        submitted.value = true;
      } catch (error: any) {
        catchError.value = error;
        console.log(error);
      }
    }
    // to hide error alert box
    function handleError() {
      catchError.value = "";
    }
    return { onSubmit, schema: schema, catchError, handleError, submitted };
  },
});
</script>

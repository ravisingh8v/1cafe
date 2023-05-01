<template>
  <div class="col-4">
    <div
      class="border product_card shadow card p-3"
      @click="$emit('getDetails', bakery)"
    >
      <div class="product_image_wrapper rounded">
        <img :src="bakery.imageUrl" alt="" />
      </div>
      <div class="mt-3">
        <h5 class="fs-5">{{ bakery.title }}</h5>
        <p class="">
          {{
            bakery.description.length > 50
              ? bakery.description.substring(0, 50 - 3) + "..."
              : bakery.description
          }}
        </p>
        <span>${{ bakery.price }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  props: ["bakery"],
};
</script>

<template>
  <div class="col-4">
    <div
      class="border product_card shadow card p-3"
      @click="$emit('getDetails', breakfast)"
    >
      <div class="product_image_wrapper rounded">
        <img :src="breakfast.imageUrl" alt="" />
      </div>
      <div class="mt-3">
        <h5 class="fs-5">{{ breakfast.title }}</h5>
        <p class="">
          {{
            breakfast.description.length > 50
              ? breakfast.description.substring(0, 50 - 3) + "..."
              : breakfast.description
          }}
        </p>
        <span>${{ breakfast.price }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  props: ["breakfast"],
};
</script>

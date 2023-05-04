<template>
  <div class="row gx-0">
    <div
      class="col-6 items d-flex align-items-center justify-content-center"
      :class="'order-' + feed.dataOrder"
    >
      <div class="w-50 d-flex flex-column">
        <h2 class="mb-3">{{ feed.Head }}</h2>
        <span class="mb-3 fs-5">{{ feed.Title }}</span>
        <p class="mb-3 fw-light">
          {{ feed.description }}
        </p>
        <div>
          <router-link to="/order" class="btn btn-outline-secondary"
            >See More</router-link
          >
        </div>
      </div>
    </div>
    <div
      class="col-6 items"
      :class="[feed.imageTitle, 'order-' + feed.imgOrder]"
    ></div>
  </div>
</template>
<script lang="ts">
export default {
  props: ["feed"],
};
</script>

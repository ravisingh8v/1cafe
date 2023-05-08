<template>
  <div class="row gx-0">
    <div
      class="col-6 items d-flex align-items-center justify-content-center"
      :class="feed.dataOrder + '-order'"
    >
      <div class="w-50 d-flex flex-column">
        <h2 class="mb-3" v-if="feed.head">{{ feed.Head }}</h2>
        <span class="mb-3 fs-5" v-if="feed.head">{{ feed.Title }}</span>
        <h2 class="mb-3 fs-1" v-else>{{ feed.Title }}</h2>
        <p class="mb-3 fw-light">
          {{ feed.description }}
        </p>
        <div>
          <router-link to="/order" class="btn btn-outline-secondary">{{
            feed.head ? "See More" : "View Menu"
          }}</router-link>
        </div>
      </div>
    </div>
    <div class="col-6 items" :class="[feed.imageTitle]"></div>
  </div>
</template>
<script lang="ts">
export default {
  props: ["feed"],
};
</script>

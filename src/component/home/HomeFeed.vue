<template>
  <div class="row gx-0" v-for="feed in feedData" :key="feed.Head">
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
  data() {
    return {
      feedData: [
        {
          Head: "Eats.",
          Title: "Breakfast, Lunch and Artisanal Pastries",
          description:
            " I'm a paragraph. here we can write about our Product and Details of our product this is dummy text here.",
          imageTitle: "food",
          imgOrder: "2",
          dataOrder: "1",
        },
        {
          Head: "Drink.",
          Title: "he Freshest Cup in Town",
          description:
            "  I'm a paragraph. here we can write about our Product and Details of our product this is dummy text here.",
          imageTitle: "drink",
          imgOrder: "1",
          dataOrder: "2",
        },
      ],
    };
  },
};
</script>

<template>
  <div>
    <home-feed-item
      v-for="feed in feedData"
      :key="feed.Head"
      :feed="feed"
    ></home-feed-item>
  </div>
</template>
<script lang="ts">
import HomeFeedItem from "./HomeFeedItem.vue";

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
  components: { HomeFeedItem },
};
</script>

<template>
  <div>hello i a cart</div>
</template>
<script lang="ts">
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    store.dispatch("products/getCartData");

    return {};
  },
};
</script>

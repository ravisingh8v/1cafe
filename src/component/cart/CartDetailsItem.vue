<template>
  <div
    class="d-flex align-items-center justify-content-between border mt-2 p-2 rounded"
  >
    <!-- left wrapper  -->
    <div class="d-flex align-items-center">
      <!-- image wrapper  -->
      <div class="cart_image_wrapper rounded">
        <img :src="cart.imageUrl" alt="" />
      </div>
      <!-- title and actions  -->
      <div class="ms-2">
        <p class="m-0">{{ cart.title }}</p>
        <div>
          <a
            class="text-primary p-0 ms-1 me-1"
            @click="$emit('editItem', cart)"
          >
            Edit
          </a>
          <a class="text-danger p-0 ms-1" @click="$emit('deleteItem', cart.id)">
            Delete
          </a>
        </div>
      </div>
    </div>
    <!-- right wrapper  -->
    <div class="d-flex flex-column">
      <span class="text-end">Quantity: {{ cart.quantity }}</span>
      <span class="text-end">Total Price: ${{ cart.totalPrice }}</span>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  props: ["cart"],
};
</script>

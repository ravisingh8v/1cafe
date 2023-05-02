<template>
  <div class="h-100 w-100 d-flex justify-content-end">
    <div
      class="cart_details justify-content-between card rounded-0 shadow overflow-auto"
      @click.stop
    >
      <div class="overflow-auto">
        <!-- title  -->
        <div
          class="p-4 d-flex justify-content-between position-sticky top-0 bg-white"
        >
          <h3 class="fs-2">My Orders</h3>
          <span
            class="cp close_button material-symbols-outlined"
            @click="$emit('close')"
            >close</span
          >
        </div>
        <!-- items  -->
        <div class="mt-4 px-4">
          <!-- cart 1 -->
          <TransitionGroup tag="div" name="cart" mode="out-in">
            <CartDetailsItem
              v-for="(cart, index) in carts"
              :key="index"
              :cart="cart"
              @deleteItem="deleteItem"
            ></CartDetailsItem>
          </TransitionGroup>
        </div>
        <!-- break line  -->
        <div class="border-top mt-3"></div>
        <!-- subtotal -->
        <div class="d-flex justify-content-between px-4 p-2">
          <span>Subtotal</span>
          <span>${{ subTotal }}</span>
        </div>
      </div>
      <!-- bottom  -->
      <!-- checkout -->
      <div class="p-4">
        <button class="w-100 checkout btn btn-primary">Checkout</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import CartDetailsItem from "./CartDetailsItem.vue";
export default {
  components: { CartDetailsItem },
  props: {
    cartData: {
      type: Object,
    },
  },
  setup(props: any) {
    const store = useStore();
    store.dispatch("products/getCartData");
    // subtotal price
    const subTotal = ref();
    const totalPrice = computed(() => {
      let total = 0;
      for (const key in props.cartData) {
        total += props.cartData[key].totalPrice;
      }
      return total;
    });
    // watch on total price changes
    watch(
      totalPrice,
      () => {
        subTotal.value = totalPrice.value;
      },
      { immediate: true }
    );

    // getting props data into another variable to perform some local operation
    const carts = ref();

    const cartData = computed(() => {
      return props.cartData;
    });
    watch(cartData, () => {
      carts.value = cartData.value;
    });

    // calling method delete cart item

    async function deleteItem(id: number) {
      try {
        store.dispatch("products/deleteCartItem", id);
        const index = carts.value.findIndex((data: any) => data.id === id);
        carts.value.splice(index, 1);
      } catch (e: any) {
        console.log("error");
      }
    }

    return { subTotal, deleteItem, carts };
  },
};
</script>
<style lang="scss" scoped>
// cart animation

.cart-leave-from {
  opacity: 1;
}
.cart-leave-active {
  transition: all 0.35s ease-in;
}
.cart-leave-to {
  opacity: 0;
}
.cart-move {
  transition: all 5s ease;
}
</style>

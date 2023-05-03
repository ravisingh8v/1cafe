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
          style="z-index: 200"
        >
          <h3 class="fs-2">My Orders</h3>
          <span
            class="cp close_button material-symbols-outlined"
            @click="$emit('close')"
            >close</span
          >
        </div>
        <!-- items  -->
        <TransitionGroup
          tag="div"
          mode="out-in"
          class="mt-4 position-relative px-4 overflow-hidden"
          name="cart"
        >
          <!-- cart 1 -->
          <CartDetailsItem
            v-for="cart in carts"
            :key="cart.id.toString()"
            :cart="cart"
            @deleteItem="deleteItem"
            @editItem="$emit('editItem', $event)"
          ></CartDetailsItem>
          <!-- break line  -->
          <div
            v-if="show && carts"
            :key="'horizontal'"
            class="border-top mt-3 horizontal_line"
          ></div>

          <!-- subtotal -->
          <div
            v-if="show && carts"
            :key="'subTotal'"
            class="d-flex justify-content-between px-4 p-2"
          >
            <span>Subtotal</span>
            <span>${{ subTotal }}</span>
          </div>
          <!-- div to help in transition smoother  -->
          <div class="py-5" key="space"></div>
        </TransitionGroup>
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
import { ref, computed, watch, Ref } from "vue";
import { useStore } from "vuex";
import CartDetailsItem from "./CartDetailsItem.vue";
import { Cart } from "./model/CartModel";
export default {
  components: { CartDetailsItem },
  props: {
    cartData: {
      type: Object,
    },
  },
  setup(props: any, context: any) {
    const store = useStore();
    store.dispatch("products/getCartData");

    // subtotal price
    const subTotal: Ref<number> = ref(0);
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

    const carts: Ref<Cart[]> = ref([]);

    const cartData: Ref<Cart[]> = computed(() => {
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
        context.emit("itemDeleted", carts.value.length);
      } catch (e: any) {
        console.log("error");
      }
    }
    // to hide the Element
    const show = ref(false);
    setTimeout(() => {
      show.value = true;
    }, 1000);
    return { subTotal, deleteItem, carts, show };
  },
};
</script>
<style lang="scss" scoped>
// cart animation

.cart-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.cart-leave-active {
  transition: all 0.35s ease-in;
  position: absolute;
  width: 100%;
}
.cart-leave-to {
  opacity: 0;
  transform: translateX(200px);
}
.cart-move {
  transition: all 0.8s ease;
}
</style>

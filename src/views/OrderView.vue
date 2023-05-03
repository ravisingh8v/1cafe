<template>
  <section class="mb-5">
    <!-- order hero -->
    <OrderHero></OrderHero>

    <!-- navigation  -->
    <section class="theme-p mt-3">
      <nav
        class="px-1 d-flex justify-content-between order_breadcrumb border-bottom text-secondary position-relative"
      >
        <div>
          <a
            to="/"
            class="pe-2 ps-1"
            :class="
              isBakery
                ? 'text-primary border-bottom border-3 border-primary'
                : ''
            "
            @click="activeComponent('bakery')"
            >Bakery</a
          >
          <a
            to="/"
            class="ps-2"
            @click="activeComponent('breakfast')"
            :class="
              !isBakery
                ? 'text-primary border-bottom border-3 border-primary'
                : ''
            "
            >Breakfast</a
          >
        </div>
        <div class="card_btn position-absolute end-0">
          <button
            class="py-2 px-4 btn btn-secondary d-flex align-items-center"
            @click="viewCart"
          >
            <span class="p-2 material-symbols-outlined me-2 position-relative">
              shopping_cart<span
                class="position-absolute top-0 end-0 cart_item_count rounded-circle bg-danger"
                >{{ cartItems }}</span
              > </span
            ><span class="me-2">View Cart</span>
          </button>
        </div>
      </nav>

      <!-- router view  -->
      <!-- <RouterView v-slot="slotProps">
        <Transition name="route" mode="out-in">
          <component :is="slotProps.Component"></component>s
        </Transition>
      </RouterView> -->

      <section class="px-1 mt-5">
        <Transition name="route" mode="out-in">
          <component
            :is="currentComponent"
            @getDetails="getDetails"
          ></component>
        </Transition>
      </section>
    </section>
    <!-- overlay component  -->
    <Transition name="overlay">
      <section
        v-if="productDetail || cartDetails"
        @click="(productDetail = null), (cartDetails = false)"
        class="product_details_wrapper position-fixed top-0 bottom-0 start-0 end-0 bg-dark bg-opacity-75 d-flex justify-content-center align-items-center"
      >
        <product-detail
          v-if="productDetail"
          :productDetail="productDetail"
          @cartAdded="cartAdded"
        ></product-detail>
        <CartDetails
          v-else
          @close="cartDetails = false"
          :cartData="cartData"
          @itemDeleted="itemDeleted"
          @editItem="editCartItem"
        ></CartDetails>
      </section>
    </Transition>
  </section>
</template>
<script lang="ts">
import OrderHero from "@/component/layout/OrderHero.vue";
import BakeryList from "@/component/product/bakery/BakeryList.vue";
import BreakfastList from "@/component/product/breakfast/BreakfastList.vue";
import ProductDetail from "@/component/product/product-details/ProductDetail.vue";

import { useStore } from "vuex";
import {
  shallowRef,
  ref,
  computed,
  watch,
  provide,
  defineComponent,
} from "vue";
import CartDetails from "@/component/cart/CartDetails.vue";
import { Cart } from "@/component/cart/model/CartModel";
export default defineComponent({
  components: { OrderHero, BakeryList, ProductDetail, CartDetails },
  setup() {
    const store = useStore();
    // for active component
    const currentComponent = shallowRef();
    // default component
    const isBakery = ref(true);

    // for dynamic component bakery and breakfast
    currentComponent.value = BakeryList;
    function activeComponent(value: string) {
      if (value == "bakery") {
        isBakery.value = true;
        currentComponent.value = BakeryList;
      } else if (value == "breakfast") {
        isBakery.value = false;
        currentComponent.value = BreakfastList;
      }
    }

    // get products
    const allBakeryProduct: any = ref();
    const allBreakfastProduct: any = ref();
    const products = computed(() => {
      return store.getters["products/allProducts"];
    });
    watch(products, () => {
      allBakeryProduct.value = products.value.filter(
        (res: any) => res.category == "bakery"
      );
      allBreakfastProduct.value = products.value.filter(
        (res: any) => res.category == "breakfast"
      );
    });

    // get details function and sending to another component
    const productDetail = ref();
    function getDetails(value: any) {
      productDetail.value = value;
      // router.push("");
    }

    // view cart
    const cartData = ref();
    const cartItems = ref();
    // cartData.value = store.getters["products/cartData"];
    const carts = computed(() => {
      return store.getters["products/cartData"];
    });
    watch(carts, () => {
      cartData.value = carts.value;
      cartItems.value = carts.value.length;
    });

    const cartDetails = ref();
    cartDetails.value = false;
    function viewCart() {
      cartDetails.value = true;
    }

    //when cart added
    function cartAdded(value: any) {
      if (value == true) {
        productDetail.value = null;
      }
    }
    function editCartItem(cartData: Cart) {
      if (cartData) {
        productDetail.value = cartData;
      }
    }
    // getting cart data
    // const cartData =
    function itemDeleted(value: number) {
      cartItems.value = value;
    }

    // provide this to bakery and breakfast component
    provide("allBakeryProduct", allBakeryProduct);
    provide("allBreakfastProduct", allBreakfastProduct);

    // calling stores action method here
    store.dispatch("products/getAllProducts");
    store.dispatch("products/getCartData");

    // return
    return {
      currentComponent,
      activeComponent,
      isBakery,
      getDetails,
      viewCart,
      productDetail,
      cartDetails,
      cartAdded,
      cartData,
      cartItems,
      itemDeleted,
      editCartItem,
    };
  },
});
</script>
<style lang="scss">
// animation
.overlay-enter-from {
  opacity: 0;
}
.overlay-enter-active {
  transition: all 0.35s ease-out;
}
.overlay-enter-to {
  opacity: 1;
}
.overlay-leave-from {
  opacity: 1;
}
.overlay-leave-active {
  transition: all 0.25s ease-out;
}
.overlay-leave-to {
  opacity: 0;
}
</style>

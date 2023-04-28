<template>
  <section class="mb-5">
    <!-- order hero -->
    <OrderHero></OrderHero>

    <!-- navigation  -->
    <section class="theme-p mt-3">
      <nav class="px-1 order_breadcrumb border-bottom text-secondary">
        <a
          to="/"
          class="pe-2 ps-1"
          :class="
            isBakery ? 'text-primary border-bottom border-3 border-primary' : ''
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
      </nav>

      <!-- router view  -->
      <!-- <RouterView v-slot="slotProps">
        <Transition name="route" mode="out-in">
          <component :is="slotProps.Component"></component>s
        </Transition>
      </RouterView> -->

      <section class="px-1 mt-5">
        <Transition name="route" mode="out-in">
          <component :is="currentComponent"></component>
        </Transition>
      </section>
    </section>
  </section>
</template>
<script lang="ts">
import OrderHero from "@/component/layout/OrderHero.vue";
import BakeryList from "@/component/product/bakery/BakeryList.vue";
import BreakfastList from "@/component/product/breakfast/BreakfastList.vue";
import { useStore } from "vuex";
import { shallowRef, ref, computed, watch, provide } from "vue";
export default {
  components: { OrderHero, BakeryList },
  setup() {
    const store = useStore();
    const currentComponent = shallowRef(BakeryList);
    const isBakery = ref(true);

    function activeComponent(value: string) {
      console.log("hello");

      if (value == "bakery") {
        isBakery.value = true;
        currentComponent.value = BakeryList;
      } else if (value == "breakfast") {
        isBakery.value = false;
        currentComponent.value = BreakfastList;
      }
    }

    // get products
    const allBakeryProduct = ref();
    const allBreakfastProduct = ref();

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
    provide("allBakeryProduct", allBakeryProduct);
    provide("allBreakfastProduct", allBreakfastProduct);

    store.dispatch("products/getAllProducts");
    return {
      currentComponent,
      activeComponent,
      isBakery,
      allBakeryProduct,
      allBreakfastProduct,
    };
  },
};
</script>

<template>
  <nav
    class="px-1 d-flex justify-content-between order_breadcrumb border-bottom text-secondary position-relative"
  >
    <div class="d-flex">
      <div class="text-nowrap me-0 me-md-3">
        <a
          to="/"
          class="pe-2 ps-1 d-inline-block h-100"
          :class="
            isBakery ? 'text-primary border-bottom border-3 border-primary' : ''
          "
          @click="$emit('activeComponent', 'bakery')"
          >Bakery</a
        >
        <a
          to="/"
          class="ps-2 d-inline-block h-100"
          @click="$emit('activeComponent', 'breakfast')"
          :class="
            !isBakery
              ? 'text-primary border-bottom border-3  border-primary'
              : ''
          "
          >Breakfast</a
        >
      </div>
      <div class="search_wrapper ms-0 ms-md-3 d-md-block d-none">
        <div class="search_bar_wrapper position-relative">
          <input
            type="search"
            placeholder="Search"
            class="form-control"
            :value="clearSearchValue"
            @input="$emit('searchedTerm', $event)"
          />
          <span
            class="material-symbols-outlined icon position-absolute top-50 end-0 translate-middle-y pe-2"
          >
            search
          </span>
        </div>
      </div>
    </div>
    <div class="card_btn">
      <button
        class="py-1 px-sm-4 px-2 btn btn-secondary d-flex align-items-center"
        @click="$emit('viewCart')"
      >
        <span class="p-2 material-symbols-outlined me-2 position-relative">
          shopping_cart
          <div
            class="position-absolute top-0 end-0 cart_item_count rounded-circle bg-danger"
          >
            {{ cartItems || 0 }}
          </div> </span
        ><span class="me-2 d-none d-sm-block">View Cart</span>
      </button>
    </div>
  </nav>
</template>
<script lang="ts">
export default {
  props: ["cartItems", "isBakery", "clearSearchValue"],
};
</script>

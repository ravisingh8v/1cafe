<template>
  <div
    class="hero_carousel bg-secondary position-relative d-flex justify-content-center text-white"
  >
    <!-- transition the items  -->
    <Transition mode="out-in" name="carousel">
      <div
        class="p-3 item_1 w-100 d-flex justify-content-center"
        v-if="firstSlide"
      >
        <div class="">
          Daily Deal <span class="mx-3">|</span> Coffee & Pastry $3.99
        </div>
      </div>
      <div
        class="p-3 item_2 w-100 d-flex justify-content-center"
        v-else-if="secondSlide"
      >
        Weekend Brunch <span class="mx-3">|</span> Saturday 9am - 2pm
      </div>
    </Transition>
    <!-- action buttons  -->
    <a class="prev" @click="prev(count)">&lt;</a>
    <a class="next" @click="next(count)">&gt;</a>
  </div>
</template>
<script lang="ts">
import { ref, watch } from "vue";
export default {
  setup() {
    // data
    const count = ref(1);
    const firstSlide = ref();
    const secondSlide = ref();
    const thirdSlide = ref();

    watch(
      count,
      () => {
        if (count.value === 1) {
          firstSlide.value = true;
          secondSlide.value = false;
        } else if (count.value === 2) {
          secondSlide.value = true;
          firstSlide.value = false;
        }
      },
      { immediate: true }
    );
    // auto movement
    setInterval(() => {
      if (count.value == 2) {
        count.value = 1;
      } else {
        count.value = 2;
      }
    }, 5000);

    // function
    // previous slide
    function prev(value: number) {
      if (count.value > 1) {
        count.value = value - 1;
      } else {
        count.value = 2;
      }
    }
    // next slide
    function next(value: number) {
      if (count.value < 2) {
        count.value = value + 1;
      } else {
        count.value = 1;
      }
      console.log(count.value);
    }

    return { count, prev, next, firstSlide, secondSlide, thirdSlide };
  },
};
</script>
<style lang="scss">
.carousel-enter-from {
  opacity: 0;
  transform: translateX(480px);
  // background-color: rgba(255, 255, 255, 0.863);
}
.carousel-leave-from {
  opacity: 1;
  background-color: unset;
  transform: translateX(0px);
}
.carousel-enter-active {
  transition: all 0.5s ease-out;
}
.carousel-leave-active {
  transition: all 0.5s ease-in;
}
.carousel-enter-to {
  opacity: 1;
  background-color: unset;
  transform: translateX(0px);
}
.carousel-leave-to {
  opacity: 0;
  transform: translateX(-480px);
  // background-color: rgba(255, 255, 255, 0.863);
}
</style>

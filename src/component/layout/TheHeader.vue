<template>
  <header
    class="theme-p bg-dark d-flex justify-content-between align-items-center text-white"
  >
    <!-- left section  -->
    <div>
      <div>
        <img src="./../../assets/images/logo/1Cafe.svg" alt="" />
      </div>
    </div>
    <!-- right section  -->
    <div class="d-flex">
      <!-- navigation  -->
      <nav class="navbar">
        <ul class="d-flex nav">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/order">Order</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/contact">Contact</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="about">About</RouterLink>
          </li>
        </ul>
      </nav>
      <!-- profile  -->
      <div class="ms-3 d-flex align-items-center position-relative">
        <div
          class="cp user_profile_wrapper d-flex align-items-center justify-content-center"
          :class="!true ? 'border border-secondary' : 'd-none'"
          @click="openProfileMenu"
        >
          <img
            src="./../../assets/images/logo/1Cafe.svg"
            v-if="!true"
            alt="profile image"
          />
        </div>
        <div class="ms-2" v-if="!true" @click="openProfileMenu">
          <a>Ravi Singh</a>
        </div>

        <div
          v-if="openMenu"
          class="profile_action_wrapper shadow border border-secondary position-absolute w-100 bg-dark"
        >
          <ul>
            <li class="cp p-2"><a>Profile</a></li>
            <li class="cp p-2"><a>Logout</a></li>
          </ul>
        </div>

        <div class="ms-2" v-if="isLogin !== '/login'">
          <RouterLink class="btn btn-primary" to="/login">Log in</RouterLink>
        </div>
        <div class="ms-2" v-else>
          <RouterLink class="btn btn-primary" to="/registration">
            Registration
          </RouterLink>
        </div>
      </div>
    </div>
  </header>
</template>

<!-- script -->
<script lang="ts">
import { ref } from "vue";
export default {
  props: ["isLogin"],
  setup() {
    const openMenu = ref(false);

    function openProfileMenu() {
      openMenu.value = !openMenu.value;
    }
    return { openMenu, openProfileMenu };
  },
};
</script>

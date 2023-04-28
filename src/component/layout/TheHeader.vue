<template>
  <!-- v-if="scrolled" -->
  <header
    class="main_header theme-p bg-dark d-flex justify-content-between align-items-center text-white position-sticky top-0"
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
            <RouterLink class="nav-link" to="/about">About</RouterLink>
          </li>
        </ul>
      </nav>
      <!-- profile  -->
      <div class="ms-3 d-flex align-items-center position-relative">
        <div
          class="cp user_profile_wrapper d-flex align-items-center justify-content-center"
          @click="openProfileMenu"
          v-if="isAuthenticated"
        >
          <span class="material-symbols-outlined"> account_circle </span>
        </div>
        <div class="ms-2" v-if="isAuthenticated" @click="openProfileMenu">
          <a>{{ user }}</a>
        </div>

        <div
          v-if="openMenu && isAuthenticated"
          class="profile_action_wrapper shadow border border-secondary position-absolute w-100 bg-dark"
        >
          <ul>
            <li class="cp p-2"><a>Profile</a></li>
            <li class="cp p-2" @click="logout">
              <a>Logout</a>
            </li>
          </ul>
        </div>

        <div v-if="!isAuthenticated">
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
    </div>
  </header>
</template>

<!-- script -->
<script lang="ts">
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  props: ["isLogin", "isAuthenticated", "scrolled", "menu"],
  setup(props: any, context: any) {
    const store = useStore();
    const router = useRouter();

    // for profile menu
    const openMenu = ref(false);

    function openProfileMenu() {
      openMenu.value = !openMenu.value;
      context.emit("openMenu", openMenu.value);
    }
    const menuComp = computed(() => {
      return props.menu;
    });
    watch(menuComp, () => {
      openMenu.value = menuComp.value;
      console.log(menuComp.value);
    });

    // getting user
    const user = ref();
    const activeUser = computed(() => {
      return store.getters["auth/activeUser"];
    });
    watch(activeUser, () => {
      user.value = activeUser.value.firstName + " " + activeUser.value.lastName;
    });
    // user.value = activeUser.value;
    function logout() {
      store.dispatch("auth/logout");
      openMenu.value = false;
      router.push("/");
    }

    return { store, openMenu, openProfileMenu, user, logout };
  },
};
</script>

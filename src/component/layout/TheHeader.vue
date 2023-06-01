<template>
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
    <input
      type="checkbox"
      name=""
      class="d-none"
      id="toggleNav"
      :checked="isChecked"
    />
    <div
      class="mobile_navigation"
      ref="mobileNavigation"
      @click="openMenu = false"
    >
      <!-- navigation  -->
      <nav class="navbar">
        <ul class="d-flex nav" @click="isChecked = false">
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
      <div
        class="profile_action d-flex align-items-center position-relative"
        :class="{ 'ms-3': !isAuthenticated }"
        @click.stop
      >
        <div
          class="user_wrapper d-flex align-items-center"
          :class="{ 'min-w-100': isAuthenticated }"
        >
          <div
            class="cp user_profile_wrapper d-flex align-items-center justify-content-center"
            @click="openProfileMenu"
            v-if="isAuthenticated"
          >
            <span class="material-symbols-outlined"> account_circle </span>
          </div>
          <div class="ms-2" @click="openProfileMenu">
            <a>{{ user }}</a>
          </div>
        </div>

        <!-- Profile Menu  -->
        <div
          v-if="openMenu && isAuthenticated"
          class="profile_action_wrapper shadow border border-secondary position-absolute w-100 bg-dark"
        >
          <ul @click="isChecked = false">
            <li
              class="cp p-2 d-flex align-items-center"
              @click="$router.push('/manage-profile'), (openMenu = false)"
            >
              <span class="me-1 material-symbols-outlined"> person </span>
              <a>Profile</a>
            </li>
            <li class="cp p-2 d-flex align-items-center" @click="logout">
              <span class="me-1 material-symbols-outlined"> logout </span>
              <a>Logout</a>
            </li>
          </ul>
        </div>

        <!-- login and registration link  -->
        <div v-if="!isAuthenticated">
          <div @click="isChecked = false">
            <RouterLink
              class="btn btn-primary"
              :to="isLogin !== '/login' ? '/login' : '/registration'"
              >{{ isLogin !== "/login" ? "Login" : "Registration" }}</RouterLink
            >
          </div>
        </div>
      </div>
      <!-- close icon  -->
      <label @click="closeNav" for="" class="close_mobile_navigation">
        <span class="fs-1 primary_close_btn icon material-symbols-outlined">
          close
        </span>
      </label>
    </div>
    <!-- hamburger icon  -->
    <label
      for=""
      class="hamburger_icon fs-1 material-symbols-outlined"
      ref="hamburgerIcon"
      @click="openNav"
    >
      menu
    </label>
  </header>
</template>

<!-- script -->
<script lang="ts">
// Imports
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

// Export headers logics
export default {
  // Props
  props: ["isLogin", "isAuthenticated", "scrolled", "menu"],

  setup(props: any, context: any) {
    // Variables
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
    });

    // getting user
    const user = ref();
    const activeUser = computed(() => {
      return store.getters?.["auth/activeUser"] || " ";
    });

    watch(
      activeUser,
      () => {
        if (activeUser.value?.["firstName" || "lastName"]) {
          user.value =
            activeUser.value?.firstName + " " + activeUser.value?.lastName;
        } else {
          user.value = "";
        }
      },
      { immediate: true }
    );

    // Logout
    function logout() {
      store.dispatch("auth/logout");
      openMenu.value = false;
      user.value = "";
      router.push("/login");
    }

    // for mobile navigation
    const isChecked = ref<boolean>(false);
    function closeNav() {
      isChecked.value = false;
    }
    function openNav() {
      isChecked.value = true;
    }
    return {
      store,
      openMenu,
      openProfileMenu,
      user,
      logout,
      openNav,
      isChecked,
      closeNav,
      // hamburgerIcon,
    };
  },
};
</script>
<style lang="scss" scoped>
// style
</style>

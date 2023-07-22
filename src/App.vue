<template>
  <div id="app">
    <NavBar />
    <!-- <TrendinJob></TrendinJob> -->
    <router-view></router-view>
    <FooTer v-if="isHomePage" class="footer bg-dark text-white">
      <!-- Footer content (same as before) -->
    </FooTer>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import FooTer from "./components/FooTer.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

export default {
  components: {
    NavBar,
    FooTer,
    // TrendinJob,
    // FooTer,
  },
  setup() {
    const route = useRoute();
    const isHomePage = computed(() => route.path === "/");
    return {
      isHomePage,
    };
  },
};
</script>

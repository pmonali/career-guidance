<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <router-link to="/" class="navbar-brand">VirtualMentor</router-link>

    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/career" class="nav-link">Careers</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/voccareer" class="nav-link"
            >Vocational Courses</router-link
          >
        </li>
      </ul>
      <ul class="navbar-nav drop">
        <!-- Check loggedIn and show dropdown if true -->
        <li v-if="loggedIn" class="nav-item dropdown">
          <b-dropdown id="userDropdown" :text="'Welcome, ' + firstName" right>
            <router-link to="/dashboard" class="dropdown-item"
              >Dashboard</router-link
            >
            <b-dropdown-item @click="logoutUser">Logout</b-dropdown-item>
          </b-dropdown>
        </li>
        <!-- If not loggedIn, show login link -->
        <li v-else class="nav-item">
          <router-link to="/login" class="nav-link">
            <i class="fas fa-sign-in-alt"></i> Login
          </router-link>
        </li>
      </ul>
    </div>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
  </nav>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import axios from "axios";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const loggedIn = computed(() => store.state.loggedIn);
    const firstName = computed(() => store.state.firstName);
    // console.log("fn", firstName.value);
    const logoutUser = async () => {
      try {
        const sessionID = localStorage.getItem("sessionID");
        const response = await axios.post("/api/logout", { sessionID });
        console.log(response.data.message); // Optional: You can display the success message if needed

        // Remove session data from local storage and update Vuex store state
        localStorage.removeItem("sessionID");
        localStorage.removeItem("firstName");
        localStorage.removeItem("education");
        localStorage.removeItem("email");
        store.commit("setLoggedIn", false);
        store.commit("setUsername", "firstName");

        // Navigate to the login page
        router.push("/login");
      } catch (error) {
        console.error(error);
        // Handle error if logout fails
      }
    };

    return {
      loggedIn,
      firstName,
      logoutUser,
    };
  },
};
</script>
<style scoped>
/* Add general styles */
body {
  font-family: Arial, sans-serif;
}

/* Navbar styles */
.navbar {
  background-color: #343a40;
}

.navbar-brand {
  font-size: 24px;
}

.nav-link {
  color: #ffffff;
}

.nav-link:hover {
  color: #f8f9fa;
}

/* Move the dropdowns to the right */
#navbarNav {
  justify-content: space-between;
}

/* Language dropdown styles */
#langDropdown .dropdown-menu {
  background-color: #343a40;
}

#langDropdown .dropdown-item {
  color: #ffffff;
}

#langDropdown .dropdown-item:hover {
  background-color: #f8f9fa;
  color: #343a40;
}

/* User dropdown styles */
#userDropdown .dropdown-menu {
  background-color: #343a40;
}

#userDropdown .dropdown-item {
  color: #ffffff;
}

#userDropdown .dropdown-item:hover {
  background-color: #f8f9fa;
  color: #343a40;
}

/* Adjust mobile styles for the navbar */
@media (max-width: 576px) {
  .navbar-brand {
    font-size: 20px;
  }
}
</style>

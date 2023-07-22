<template>
  <div class="login-container">
    <h2 class="login-heading">Login</h2>
    <form @submit.prevent="loginUser" novalidate>
      <div class="form-group">
        <label for="email">Email Id:</label>
        <input
          type="email"
          id="email"
          v-model="email"
          required
          minlength="3"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
          minlength="6"
          class="form-control"
        />
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
    <div v-if="successMessage" class="alert alert-success mt-3">
      {{ successMessage }}
    </div>
    <div v-if="errorMessage" class="alert alert-danger mt-3">
      {{ errorMessage }}
    </div>
    <div class="mt-3">
      <p>
        Not registered yet? <router-link to="/register">Register</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useStore } from "vuex";
import { ref } from "vue";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const email = ref("");
// const username = ref("");
// const firstName = ref("");

const password = ref("");
const successMessage = ref("");
const errorMessage = ref("");

const loginUser = async () => {
  if (
    !email.value ||
    email.value.length < 3 ||
    !password.value ||
    password.value.length < 6
  ) {
    return;
  }

  try {
    const response = await axios.post("/api/login", {
      email: email.value,
      password: password.value,
    });

    const sessionID = response.data.sessionID;
    localStorage.setItem("sessionID", sessionID);

    // Fetch user data to get the education value
    const userDataResponse = await axios.get(
      `/api/user?sessionID=${sessionID}`
    );
    const userData = userDataResponse.data;
    const education = userData.Education;
    const firstName = userData.FirstName;
    console.log("hi", firstName);

    localStorage.setItem("education", education);

    // Use Vuex store mutations to update the loggedIn and username state
    store.commit("setLoggedIn", true);
    store.commit("setUsername", firstName);
    store.commit("setEmail", email.value);

    // Show success message and navigate to home page after a short delay
    successMessage.value = "Login successful!";
    errorMessage.value = ""; // Reset any previous error message
    setTimeout(() => {
      successMessage.value = "";
      router.push("/");
    }, 1500); // Adjust the delay time as needed
  } catch (error) {
    console.error(error);
    // Handle error when login fails
    successMessage.value = ""; // Reset any previous success message
    errorMessage.value = "Login failed. Please check your credentials.";
  }
};
</script>

<style scoped>
.login-heading {
  font-size: 24px;
  margin-bottom: 16px;
}

.form-group {
  margin-bottom: 16px;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.2s ease-in-out; /* Add transition for hover effect */
}

/* Increase the width of the form fields */
.form-control {
  width: 300px;
}

.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.form-control:focus {
  outline: none;
  box-shadow: 0 0 4px rgba(0, 123, 255, 0.6);
  border-color: #007bff;
}

/* Add hover effect on form fields */
.form-control:hover {
  border-color: #0056b3;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.success-message {
  color: green;
  margin-top: 10px;
}

.error-message {
  color: red;
  margin-top: 10px;
}

a {
  color: #007bff;
  text-decoration: none;
  transition: color 0.2s ease-in-out;
}

a:hover {
  color: #0056b3;
}

.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 40px 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  background-color: #fff;
}
body {
  font-family: "Arial", sans-saerif;
}
</style>

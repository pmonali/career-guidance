<template>
  <div class="container">
    <h2 class="mt-5">User Registration</h2>
    <form @submit.prevent="registerUser" class="mt-4">
      <!-- First Name -->
      <div class="mb-3">
        <label for="firstName" class="form-label">First Name:</label>
        <input
          type="text"
          id="firstName"
          class="form-control"
          v-model="user.firstName"
          @blur="validateFirstName"
        />
        <div v-if="user.firstNameError" class="text-danger">
          {{ user.firstNameError }}
        </div>
      </div>

      <!-- Last Name -->
      <div class="mb-3">
        <label for="lastName" class="form-label">Last Name:</label>
        <input
          type="text"
          id="lastName"
          class="form-control"
          v-model="user.lastName"
          @blur="validateLastName"
        />
        <div v-if="user.lastNameError" class="text-danger">
          {{ user.lastNameError }}
        </div>
      </div>

      <!-- Mobile Number -->
      <div class="mb-3">
        <label for="mobile" class="form-label">Mobile Number:</label>
        <input
          type="tel"
          id="mobile"
          class="form-control"
          v-model="user.mobile"
          @blur="validateMobile"
        />
        <div v-if="user.mobileError" class="text-danger">
          {{ user.mobileError }}
        </div>
      </div>

      <!-- Email ID -->
      <div class="mb-3">
        <label for="email" class="form-label">Email ID:</label>
        <input
          type="email"
          id="email"
          class="form-control"
          v-model="user.email"
          @blur="validateEmail"
        />
        <div v-if="user.emailError" class="text-danger">
          {{ user.emailError }}
        </div>
      </div>

      <!-- Username -->
      <div class="mb-3">
        <label for="username" class="form-label">Username:</label>
        <input
          type="text"
          id="username"
          class="form-control"
          v-model="user.username"
          @blur="validateUsername"
        />
        <div v-if="user.usernameError" class="text-danger">
          {{ user.usernameError }}
        </div>
      </div>

      <!-- Password -->
      <div class="mb-3">
        <label for="password" class="form-label">Password:</label>
        <input
          type="password"
          id="password"
          class="form-control"
          v-model="user.password"
          @blur="validatePassword"
        />
        <div v-if="user.passwordError" class="text-danger">
          {{ user.passwordError }}
        </div>
      </div>

      <!-- Education dropdown -->
      <div class="mb-3">
        <label for="education" class="form-label">Education:</label>
        <select id="education" class="form-select" v-model="user.education">
          <option value="">Select Education</option>
          <option value="12th Science">12th Science</option>
          <option value="10th (SSC)">10th (SSC)</option>
          <!-- Add more education options -->
        </select>
        <div v-if="user.educationError" class="text-danger">
          {{ user.educationError }}
        </div>
      </div>

      <!-- Career Goal dropdown -->
      <div class="mb-3">
        <label for="careerGoal" class="form-label">Career Goal:</label>
        <select id="careerGoal" class="form-select" v-model="user.careerGoal">
          <option value="">Select Career Goal</option>
          <option
            v-for="careerOption in careerOptions"
            :key="careerOption.title"
            :value="careerOption.title"
          >
            {{ careerOption.title }}
          </option>
        </select>
        <div v-if="user.careerGoalError" class="text-danger">
          {{ user.careerGoalError }}
        </div>
      </div>

      <button type="submit" class="btn btn-primary">Register</button>
    </form>
    <div v-if="registrationSuccessful" class="alert alert-success mt-3">
      Registration successful! You can now log in with your credentials.
    </div>
    <div v-if="errorMessage" class="alert alert-danger mt-3">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        mobile: "",
        email: "",
        username: "",
        password: "",
        education: "",
        careerGoal: "",
        firstNameError: "",
        lastNameError: "",
        mobileError: "",
        emailError: "",
        usernameError: "",
        passwordError: "",
        educationError: "",
        careerGoalError: "",
      },
      careerOptions: [], // Array to store the fetched career options
      registrationSuccessful: false,
      errorMessage: "",
    };
  },
  methods: {
    async registerUser() {
      // Reset error messages before submitting
      this.resetErrors();

      // Validate all fields before submission
      if (
        !this.validateFirstName() ||
        !this.validateLastName() ||
        !this.validateMobile() ||
        !this.validateEmail() ||
        !this.validateUsername() ||
        !this.validatePassword() ||
        !this.validateEducation() ||
        !this.validateCareerGoal()
      ) {
        return;
      }

      try {
        const response = await axios.post("/api/register", this.user);
        console.log(response.data);
        this.registrationSuccessful = true;
        alert("Registration successful!");
        // Redirect to login page
        this.$router.push("/login");
      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 409) {
          this.errorMessage =
            "User with the same email or mobile number already exists";
        } else {
          this.errorMessage = "Registration failed. Please try again later.";
        }
      }
    },

    validateFirstName() {
      if (!this.user.firstName.trim()) {
        this.user.firstNameError = "First Name is required.";
        return false;
      } else {
        this.user.firstNameError = "";
        return true;
      }
    },

    validateLastName() {
      if (!this.user.lastName.trim()) {
        this.user.lastNameError = "Last Name is required.";
        return false;
      } else {
        this.user.lastNameError = "";
        return true;
      }
    },

    validateMobile() {
      if (!this.user.mobile.trim()) {
        this.user.mobileError = "Mobile Number is required.";
        return false;
      } else if (!/^\d{10}$/.test(this.user.mobile)) {
        this.user.mobileError = "Mobile Number should be 10 digits.";
        return false;
      } else {
        this.user.mobileError = "";
        return true;
      }
    },

    validateEmail() {
      if (!this.user.email.trim()) {
        this.user.emailError = "Email ID is required.";
        return false;
      } else if (!/^\S+@\S+\.\S+$/.test(this.user.email)) {
        this.user.emailError = "Invalid Email ID.";
        return false;
      } else {
        this.user.emailError = "";
        return true;
      }
    },

    validateUsername() {
      if (!this.user.username.trim()) {
        this.user.usernameError = "Username is required.";
        return false;
      } else {
        this.user.usernameError = "";
        return true;
      }
    },

    validatePassword() {
      if (!this.user.password.trim()) {
        this.user.passwordError = "Password is required.";
        return false;
      } else if (this.user.password.length < 8) {
        this.user.passwordError = "Password should be at least 8 characters.";
        return false;
      } else {
        this.user.passwordError = "";
        return true;
      }
    },

    validateEducation() {
      if (!this.user.education) {
        this.user.educationError = "Please select your education.";
        return false;
      } else {
        this.user.educationError = "";
        return true;
      }
    },

    validateCareerGoal() {
      if (!this.user.careerGoal) {
        this.user.careerGoalError = "Please select your career goal.";
        return false;
      } else {
        this.user.careerGoalError = "";
        return true;
      }
    },

    fetchCareerOptions() {
      // Fetch career options from the backend API
      axios
        .get("/api/top-trending-jobs")
        .then((response) => {
          this.careerOptions = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    resetErrors() {
      this.user.firstNameError = "";
      this.user.lastNameError = "";
      this.user.mobileError = "";
      this.user.emailError = "";
      this.user.usernameError = "";
      this.user.passwordError = "";
      this.user.educationError = "";
      this.user.careerGoalError = "";
    },
  },

  created() {
    // Fetch career options when the component is created
    this.fetchCareerOptions();
  },
};
</script>

<style scoped>
/* Your existing styles */
</style>

<style scoped>
body {
  font-family: "Arial", sans-serif;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 20px;
  margin-bottom: 20px;
}

h2 {
  text-align: center;
  color: #333;
}

.form-label {
  font-weight: bold;
}

.form-control {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
}

.form-select {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

.alert {
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
}

.alert-success {
  background-color: #d4edda;
  color: #155724;
}

.alert-danger {
  background-color: #f8d7da;
  color: #721c24;
}

/* Additional styles for responsiveness */
@media screen and (max-width: 480px) {
  .container {
    width: 100%;
    padding: 10px;
  }
}
</style>

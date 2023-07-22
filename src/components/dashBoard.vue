<template>
  <div class="container mt-5">
    <div class="card shadow-lg">
      <div class="card-body">
        <div class="d-flex align-items-center mb-3">
          <img
            src="/images/avatar.png"
            alt="User Avatar"
            class="rounded-circle mr-2"
            style="width: 50px; height: 50px"
          />
          <p class="mb-0">
            Welcome, <span class="text-primary">{{ firstName }}</span
            >!
          </p>
        </div>
        <div class="mt-4">
          <div class="row">
            <div class="col-md-12">
              <!-- Navigation buttons -->
              <div class="d-flex justify-content-between mt-4">
                <button
                  :class="{
                    'btn btn-primary': showProfile,
                    'btn btn-secondary': !showProfile,
                  }"
                  @click="showProfileSection"
                >
                  Profile
                </button>
                <button
                  :class="{
                    'btn btn-primary': showCareerPath,
                    'btn btn-secondary': !showCareerPath,
                  }"
                  @click="showCareerPathSection"
                >
                  Career Path
                </button>
                <button
                  :class="{
                    'btn btn-primary':
                      showSuggestedCareers || showSuggestedStream,
                    'btn btn-secondary':
                      !showSuggestedCareers || !showSuggestedStream,
                  }"
                  @click="showSuggestedCareersSection"
                >
                  Result Of your Assessment
                </button>
              </div>

              <!-- Profile Section -->
              <div v-if="showProfile" class="mt-4">
                <h4 class="mb-3">Personal Information:</h4>
                <p class="mb-2">First Name: {{ firstName }}</p>
                <p class="mb-2">Last Name: {{ lastName }}</p>
                <p class="mb-2">Mobile no.: {{ mobile }}</p>
                <p class="mb-2">Email Id: {{ email }}</p>
                <p class="mb-4">Education: {{ education }}</p>
                <p class="mb-4">Career Goal: {{ careerGoal }}</p>
                <!-- Update Career Goal Section -->
                <div class="mb-4">
                  <h6>Update Career Goal:</h6>
                  <select
                    id="careerGoal"
                    class="form-select"
                    v-model="selectedCareerGoal"
                  >
                    <option
                      v-for="careerOption in careerOptions"
                      :key="careerOption.title"
                      :value="careerOption.title"
                    >
                      {{ careerOption.title }}
                    </option>
                  </select>
                  <button
                    class="btn btn-primary mt-2"
                    @click="updateCareerGoal"
                  >
                    Update Career Goal
                  </button>
                  <div v-if="successMessage" class="alert alert-success mt-2">
                    {{ successMessage }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Career Path Section -->
            <div v-if="showCareerPath" class="mt-4 suggested-path">
              <h4 class="mb-3">Career Path to achieve your Career Goal:</h4>
              <ul class="list-group-item mb-1">
                <li
                  v-for="(step, index) in careerPathData"
                  :key="index"
                  class="list-group-item mb-1"
                >
                  {{ index + 1 }}. {{ step }}
                </li>
              </ul>
            </div>

            <!-- Suggested Careers Section -->
            <div v-if="showSuggestedCareers" class="mt-4 suggested-career">
              <h4 class="mb-3">Suggested Career:</h4>
              <ul class="list-group">
                <li
                  v-for="career in suggestedCareers"
                  :key="career.id"
                  class="list-group-item mb-1"
                >
                  {{ career.title }} ({{ career.percentage }}%)
                  <!-- ... existing content ... -->
                </li>
              </ul>
            </div>

            <!-- Suggested Stream Section -->
            <div v-if="showSuggestedStream" class="mt-4 suggested-stream">
              <h4 class="mb-3">Suggested Stream:</h4>
              <ul class="list-group">
                <li
                  v-for="stream in suggestedStream"
                  :key="stream.id"
                  class="list-group-item mb-1"
                >
                  {{ stream.title }} ({{ stream.percentage }}%)
                  <!-- ... existing content ... -->
                </li>
              </ul>
            </div>
            <div v-if="showNoDataMessage" class="mt-4 no-data-message">
              <p>
                Please take the assessment test to get your perfect match career
                option
              </p>
            </div>

            <div class="d-flex justify-content-end mt-4">
              <button
                v-if="education === '12th Science'"
                class="btn btn-primary"
                @click="goToAssessment"
              >
                Assessment Test for 12th(Science)
              </button>
              <button
                v-else-if="education === '10th (SSC)'"
                class="btn btn-primary"
                @click="goToAssessment2"
              >
                Assessment Test for 10th(SSC)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      education: "",
      firstName: "",
      lastName: "",
      mobile: "",
      email: "",
      colleges: [],
      careerPathData: [],
      suggestedCareers: [], // Corrected property name
      //   suggestedStream: [], // Add this new data property
      suggestedStream: "",
      careerGoal: "",
      careerPath: "",
      showProfile: true, // Show the profile section by default
      showCareerPath: false,
      showSuggestedCareers: false,
      showSuggestedStream: false, // Add this new property to control the display of the suggested stream section
      showNoDataMessage: false,
      selectedCareerGoal: "",
      successMessage: "",
    };
  },
  created() {
    this.fetchUserData();
    this.fetchCareerOptions();
  },
  methods: {
    fetchUserData() {
      const sessionID = localStorage.getItem("sessionID");

      if (!sessionID) {
        this.$router.push("/login");
      } else {
        axios
          .get(`/api/user?sessionID=${sessionID}`)
          .then((response) => {
            console.log("API Response:", response.data);
            const userData = response.data;
            this.username = userData.Username;
            localStorage.setItem("username", this.username);
            this.education = userData.Education;
            localStorage.setItem("education", this.education);
            this.firstName = userData.FirstName;
            localStorage.setItem("firstName", this.firstName);

            this.email = userData.Email;
            localStorage.setItem("email", this.email);
            this.mobile = userData.Mobile;
            this.lastName = userData.LastName;
            this.careerGoal = userData.CareerGoal;
            this.colleges = userData.colleges;
            this.suggestedCareers = userData.SuggestedCareers;
            this.suggestedStream = userData.SuggestedStream;
            console.log("Suggested Careers:", this.suggestedCareers);
            console.log("Suggested Stream:", this.suggestedStream);
            // this.careerPath = userData.path;
            this.careerGoal = userData.CareerGoal;
            // Get the career option from the response data that matches the selected career goal
            this.showAssessmentMessage();
          })
          .catch((error) => {
            console.error(error);
          });
        axios
          .get(`/api/user-career-path?sessionID=${sessionID}`)
          .then((response) => {
            console.log("API Response:", response.data);
            const pathData = response.data;
            const targetEmail = this.email;
            const targetUser = pathData.find(
              (user) => user.Email === targetEmail
            );

            if (targetUser) {
              // Set the careerPathData with the career path of the target user
              this.careerPathData = targetUser.path;
            } else {
              console.log("User with email id " + targetEmail + " not found.");
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },

    goToAssessment() {
      this.$router.push("/assessment");
    },
    goToAssessment2() {
      this.$router.push("/assessmentten");
    },
    showProfileSection() {
      this.showProfile = true;
      this.showCareerPath = false;
      this.showSuggestedCareers = false;
      this.showSuggestedStream = false; // Hide the suggested stream section when switching to other sections
    },
    showCareerPathSection() {
      this.showProfile = false;
      this.showCareerPath = true;
      this.showSuggestedCareers = false;
      this.showSuggestedStream = false; // Hide the suggested stream section when switching to other sections
    },
    showSuggestedCareersSection() {
      this.showProfile = false;
      this.showCareerPath = false;
      this.showSuggestedCareers = this.education === "12th Science";
      this.showSuggestedStream = this.education === "10th (SSC)"; // Show suggested stream section only if the education is "10th (SSC)"
      this.showAssessmentMessage();
    },
    showAssessmentMessage() {
      // Check if suggested careers section is visible and if suggestedCareers is empty
      const suggestedCareersEmpty =
        this.showSuggestedCareers &&
        (!this.suggestedCareers || this.suggestedCareers.length === 0);

      // Check if suggested stream section is visible and if suggestedStream is empty
      const suggestedStreamEmpty =
        this.showSuggestedStream &&
        (!this.suggestedStream || this.suggestedStream.length === 0);

      // Show the message if either section is visible and has no data
      this.showNoDataMessage = suggestedCareersEmpty || suggestedStreamEmpty;
    },
    updateCareerGoal() {
      const sessionID = localStorage.getItem("sessionID");
      const email = localStorage.getItem("email");
      if (!sessionID) {
        this.$router.push("/login");
        return;
      }

      axios
        .put(`/api/users/${email}/career-goal?sessionID=${sessionID}`, {
          careerGoal: this.selectedCareerGoal,
        })
        .then((response) => {
          console.log("Career goal updated successfully:", response.data);

          this.careerGoal = this.selectedCareerGoal;
          this.successMessage = "Career goal updated successfully!";

          this.showProfile = true;
          this.showCareerPath = false;
          this.showSuggestedCareers = false;
          this.showSuggestedStream = false;

          this.fetchUserData();
        })
        .catch((error) => {
          console.error("Failed to update career goal:", error);
          // Handle the error as required, e.g., show an error message to the user
        });
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
  },
};
</script>

<style scoped>
/* Add general styles */
body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  background-color: #f2f2f2;
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

.card {
  border: none;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-body {
  padding: 20px;
}

/* Style the user avatar */
.card-body img.rounded-circle {
  border: 2px solid #fff;
}

/* Style the Welcome message */
.card-body p.mb-0 {
  font-size: 18px;
}

/* Style the Personal Information section */
.card-body h4.mb-3 {
  font-size: 20px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 5px;
}

.card-body p.mb-2 {
  margin-bottom: 8px;
}

/* Style the Assessment Test buttons */
.card-body .btn-primary {
  background-color: #007bff;
  color: #fff;
  border: none;
}

/* Style the Career Path and Suggested Streams sections */
.card-body .suggested-career h4.mb-3 {
  font-size: 20px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 5px;
}

.card-body .suggested-career ul {
  padding-left: 20px;
}

.card-body .suggested-career .list-group-item {
  border: none;
}

.card-body .suggested-career .btn-secondary {
  background-color: #6c757d;
  color: #fff;
  border: none;
}

/* Style the Top Colleges section */
.card-body .mt-4 h5 {
  font-size: 18px;
  margin-bottom: 8px;
}

.card-body .mt-4 p {
  margin-bottom: 5px;
}

.card-body .mt-4 strong {
  font-weight: bold;
}

.card-body .mt-4 a {
  color: #007bff;
}

/* Responsive styles */
@media (max-width: 576px) {
  .card-body .d-flex {
    flex-direction: column;
  }

  .card-body .d-flex img.rounded-circle {
    margin-bottom: 10px;
  }
}

/* Style the Suggested Careers section */
.suggested-career h4.mb-3 {
  font-size: 20px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 5px;
}

.suggested-career ul {
  padding-left: 0;
}

.suggested-career .list-group-item {
  border: none;
  padding: 10px 0;
}

.suggested-career .btn-secondary {
  background-color: #6c757d;
  color: #fff;
  border: none;
}

/* Additional styling for the top colleges section */
.suggested-career .ml-3 {
  margin-left: 1rem !important;
}

.suggested-career h6 {
  font-size: 16px;
  margin-bottom: 8px;
}

.suggested-career p {
  margin-bottom: 5px;
}

.suggested-career strong {
  font-weight: bold;
}

.suggested-career a {
  color: #007bff;
}
.form-select {
  width: 50%;
}
</style>

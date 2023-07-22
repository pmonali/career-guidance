<template>
  <div>
    <h2 class="mt-5 text-center">Top Trending Career Options</h2>
    <div class="container mt-5">
      <div class="row">
        <div v-for="job in jobs" :key="job.id" class="col-md-6 mb-4">
          <div class="card d-flex flex-column h-100">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">{{ job.title }}</h5>
              <p class="card-text font-weight-bold mb-2">
                Qualification Required: {{ job.qualification_required }}
              </p>
              <p class="card-text text-muted">
                Salary Range: {{ job.salary_range }}
              </p>
              <!-- Add a button to show details -->
              <button class="btn btn-primary mt-auto" @click="showDetails(job)">
                View Details
              </button>

              <!-- Display college details if available and selected -->
              <div v-if="isSelected(job)" class="college-details mt-3">
                <p class="font-weight-bold">Top Colleges in India:</p>
                <ul>
                  <li v-for="college in job.colleges" :key="college.name">
                    <a
                      :href="college.website"
                      target="_blank"
                      class="college-name"
                    >
                      {{ college.name }}
                    </a>
                    <p class="college-website">
                      Website: {{ college.website }}
                    </p>
                    <p class="college-fees">Fees: {{ college.fees }}</p>
                    <p class="college-admission-process">
                      Admission Process: {{ college.admission_process }}
                    </p>
                  </li>
                </ul>
                <button
                  class="btn btn-secondary mt-3"
                  @click="hideDetails(job)"
                >
                  Hide Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- ... Existing script tag ... -->

<script>
import axios from "axios";

export default {
  data() {
    return {
      jobs: [],
      selectedJob: null,
    };
  },
  mounted() {
    this.fetchTopTrendingJobs();
  },
  methods: {
    async fetchTopTrendingJobs() {
      try {
        const response = await axios.get("/api/top-trending-jobs");
        this.jobs = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    showDetails(job) {
      this.selectedJob = job;
    },
    // eslint-disable-next-line no-unused-vars
    hideDetails(job) {
      this.selectedJob = null;
    },
    isSelected(job) {
      return this.selectedJob === job;
    },
  },
};
</script>
<style>
.container {
  max-width: 800px;
  margin: auto;
}
body {
  font-family: "Arial", sans-serif;
}
.card {
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.card-body {
  padding: 20px;
}

.card-title {
  font-size: 20px;
  font-weight: bold;
}

.btn {
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
  border: none;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: #fff;
  border: none;
}

.btn-secondary:hover {
  background-color: #545b62;
}

.college-details {
  margin-top: 20px;
}

.college-name {
  font-size: 18px;
  font-weight: bold;
}

.college-website {
  color: #007bff;
}

.college-fees,
.college-admission-process {
  margin-bottom: 5px;
}

/* Additional styles for the Show Details section */
.show-details-section {
  display: none;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-top: 10px;
}

.show-details-btn.active + .show-details-section {
  display: block;
}

.show-details-btn.active {
  background-color: #6c757d;
}

.show-details-btn.active:hover {
  background-color: #545b62;
}

/* Custom styles */
h1 {
  color: #007bff;
  font-weight: bold;
  font-size: 32px;
  text-align: center;
  margin-bottom: 30px;
}

.container {
  max-width: 960px;
}

.row {
  margin: 0 -15px;
}

.col-md-6 {
  padding: 0 15px;
}

.mb-4 {
  margin-bottom: 1rem;
}
</style>

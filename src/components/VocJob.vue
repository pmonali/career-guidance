<template>
  <div>
    <h1 class="mt-5 text-center">Vocational Courses After 10th (SSC)</h1>
    <div class="container mt-5">
      <div class="row">
        <div v-for="job in jobs" :key="job.id" class="col-md-6 mb-4">
          <div class="card d-flex flex-column h-100">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">{{ job.CourseTitle }}</h5>
              <p class="card-text font-weight-bold mb-2">
                Qualification Required: {{ job.QualificationReq }}
              </p>
              <p class="card-text text-muted">
                Career Opportunity: {{ job.CareerOpportunity }}
              </p>
              <!-- Add a button to show details -->
              <button class="btn btn-primary mt-auto" @click="showDetails(job)">
                View Details
              </button>

              <div v-if="isSelected(job)" class="college-details mt-3">
                <p class="font-weight-bold">Top Colleges in India:</p>
                <ul>
                  <li v-for="College in job.Colleges" :key="College.name">
                    <a
                      :href="College.website"
                      target="_blank"
                      class="college-name"
                    >
                      {{ College.name }}
                    </a>
                    <p class="college-website">
                      Website: {{ College.website }}
                    </p>
                  </li>
                  <li
                    v-for="OnlinePlatform in job.OnlinePlatforms"
                    :key="OnlinePlatform.name"
                  >
                    <!-- Use online_platform, not online_platforms -->
                    <a
                      :href="OnlinePlatform.Website"
                      target="_blank"
                      class="college-name"
                    >
                      {{ OnlinePlatform.Name }}
                    </a>
                    <p class="college-website">
                      Website: {{ OnlinePlatform.Website }}
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
        const response = await axios.get("/api/vocational-courses");
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

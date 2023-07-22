<template>
  <div class="container">
    <div v-if="loading" class="mt-4">Loading...</div>
    <div v-else>
      <div v-if="showAssessment && questions.length">
        <h3 class="mt-5">Assessment Test</h3>
        <div v-for="question in questions" :key="question.id" class="mt-4">
          <h2 class="question-text">{{ question.text }}</h2>
          <ul class="list-group">
            <li
              v-for="option in question.options"
              :key="option.id"
              class="list-group-item option"
            >
              <label class="form-check-label">
                <input
                  type="radio"
                  :name="`question-${question.id}`"
                  :value="option.id"
                  v-model="answers[question.id]"
                  class="form-check-input"
                />
                {{ option.text }}
              </label>
            </li>
          </ul>
        </div>
        <button @click="submitAssessment" class="btn btn-primary mt-4">
          Submit
        </button>
      </div>
      <div v-else>
        <h2 class="mb-4">stream Options that match to Your Profile:</h2>
        <ul v-if="suggestedStream.length" class="list-group suggested-careers">
          <li
            v-for="stream in suggestedStream"
            :key="stream.id"
            class="list-group-item career-item"
          >
            <span class="font-weight-bold">{{ stream.title }}</span>
            <span class="percentage-range">
              <span
                class="percentage"
                :style="getPercentageStyle(stream.percentage)"
              >
                {{ stream.percentage }}%
              </span>
            </span>
            <!-- <button @click="toggleCareerDetails(stream)">
              {{ isSelected(stream) ? "Hide Details" : "Show Details" }}
            </button> -->
            <!-- Display career details if available and selected -->
            <!-- <div v-if="isSelected(stream)">
              <p class="font-weight-bold">Top Colleges in India:</p>
              <ul>
                <li v-for="college in stream.colleges" :key="college.name">
                  <a :href="college.website" target="_blank">{{
                    college.name
                  }}</a>
                  <p class="text-muted">Fees: {{ college.fees }}</p>
                </li>
              </ul>
            </div> -->
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      loading: true,
      questions: [],
      answers: {},
      suggestedStream: [],
      showAssessment: true,
      selectedStream: "",
    };
  },
  created() {
    const education = localStorage.getItem("education");
    if (education === "10th (SSC)") {
      this.fetch10thAssessment();
    }
  },
  methods: {
    fetch10thAssessment() {
      axios
        .get("/api/stream")
        .then((response) => {
          this.questions = response.data;
          this.loading = false;
          // Initialize answers object with default values
          for (const question of this.questions) {
            this.answers[question.id] = null;
          }
        })
        .catch((error) => {
          console.error(error);
          this.loading = false;
        });
    },

    submitAssessment() {
      axios
        .post("/api/stream", Object.values(this.answers))
        .then((response) => {
          this.suggestedStream = response.data.map((stream) => ({
            ...stream,
            percentage: stream.percentage.toFixed(2),
          }));
          //   localStorage.setItem(
          //     "suggestedStream",
          //     JSON.stringify(this.suggestedStream)
          //   );
          this.showAssessment = false;
          this.storeSuggestedStreams(this.suggestedStream);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    storeSuggestedStreams(suggestedStreams) {
      const sessionID = localStorage.getItem("sessionID"); // Retrieve the session ID from localStorage
      const updatedStream = suggestedStreams.map((stream) => ({
        ...stream,
        percentage: Number(stream.percentage),
      }));

      // Define the data to send in the POST request
      const requestData = {
        sessionID: sessionID,
        suggestedStream: updatedStream,
      };

      // Make the POST request to store the suggested careers
      // Assuming suggestedCareerData is properly populated
      axios
        .post("/api/suggested-stream", requestData)
        .then((response) => {
          console.log("Response:", response.data);
        })
        .catch((error) => {
          console.error("Error:", error.response.data);
        });
    },
    getPercentageStyle(percentage) {
      const colorRange = [
        "#4caf50",
        "#8bc34a",
        "#cddc39",
        "#ffeb3b",
        "#ffc107",
        "#ff9800",
        "#ff5722",
        "#f44336",
        "#e91e63",
        "#9c27b0",
      ];
      const index = Math.floor((percentage - 1) / 10);
      return {
        "background-color": colorRange[index],
        width: `${percentage}%`,
      };
    },
    toggleCareerDetails(stream) {
      if (this.selectedStream === stream) {
        this.selectedStream = null;
      } else {
        this.selectedStream = stream;
      }
    },
    isSelected(stream) {
      return this.selectedStream === stream;
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
}

.loading {
  text-align: center;
}

.question-text {
  color: #007bff;
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
}

.list-group {
  margin: 0;
  padding: 0;
}

.option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.option:hover {
  background-color: #f5f5f5;
}

.form-check-input {
  margin-right: 10px;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}

.suggested-careers {
  margin-top: 20px;
  padding: 0;
}

.career-item {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column; /* To ensure proper alignment of career details */
}

.career-item:hover {
  background-color: #e0e0e0;
}

.career-item .percentage {
  font-weight: bold;
}

.percentage-range {
  width: 150px;
  height: 20px;
  border-radius: 10px;
  background-color: #e0e0e0;
  position: relative;
  margin: 10px 0;
  overflow: hidden;
}

.percentage {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  background-color: #007bff;
  padding: 2px 5px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: bold;
  color: #fff;
}

.show-details-btn,
.hide-details-btn {
  padding: 6px 12px;
  border-radius: 5px;
  cursor: pointer;
  color: #fff;
  margin-top: 10px;
  width: 100%;
  text-align: center;
}

.show-details-btn {
  background-color: #007bff;
  border: none;
}

.show-details-btn:hover {
  background-color: #0056b3;
}

.hide-details-btn {
  background-color: #6c757d;
  border: none;
}

.hide-details-btn:hover {
  background-color: #545b62;
}

.college-details {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f5f5f5;
}

.career-item {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
  color: black;
}
.career-item-card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.career-item-card .font-weight-bold {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #007bff;
}

.college-details {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f5f5f5;
}

.college-name {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #007bff;
}

.college-website {
  color: #007bff;
}

.college-fees,
.college-admission-process {
  margin-bottom: 5px;
  color: #333;
}
.college-name {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #007bff;
}

.college-website {
  color: #007bff;
}

.college-fees,
.college-admission-process {
  margin-bottom: 5px;
  color: #333;
}
</style>

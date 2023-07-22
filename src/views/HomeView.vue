<template>
  <div class="container-fluid">
    <div class="page-header">
      <h1 class="display-4">Welcome to Our Career Portal</h1>
      <p class="lead">Discover Your Future Career Path</p>
      <div>
        <div class="image-container">
          <img src="/images/desk.jpg" alt="Image 1" class="deskimage" />
        </div>
      </div>
    </div>

    <!-- <div class="container"></div> -->
    <div class="container-fluid">
      <b-card bg-variant="dark" text-variant="white" class="text-center mt-4">
        <b-card-text>
          <h3>Discover your best-fit career with our career assessment</h3>
        </b-card-text>
        <div class="row justify-content-center">
          <div class="col-md-6 mt-2 mt-md-0">
            <b-button class="assessment-btn btn btn-primary btn-block">
              <router-link to="/assessment" class="button-link"
                >Assessment for HSC(12th science)</router-link
              >
            </b-button>
          </div>
          <div class="col-md-6 mt-2 mt-md-0">
            <b-button class="assessment-btn btn btn-primary btn-block">
              <router-link to="/assessmentten" class="button-link"
                >Assessment for SSC(10th std)</router-link
              >
            </b-button>
          </div>
        </div>
      </b-card>
    </div>
    <!-- 
    <div class="articles mt-4">
      <h2>Articles Related to Careers</h2>
      <ul>
        <li><a href="#">Article 1 Title</a></li>
        <li><a href="#">Article 2 Title</a></li>
        <li><a href="#">Article 3 Title</a></li>
        <!- Add more articles with appropriate links -->
    <!-- </ul> -->
    <!-- </div> -->
    <div class="container-fluid">
      <div class="youtube-video mt-4">
        <h2>YouTube Video - Career Insights</h2>

        <!-- Replace the VIDEO_ID with the actual YouTube video ID you want to embed -->
        <div class="row justify-content-center">
          <div class="col-12 col-md-4 mb-4">
            <iframe
              width="360"
              height="315"
              src="https://www.youtube.com/embed/PNe50EdTwnM"
              frameborder="0"
              allowfullscreen
            ></iframe>
          </div>
          <div class="col-12 col-md-4 mb-4">
            <iframe
              width="360"
              height="315"
              src="https://www.youtube.com/embed/wTu3DubEF3A"
              frameborder="0"
              allowfullscreen
            ></iframe>
          </div>
          <div class="col-12 col-md-4 mb-4">
            <iframe
              width="360"
              height="315"
              src="https://www.youtube.com/embed/pvMQ_jmPH4M"
              frameborder="0"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <FooTer></FooTer> -->
</template>

<script>
// import FooTer from "@/components/FooTer.vue";
// export default {
//   components: {
//     FooTer,
//   },
// };
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 0;
  margin-right: 0;
  width: 100%;
  /* height: 100vh; */
  /* Adjust the height as needed */
}
.container-header {
  height: auto;
  width: 100%;
}
.page-header {
  text-align: center;
  margin-bottom: 20px;
}

.page-header h1 {
  font-size: 32px;
  color: #007bff;
  margin-bottom: 10px;
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

.header h1 {
  font-size: 32px;
  color: #007bff;
  margin-bottom: 10px;
}

.subheading {
  font-size: 18px;
  color: #333;
}

.image-container {
  position: relative;
  max-width: 2048px; /* Increase the max-width to your desired value */
  margin: 0 auto;
  margin-top: 20px;
}

/* Adjust the image itself to fit the container's width */
.deskimage {
  width: 100%;
  height: auto;
}

.image-caption {
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: #fff;
  font-size: 18px;
  text-shadow: 1px 1px 2px #333;
}

/* Add some margin between the buttons */
.assessment-btn + .assessment-btn {
  margin-left: 10px; /* Adjust the space as per your preference */
}

.button-link {
  color: black;
  text-decoration: none;
}

.youtube-video {
  width: 100%;
  height: auto;

  margin-bottom: 20px; /* Add space between iframes */
}

/* Adjust iframe size for consistency */
.youtube-video iframe {
  width: 360px;
  height: 315px;
  margin-bottom: 10px; /* Add some vertical space between iframes */
  margin-right: 10px;
  justify-items: center;
}
body {
  font-family: "Arial", sans-serif;
}
</style>

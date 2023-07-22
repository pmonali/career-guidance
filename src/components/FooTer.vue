<template>
  <footer class="bg-dark text-light py-4">
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <h5>VirtualMentor</h5>
          <p>Your go-to platform for career guidance and mentorship.</p>
          <div class="social-icons">
            <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
            <a href="#" class="social-icon"><i class="fab fa-facebook"></i></a>
            <a href="#" class="social-icon"><i class="fab fa-linkedin"></i></a>
            <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
          </div>
        </div>
        <div class="col-md-4">
          <h5>Contact Us</h5>
          <ul class="list-unstyled">
            <li>Email: info@virtualmentor.com</li>
            <li>Phone: +1 (555) 123-4567</li>
          </ul>
        </div>
        <div class="col-md-4">
          <h5>Quick Links</h5>
          <ul class="list-unstyled">
            <li><a href="/">Home</a></li>
            <li><a href="/foot">About Us</a></li>
            <li><a href="/foot">Services</a></li>
            <li><a href="/foot">Contact</a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooTer",
};
</script>

<style scoped>
/* Add any additional custom styling for the footer here if needed */
.social-icons {
  margin-top: 20px;
}

.social-icon {
  color: #fff;
  font-size: 24px;
  margin-right: 10px;
}
</style>

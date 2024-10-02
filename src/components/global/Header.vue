<script setup>
import AdminLogin from '@/components/AdminLogin.vue';
</script>


<template>
  <header class="header-content">
    <div class="logo-section">
      <img src="@/assets/img/logo-fb-hotel.webp" alt="Hotel Logo" class="logo" />
      <div class="hotel-name">Florida Beach Hotel</div>
    </div>
    
    <div class="header-right">
      <nav>
        <ul class="nav-links">
          <RouterLink to="/" class="nav-item">General Information</RouterLink>
          <RouterLink to="/gallery" class="nav-item">Gallery</RouterLink>
          <RouterLink to="/restaurants" class="nav-item">Restaurants</RouterLink>
        </ul>
      </nav>

      <!-- Contact section -->
      <div class="contact-section">
        <img src="@/assets/icons/Phone.svg" alt="Phone Icon" class="phone-icon" />
        <span>+34 913-608000</span>
        <RouterLink to="/reservations">
          <button class="reserve-btn">Book Now</button>
          
        </RouterLink>
      </div>
      <AdminLogin /> 
    </div>
  </header>
</template>

<style scoped>
.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  flex-wrap: wrap;
  position: fixed; /* Make the header fixed */
  top: 0; /* Stick to the top of the page */
  left: 0;
  right: 0;
  background-color: #fff; /* Ensure the header has a background color */
  z-index: 1000; /* Ensure the header is above other elements */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add a subtle shadow to the header */
}

.logo-section {
  display: flex;
  align-items: center;
  flex: 1;
}

.logo {
  width: 100px;
  margin-right: 10px;
}

.hotel-name {
  font-size: 24px;
  font-weight: bold;
}

.header-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex: 1;
}

nav {
  margin-bottom: 10px;
}

.nav-links {
  display: flex;
  gap: 30px;
  list-style: none;
  padding: 0;
}

.nav-item {
  text-decoration: none;
  color: #000;
  font-size: 18px;
}

.nav-item:hover,
.nav-item:active {
  text-decoration: underline;
}

.contact-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

.phone-icon {
  width: 20px;
  height: auto;
}

.reserve-btn {
  background-color: #ff1500;
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 5px;
  cursor: pointer;
}

.reserve-btn:hover {
  background-color: #0056b3;
}

/* Add padding-top to avoid content being hidden behind the fixed header */
body {
  padding-top: 80px; /* Adjust this value based on the height of the header */
}

/* Responsive Styles */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: center;
  }

  .header-right {
    margin-right: 0;
    align-items: center;
    text-align: center;
  }

  .nav-links {
    flex-direction: column;
    gap: 10px;
    margin-right: 0;
  }

  .logo {
    width: 80px;
  }

  .hotel-name {
    font-size: 20px;
  }

  .reserve-btn {
    padding: 10px 20px;
  }
}

@media (max-width: 480px) {
  .header-content {
    padding: 10px;
  }

  .phone-icon {
    width: 16px;
  }

  .hotel-name {
    font-size: 18px;
  }

  .reserve-btn {
    padding: 8px 16px;
  }
}
</style>

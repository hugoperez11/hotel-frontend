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
          <button class="reserve-btn">Reserve</button>
        </RouterLink>
      </div>
    </div>
  </header>
</template>



<style scoped>
.header-content {
  display: flex;
  justify-content: space-between; /* Aligns logo to the left and header-right to the right */
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #ddd;
  flex-wrap: wrap; /* Allows elements to wrap on smaller screens */
}

.logo-section {
  display: flex;
  align-items: center;
  flex: 1; /* Allows it to grow and shrink */
}

.logo {
  width: 100px; /* Adjust size as needed */
  margin-right: 10px;
}

.hotel-name {
  font-size: 24px;
  font-weight: bold;
}

.header-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end; /* Aligns nav and contact-section to the right */
  flex: 1; /* Allows it to grow and shrink */
}

nav {
  margin-bottom: 10px; /* Space between nav and contact section */
}

.nav-links {
  display: flex;
  gap: 30px; /* Space between the links */
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
  width: 20px; /* Size of the phone icon */
  height: auto;
}

.reserve-btn {
  background-color: #007BFF;
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 5px;
  cursor: pointer;
}

.reserve-btn:hover {
  background-color: #0056b3;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column; /* Stack elements vertically */
    align-items: center;
  }

  .header-right {
    margin-right: 0;
    align-items: center;
    text-align: center;
  }

  .nav-links {
    flex-direction: column;
    gap: 10px; /* Reduce space between links */
    margin-right: 0;
  }

  .logo {
    width: 80px; /* Adjust logo size for smaller screens */
  }

  .hotel-name {
    font-size: 20px; /* Reduce font size */
  }

  .reserve-btn {
    padding: 10px 20px; /* Adjust button size */
  }
}

@media (max-width: 480px) {
  .header-content {
    padding: 10px; /* Reduce padding */
  }

  .phone-icon {
    width: 16px; /* Further reduce icon size */
  }

  .hotel-name {
    font-size: 18px; /* Further reduce font size */
  }

  .reserve-btn {
    padding: 8px 16px; /* Further adjust button size */
  }
}
</style>

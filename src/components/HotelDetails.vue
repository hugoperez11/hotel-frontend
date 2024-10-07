<template>
    <div class="accordion-container">
      <h2>Hotel Details</h2>
  
      <!-- Section 1: Featured Amenities -->
      <details>
        <summary>Featured Amenities</summary>
        <p>
          The hotel offers a wide range of amenities such as a swimming pool, spa services, fitness center, and gourmet restaurant.
        </p>
      </details>
  
      <!-- Section 2: Hotel Information (Updated with Address and Email) -->
      <details>
        <summary>Hotel Information</summary>
        <p>
          <strong>Address:</strong> 123 Beach Road, Miami, FL, 33139
        </p>
        <p>
          <strong>Email:</strong> <a href="mailto:info@floridabeachhotel.com">info@floridabeachhotel.com</a>
        </p>
      </details>
  
      <!-- Section 3: General Information -->
      <details>
        <summary>General Information</summary>
        <p>
          The hotel offers luxury rooms, daily cleaning services, and a gourmet restaurant.
        </p>
      </details>
  
      <!-- Section 4: Accessibility Information -->
      <details>
        <summary>Accessibility Information</summary>
        <p>
          Our hotel is adapted for people with reduced mobility, with access ramps and accessible elevators.
        </p>
      </details>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .accordion-container {
    max-width: 800px;
    margin: 20px auto;
    font-family: Arial, sans-serif;
    margin-bottom: 80px
  }
  
  h2 {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }
  
  details {
    margin-bottom: 20px;
    border-bottom: 1px solid #000;
  }
  
  summary {
    font-size: 1.2rem;
    cursor: pointer;
    position: relative;
  }
  
  summary::after {
    content: '▼';
    font-size: 1rem;
    position: absolute;
    right: 0;
    transition: transform 0.3s ease;
  }
  
  details[open] summary::after {
    transform: rotate(-180deg);
  }
  
  p {
    margin: 10px 0;
    font-size: 1rem;
  }
  
  a {
    color: #007BFF;
    text-decoration: none;
  }
  
  a:hover {
    text-decoration: underline;
  }
  </style>
  
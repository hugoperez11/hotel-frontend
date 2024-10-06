<template>
    <div class="gallery-container">
      <nav class="gallery-nav">
        <button
          v-for="(section, index) in sections"
          :key="index"
          @click="activeSection = section"
          :class="{ active: activeSection === section }"
        >
          {{ section }}
        </button>
      </nav>
  
      <div class="gallery">
        <div v-if="activeSection === 'Hotel View'" class="image-grid">
          <img src="../assets/img/Entrada-Hotel.jpg" alt="Hotel View 1" />
          <img src="../assets/img/Front-Desk.jpg" alt="Hotel View 2" />
          <img src="../assets/img/piscina-exter.webp" alt="Hotel View 3" />
          
        </div>
        <div v-if="activeSection === 'Restaurants'" class="image-grid">
          <img src="../assets/img/Restaurant-Ocean-View.jpg" alt="Restaurant 1" />
          <img src="../assets/img/restaurante.webp" alt="Restaurant 2" />
          <img src="../assets/img/comida.webp" alt="Restaurant 3" />
        </div>
        <div v-if="activeSection === 'Gym and Entertainment'" class="image-grid">
          <img src="../assets/img/gim.jpg" alt="Gym 1" />
          <img src="../assets/img/piscinaInterior.webp" alt="Gym 2" />
          <img src="../assets/img/Jardin-juegos.jpg" alt="Gym 3" />
        </div>
        <div v-if="activeSection === 'Spa'" class="image-grid">
          <img src="../assets/img/spa.webp" alt="Spa 1" />
          <img src="../assets/img/spa1.jpeg" alt="Spa 2" />
          <img src="../assets/img/spa2.jpeg" alt="Spa 3" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Set the active section
  const activeSection = ref('Hotel View');
  
  // Define sections for navigation
  const sections = [
    'Hotel View',
    'Restaurants',
    'Gym and Entertainment',
    'Spa'
  ];
  </script>
  
  <style scoped>
  .gallery-container {
    margin-top: 120px; /* Space to prevent overlap with the header */
  }
  
  .gallery-nav {
    display: flex;
    justify-content: space-evenly;
    background-color: #f5f5f5;
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
  }
  
  .gallery-nav button {
    padding: 10px 20px;
    background-color: transparent;
    border: none;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .gallery-nav button.active {
    font-weight: bold;
    border-bottom: 2px solid green;
  }
  
  .gallery-nav button:hover {
    background-color: #ddd;
  }
  
  .gallery {
    padding: 20px;
  }
  
  .image-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }
  
  .image-grid img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  </style>
  
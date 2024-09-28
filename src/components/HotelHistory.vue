<template>
    <div class="welcome-section">
      <h1>Welcome to Florida Beach Hotel</h1>
      <p class="tagline">A futuristic landmark on the shores of the Atlantic Ocean</p>
      <p class="history">
        Opened in 2024, the Florida Beach Hotel is a visionary creation that blends cutting-edge technology with serene coastal beauty. Located in a prime beachfront setting, this modern marvel stands as a symbol of luxury, sustainability, and innovation... 
        <span v-if="!showMore">
          <button @click="toggleMore" class="see-more-btn">Read more</button>
        </span>
      </p>
      
      <p v-if="showMore" class="history-expanded">
        Designed to redefine the future of hospitality, the hotel is powered entirely by renewable energy and offers a seamless experience where AI and smart technology meet unparalleled comfort. With breathtaking ocean views and avant-garde architecture, Florida Beach Hotel sets a new standard in luxury travel. Whether you're relaxing in our AI-assisted suites or enjoying a gourmet meal at one of our Michelin-starred restaurants, every detail has been curated to deliver the ultimate guest experience. 
        <button @click="toggleMore" class="see-less-btn">Read less</button>
      </p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const showMore = ref(false);
  
  function toggleMore() {
    showMore.value = !showMore.value;
  }
  </script>
  
  <style scoped>
  .welcome-section {
    text-align: center;
    padding: 50px 20px;
    max-width: 800px;
    margin: 0 auto;
    font-family: 'Arial', sans-serif;
  }
  
  h1 {
    font-size: 36px;
    margin-bottom: 10px;
  }
  
  .tagline {
    font-size: 20px;
    font-weight: 300;
    margin-bottom: 20px;
    color: #555;
  }
  
  .history {
    font-size: 18px;
    line-height: 1.6;
    color: #333;
  }
  
  .history-expanded {
    font-size: 18px;
    line-height: 1.6;
    color: #333;
    margin-top: 10px;
  }
  
  .see-more-btn, .see-less-btn {
    background: none;
    border: none;
    color: #007BFF;
    cursor: pointer;
    font-weight: bold;
    text-decoration: underline;
  }
  
  .see-more-btn:hover, .see-less-btn:hover {
    color: #0056b3;
  }
  </style>
  
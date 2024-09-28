<template>
  <div class="carousel">
    <div class="carousel-inner" :style="carouselStyle">
      <div class="carousel-item">
        <img src="@/assets/img/Suite.jpg" alt="Suite" />
      </div>
      <div class="carousel-item">
        <img src="@/assets/img/Entrada-Hotel.jpg" alt="Entrada Hotel" />
      </div>
      <div class="carousel-item">
        <img src="@/assets/img/Superior-Room.webp" alt="Superior Room" />
      </div>
    </div>
    <button class="carousel-control prev" @click="prevSlide">‹</button>
    <button class="carousel-control next" @click="nextSlide">›</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Current index of the image being displayed
const currentIndex = ref(0);

// Array of image URLs
const images = [
  '@/assets/img/Suite.jpg',
  '@/assets/img/Entrada-Hotel.jpg',
  '@/assets/img/Superior-Room.webp'
];

// Computed style for carousel-inner to handle slide transition
const carouselStyle = computed(() => ({
  transform: `translateX(-${100 * currentIndex.value}%)`,
  transition: 'transform 0.5s ease-in-out'
}));

// Function to move to the next slide
const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % images.length;
};

// Function to move to the previous slide
const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + images.length) % images.length;
};
</script>

<style scoped>
.carousel {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.carousel-inner {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.carousel-item {
  min-width: 100%;
  box-sizing: border-box;
}

.carousel-item img {
  width: 100%;
  height: 100vh; /* Adjust height as needed */
  object-fit: cover; /* Ensure image covers the area */
  display: block;
}

.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  /* No z-index needed */
}

.prev {
  left: 10px;
}

.next {
  right: 10px;
}
</style>

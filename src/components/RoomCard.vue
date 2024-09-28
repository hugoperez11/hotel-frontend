<template>
  <div class="room-card">
    <img :src="getImageUrl(room.image)" alt="Imagen de la habitación" class="room-image" />
    <div class="room-details">
      <h3>{{ room.name }}, {{ room.bed }}, {{ room.view }}</h3>
      <p class="price">Best Available Rate Price: ${{ room.price }} / per night</p>
      <p class="tax-included">Tax included</p>
      <p class="description">{{ room.description }}</p>
      <div class="button-container">
        <button @click="$emit('reserve', room.id)">Select</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  room: {
    type: Object,
    required: true
  }
});

// Función para obtener la URL completa de la imagen
function getImageUrl(imagePath) {
  return `http://localhost:8080${imagePath}`;
}
</script>

<style scoped>
.room-card {
  display: flex;
  width: 70%; /* The card will still occupy 70% of the screen width */
  height: auto; /* Allow height to adjust based on content */
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  align-items: stretch; /* Ensure items stretch to fit height */
}

.room-image {
  flex: 0 0 50%; /* Make the image take up 45% of the card's width */
  height: 400px; /* Set a fixed height for the image */
  object-fit: cover; /* Ensure the image covers the area without distortion */
  border-radius: 8px;
  margin-right: 20px; /* Add space between the image and the text */
}

.room-details {
  flex: 1 1 50%; /* Make the text take up 55% of the card's width */
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Space out content evenly */
  text-align: left; /* Align text to the left */
}

.room-details h3 {
  margin: 0;
  font-size: 35px;
}

.price {
  font-weight: bold;
  margin: 10px 0; /* Adds space between title and price */
}

.tax-included {
  color: #555; /* Slightly muted color for tax information */
  margin: 0 0 10px; /* Add space below tax information */
}

.description {
  margin-bottom: 10px;
  flex-grow: 1; /* Allow the description to grow and fill space */
  text-align: left; /* Align text to the left */
}

.button-container {
  display: flex;
  justify-content: flex-end; /* Align button to the right */
  margin-top: auto; /* Push button to the bottom */
}

button {
  background-color: #007BFF;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}
</style>

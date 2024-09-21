<script setup>
import { ref } from 'vue';

// Define the component's props
const props = defineProps({
  room: {
    type: Object,
    required: true
  }
});

// Function to handle the reservation (for now, just logging it)
const handleReserve = () => {
  console.log(`Reserve room: ${props.room.name}`);
};
</script>

<template>
  <div class="room-card">
    <!-- Room image -->
    <img :src="room.image_url" :alt="`Image of ${room.name}`" class="room-image" />

    <!-- Room information -->
    <div class="room-info">
      <h2>{{ room.name }}</h2>
      <p>{{ room.description }}</p>
      <p><strong>Bed type:</strong> {{ room.bed_type }}</p>
      <p><strong>Status:</strong> {{ room.status }}</p>
      <p><strong>Price per night:</strong> ${{ room.price }}</p>

      <!-- Reserve button -->
      <button @click="handleReserve" class="reserve-button">Reserve</button>
    </div>
  </div>
</template>

<style scoped>
.room-card {
  display: flex;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.room-image {
  width: 200px;
  height: 150px;
  object-fit: cover;
  border-right: 1px solid #ddd;
}

.room-info {
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.room-info h2 {
  margin: 0;
  font-size: 1.5rem;
}

.room-info p {
  margin: 8px 0;
}

.reserve-button {
  align-self: flex-end;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.reserve-button:hover {
  background-color: #0056b3;
}
</style>

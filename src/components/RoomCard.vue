<script setup>
import { ref } from 'vue';

// Definimos las propiedades que recibe el componente
const props = defineProps({
  room: {
    type: Object,
    required: true
  }
});

// Función para manejar la reserva (en este caso, simplemente lo logueamos)
const handleReserve = () => {
  console.log(`Reservar habitación: ${props.room.name}`);
};
</script>

<template>
  <div class="room-card">
    <!-- Imagen de la habitación -->
    <img :src="room.image_url" :alt="`Imagen de ${room.name}`" class="room-image" />

    <!-- Información de la habitación -->
    <div class="room-info">
      <h2>{{ room.name }}</h2>
      <p>{{ room.description }}</p>
      <p><strong>Tipo de cama:</strong> {{ room.bed_type }}</p>
      <p><strong>Estado:</strong> {{ room.status }}</p>
      <p><strong>Precio por noche:</strong> ${{ room.price }}</p>

      <!-- Botón para reservar -->
      <button @click="handleReserve" class="reserve-button">Reservar</button>
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

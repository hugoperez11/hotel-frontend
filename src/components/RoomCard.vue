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
import { defineProps, defineEmits } from 'vue';
const props = defineProps({
  room: {
    type: Object,
    required: true
  }
});
const emit = defineEmits(['reserve']);

function getImageUrl(imagePath) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
  return `${baseUrl}${imagePath}`;
}
</script>

<style scoped>
.room-card {
  display: flex;
  flex-direction: row; /* Mantén la disposición en fila (imagen a la izquierda) */
  width: 70%;
  max-width: 100%;
  height: auto;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  align-items: stretch;
}

.room-image {
  flex: 0 0 50%;
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 20px;
}

.room-details {
  flex: 1 1 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
}

.room-details h3 {
  margin: 0;
  font-size: 35px;
}

.price {
  font-weight: bold;
  margin: 10px 0;
}

.tax-included {
  color: #555;
  margin: 0 0 10px;
}

.description {
  margin-bottom: 10px;
  flex-grow: 1;
  text-align: left;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
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

/* Media Queries for responsiveness */
@media (max-width: 768px) {
  .room-card {
    flex-direction: column; /* Cambia a diseño en columna en pantallas pequeñas */
    align-items: center;
    text-align: center; /* Centrar texto en pantallas pequeñas */
  }

  .room-image {
    margin-right: 0;
    margin-bottom: 20px;
    width: 100%; /* Imagen toma todo el ancho */
    height: 250px; /* Ajustar altura de la imagen en pantallas pequeñas */
  }

  .room-details {
    width: 100%;
  }

  .room-details h3 {
    font-size: 25px;
  }

  .button-container {
    justify-content: center; /* Centrar botón en pantallas pequeñas */
  }

  button {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .room-image {
    height: 200px; /* Ajustar aún más la altura de la imagen en pantallas muy pequeñas */
  }

  .room-details h3 {
    font-size: 20px;
  }

  button {
    padding: 8px 16px; /* Ajustar el tamaño del botón */
  }
}
</style>

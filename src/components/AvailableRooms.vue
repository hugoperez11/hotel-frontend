<template>
  <div v-if="rooms.length">
    <h2>Habitaciones Disponibles</h2>
    <ul>
      <li v-for="room in rooms" :key="room.id">
        <h3>{{ room.name }}</h3>
        <p>Tipo: {{ room.type }}</p>
        <p>Vista: {{ room.view }}</p>
        <p>Cama: {{ room.bed }}</p>
        <p>Precio: ${{ room.price }}</p>
        <button @click="reserveRoom(room.id)">Reservar</button>
      </li>
    </ul>
  </div>
  <div v-else>
    <p>No hay habitaciones disponibles para las fechas seleccionadas.</p>
  </div>

  <div v-if="successMessage">{{ successMessage }}</div>
  <div v-if="errorMessage" style="color: red;">{{ errorMessage }}</div>
</template>

<script setup>
import { defineProps } from 'vue';
import axios from 'axios'; // Importar axios para hacer solicitudes HTTP
import { ref } from 'vue'; // Importar ref para manejar mensajes de éxito/error

const props = defineProps({
  rooms: {
    type: Array,
    required: true
  },
  checkInDate: {
    type: String, // Añadido para obtener las fechas de reserva desde el componente padre
    required: true
  },
  checkOutDate: {
    type: String, // Añadido para obtener las fechas de reserva desde el componente padre
    required: true
  }
});

const successMessage = ref('');
const errorMessage = ref('');

// Función para reservar una habitación
const reserveRoom = async (roomId) => {
  const customerId = 1; // Esto debería ser dinámico según el usuario logueado
  try {
    const response = await axios.post('http://localhost:8080/api/v1/reservations', {
      roomId: roomId,
      customerId: customerId, // Debes obtener este valor de la sesión del usuario
      checkInDate: props.checkInDate,
      checkOutDate: props.checkOutDate
    });
    successMessage.value = `Habitación reservada con éxito. Reserva ID: ${response.data.id}`;
    errorMessage.value = '';
  } catch (error) {
    console.error("Error al reservar la habitación:", error);
    errorMessage.value = 'Error al reservar la habitación. Inténtalo de nuevo más tarde.';
    successMessage.value = '';
  }
};
</script>



<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  margin: 10px 0;
}

li h3 {
  margin: 0;
}

li p {
  margin: 5px 0;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>

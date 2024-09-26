<script setup>
import { ref } from 'vue';
import axios from 'axios';
import AvailableRooms from './AvailableRooms.vue'; // Importar el componente para mostrar habitaciones

// Definir variables reactivas para almacenar las fechas y las habitaciones disponibles
const checkInDate = ref('');
const checkOutDate = ref('');
const availableRooms = ref([]);
const errorMessage = ref(''); // Para manejar errores

// Función para buscar habitaciones disponibles
const fetchAvailableRooms = async () => {
  if (!checkInDate.value || !checkOutDate.value) {
    errorMessage.value = "Por favor, selecciona ambas fechas.";
    return;
  }

  try {
    const response = await axios.get(`http://localhost:8080/api/v1/rooms/available`, {
      params: {
        checkInDate: checkInDate.value,
        checkOutDate: checkOutDate.value
      }
    });
    availableRooms.value = response.data;
    errorMessage.value = ''; // Limpiar el mensaje de error si la solicitud es exitosa
  } catch (error) {
    console.error("Error al obtener habitaciones disponibles:", error);
    errorMessage.value = 'Error al obtener habitaciones disponibles. Inténtalo de nuevo más tarde.';
  }
};

</script>

<template>
  <div>
    <h1>Reserva de Habitación</h1>

    <form @submit.prevent="fetchAvailableRooms">
      <div>
        <label for="checkIn">Fecha de Entrada:</label>
        <input type="date" v-model="checkInDate" required />
      </div>
      <div>
        <label for="checkOut">Fecha de Salida:</label>
        <input type="date" v-model="checkOutDate" required />
      </div>
      <button type="submit">Buscar Habitaciones Disponibles</button>
    </form>

    <!-- Mostrar mensaje de error si ocurre -->
    <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>

    <!-- Pasar habitaciones y fechas seleccionadas al componente AvailableRooms -->
    <AvailableRooms :rooms="availableRooms" :checkInDate="checkInDate" :checkOutDate="checkOutDate" />
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

label {
  margin: 10px 0;
}

button {
  margin-top: 10px;
}
</style>

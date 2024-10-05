<template>
  <div class="reservation-container">
    <h1>Buscar Reserva</h1>
    <form @submit.prevent="fetchReservation">
      <input
        type="text"
        placeholder="Número de confirmación"
        v-model="confirmationNumber"
        required
      />
      <div class="button-container">
        <button type="submit">Buscar</button>
      </div>
    </form>
    <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>

    <!-- Mostrar los detalles de la reserva si se encuentra -->
    <div v-if="reservationData">
      <h2>Detalles de la Reserva</h2>
      <form @submit.prevent="updateReservation">
        <div>
          <label>Número de confirmación:</label>
          <input type="text" v-model="reservationData.confirmationNumber" disabled />
        </div>
        <div>
          <label>ID de habitación:</label>
          <input type="number" v-model="reservationData.roomId" />
        </div>
        <div>
          <label>Fecha de entrada:</label>
          <input type="date" v-model="reservationData.checkInDate" />
        </div>
        <div>
          <label>Fecha de salida:</label>
          <input type="date" v-model="reservationData.checkOutDate" />
        </div>
        <div>
          <label>ID del cliente:</label>
          <input type="number" v-model="reservationData.customerId" />
        </div>
        <div>
          <label>Nombre del cliente:</label>
          <input type="text" v-model="reservationData.customerName" />
        </div>
        <div>
          <label>Email del cliente:</label>
          <input type="email" v-model="reservationData.customerEmail" />
        </div>
        <div class="button-container">
          <button type="submit">Actualizar Reserva</button>
          <button type="button" @click="deleteReservation">Eliminar Reserva</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

// Variables reactivas para manejar el número de confirmación y los datos de reserva
const confirmationNumber = ref('');
const reservationData = ref(null);
const errorMessage = ref('');

// Función para buscar la reserva
const fetchReservation = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/v1/reservations/confirmation/${confirmationNumber.value}`);
    reservationData.value = response.data;
    errorMessage.value = ''; // Limpiar cualquier mensaje de error previo
  } catch (error) {
    errorMessage.value = 'No se encontró ninguna reserva con ese número de confirmación.';
    reservationData.value = null; // Limpiar datos de reserva en caso de error
  }
};

// Función para actualizar la reserva mediante PUT
const updateReservation = async () => {
  try {
    const response = await axios.put(`http://localhost:8080/api/v1/reservations/confirmation/${reservationData.value.confirmationNumber}`, {
      roomId: reservationData.value.roomId,
      checkInDate: reservationData.value.checkInDate,
      checkOutDate: reservationData.value.checkOutDate,
      customerId: reservationData.value.customerId,
      customerName: reservationData.value.customerName,
      customerEmail: reservationData.value.customerEmail,
    });
    alert('Reserva actualizada con éxito');
  } catch (error) {
    console.error('Error al actualizar la reserva:', error);
    alert('Error al actualizar la reserva');
  }
};

// Función para eliminar la reserva mediante DELETE
const deleteReservation = async () => {
  try {
    const response = await axios.delete(`http://localhost:8080/api/v1/reservations/confirmation/${reservationData.value.confirmationNumber}`);
    alert('Reserva eliminada con éxito');
    reservationData.value = null; // Limpiar los datos de la reserva después de eliminarla
  } catch (error) {
    console.error('Error al eliminar la reserva:', error);
    alert('Error al eliminar la reserva');
  }
};
</script>

<style scoped>
.reservation-container {
  margin-top: 200px; /* Ajusta el valor según necesites */
}

.button-container {
  margin-top: 20px;
}

input {
  margin-bottom: 10px;
  padding: 5px;
  width: 100%;
}

button {
  padding: 10px;
  background-color: #8ab9ec;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #6299d1;
}
</style>

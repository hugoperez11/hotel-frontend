<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

const customerName = ref('');
const checkInDate = ref('');
const checkOutDate = ref('');
const selectedRoomId = ref(null);
const rooms = ref([]);

// Obtener las habitaciones disponibles al montar el componente
onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/room');
    rooms.value = response.data;
  } catch (error) {
    console.error('Error al obtener habitaciones:', error);
  }
});

// Función para enviar la reserva
const submitReservation = async () => {
  try {
    const reservation = {
      customerName: customerName.value,
      checkInDate: checkInDate.value,
      checkOutDate: checkOutDate.value,
      room: { id: selectedRoomId.value }
    };
    await axios.post('http://localhost:8080/api/reservation', reservation);
    
    // Mostrar pop-up de confirmación con SweetAlert
    Swal.fire({
      icon: 'success',
      title: 'Reservation successful!',
      text: 'Your room has been reserved.'
    });

    // Limpiar el formulario después de la reserva
    customerName.value = '';
    checkInDate.value = '';
    checkOutDate.value = '';
    selectedRoomId.value = null;
  } catch (error) {
    console.error('Error al crear la reserva:', error);
    Swal.fire({
      icon: 'error',
      title: 'Reservation failed',
      text: 'There was an issue with your reservation. Please try again.'
    });
  }
};
</script>

<template>
  <div>
    <h2>Reservar Habitación</h2>
    <form @submit.prevent="submitReservation">
      <label for="customerName">Nombre del Cliente:</label>
      <input id="customerName" v-model="customerName" required />

      <label for="checkInDate">Fecha de Entrada:</label>
      <input id="checkInDate" type="date" v-model="checkInDate" required />

      <label for="checkOutDate">Fecha de Salida:</label>
      <input id="checkOutDate" type="date" v-model="checkOutDate" required />

      <label for="room">Seleccionar Habitación:</label>
      <select v-model="selectedRoomId" required>
        <option v-for="room in rooms" :key="room.id" :value="room.id">
          {{ room.name }} - {{ room.type }}
        </option>
      </select>

      <button type="submit">Reservar</button>
    </form>
  </div>
</template>

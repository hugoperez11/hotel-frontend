<script setup>
import { ref, onMounted } from 'vue';
import { useReservationStore } from '@/stores/reservationStore'; // Importamos el store

// Definimos los campos del formulario
const customerName = ref('');
const checkInDate = ref('');
const checkOutDate = ref('');
const selectedRoomId = ref(null);

// Utilizamos el store
const reservationStore = useReservationStore();

// Al montar el componente, obtenemos las habitaciones disponibles
onMounted(() => {
  reservationStore.fetchRooms();
});

// Función para enviar la reservación
const submitReservation = async () => {
  try {
    const reservation = {
      customerName: customerName.value,
      checkInDate: checkInDate.value,
      checkOutDate: checkOutDate.value,
      room: { id: selectedRoomId.value }
    };

    await reservationStore.createReservation(reservation);

    // Limpiar el formulario después de la reserva
    customerName.value = '';
    checkInDate.value = '';
    checkOutDate.value = '';
    selectedRoomId.value = null;
  } catch (error) {
    console.error('Error al crear la reserva:', error);
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
        <option v-for="room in reservationStore.rooms" :key="room.id" :value="room.id">
          {{ room.name }} - {{ room.type }}
        </option>
      </select>

      <button type="submit">Reservar</button>
    </form>
  </div>
</template>

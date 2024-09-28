<template>
  <div v-if="rooms.length" class="available-rooms-container">
    <h2>Habitaciones Disponibles</h2>
    <div class="rooms-list">
      <RoomCard
        v-for="room in rooms"
        :key="room.id"
        :room="room"
        @reserve="openReservationModal"
      />
    </div>
  </div>
  <div v-else>
    <p>No hay habitaciones disponibles para las fechas seleccionadas.</p>
  </div>

  <!-- Modal para introducir el nombre y el correo electrónico -->
  <div v-if="isModalOpen" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h3>Información del Cliente</h3>

      <label for="name">Nombre:</label>
      <input v-model="customerName" id="name" type="text" placeholder="Introduce tu nombre" required />

      <label for="email">Correo Electrónico:</label>
      <input v-model="customerEmail" id="email" type="email" placeholder="Introduce tu correo" required />

      <button @click="confirmReservation">Confirmar Reserva</button>

      <div v-if="modalErrorMessage" style="color: red;">{{ modalErrorMessage }}</div>
    </div>
  </div>

  <div v-if="successMessage" style="color: green;">{{ successMessage }}</div>
  <div v-if="errorMessage" style="color: red;">{{ errorMessage }}</div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import RoomCard from './RoomCard.vue'; // Importar la tarjeta reutilizable

// Props que recibirán las habitaciones y las fechas desde el componente padre
const props = defineProps({
  rooms: {
    type: Array,
    required: true
  },
  checkInDate: {
    type: String,
    required: true
  },
  checkOutDate: {
    type: String,
    required: true
  }
});

// Estado del modal y datos del cliente
const isModalOpen = ref(false);
const selectedRoomId = ref(null);
const customerName = ref('');
const customerEmail = ref('');
const modalErrorMessage = ref('');
const successMessage = ref('');
const errorMessage = ref('');

// Función para abrir el modal con la habitación seleccionada
const openReservationModal = (roomId) => {
  selectedRoomId.value = roomId;
  isModalOpen.value = true;
};

// Función para cerrar el modal
const closeModal = () => {
  isModalOpen.value = false;
  customerName.value = '';
  customerEmail.value = '';
  modalErrorMessage.value = '';
};

// Función para confirmar la reserva
const confirmReservation = async () => {
  if (!customerName.value || !customerEmail.value) {
    modalErrorMessage.value = 'Por favor, completa ambos campos.';
    return;
  }

  const reservationData = {
    roomId: selectedRoomId.value,
    checkInDate: props.checkInDate,
    checkOutDate: props.checkOutDate,
    customerName: customerName.value,
    customerEmail: customerEmail.value
  };

  try {
    const response = await axios.post('http://localhost:8080/api/v1/reservations', reservationData);
    successMessage.value = `Habitación reservada con éxito. ID de la reserva: ${response.data.id}`;
    errorMessage.value = '';
    closeModal();
  } catch (error) {
    console.error('Error al reservar la habitación:', error);
    errorMessage.value = 'Hubo un problema al reservar la habitación. Inténtalo de nuevo más tarde.';
    successMessage.value = '';
    closeModal();
  }
};
</script>

<style scoped>
.available-rooms-container {
  text-align: center;
}

.rooms-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px 0;
}

.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fff;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 500px;
  text-align: center;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
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

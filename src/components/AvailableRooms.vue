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
        <button @click="openReservationModal(room.id)">Reservar</button>
      </li>
    </ul>
  </div>
  <div v-else>
    <p>No hay habitaciones disponibles para las fechas seleccionadas.</p>
  </div>

  <!-- Modal para introducir el nombre y el correo electrónico -->
  <div v-if="isModalOpen" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h3>Información del Cliente</h3>
      
      <!-- Campos para el nombre y correo electrónico -->
      <label for="name">Nombre:</label>
      <input v-model="customerName" id="name" type="text" placeholder="Introduce tu nombre" required />

      <label for="email">Correo Electrónico:</label>
      <input v-model="customerEmail" id="email" type="email" placeholder="Introduce tu correo" required />

      <button @click="confirmReservation">Confirmar Reserva</button>

      <!-- Mostrar mensaje de error si hay problemas con la reserva -->
      <div v-if="modalErrorMessage" style="color: red;">{{ modalErrorMessage }}</div>
    </div>
  </div>

  <!-- Mensajes de éxito o error -->
  <div v-if="successMessage" style="color: green;">{{ successMessage }}</div>
  <div v-if="errorMessage" style="color: red;">{{ errorMessage }}</div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

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
const isModalOpen = ref(false);           // Para controlar si el modal está abierto
const selectedRoomId = ref(null);         // Para almacenar el ID de la habitación seleccionada
const customerName = ref('');             // Almacena el nombre del cliente
const customerEmail = ref('');            // Almacena el correo electrónico del cliente
const modalErrorMessage = ref('');        // Mensaje de error si hay problemas con los datos del cliente
const successMessage = ref('');           // Mensaje de éxito de reserva
const errorMessage = ref('');             // Mensaje de error en caso de fallo de la reserva

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

  // Crear el objeto de datos de la reserva
  const reservationData = {
    roomId: selectedRoomId.value,
    checkInDate: props.checkInDate,
    checkOutDate: props.checkOutDate,
    customerName: customerName.value,
    customerEmail: customerEmail.value
  };

  try {
    // Enviar solicitud al backend para crear la reserva
    const response = await axios.post('http://localhost:8080/api/v1/reservations', reservationData);
    successMessage.value = `Habitación reservada con éxito. ID de la reserva: ${response.data.id}`;
    errorMessage.value = '';
    closeModal(); // Cerrar el modal después de una reserva exitosa
  } catch (error) {
    console.error('Error al reservar la habitación:', error);
    errorMessage.value = 'Hubo un problema al reservar la habitación. Inténtalo de nuevo más tarde.';
    successMessage.value = '';
    closeModal(); // Cerrar el modal incluso si hay un error
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

/* Estilos del modal */
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

input {
  margin: 10px 0;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background-color: #45a049;
}
</style>

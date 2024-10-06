<script setup>
import { ref } from 'vue';
import axios from 'axios';
import AvailableRooms from './AvailableRooms.vue'; // Importar el componente para mostrar habitaciones

// Definir variables reactivas para almacenar las fechas y las habitaciones disponibles
const checkInDate = ref('');
const checkOutDate = ref('');
const availableRooms = ref([]);
const errorMessage = ref(''); // Para manejar errores
const successMessage = ref(''); // Para manejar mensajes de éxito

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

// Función para realizar una reserva (Esta se invocará desde el modal dentro de `AvailableRooms`)
const reserveRoom = async (roomId, customerName, customerEmail) => {
  if (!customerName || !customerEmail) {
    errorMessage.value = "Por favor, ingresa tu nombre y correo electrónico en el modal.";
    return;
  }

  try {
    const response = await axios.post('http://localhost:8080/api/v1/reservations', {
      roomId: roomId,
      customerName: customerName, // Nombre del cliente
      customerEmail: customerEmail, // Correo del cliente
      checkInDate: checkInDate.value, // Fecha de entrada
      checkOutDate: checkOutDate.value // Fecha de salida
    });
    successMessage.value = `Reserva exitosa! ID de la reserva: ${response.data.id}`;
    errorMessage.value = ''; // Limpiar mensaje de error si la solicitud es exitosa
  } catch (error) {
    console.error("Error al realizar la reserva:", error);
    errorMessage.value = 'Error al realizar la reserva. Inténtalo de nuevo más tarde.';
    successMessage.value = '';
  }
};

</script>

<template>
  <div class="reservation-container">
    <h1>Room Reservation</h1>

    <!-- Formulario con clase específica -->
    <form class="reservation-form" @submit.prevent="fetchAvailableRooms">
      <div class="date-inputs">
        <div class="input-group">
          <label for="checkIn">Check-in Date:</label>
          <input type="date" v-model="checkInDate" required />
        </div>
        <div class="input-group">
          <label for="checkOut">Check-out Date:</label>
          <input type="date" v-model="checkOutDate" required />
        </div>
      </div>

      <div class="button-container">
        <button type="submit">Search Available Rooms</button>
      </div>
    </form>

    <!-- Mostrar mensaje de error si ocurre -->
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

    <!-- Mostrar mensaje de éxito si la reserva fue exitosa -->
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>

    <!-- Pasar habitaciones y fechas seleccionadas al componente AvailableRooms -->
    <AvailableRooms 
      :rooms="availableRooms" 
      :checkInDate="checkInDate" 
      :checkOutDate="checkOutDate" 
      @reserveRoom="reserveRoom" 
    />
  </div>
</template>

<style scoped>
/* Estructura básica y márgenes */
.reservation-container {
  margin-top: 240px;
  padding: 20px;
  max-width: 100%; /* Asegura que el contenedor ocupe todo el ancho disponible */
}

h1 {
  text-align: center;
  font-size: 2rem;
}

.reservation-form {
  background-color: #007BFF;
  color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  margin: 0 auto;
  position: relative;
}

.date-inputs {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap; /* Ajustar cuando la pantalla sea más pequeña */
}

.input-group {
  flex: 1;
  margin-right: 10px;
}

.input-group:last-child {
  margin-right: 0;
}

label {
  margin-bottom: 5px;
  font-size: 1rem;
}

input {
  padding: 10px;
  width: 100%; /* Asegura que los inputs ocupen todo el ancho disponible */
  border-radius: 4px;
  border: none;
  outline: none;
}

.button-container {
  text-align: right;
}

button {
  background-color: #0056b3;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #004494;
}

/* Mensajes de error y éxito */
.error-message {
  color: #ffcc00;
  text-align: center;
  margin-top: 10px;
}

.success-message {
  color: #c4e1ff;
  text-align: center;
  margin-top: 10px;
}

/* Media Queries para pantallas pequeñas */
@media (max-width: 768px) {
  .reservation-form {
    padding: 20px;
  }

  .date-inputs {
    flex-direction: column; /* Las entradas se apilan una debajo de la otra */
  }

  .input-group {
    margin-right: 0;
    margin-bottom: 10px; /* Agregar espacio entre los grupos de entrada */
  }

  .button-container {
    text-align: center;
    margin-top: 20px;
  }

  button {
    width: 100%; /* Botón ocupa todo el ancho en pantallas pequeñas */
    padding: 12px;
  }
}

/* Media Queries para pantallas muy pequeñas (móviles) */
@media (max-width: 480px) {
  h1 {
    font-size: 1.5rem; /* Reducir el tamaño de la fuente del título */
  }

  .reservation-form {
    padding: 15px;
    box-shadow: none; /* Remover sombra en pantallas muy pequeñas */
  }

  button {
    padding: 10px;
    font-size: 1rem;
  }
}
</style>

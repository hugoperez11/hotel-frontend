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
.reservation-container {
  margin-top: 200px; /* Ajusta este valor para establecer el margen superior */
}

h1 {
  text-align: center;
}

.reservation-form {
  background-color: #007BFF; /* Fondo azul */
  color: white; /* Color del texto blanco */
  padding: 30px; /* Espacio interno */
  border-radius: 8px; /* Esquinas redondeadas */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra para un efecto elevado */
  max-width: 500px; /* Ancho máximo del formulario */
  margin: 0 auto; /* Centrar formulario */
  position: relative; /* Posición relativa para contener el botón */
}

.date-inputs {
  display: flex; /* Flexbox para alinear entradas horizontalmente */
  justify-content: space-between; /* Espaciado entre las entradas */
  margin-bottom: 20px; /* Espacio debajo de los inputs */
}

.input-group {
  flex: 1; /* Ocupa espacio igual */
  margin-right: 10px; /* Espacio a la derecha */
}

.input-group:last-child {
  margin-right: 0; /* Eliminar margen a la derecha del último grupo */
}

label {
  margin-bottom: 5px; /* Espacio entre la etiqueta y el campo de entrada */
}

input {
  padding: 10px; /* Espacio interno para los inputs */
  border-radius: 4px; /* Esquinas redondeadas para los inputs */
  border: none; /* Sin borde */
  outline: none; /* Sin contorno al enfocar */
}

.button-container {
  position: absolute; /* Posición absoluta para colocar el botón */
  bottom: 5px; /* Distancia desde la parte inferior del formulario */
  right: 20px; /* Distancia desde la derecha del formulario */
}

button {
  background-color: #0056b3; /* Color más oscuro para el botón */
  color: white; /* Texto blanco en el botón */
  padding: 10px; /* Espacio interno */
  border: none; /* Sin borde */
  border-radius: 4px; /* Esquinas redondeadas */
  cursor: pointer; /* Cambiar cursor al pasar sobre el botón */
  transition: background-color 0.3s; /* Efecto de transición */
}

button:hover {
  background-color: #004494; /* Color más oscuro al pasar el ratón */
}

.error-message {
  color: #ffcc00; /* Color amarillo para los mensajes de error */
  text-align: center;
}

.success-message {
  color: #c4e1ff; /* Color azul claro para los mensajes de éxito */
  text-align: center;
}
</style>

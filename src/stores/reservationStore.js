import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import Swal from 'sweetalert2';

// Usamos la variable de entorno desde el .env
const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

export const useReservationStore = defineStore('reservation', () => {
  const reservations = ref([]);
  const rooms = ref([]);
  const isLoading = ref(false);

  // Función para obtener todas las reservaciones
  async function fetchReservations() {
    isLoading.value = true;
    try {
      const response = await axios.get(`${apiEndpoint}/reservation`);
      reservations.value = response.data;
    } catch (error) {
      console.error('Error fetching reservations:', error);
    } finally {
      isLoading.value = false;
    }
  }

  // Función para obtener todas las habitaciones
  async function fetchRooms() {
    isLoading.value = true;
    try {
      const response = await axios.get(`${apiEndpoint}/room`);
      rooms.value = response.data;
    } catch (error) {
      console.error('Error fetching rooms:', error);
    } finally {
      isLoading.value = false;
    }
  }

  // Función para crear una nueva reservación
  async function createReservation(reservationData) {
    try {
      await axios.post(`${apiEndpoint}/reservation`, reservationData);
      Swal.fire({
        icon: 'success',
        title: 'Reservation successful!',
        text: 'Your room has been reserved.'
      });
    } catch (error) {
      console.error('Error creating reservation:', error);
      Swal.fire({
        icon: 'error',
        title: 'Reservation failed',
        text: 'There was an issue with your reservation. Please try again.'
      });
    }
  }

  return {
    reservations,
    rooms,
    isLoading,
    fetchReservations,
    fetchRooms,
    createReservation,
  };
});

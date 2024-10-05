import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

// Usamos la variable de entorno desde el .env
const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

export const useRoomStore = defineStore('rooms', () => {
  const rooms = ref([]);
  const isLoading = ref(false);
  const error = ref(null); // Agregamos un estado de error

  // Función para obtener todas las habitaciones
  async function fetchRooms() {
    isLoading.value = true;
    error.value = null; // Reiniciamos el estado de error antes de cada petición
    try {
      const response = await axios.get(`${apiEndpoint}/room`);
      rooms.value = response.data;
    } catch (err) {
      console.error('Error fetching rooms:', err);
      error.value = 'Hubo un error al obtener las habitaciones. Inténtalo más tarde.'; // Asignamos un mensaje de error
    } finally {
      isLoading.value = false;
    }
  }

  return {
    rooms,
    isLoading,
    error, // Retornamos el estado de error para usarlo en el frontend
    fetchRooms,
  };
});

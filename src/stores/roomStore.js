import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

// Usamos la variable de entorno desde el .env
const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

export const useRoomStore = defineStore('rooms', () => {
  const rooms = ref([]);
  const isLoading = ref(false);

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

  return {
    rooms,
    isLoading,
    fetchRooms,
  };
});

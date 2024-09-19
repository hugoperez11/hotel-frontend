<script setup>
import { onMounted } from 'vue';
import { useRoomStore } from '@/stores/roomStore'; // Importamos el store
import RoomCard from '@/components/RoomCard.vue'; // Importamos el componente RoomCard

// Usamos el store de habitaciones
const roomStore = useRoomStore();

// Llamamos a la función `fetchRooms` cuando el componente se monte
onMounted(() => {
  roomStore.fetchRooms();
});
</script>

<template>
  <div>
    <h1>Lista de Habitaciones</h1>
    
    <!-- Mostrar un mensaje de error si existe -->
    <div v-if="roomStore.error" class="error-message">
      {{ roomStore.error }}
    </div>

    <!-- Mostrar un indicador de carga mientras se obtienen las habitaciones -->
    <div v-if="roomStore.isLoading">Cargando habitaciones...</div>

    <!-- Mostrar las habitaciones cuando se hayan cargado -->
    <div v-else class="room-list">
      <RoomCard v-for="room in roomStore.rooms" :key="room.id" :room="room" />
    </div>
  </div>
</template>

<style scoped>
.room-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.error-message {
  color: red;
  font-size: 1.2rem;
  margin-bottom: 20px;
}
</style>

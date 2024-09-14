<script setup>
import { onMounted } from 'vue';
import { useRoomStore } from '@/stores/roomStore'; // Importamos el store

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
    <ul>
      <!-- Mostramos las habitaciones obtenidas desde el store -->
      <li v-for="room in roomStore.rooms" :key="room.id">
        {{ room.name }} - {{ room.type }} ({{ room.status }})
      </li>
    </ul>
  </div>
</template>

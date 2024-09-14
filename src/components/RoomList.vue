  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const rooms = ref([]);
  
  // Al montar el componente, hacer la petición para obtener las habitaciones
  onMounted(async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/room');
      rooms.value = response.data;
    } catch (error) {
      console.error('Error al obtener habitaciones:', error);
    }
  });
  </script>

<template>
    <div>
      <h1>Lista de Habitaciones</h1>
      <ul>
        <li v-for="room in rooms" :key="room.id">
          {{ room.name }} - {{ room.type }} ({{ room.status }})
        </li>
      </ul>
    </div>
  </template>

  
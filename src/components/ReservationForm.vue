<script setup>
import { ref } from 'vue';

// Estados para manejar las fechas
const startDate = ref(new Date().toISOString().split('T')[0]);
const endDate = ref(new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0]);

// Estados para huéspedes
const adults = ref(1);
const children = ref(0);

// Mostrar/Ocultar los modales
const showCalendarModal = ref(false);
const showGuestsModal = ref(false);

// Función para abrir/cerrar el calendario
const toggleCalendarModal = () => {
  showCalendarModal.value = !showCalendarModal.value;
};

// Función para abrir/cerrar el selector de huéspedes
const toggleGuestsModal = () => {
  showGuestsModal.value = !showGuestsModal.value;
};

// Formatear fechas
const startDateFormatted = computed(() => new Date(startDate.value).toLocaleDateString());
const endDateFormatted = computed(() => new Date(endDate.value).toLocaleDateString());
const nights = computed(() => {
  const start = new Date(startDate.value);
  const end = new Date(endDate.value);
  return Math.max(0, (end - start) / (1000 * 60 * 60 * 24));
});
</script>

<template>
  <div class="reservation-form">
    <div class="dates-section" @click="toggleCalendarModal">
      <p><strong>FECHAS DE ESTADÍA</strong> ({{ nights }} noches)</p>
      <p>{{ startDateFormatted }} - {{ endDateFormatted }}</p>
    </div>

    <div class="guests-section" @click="toggleGuestsModal">
      <p><strong>HUÉSPEDES</strong></p>
      <p>{{ adults }} Adulto{{ adults > 1 ? 's' : '' }}, {{ children }} Niño{{ children !== 1 ? 's' : '' }}</p>
    </div>

    <!-- Modal para el calendario -->
    <div v-if="showCalendarModal" class="modal-overlay" @click.self="toggleCalendarModal">
      <div class="modal-content">
        <label for="start">Fecha de Inicio:</label>
        <input type="date" id="start" v-model="startDate" />
        
        <label for="end">Fecha de Fin:</label>
        <input type="date" id="end" v-model="endDate" />
        
        <button @click="toggleCalendarModal">Confirmar Fechas</button>
      </div>
    </div>

    <!-- Modal para los huéspedes -->
    <div v-if="showGuestsModal" class="modal-overlay" @click.self="toggleGuestsModal">
      <div class="modal-content">
        <div>
          <label>Adultos: </label>
          <input type="number" v-model="adults" min="1" />
        </div>
        <div>
          <label>Niños: </label>
          <input type="number" v-model="children" min="0" />
        </div>
        <button @click="toggleGuestsModal">Confirmar Huéspedes</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.reservation-form {
  display: flex;
  justify-content: space-between;
  border: 1px solid #ddd;
  padding: 10px;
  background-color: #f9f9f9;
  max-width: 600px;
}

.dates-section, .guests-section {
  cursor: pointer;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
}

button {
  margin-top: 20px;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>

<template>
  <div class="gallery-section">
    <h2>Explore Our Rooms</h2>
    <div class="room-gallery">
      <!-- Itera sobre las habitaciones y las muestra -->
      <div v-for="room in rooms" :key="room.id" class="room-item" @click="openModal(room)">
        <img :src="getAssetImage(room.image)" :alt="room.name" class="room-image" />
        <div class="room-name">{{ room.name }}</div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <span class="close-btn" @click="closeModal">&times;</span>
        <h3>{{ selectedRoom.name }}</h3>
        <p>{{ selectedRoom.description }}</p>

        <!-- Imagen principal -->
        <img :src="getAssetImage(selectedRoom.image)" :alt="selectedRoom.name" class="main-room-image" />

        <!-- Imágenes adicionales que ocupan todo el ancho -->
        <div class="additional-images">
          <img v-for="(image, index) in selectedRoom.additionalImages" :key="index" :src="getAssetImage(image)" class="extra-image-full-width" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const showModal = ref(false);
const selectedRoom = ref({});

// Definir las habitaciones con imágenes y descripciones
const rooms = [
  {
    id: 1,
    name: "Superior Room",
    image: "Superior-Room.webp",
    description: "The Superior Room offers a luxurious space with elegant decor, perfect for a relaxing stay.",
    additionalImages: ["bañosuperior.webp"]
  },
  {
    id: 2,
    name: "Deluxe Room",
    image: "Deluxe-Room.jpg",
    description: "The Deluxe Room features modern amenities with breathtaking views, ideal for a comfortable stay.",
    additionalImages: ["bañodeluxe1.webp"]
  },
  {
    id: 3,
    name: "Junior Suite",
    image: "Junior-Suite.jpg",
    description: "Our Junior Suite combines spaciousness with luxurious comfort, offering an unforgettable experience.",
    additionalImages: ["bathjunior.webp"]
  },
  {
    id: 4,
    name: "Suite",
    image: "Suite.jpg",
    description: "Experience ultimate luxury in our Suite with premium amenities and exceptional service.",
    additionalImages: ["bathsuite.webp"]
  }
];

// Función para abrir el modal con la información de la habitación seleccionada
function openModal(room) {
  selectedRoom.value = room;
  showModal.value = true;
}

// Función para cerrar el modal
function closeModal() {
  showModal.value = false;
}

// Función para obtener la URL de las imágenes desde 'assets/img'
function getAssetImage(imageName) {
  return new URL(`../assets/img/${imageName}`, import.meta.url).href;
}
</script>

<style scoped>
.gallery-section {
  padding: 50px 20px;
  text-align: center;
}

h2 {
  font-size: 32px;
  margin-bottom: 20px;
}

.room-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.room-item {
  text-align: center;
  cursor: pointer;
}

.room-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.room-image:hover {
  transform: scale(1.05);
}

.room-name {
  margin-top: 10px;
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 80%;
  max-height: 80%;
  overflow-y: auto;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 30px;
  cursor: pointer;
  color: #000;
}

h3 {
  margin-top: 0;
  font-size: 28px;
}

p {
  font-size: 16px;
  margin-bottom: 20px;
}

.main-room-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  margin-bottom: 20px;
  border-radius: 8px;
}

/* Imágenes adicionales ocupan todo el ancho */
.additional-images {
  display: block;
}

.extra-image-full-width {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-top: 10px;
}
</style>
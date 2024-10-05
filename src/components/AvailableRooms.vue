<script setup>
import { ref } from 'vue';
import axios from 'axios';
import RoomCard from './RoomCard.vue'; // Import reusable room card component
import CustomerInfoModal from './CustomerInfoModal.vue'; // Import the customer info modal
import ReservationConfirmation from './ReservationConfirmation.vue'; // Import the confirmation modal

const props = defineProps({
  rooms: {
    type: Array,
    required: true
  },
  checkInDate: {
    type: String,
    required: true
  },
  checkOutDate: {
    type: String,
    required: true
  }
});

// Modal state and customer data
const isModalOpen = ref(false);
const selectedRoomId = ref(null);
const customerName = ref('');
const customerEmail = ref('');
const creditCardNumber = ref(''); // To store the credit card number
const modalErrorMessage = ref('');
const confirmationNumber = ref(''); // To store the confirmation number
const isConfirmationVisible = ref(false); // To show the confirmation popup
const errorMessage = ref('');

// Function to open the modal with the selected room
const openReservationModal = (roomId) => {
  selectedRoomId.value = roomId;
  isModalOpen.value = true;
};

// Function to close the modal
const closeModal = () => {
  isModalOpen.value = false;
  customerName.value = '';
  customerEmail.value = '';
  creditCardNumber.value = ''; // Reset the credit card number
  modalErrorMessage.value = '';
};

// Function to confirm the reservation
const confirmReservation = async () => {
  if (!customerName.value || !customerEmail.value || !creditCardNumber.value) {
    modalErrorMessage.value = 'Please complete all fields.';
    return;
  }

  const reservationData = {
    roomId: selectedRoomId.value,
    checkInDate: props.checkInDate,
    checkOutDate: props.checkOutDate,
    customerName: customerName.value,
    customerEmail: customerEmail.value,
    creditCardNumber: creditCardNumber.value, // Include the credit card number
  };

  try {
    const response = await axios.post('http://localhost:8080/api/v1/reservations', reservationData);
    confirmationNumber.value = response.data.confirmationNumber; // Store the confirmation number
    closeModal();

    // Show the confirmation popup
    isConfirmationVisible.value = true; // Change the popup state to visible
  } catch (error) {
    console.error('Error while booking the room:', error);
    errorMessage.value = 'There was a problem booking the room. Please try again later.';
    closeModal();
  }
};
</script>

<template>
  <div v-if="rooms.length" class="available-rooms-container">
    <h2>Available Rooms</h2>
    <div class="rooms-list">
      <RoomCard
        v-for="room in rooms"
        :key="room.id"
        :room="room"
        @reserve="openReservationModal"
      />
    </div>
  </div>
  <div v-else>
    <p>Please enter dates. No rooms available for the selected dates.</p>
  </div>

  <!-- Import the CustomerInfoModal component for entering customer information -->
  <CustomerInfoModal
    :isVisible="isModalOpen"
    :customerName="customerName"
    :customerEmail="customerEmail"
    :creditCardNumber="creditCardNumber"
    :modalErrorMessage="modalErrorMessage"
    @close="closeModal"
    @update:customerName="customerName = $event"
    @update:customerEmail="customerEmail = $event"
    @update:creditCardNumber="creditCardNumber = $event" 
    @confirm="confirmReservation"
  />

  <!-- Confirmation popup imported from ReservationConfirmation component -->
  <ReservationConfirmation
    :isVisible="isConfirmationVisible"
    :confirmationNumber="confirmationNumber"
    @close="isConfirmationVisible = false"
  />

  <div v-if="errorMessage" style="color: red;">{{ errorMessage }}</div>
</template>

<style scoped>
.available-rooms-container {
  text-align: center;
}

.rooms-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px 0;
}

.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fff;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 500px;
  text-align: center;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>

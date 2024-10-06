<template>
  <div v-if="isVisible" class="confirmation-popup">
    <div class="popup-content">
      <span class="close" @click="closePopup">&times;</span>
      <h3>Reservation Successful!</h3>
      <p>Your reservation has been successfully completed.</p>
      <p>Your Confirmation Number is: <strong class="confirmation-number">{{ confirmationNumber }}</strong></p>
      <p class="small-text">
        If you want to modify or cancel the reservation, please call the hotel at <strong>(123) 456-7890</strong>.
        Please keep your confirmation number for future reference.
      </p>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  isVisible: Boolean,
  confirmationNumber: String
});

const emit = defineEmits(['close']);
const closePopup = () => {
  emit('close');
};
</script>

<style scoped>
.confirmation-popup {
  display: block;
  position: fixed;
  z-index: 2;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.6); /* Darker backdrop */
}

.popup-content {
  background-color: #1e88e5; /* Blue background */
  margin: 300px auto 0; /* Añadir margen superior de 200px y centrado horizontal */
  padding: 30px;
  border-radius: 10px; /* Softer rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Adds shadow */
  width: 80%;
  max-width: 500px;
  text-align: center;
  color: white; /* Text in white for better contrast */
}

h3 {
  font-size: 24px;
  margin-bottom: 10px;
}

p {
  font-size: 18px;
}

.confirmation-number {
  display: inline-block;
  background-color: #ffeb3b; /* Highlighted yellow background */
  color: #000; /* Dark text for contrast */
  padding: 5px 10px;
  font-size: 22px;
  font-weight: bold;
  border-radius: 4px;
}

.close {
  color: white;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #ffeb3b; /* Hover to match the confirmation highlight */
  text-decoration: none;
  cursor: pointer;
}

/* Smaller text for the modification/cancellation message */
.small-text {
  font-size: 14px;
  margin-top: 20px;
  color: #ffeb3b; /* Yellow text to match confirmation number */
}

/* Media Queries for Responsiveness */
@media (max-width: 768px) {
  .popup-content {
    padding: 20px; /* Reduce padding for smaller screens */
    margin-top: 250px; /* Adjust margin top for smaller screens */
  }

  h3 {
    font-size: 20px; /* Reduce header size */
  }

  p {
    font-size: 16px; /* Reduce paragraph size */
  }

  .confirmation-number {
    font-size: 18px; /* Adjust confirmation number size */
  }

  .close {
    font-size: 24px; /* Adjust close button size */
  }

  .small-text {
    font-size: 12px; /* Reduce small text size */
  }
}

@media (max-width: 480px) {
  .popup-content {
    margin: 260px auto 0; /* Further adjust margin for very small screens */
    padding: 15px; /* Further reduce padding */
  }

  h3 {
    font-size: 18px; /* Smaller header size */
  }

  p {
    font-size: 14px; /* Smaller paragraph size */
  }

  .confirmation-number {
    font-size: 16px; /* Further adjust confirmation number size */
  }

  .close {
    font-size: 22px; /* Adjust close button size */
  }

  .small-text {
    font-size: 10px; /* Reduce small text size further */
  }
}
</style>

<template>
  <div class="reservation-container">
    <h1>Search Reservation</h1>
    <form @submit.prevent="fetchReservation">
      <input
        type="text"
        placeholder="Confirmation Number"
        v-model="confirmationNumber"
        required
      />
      <div class="button-container">
        <button type="submit">Search</button>
      </div>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    <!-- Display reservation details if found -->
    <div v-if="reservationData" class="reservation-details">
      <button class="close-btn" @click="closeReservationDetails">&times;</button>
      <h2>Reservation Details</h2>
      <form @submit.prevent="updateReservation" class="reservation-form">
        <div class="form-group">
          <label>Confirmation Number:</label>
          <input type="text" v-model="reservationData.confirmationNumber" disabled />
        </div>
        <div class="form-group">
          <label>Room ID:</label>
          <input type="number" v-model="reservationData.roomId" />
        </div>
        <div class="form-group">
          <label>Check-in Date:</label>
          <input type="date" v-model="reservationData.checkInDate" />
        </div>
        <div class="form-group">
          <label>Check-out Date:</label>
          <input type="date" v-model="reservationData.checkOutDate" />
        </div>
        <div class="form-group">
          <label>Customer ID:</label>
          <input type="number" v-model="reservationData.customerId" />
        </div>
        <div class="form-group">
          <label>Customer Name:</label>
          <input type="text" v-model="reservationData.customerName" />
        </div>
        <div class="form-group">
          <label>Customer Email:</label>
          <input type="email" v-model="reservationData.customerEmail" />
        </div>
        <div class="button-container">
          <button type="submit">Update Reservation</button>
          <button type="button" class="delete-btn" @click="deleteReservation">Delete Reservation</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

// Reactive variables for handling confirmation number and reservation data
const confirmationNumber = ref('');
const reservationData = ref(null);
const errorMessage = ref('');

// Function to search for a reservation
const fetchReservation = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/v1/reservations/confirmation/${confirmationNumber.value}`);
    reservationData.value = response.data;
    errorMessage.value = ''; // Clear any previous error message
  } catch (error) {
    errorMessage.value = 'No reservation found with that confirmation number.';
    reservationData.value = null; // Clear reservation data in case of error
  }
};

// Function to close reservation details
const closeReservationDetails = () => {
  reservationData.value = null; // Clear reservation data
};

// Function to update the reservation using PUT
const updateReservation = async () => {
  try {
    await axios.put(`http://localhost:8080/api/v1/reservations/confirmation/${reservationData.value.confirmationNumber}`, {
      roomId: reservationData.value.roomId,
      checkInDate: reservationData.value.checkInDate,
      checkOutDate: reservationData.value.checkOutDate,
      customerId: reservationData.value.customerId,
      customerName: reservationData.value.customerName,
      customerEmail: reservationData.value.customerEmail,
    });
    alert('Reservation updated successfully');
  } catch (error) {
    console.error('Error updating reservation:', error);
    alert('Error updating reservation');
  }
};

// Function to delete the reservation using DELETE
const deleteReservation = async () => {
  try {
    await axios.delete(`http://localhost:8080/api/v1/reservations/confirmation/${reservationData.value.confirmationNumber}`);
    alert('Reservation deleted successfully');
    reservationData.value = null; // Clear the reservation data after deleting
  } catch (error) {
    console.error('Error deleting reservation:', error);
    alert('Error deleting reservation');
  }
};
</script>

<style scoped>
/* Main container */
.reservation-container {
  background-color: #4b2dce; /* Blue background */
  padding: 30px;
  border-radius: 10px;
  width: 70%;
  max-width: 800px; /* Set maximum size */
  margin: 0 auto;
  margin-top: 200px;
  text-align: center;
  color: white;
}

/* Style for headers */
h1, h2 {
  color: #fff;
  margin-bottom: 20px;
}

/* Style for reservation form */
.reservation-form {
  display: grid;
  grid-template-columns: 1fr 1fr; /* Divided into two columns */
  gap: 15px; /* Space between elements */
  text-align: left;
}

/* Style for inputs */
input[type="text"],
input[type="number"],
input[type="date"],
input[type="email"] {
  width: 100%;
  padding: 8px;
  margin-bottom: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 14px;
}

/* Form group */
.form-group {
  display: flex;
  flex-direction: column;
}

/* Button container */
.button-container {
  grid-column: span 2; /* Occupies both columns */
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

/* Close button style */
.close-btn {
  background: none;
  color: white;
  border: none;
  font-size: 28px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 15px;
}

/* General button style */
button {
  padding: 10px 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

/* Hover effect for buttons */
button:hover {
  background-color: #45a049;
}

/* Delete button style */
.delete-btn {
  background-color: #dc3545;
}

.delete-btn:hover {
  background-color: #c82333;
}

/* Error message style */
.error {
  color: #ff5b5b;
  margin-top: 10px;
  font-weight: bold;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .reservation-container {
    width: 90%; /* Increase width for smaller screens */
    padding: 20px; /* Reduce padding */
    margin-top: 250px; /* Add margin-top for smaller screens */
  }

  .reservation-form {
    grid-template-columns: 1fr; /* Stack inputs in a single column */
  }

  .button-container {
    flex-direction: column; /* Stack buttons vertically */
  }

  .button-container button {
    width: 100%; /* Full-width buttons */
    margin-bottom: 10px; /* Space between buttons */
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: 24px; /* Smaller font size for header */
  }

  h2 {
    font-size: 20px; /* Smaller font size for subheader */
  }

  input[type="text"],
  input[type="number"],
  input[type="date"],
  input[type="email"],
  button {
    font-size: 12px; /* Smaller font size for inputs and buttons */
  }

  .close-btn {
    font-size: 24px; /* Smaller close button */
  }

  .reservation-container {
    margin-top: 300px; /* Add more margin-top for the smallest screens */
  }
}
</style>

<template>
    <div v-if="isVisible" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h3>Customer Information</h3>
  
        <label for="name">Name:</label>
        <input
          :value="customerName"
          @input="updateCustomerName($event.target.value)"
          id="name"
          type="text"
          placeholder="Enter your name"
          required
        />
  
        <label for="email">Email Address:</label>
        <input
          :value="customerEmail"
          @input="updateCustomerEmail($event.target.value)"
          id="email"
          type="email"
          placeholder="Enter your email"
          required
        />
        
        <label for="creditCard">Credit Card Number:</label>
        <input
          :value="creditCardNumber"
          @input="updateCreditCardNumber($event.target.value)"
          id="creditCard"
          type="text"
          placeholder="Enter your credit card number"
          required
        />
  
        <button @click="confirmReservation">Confirm Reservation</button>
  
        <div v-if="modalErrorMessage" class="error">{{ modalErrorMessage }}</div>
        
        <div class="cancellation-policy">
          <p>Cancellation Policy: You can cancel up to 2 days before your arrival without any charge. If you cancel after this period, you will be charged for one night's stay.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    isVisible: Boolean,
    customerName: String,
    customerEmail: String,
    creditCardNumber: String,
    modalErrorMessage: String,
  });
  
  const emit = defineEmits(['close', 'update:customerName', 'update:customerEmail', 'update:creditCardNumber', 'confirm']);
  
  const updateCustomerName = (name) => {
    emit('update:customerName', name);
  };
  
  const updateCustomerEmail = (email) => {
    emit('update:customerEmail', email);
  };
  
  const updateCreditCardNumber = (creditCardNumber) => {
    emit('update:creditCardNumber', creditCardNumber);
  };
  
  const closeModal = () => {
    emit('close');
  };
  
  const confirmReservation = () => {
    const reservationData = {
      customerName: props.customerName,
      customerEmail: props.customerEmail,
      creditCardNumber: props.creditCardNumber
    };
    emit('confirm', reservationData);
  };
  </script>
  
  <style scoped>
  .modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
  }
  
  .modal-content {
    background-color: #007BFF;
    padding: 30px;
    border: 1px solid #888;
    width: 80%;
    max-width: 500px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    display: flex;
    flex-direction: column;
    align-items: stretch;
    margin: 200px auto 0 auto; /* Margen superior de 200px y centrado horizontalmente */
  }
  
  .close {
    align-self: flex-end;
    color: #fff;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
  }
  
  .close:hover,
  .close:focus {
    color: #ddd;
    text-decoration: none;
  }
  
  h3 {
    text-align: center;
    margin-bottom: 20px;
    color: #fff;
  }
  
  label {
    margin-top: 10px;
    margin-bottom: 5px;
    font-weight: bold;
    color: #fff;
  }
  
  input {
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  
  button {
    background-color: #28a745;
    color: white;
    padding: 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }
  
  button:hover {
    background-color: #218838;
  }
  
  .error {
    color: red;
    margin-top: 10px;
    text-align: center;
  }
  
  .cancellation-policy {
    margin-top: 20px;
    font-size: 14px;
    color: yellow;
    border-top: 1px solid #ddd;
    padding-top: 10px;
  }
  </style>
  
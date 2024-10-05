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
  
        <div v-if="modalErrorMessage" style="color: red;">{{ modalErrorMessage }}</div>
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
    emit('confirm');
  };
  </script>
  
  <style scoped>
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
  
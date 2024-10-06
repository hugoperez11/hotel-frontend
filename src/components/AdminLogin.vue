<template>
  <div class="login">
    <button class="login-btn" @click="showLoginPopup = true">Login as Admin</button>

    <!-- Popup de Login -->
    <div v-if="showLoginPopup" class="popup-overlay">
      <div class="popup-content">
        <h4>Login</h4>
        <form @submit.prevent="handleLogin">
          <div class="input-group">
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="username" required />
          </div>
          <div class="input-group">
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required />
          </div>
          <div class="button-container">
            <button class="login-btn submit-btn" type="submit">Login</button>
            <button class="login-btn close-btn" type="button" @click="showLoginPopup = false">Close</button>
          </div>
        </form>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth'; // Si estás utilizando un store

const showLoginPopup = ref(false);
const username = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();
const authStore = useAuthStore();

async function handleLogin() {
  errorMessage.value = ''; // Resetear mensaje de error
  try {
    // Crear la cabecera de autorización Basic
    const headers = {
      'Authorization': 'Basic ' + btoa(username.value + ':' + password.value)
    };

    // Realizamos la solicitud de login usando GET
    const response = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/login`, {
      headers: headers, // Enviar la cabecera con las credenciales
      withCredentials: true 
    });

    // Si la respuesta es exitosa
    if (response.status === 202) {
      // Autenticación exitosa
      alert('Login exitoso');
      router.push('/admin'); // Redirigir a la vista de admin
    } else {
      errorMessage.value = 'Error en la autenticación.';
    }
  } catch (error) {
    // Manejo de errores
    if (error.response && error.response.status === 401) {
      errorMessage.value = 'Credenciales incorrectas';
    } else {
      errorMessage.value = 'Ocurrió un error. Inténtalo nuevamente.';
    }
  }
}
</script>

<style scoped>
/* Estilos del login */
.login {
  display: flex;
  justify-content: center;
  margin: 15px 0;
}

.login-btn {
  background-color: #91bdeb; /* Fondo azul oscuro */
  color: white;
  border: none;
  padding: 0px 4px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.login-btn:hover {
  background-color: #004494; /* Efecto hover */
}

.submit-btn {
  background-color: #28a745; /* Verde para botón de login */
}

.submit-btn:hover {
  background-color: #218838;
}

.close-btn {
  background-color: #dc3545; /* Rojo para botón de cerrar */
}

.close-btn:hover {
  background-color: #c82333;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6); /* Fondo oscuro más opaco */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
}

.popup-content {
  background: #0056b3; 
  color: white; 
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3); 
  width: 350px;
  text-align: center; /* Centramos el texto */
}

h4 {
  font-size: 22px;
  margin-bottom: 20px;
  color: #fff;
  font-weight: 600;
}

.input-group {
  margin-bottom: 15px;
}

input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  font-size: 16px;
}

input:focus {
  outline: none;
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
}

.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.error {
  color: #ff5b5b;
  margin-top: 15px;
  font-weight: bold;
}
</style>

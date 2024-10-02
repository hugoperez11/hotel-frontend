<template>
  <div class="login">
    <button class="login-btn" @click="showLoginPopup = true">Login</button>

    <!-- Popup de Login -->
    <div v-if="showLoginPopup" class="popup-overlay">
      <div class="popup-content">
        <h4>Login</h4>
        <form @submit.prevent="handleLogin">
          <div>
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="username" required />
          </div>
          <div>
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required />
          </div>
          <div class="button-container">
            <button type="submit">Login</button>
            <button type="button" @click="showLoginPopup = false">Close</button>
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
      headers: headers // Enviar la cabecera con las credenciales
    });

    // Si la respuesta es exitosa
    if (response.status === 202) {
      // Autenticación exitosa
      alert('Login exitoso');
      router.push('/adminview'); // Redirigir a la vista de admin
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
/* Estilos del popup */
.login {
  display: flex;
  justify-content: center;
  margin: 15px 0;
}

.login-btn {
  background-color: #8ab9ec;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001; /* Asegúrate de que esté por encima de otros elementos */
}

.popup-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 300px; /* Ajusta según sea necesario */
}

.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>

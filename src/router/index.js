import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import GallleryView from '@/views/GallleryView.vue';
import ReservationsView from '@/views/ReservationsView.vue';

import AdminView from '@/views/AdminView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/gallery',
    name: 'gallery',
   component: GallleryView
  },
  {
    path: '/reservations',
    name: 'reservations',
    component: ReservationsView
  },

  {
    path: '/admin',
    name: 'adminview',
    component: AdminView,
  /*   meta: { requiresAuth: true } */ // Añadimos el meta requiresAuth para proteger la ruta
  }
];

// Aquí creamos el router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});
/* 
// Aquí añadimos la lógica de autenticación antes de cada navegación
router.beforeEach((to, from, next) => {
  const isAuthenticated = document.cookie.includes('JSESSIONID'); // Chequeamos si la cookie de sesión está presente

  if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
    next('/'); // Redirige al home si no está autenticado
  } else {
    next(); // Permitir el acceso
  }
});
 */
// Exportamos el router para que pueda ser utilizado en la aplicación
export default router;

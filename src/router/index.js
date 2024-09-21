import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GallleryView from '@/views/GallleryView.vue'
import ReservationsView from '@/views/ReservationsView.vue'
import RestaurantsView from '@/views/RestaurantsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
      path: '/restaurants',
      name: 'restaurants',
    
      component: RestaurantsView
    }   
  ]
})

export default router

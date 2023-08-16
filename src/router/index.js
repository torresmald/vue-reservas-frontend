import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/reservas',
      name: 'reservas',
      component: () => import('../views/reservas/ReservasLayouts.vue'),
      children: [
        {
          path: 'nueva',
          component: () => import('../views/reservas/NuevaReservaLayout.vue'),
          children: [
            {
              path: '',
              name: 'nueva-cita',
              component: () => import('../views/reservas/ServicesView.vue')
            },
            {
              path: 'detalles',
              name: 'detalles-cita',
              component: () => import('../views/reservas/DetallesReserva.vue')
            }
          ]
        }
      ]
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/auth/AuthLayout.vue'),
      children: [
        {
          path: 'registro',
          name: 'register',
          component: () => import('../views/auth/RegisterView.vue'),
        },
        {
          path: 'confirmar-cuenta/:token',
          name: 'confirm-account',
          component: () => import('../views/auth/ConfirmAccountView.vue'),
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('../views/auth/LoginView.vue'),
        }
      ]
    }
  ]
})

export default router

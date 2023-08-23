import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {auth, admin} from '../api/AuthApi.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/auth/AuthLayout.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminLayout.vue'),
      meta: {requiresAdmin: true},
      children: [
        {
          path: '',
          name: 'admin-citas',
          component: () => import('../views/admin/CitasView.vue')
        }
      ]
    },
    {
      path: '/reservas',
      name: 'reservas',
      component: () => import('../views/reservas/ReservasLayouts.vue'),
      meta: {requiresAuth: true},
      children: [
        {
          path: '',
          name: 'mis-citas',
          component: () => import('../views/reservas/MisReservasView.vue')
        },
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
        },
        {
          path: ':id/editar',
          component: () => import('../views/reservas/EditReservaLayout.vue'),
          children: [
            {
              path: '',
              name: 'editar-cita',
              component: () => import('../views/reservas/ServicesView.vue')
            },
            {
              path: 'detalles',
              name: 'editar-detalles-cita',
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
        },
        {
          path: 'olvide-password',
          name: 'olvide-password',
          component: () => import('../views/auth/ForgotPasswordView.vue'),
        },
        {
          path: 'olvide-password/:token',
          name: 'new-password',
          component: () => import('../views/auth/NewPasswordView.vue'),
        }
      ]
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(url => url.meta.requiresAuth)
  if(requiresAuth){
    try {
      const {data} = await auth()
      if(data.admin){
        next({name: 'admin'})
      } else {
        next()
      }
    } catch (error) {
      next({name: 'login'})
    }
  }else {
    next()
  }
})


router.beforeEach(async (to, from, next) => {
  const requiresAdmin = to.matched.some(url => url.meta.requiresAdmin)
  if(requiresAdmin){
    try {
      const {data} = await admin()
      next()
    } catch (error) {
      next({name: 'login'})
    }
  }else {
    next()
  }
})

export default router

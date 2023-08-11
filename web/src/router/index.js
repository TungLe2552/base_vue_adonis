import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import axios from 'axios';
import { userStore } from '@/stores/user';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/microsoftLogin', component: () => import('@/views/MicrosoftLogin.vue')},
    {
      path: '/login',
      component: MainLayout,
      name: 'login',
      meta:{
        menu: false,
        bg:true
      },
      children: [
        {path: '', component: () => import('@/views/Login.vue')}
      ]
    },
    {
      path: '/register',
      component: MainLayout,
      name:'register',
      meta:{
        menu: false,
        bg:true
      },
      children: [
        {path: '', component: () => import('@/views/Register.vue')}
      ]
    },
    {
      path: '/forgot-password',
      component: MainLayout,
      name:'forgot-password',
      meta:{
        menu: false,
        bg:true
      },
      children: [
        {path: '', component: () => import('@/views/ForgotPassword.vue')}
      ]
    },
    {
      path: '/',
      component: MainLayout,
      meta:{
        requiresAuth:true,
        menu: true,
        bg:true
      },
      children: [
        {path: '', component: () => import('@/views/HomeView.vue')},
      ]
    },
  ]
})

router.beforeEach( async(to,from)=>{
  const user = userStore()
  try{
    if (to.meta.requiresAuth){
      const res = await axios.get('/api/auth/me')
      user.setUser(res.data)
    }
  }
  catch(error){
    return{
      path:'/login'
    }
  }
})
export default router

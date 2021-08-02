import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
// import status from '../views/players.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // {
  //   path: '/players',
  //   name: 'players',
  //   component: status
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Menu from '../views/Menu.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Authorization',
    component: Login
  },
  {
    path: '/menu',
    name: 'menu',
    component: Menu
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router

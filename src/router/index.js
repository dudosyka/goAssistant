import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Menu from '../views/Menu.vue'

import CloseGame from '../views/CloseGame.vue'
import JoinToCloseGame from '../views/JoinToCloseGame.vue'
import NewCloseGame from '../views/NewCloseGame.vue'

import Passport from '../views/Passport.vue'

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
    name: 'Menu',
    component: Menu
  },
  {
    path: '/menu/closegame',
    name: 'CloseGame',
    component: CloseGame
  },
  {
    path: '/menu/closegame/joingame',
    name: 'JoinToCloseGame',
    component: JoinToCloseGame
  },
  {
    path: '/menu/closegame/newgame',
    name: 'NewCloseGame',
    component: NewCloseGame
  },
  {
    path: '/passport',
    name: 'Passport',
    component: Passport
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router

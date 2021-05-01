import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Game from '../views/Game.vue'

import CloseGame from '../views/CloseGame.vue'
import JoinToCloseGame from '../views/JoinToCloseGame'

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
    path: '/closegame',
    name: 'CloseGame',
    component: CloseGame
  },
  {
    path: '/closegame/joingame',
    name: 'JoinToCloseGame',
    component: JoinToCloseGame
  },
  {
      path: '/game',
      name: 'Game',
      component: Game
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router

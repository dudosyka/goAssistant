import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Game from '../views/Game.vue'
import GameHistory from '../views/GameHistory'

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
    path: '/closegame/newgame',
    name: 'NewCloseGame',
    component: NewCloseGame
  },
  {
    path: '/passport',
    name: 'Passport',
    component: Passport
  },
  {
      path: '/game',
      name: 'Game',
      component: Game
  },
  {
	  path: '/game/view',
	  name: 'GameView',
	  component: GameHistory,
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router

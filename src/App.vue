<template>
  <div id="app">
    <div id="nav">
      <router-link id="nav" to="/">Home</router-link> |
      <router-link id="nav" v-if="!alreadyLogin" to="/login">Login</router-link> <span v-if='!alreadyLogin'>|</span>
      <router-link id="nav" to="/menu/closegame">CloseGame</router-link> |
    </div>
    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<style>
@import "./assets/styles/style.css";
#nav {
  padding: 5px;
  color: #fff;
  text-decoration: none;
  background-color: #893343;
}
</style>

<script>
  export default {
    data() {
      return {

      }
    },
    computed: {
    name: 'Menu',
    data() {
      return {
          alreadyLogin: false,
      }
    },
    components: {

    },
    methods: {
    },
    created() {
        this.alreadyLogin = storage('token') != null;
    }
  }
  }
</script>

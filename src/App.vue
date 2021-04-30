<template>
  <div id="app">
    <div id="nav">
      <router-link id="nav" to="/">Home</router-link> |
      <router-link id="nav" to="/login">Login</router-link> |
      <router-link id="nav" to="/menu">Menu</router-link> |
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

<script type="text/javascript">

  export default {
    data() {
      return {

      }
    },
    computed: {

    }
  }
</script>

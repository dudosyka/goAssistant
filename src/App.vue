<template>
  <div id="app">
    <div id="nav">
      <router-link id="nav" to="/">Home</router-link> |
      <router-link id="nav" to="/login">Login</router-link> |
      <router-link id="nav" to="/menu">Menu</router-link> |
      <router-link id="nav" to="/menu/closegame">CloseGame</router-link> |
    </div>
    <!--
    <header class="user w3-card-4">
      <h1 class="user-nick"><router-link to="/pasport">{{nick}}</router-link></h1>
      <img v-bind:src="ava" height="100%">
    </header>
    !-->
    <router-view></router-view>
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
        ava: 'https://www.castorama.ru/media/catalog/product/cache/image/1800x/040ec09b1e35df139433887a97daa66f/6/6/66d549_510228_1.jpg',
        nick: 'ex@mp1e',
      }
    },
    computed: {

    }
  }
</script>

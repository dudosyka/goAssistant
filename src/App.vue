<template>
  <div id="app">
    <div id="nav">
      <router-link style="color: #fff" to="/">Home</router-link> |
      <router-link style="color: #fff" to="/login">Login</router-link> |
      <router-link style="color: #fff" to="/Menu">Menu</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<style>
@import "./assets/styles/style.css";
</style>

<script type="text/javascript">

  export default {
  }
</script>

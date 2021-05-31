<template>
  <div id="app">
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
    name: 'Menu',
    data() {
      return {
          alreadyLogin: false
      }
    },
    components: {},
    methods: {},
    created() {
        this.alreadyLogin = storage('token') != null;
    }
  }
</script>

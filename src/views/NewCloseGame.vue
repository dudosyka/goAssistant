<template>
  <main class="menu">
    <article class="form_window menu">
      <h1 class="title">Код вашего камня</h1>
      <div class="">
        <div class="input" style="text-align: center; width: 100%">{{code}}</div>
        <button class="button-light w3-button w3-card-4 tr w3-hover-white">Начать игру</button>
        <router-link class="button-light w3-button w3-card-4 tr w3-hover-white back-button" to="/menu/closegame">Назад</router-link>
      </div>
    </article>
  </main>
</template>

<script>
  import axios from "axios"

  export default {
    name: 'NewCloseGame',
    data() {
      return {
        code: 'number'
      }
    },
    components: {

    },
    methods: {
    },
  }
</script>

<template>
  <main class="menu">
    <article class="form_window menu">
      <h1 class="title">Укажите код камня</h1>
      <div class="">
        <input type="text" class="input" placeholder="code">
        <button class="button-light w3-button w3-card-4 tr w3-hover-white" disabled>Присоединиться</button>
        <router-link class="button-light w3-button w3-card-4 tr w3-hover-white back-button" to="/menu/closegame">Назад</router-link>
      </div>
    </article>
  </main>
</template>

<script>
  import axios from "axios"

  export default {
    name: 'JoinToCloseGame',
    data() {
      return {
        code: null
      }
    },
    components: {

    },
    methods: {
    },
  }
</script>

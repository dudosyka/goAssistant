<template>
    <main class="menu">
      <article class="form_window">
        <header class="form_title">
          <button v-on:click="lever = 0">Войти</button> \ <button v-on:click="lever = 1">Зарегистрироваться</button>
        </header>
        <section class="form_login" v-show="!lever">
          <input type="mail" class="input" placeholder="Email">
          <input type="text" class="input" placeholder="Password">
        </section>
        <section class="form_signup" v-show="lever">
          <input type="text" class="input" placeholder="Email">
          <input type="text" class="input" placeholder="Nickname">
        </section>
      </article>
    </main>
</template>
<script>
  import axios from "axios"

  export default {
    name: 'Login',
    data() {
      return {
        email: null,
        pass: null,
        nick: null,
        lever: 0
      }
    },
    components: {

    },
    methods: {
    },
  }
</script>

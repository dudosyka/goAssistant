<template>
    <main class="menu">
      <article class="form_window">
        <header class="form_title">
          <button v-on:click="lever = 0">Войти</button> \ <button v-on:click="lever = 1">Зарегистрироваться</button>
        </header>
        <section class="form_login" v-show="!lever">
          <input v-model='email' type="mail" class="input" placeholder="Email">
          <input v-model='password' type="text" class="input" placeholder="Password">
        </section>
        <section class="form_signup" v-show="lever">
          <input v-model='email' type="text" class="input" placeholder="Email">
          <input v-model='nickname' type="text" class="input" placeholder="Nickname">
          <button @click='auth()'>Зарегистрироваться</button>
        </section>
      </article>
    </main>
</template>
<script>
  export default {
    name: 'Login',
    data() {
      return {
        email: null,
        password: null,
        nickname: null,
        lever: 0
      }
    },
    components: {

    },
    methods: {
        auth() {
            post('/user/register', { email: this.email, nickname: this.nickname }, data => {
                localStorage.setItem('token', data.data.token);
                window.location = window.location;
            });
        }
    },
    created() {
    }
  }
</script>

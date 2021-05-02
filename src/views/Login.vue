<template>
    <main class="menu">
      <article class="form_window">
        <header class="form_title">
          <button v-on:click="lever = 0">Войти</button> \ <button v-on:click="lever = 1">Зарегистрироваться</button>
        </header>
        <div class="row">
          <div>
            <section class="form_login" v-show="!lever">
              <input v-model='email' type="email" class="input" placeholder="Email">
              <input v-model='password' type="password" class="input" placeholder="Password" style="margin:0;">
            </section>
            <section class="form_signup" v-show="lever">
              <input v-model='email' type="text" class="input" placeholder="Email">
              <input v-model='nickname' type="text" class="input" placeholder="Nickname" style="margin:0;">
            </section>
          </div>
          <button @click='auth()' class="button w3-button w3-card-4 tr w3-hover-white">&#10148;</button>
        </div>
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
			if (!this.lever) {
				post('/user/login', { email: this.email, password: this.password }, data => {
					setStorage("token", data.data.token);
					window.location = window.location;
				});
			}
			else {
				post('/user/register', { email: this.email, nickname: this.nickname }, data => {
					localStorage.setItem('token', data.data.token);
					window.location = window.location;
				});
			}
        }
    },
    created() {
    }
  }
</script>

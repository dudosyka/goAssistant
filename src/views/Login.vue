<template>
    <main class="menu">
      <article class="form_window">
        <header class="form_title">
          <button v-on:click="lever = 0" :class="lever == 0 ? 'attention' : ''">Войти</button> \ <button v-on:click="lever = 1" :class="lever == 1 ? 'attention' : '' ">Зарегистрироваться</button>
        </header>
        <div class="row">
          <div>
            <section class="form_login" v-show="!lever">
              <input v-model='email' type="email" class="input" placeholder="Email" :invalid="valid.email">
              <input v-model='password' type="password" class="input" placeholder="Password" style="margin:0;" :invalid="valid.pass">
            </section>
            <section class="form_signup" v-show="lever">
              <input v-model='email' type="text" class="input" placeholder="Email" :invalid="valid.email">
              <input v-model='nickname' type="text" class="input" placeholder="Nickname" style="margin:0;" :invalid="valid.nick">
            </section>
          </div>
          <button @click='auth()' class="button w3-button w3-card-4 tr w3-hover-white">&#10148;</button>
        </div>
      </article>
    </main>
</template>
<style>
  .attention {
    font-weight: bold;
  }
</style>
<script>
  export default {
    name: 'Login',
    data() {
      return {
        email: null,
        password: null,
        nickname: null,
        lever: 0,
        valid: {
          email: false,
          pass: false,
          nick: false
        }
      }
    },
    components: {

    },
    methods: {
        auth() {
			if (!this.lever) {
				post('/user/login', { email: this.email, password: this.password }, data => {
					if (data.data.error != "")
					{
						this.valid.email = true;
						this.valid.pass = true;
					}
					else
					{
						setStorage("token", data.data.token);
						window.location = window.location;
					}
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

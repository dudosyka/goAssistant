<template>
    <main class="menu">
<div id="modal" class="w3-modal">
        <div class="w3-modal-content w3-animate-top w3-card-4">
            <header class="w3-container w3-purple">
                <span onclick="document.getElementById('modal').style.display='none'"
                class="w3-button w3-display-topright">&times;</span>
            <h2 id="modalHeader">-</h2>
        </header>
        <div class="w3-container">
            <p id="modalText">Такой e-mail адрес уже есть в системе! Попробуйте войти.</p>
        </div>
        <footer class="w3-container w3-purple" id="modalFooter">
        </footer>
      </div>
    </div>
      <article class="form_window">
        <header class="form_title">
          <button v-on:click="lever = 0" :class="lever == 0 ? 'attention' : ''">Войти</button> \ <button v-on:click="lever = 1" :class="lever == 1 ? 'attention' : '' ">Зарегистрироваться</button>
        </header>
        <div class="row">
          <div>
            <section class="form_login" v-show="!lever">
              <input v-on:keyup.enter='auth()' v-model='email' type="email" class="input" placeholder="Email" :invalid="valid.email">
              <input v-on:keyup.enter='auth()' v-model='password' type="password" class="input" placeholder="Password" style="margin:0;" :invalid="valid.pass">
            </section>
            <section class="form_signup" v-show="lever">
              <input v-on:keyup.enter='auth()' v-model='email' type="text" class="input" placeholder="Email" :invalid="valid.email">
              <input v-on:keyup.enter='auth()' v-model='nickname' type="text" class="input" placeholder="Nickname" style="margin:0;" :invalid="valid.nick">
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
			this.valid = {
				email: false, 
				pass: false,
				nick: false
			}
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
					if (data.data.error != "")
					{
						this.valid.email = true;
						this.showModal("Ошибка!");
					}
					else
					{
						localStorage.setItem('token', data.data.token);
						window.location = window.location;
					}
				});
			}
        },
        showModal(header,text = "") {
            document.getElementById('modal').style.display='block';
            document.getElementById('modalHeader').innerHTML = header;
            //document.getElementById('modalText').innerHTML = text;
            document.getElementById('modalFooter').innerHTML = `<button class="w3-button w3-white w3-hover-white w3-card-4 tr" onclick="document.getElementById('modal').style.display='none'">Закрыть</button>`;
        },
    },
    created() {
    }
  }
</script>

<template>
    <main class="menu">
      <article class="form_window">
        <header class="form_title">
          <button v-on:click="lever = 0">Войти</button> \ <button v-on:click="lever = 1">Зарегистрироваться</button>
        </header>
        <div class="row">
          <div>
            <section class="form_login" v-show="!lever">
              <input type="mail" class="input" placeholder="Email">
              <input type="text" class="input" placeholder="Password" style="margin:0;">
            </section>
            <section class="form_signup" v-show="lever">
              <input type="text" class="input" placeholder="Email">
              <input type="text" class="input" placeholder="Nickname" style="margin:0;">
            </section>
          </div>
          <button class="right-arrow w3-button w3-card-4 tr w3-hover-white">&#10148;</button>
        </div>
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
        auth() {

        let bodyFormData = new FormData();

        bodyFormData.append('email', 'a.hatson@ya.ru');
        bodyFormData.append('nickname', 'dudosyka');

        axios({
          method: "post",
          url: "https://go-backend-denis.ambersoft.llc/user/register",
          data: bodyFormData,
          headers: { "Content-Type": "multipart/form-data" },
        }).then(data => { console.log(data); }).catch(err => { console.log(err); });
        },
        statistic() {
            axios.get('https://go-backend-denis.ambersoft.llc/user/statistics')
            .then(data => {console.log(data)}).catch(err => {console.log(err)});
        }
    },
    created() {
        this.statistic();
        this.auth();
    }
  }
</script>

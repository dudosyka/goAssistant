<template>
  <main class="menu">
    <div id="modal" class="w3-modal">
      <div class="w3-modal-content w3-animate-top w3-card-4">
        <header class="w3-container w3-purple">
          <span onclick="document.getElementById('modal').style.display='none'" class="w3-button w3-display-topright">&times;</span>
          <h2 id="modalHeader">-</h2>
        </header>
        <div class="w3-container">
          <p id="modalText">{{ localeData.emailExists }}</p>
        </div>
        <footer class="w3-container w3-purple" id="modalFooter"></footer>
      </div>
    </div>
    <article class="form_window">
      <header class="form_title">
        <button v-on:click="lever = 0" :class="lever == 0 ? 'attention' : ''">{{ localeData.login }}</button>
        \
        <button v-on:click="lever = 1" :class="lever == 1 ? 'attention' : ''">{{ localeData.register }}</button>
      </header>
      <div class="row">
        <div>
          <section class="form_login" v-show="!lever">
            <input v-on:keyup.enter="auth()" v-model="email" type="email" class="input" placeholder="Email" :invalid="valid.email">
            <input v-on:keyup.enter="auth()" v-model="password" type="password" class="input" placeholder="Password" style="margin: 0" :invalid="valid.pass">
          </section>
          <section class="form_signup" v-show="lever">
            <input v-on:keyup.enter="auth()" v-model="email" type="text" class="input" placeholder="Email" :invalid="valid.email">
            <input v-on:keyup.enter="auth()" v-model="nickname" type="text" class="input" placeholder="Nickname" style="margin: 0" :invalid="valid.nick">
          </section>
        </div>
        <button @click="auth()" class="button w3-button w3-card-4 tr w3-hover-white">&#10148;</button>
      </div>
      <div class="w3-center">
        <img class="w3-image flag" src="../assets/lang_ru.png" @click="changeLanguage('ru')">
        <img class="w3-image flag" src="../assets/lang_en.png" @click="changeLanguage('en')">
        <img class="w3-image flag" src="../assets/lang_jp.png" @click="changeLanguage('jp')">
      </div>
    </article>
  </main>
</template>
<style>
.attention {font-weight: bold;}
</style>
<script>
import * as Localization from "../Models/Localization";
export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      nickname: null,
      lever: 0,
      valid: {
        email: false,
        pass: false,
        nick: false,
      },
      locale: null,
      localeData: {
        emailExists: "",
        login: "",
        register: "",
      },
    };
  },
  components: {},
  methods: {
    changeLanguage(lang) {
      localStorage.setItem("lang", lang);
      window.location.reload();
    },
    auth() {
      this.valid = {
        email: false,
        pass: false,
        nick: false,
      };
      if (!this.lever) {
        post(
          "/user/login",
          { email: this.email, password: this.password },
          (data) => {
            if (data.data.error != "") {
              this.valid.email = true;
              this.valid.pass = true;
            } else {
              setStorage("token", data.data.token);
              window.location = window.location;
            }
          }
        );
      } else {
        post(
          "/user/register",
          { email: this.email, nickname: this.nickname },
          (data) => {
            if (data.data.error != "") {
              this.valid.email = true;
              this.showModal(this.locale.language.menu.error);
            } else {
              localStorage.setItem("token", data.data.token);
              window.location = window.location;
            }
          }
        );
      }
    },
    showModal(header, text = "") {
      document.getElementById("modal").style.display = "block";
      document.getElementById("modalHeader").innerHTML = header;
      document.getElementById(
        "modalFooter"
      ).innerHTML = `<button class="w3-button w3-white w3-hover-white w3-card-4 tr" onclick="document.getElementById('modal').style.display='none'">${this.locale.language.menu.close}</button>`;
    },
  },
  created() {
    //localization load
    if (localStorage.getItem("lang") == null) localStorage.setItem("lang", "ru");
    this.locale = new Localization.default(localStorage.getItem("lang"));
    let lang = this.locale.language;

    this.localeData.emailExists = lang.menu.emailExists;
    this.localeData.login = lang.menu.login;
    this.localeData.register = lang.menu.register;
  },
};
</script>

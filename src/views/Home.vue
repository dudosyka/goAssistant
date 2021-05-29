<template>
  <main class="menu">
    <!-- LOADER !-->
    <aside class="modal loading" v-show="showLoader">
      <header class="modal">
        <h1 class="modal">{{ loaderMsg }}</h1>
        <span></span>
        <div class="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </header>
    </aside>
    <!-- LOADER !-->

    <article class="menu">
      <div class="main-layout">
        <div class="profil w3-card-4">
          <router-link to="/passport" class="bookmarck">
            <img v-bind:src="ava" /><br>
            <span>{{ nick }}</span> </router-link><br>
          <button @click="logout()" class="button full-width w3-button w3-card-4 tr w3-hover-white door" style="font-size: 20px">{{localeData.logout}}</button>
        </div>

        <div style="min-width: fit-content" class="">
          <button @click="continueGame()" class="button full-width w3-button w3-card-4 tr w3-hover-white point" v-if="alreadyStart">{{localeData.continue}}</button>
          <button @click="randomGame()" class="button full-width w3-button w3-card-4 tr w3-hover-white hi" :disabled="alreadyStart">{{localeData.random}}</button>
          <button @click="startGameWithBot()" class="button full-width w3-button w3-card-4 tr w3-hover-white lamp" :disabled="alreadyStart" >{{localeData.ai}}</button>
          <router-link class="button full-width w3-button w3-card-4 tr w3-hover-white loocker" to="/closegame" tag="button" :disabled="alreadyStart">{{localeData.closed}}</router-link>
          <div class="w3-center">
            <img class="w3-image flag" src="../assets/lang_ru.png" @click="changeLanguage('ru')"> 
            <img class="w3-image flag" src="../assets/lang_en.png" @click="changeLanguage('en')">
          </div>
        </div>
      </div>
    </article>
  </main>
</template>

<style scoped>
</style>

<script>
import * as Localization from "../Models/Localization";
import { w3cwebsocket as W3CWebSocket } from "websocket";

export default {
  name: "Menu",
  data() {
    return {
      alreadyStart: false,
      ava:  
        "https://www.castorama.ru/media/catalog/product/cache/image/1800x/040ec09b1e35df139433887a97daa66f/2/e/2ef250_510229_1.jpg",
      nick: "ex@mple",
      search: false,
      showLoader: false,
      client: false,
      locale: null,
      localeData: {
        logout: "",
        continue: "",
        random: "",
        ai: "",
        closed: "",
      },
    };
  },
  components: {},
  methods: {
    changeLanguage(lang) {
      localStorage.setItem("lang",lang);
      window.location.reload();
    },
    logout() {
      logout();
      //setStorage('token', null);
      //window.location = window.location;
    },

    continueGame(start = true, silence = true) {
      this.loaderMsg = this.locale.language.menu.loadGame;
      if (!silence) this.showLoader = true;
      get("/game/current?token=" + storage("token"), null, (data) => {
        this.showLoader = false;
        if (data.data.gameId !== null) {
          this.alreadyStart = true;
        } else {
          setStorage("curGameId", null);
        }

        if (start) startGame(data.data.gameId);
      });
    },
    randomGame() {
      this.loaderMsg = this.locale.language.menu.searchingEnemy;
      this.showLoader = true;
      post("/game/create/random?token=" + storage("token"), null, (data) => {
        //this.showLoader = false;
        setStorage("curGameId", data.data.gameId);
        const client = new W3CWebSocket("ws://172.104.137.176:41239");

        client.onopen = function () {
          console.log("WebSocket opened");
          client.send(JSON.stringify([5, "go/game"]));
          client.send(
            JSON.stringify([
              7, // 7 - статус: отправка сообщения
              "go/game", // в какой топик отправляется сообщение
              {
                command: "auth", // команда на авторизацию подключения
                token: storage("token"), // токен игрока
                game_id: data.data.gameId, // номер игры
              },
            ])
          );
        };

        client.onmessage = function (event) {
          let payload = JSON.parse(event.data).payload;
          if (payload.type == "userConnected") {
            get(
              "/user/profile" + "?token=" + storage("token"),
              null,
              (user) => {
                console.log("DATA_user", user);
                if (user.data.user.id !== payload.userId) {
                  startGame(data.data.gameId);
                  window.location = "/game";
                }
              }
            );
            console.log(11);
          }
          console.log(data);
        };
        //startGame(data.data.gameId);
      });
    },
    startGameWithBot() {
      this.loaderMsg = this.locale.language.menu.loadingBot;
      this.showLoader = true;
      post("/game/create/bot?token=" + storage("token"), null, (data) => {
        this.showLoader = false;
        setStorage("curGameId", data.data.gameId);
        startGame(data.data.gameId);
      });
    },
  },
  async created() {
    //localization load
    let instance = this;
    if(localStorage.getItem("lang") == null) localStorage.setItem("lang","ru")
    instance.locale = new Localization.default(localStorage.getItem("lang"));
    let lang = instance.locale.language;

    this.localeData.logout = lang.menu.logout;
    this.localeData.continue = lang.menu.continueGame;
    this.localeData.random = lang.menu.random;
    this.localeData.ai = lang.menu.ai;
    this.localeData.closed = lang.menu.private;

    getCurUser().then((data) => {
      console.log(data);
      this.ava = data.avatar;
      this.nick = data.nickname;
    });
    this.continueGame(false, true);
  },
};
</script>
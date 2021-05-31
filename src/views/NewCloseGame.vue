<template>
  <main v-on:keyup.enter="startGame()" class="menu">
    <!-- LOADER !-->
    <aside class="modal loading" v-show="search">
      <header class="modal">
        <h1 class="modal">{{ localeData.waiting }}</h1>
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
    <article class="form_window menu">
      <h1 class="title">{{ localeData.gobanCode }}</h1>
      <div class="">
        <div class="output full-width" style="text-align: center; width: 100%">{{ code }}</div>
        <button @click="startGame()" :disabled="search == true" class="button full-width w3-button w3-card-4 tr w3-hover-white">{{ localeData.start }}</button>
        <router-link class="button full-width w3-button w3-card-4 tr w3-hover-white back-button" to="/closegame">{{ localeData.back }}</router-link>
      </div>
    </article>
  </main>
</template>

<script>
import * as Localization from "../Models/Localization";
import { w3cwebsocket as W3CWebSocket } from "websocket";

export default {
  name: "NewCloseGame",
  data() {
    return {
      code: "XXXX",
      client: false,
      search: false,
      locale: null,
      localeData: {
        waiting: "",
        gobanCode: "",
        start: "",
        back: "",
      },
    };
  },
  components: {},
  methods: {
    startGame() {
      console.log(112);
      this.search = true;
      this.client.send(JSON.stringify([5, "go/game"]));
      this.client.send(
        JSON.stringify([
          7, // 7 - статус: отправка сообщения
          "go/game", // в какой топик отправляется сообщение
          {
            command: "auth", // команда на отправку запроса "сдаться"
            token: storage("token"), // токен игрока
            game_id: storage("curGameId"), // номер игры
          },
        ])
      );
    },
  },
  created() {
    //localization load
    if (localStorage.getItem("lang") == null) localStorage.setItem("lang", "ru");
    this.locale = new Localization.default(localStorage.getItem("lang"));
    let lang = this.locale.language;

    this.localeData.waiting = lang.menu.waitingEnemy;
    this.localeData.gobanCode = lang.menu.gobanCode;
    this.localeData.start = lang.menu.start;
    this.localeData.back = lang.menu.back;

    //main block
    post("/game/create/code", { token: storage("token") }, (data) => {
      setStorage("secretRoom", data.data.code);
      setStorage("curGameId", data.data.gameId);
      this.code = storage("secretRoom");
      const client = new W3CWebSocket("ws://172.104.137.176:41239");

      client.onopen = function () {
        console.log(client);
      };
      client.onmessage = function (event) {
        let payload = JSON.parse(event.data).payload;
        if (payload.type == "userConnected") {
          get("/user/profile" + "?token=" + storage("token"), null, (data) => {
            console.log("DATA", data);
            if (data.data.user.id !== payload.userId) {
              window.location = "/game";
            }
          });
          console.log(11);
        }
        console.log(data);
      };
      this.client = client;
      console.log(data.data.code);
    });
  },
};
</script>

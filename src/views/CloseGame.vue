<template>
  <main class="menu">
    <article class="form_window menu">
      <h1 class="title">{{localeData.private}}</h1>
      <div style="display: flex;flex-direction: column; min-width: 350px;"">
        <router-link class="button full-width w3-button w3-card-4 tr w3-hover-white god" to="/closegame/newgame">{{localeData.create}}</router-link>
        <router-link class="button full-width w3-button w3-card-4 tr w3-hover-white join" to="/closegame/joingame">{{localeData.connect}}</router-link>
        <router-link class="button full-width w3-button w3-card-4 tr w3-hover-white back-button" to="/">{{localeData.back}}</router-link>
      </div>
    </article>
  </main>
</template>
<script>
import * as Localization from "../Models/Localization";
  export default {
    name: 'CloseGame',
    data() {
      return {
        locale: null,
        localeData: {
          private: "",
          create: "",
          connect: "",
          back: ""
        }
      }
    },
    components: {},
    methods: {},
    created() {
      //localization load
      if(localStorage.getItem("lang") == null) localStorage.setItem("lang","ru")
      this.locale = new Localization.default(localStorage.getItem("lang"));
      let lang = this.locale.language;

      this.localeData.private = lang.menu.private;
      this.localeData.create = lang.menu.create;
      this.localeData.connect = lang.menu.connect;
      this.localeData.back = lang.menu.back;
    }
  }
</script>

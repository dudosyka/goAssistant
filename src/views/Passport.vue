d<template>
  <main class="menu" v-if='user !== false'>
    <article class="window menu">
      <h1 class="title">{{localeData.profile}}</h1>
      <div class="back">
        <img v-bind:src="user.avatar" class="avatar-image">
        <div class="back-profile">
          <div class="output-passport full-width">{{localeData.nick}}{{user.nickname}}</div>
          <div class="output-passport full-width">{{localeData.mail}}{{user.email}}</div>
          <div class="output-passport full-width">{{user.pts}} pts</div>
        </div>
        <router-link class="button full-width w3-button w3-card-4 tr w3-hover-white back-button" to="/">{{localeData.back}}</router-link>
        <div class="score-table">
          <div style='cursor: pointer;' @click='gameView(score.game_id)' class="output full-width score-td w3-hover-purple tr" v-for="score in user.games_history.reverse()">
			      <img v-bind:src="score.player.avatar">
            <div class="score-name">{{score.player.nickname.length > 15 ? score.player.nickname.slice(0,15) + "..." : score.player.nickname}}</div>
            <div>{{score.score}} / {{score.scoreOpponent}}</div>
          </div>
        </div>
      </div>
    </article>
  </main>
</template>

<style scoped>

.avatar-image{
  height: 200px;
  width: 200px;
  grid-area: avatar;
}

.back-profile{
  grid-area: stats;
  display: grid;
  grid-template-rows: ;
}

.back-button{
  grid-area: escape;
  outline: none;
  border: none;

  background-color: #fff;
  position: relative;

  font-size: 28px;
  color: #1f1233;
  height: 70px;
}

.output-passport {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  background: #ede7f6;
  font-size: 18px;
  color: #1f1233;
  margin-bottom: 10px;
  text-align: center;
}
.output-passport:last-child {margin-bottom: 0;}

.score-table{
  overflow: auto;
  max-height: 800px;
  grid-area: score;
  margin-left: 20px;
}

.score-td{
  display: flex;
  flex-flow: row;
  align-items: center;
}

.score-td img{
  width: 100px;
  height: 100px;
}

.back{
  display: grid;
  grid-template-columns: 200px 1fr 2fr;
  grid-template-rows: 200px 300px;
  grid-gap: 20px;
  grid-template-areas:
  "avatar stats score"
  "escape escape score";
}

.score-name{margin: 20px;}

.window {max-width: 1500px;}

</style>

<script>
  import * as Localization from "../Models/Localization";
  export default {
    name: 'Passport',
    data() {
      return {
          user: false,
          nick: 'ex@m1e',
          email: 'example@example.com',
          rait: 'NN',
          ava: 'https://www.castorama.ru/media/catalog/product/cache/image/1800x/040ec09b1e35df139433887a97daa66f/2/e/2ef250_510229_1.jpg',
          card: {
            ava: 'https://www.castorama.ru/media/catalog/product/cache/image/1800x/040ec09b1e35df139433887a97daa66f/2/e/2ef250_510229_1.jpg',
            nick: 'badexample',
          },
          locale: null,
          localeData: {
            profile: "",
            nick: "",
            mail: "",
            back: ""
          }
      }
    },
    components: {},
    methods: {
      logout() {
        setStorage('token', null);
        window.location = window.location;
      },
      gameView(id) {
        setStorage("watchGameId", id);
        window.location = "/game/view";
      }
    },
    created() {
        //localization load
        if(localStorage.getItem("lang") == null) localStorage.setItem("lang","ru")
        this.locale = new Localization.default(localStorage.getItem("lang"));
        let lang = this.locale.language;

        this.localeData.profile = lang.menu.profile;
        this.localeData.nick = lang.menu.nickname;
        this.localeData.mail = lang.menu.mail;
        this.localeData.back = lang.menu.back;

        //main block
        get('/user/profile?token='+storage('token'), null, data => {
            this.user = data.data.user;
            this.user.games_history.sort((a, b) => {
                if (a.game_id > b.game_id) {
                    return 1;
                }

                if (a.game_id < b.game_id) {
                    return -1;
                }
                return 0;
            });
        });
    }
  }
</script>

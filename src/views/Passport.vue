<template>
  <main class="menu" v-if='user !== false'>
    <article class="window menu">
      <h1 class="title">Профиль</h1>
      <div class="back">
        <img v-bind:src="user.avatar" class="avatar-image" src="https://www.castorama.ru/media/catalog/product/cache/image/1800x/040ec09b1e35df139433887a97daa66f/f/d/fd9d0a_382026_1.jpg">
        <div class="back-profile">
          <div class="output-passport full-width">{{user.nickname}}</div>
          <div class="output-passport full-width">{{user.email}}</div>
          <div class="output-passport full-width">{{user.pts}}</div>
        </div>
        <router-link class="button full-width w3-button w3-card-4 tr w3-hover-white back-button" to="/">Назад</router-link>
        <div class="score-table">
          <div class="output full-width score-td">
            <img src="https://www.castorama.ru/media/catalog/product/cache/image/1800x/040ec09b1e35df139433887a97daa66f/f/d/fd9d0a_382026_1.jpg">
            <div class="score-name">name</div>
            <div>score/score</div>
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
}

.back-button{
  grid-area: escape;
  outline: none;
  border: none;

  background-color: #fff;
  position: relative;

  font-size: 40px;
  color: #1f1233;
  height: 100px;
}

.output-passport {
  padding: 5px;
  background: #ede7f6;
  font-size: 20px;
  color: #1f1233;
  margin-bottom: 10px;
  text-align: center;
}

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

.score-name{
  margin: 20px;
}

.window {
  max-width: 1500px;
}

</style>

<script>
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
          }
      }
    },
    components: {

    },
    methods: {
    },
    created() {
        get('/user/profile?token='+storage('token'), null, data => {
            this.user = data.data.user;
            /*
                [UserObject]
                avatar: "https://go-backend-denis.ambersoft.llc/uploads/608be2d875e90.png"
                email: "a.hatson@ya.ru"
                games_history: Array(7) [GameObject]
                id: 233
                nickname: "dudosyka"
                position: 147
                pts: -29
                winrate: "2/5"
            */
            /*
                [GameObject]
                game_id: 1039
                player: [UserObject]
                score: 7 //Очки того, чей профиль (dudosyka заработал 7 очков)
                scoreOpponent: -7 //Очки противника
            */
            console.log(this.user);
        });
    }
  }
</script>

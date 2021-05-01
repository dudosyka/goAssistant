<template>
  <main class="menu" v-if='user !== false'>
    <article class="window menu">
      <h1 class="title">Профиль</h1>
      <div class="back">
        <img v-bind:src="user.avatar">
        <div class="back-profile">
          <div class="output full-width">{{user.nickname}}</div>
          <div class="output full-width">{{user.email}}</div>
          <div class="output full-width">{{user.pts}}</div>
        </div>
        <ul class="list">
          <li class="card">Lorem</li>
        </ul>
      </div>
      <router-link class="button full-width w3-button w3-card-4 tr w3-hover-white back-button" to="/">Назад</router-link>
    </article>
  </main>
</template>

<style scoped>

img{
  width: 200px;
  height: 200px;
  border-radius: 50%;
}
.back{
  display: grid;
  grid-template-columns: 200px 1fr 1fr;
  grid-gap: 20px;
  margin-bottom: 30px;
}
.window {
  max-width: 1000px;
}
.list {
  background: #a999c4;
  margin: 0;
  padding: 20px;
  list-style: none;
}
.card {
  background: #fff;
  padding: 10px;
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

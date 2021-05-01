<template>
  <main class="menu">
    <article class="form_window menu">
      <div class="">
        <button @click='continueGame()' class="button full-width w3-button w3-card-4 tr w3-hover-white point" v-if="alreadyStart">Продолжить игру</button>
        <button @click='randomGame()' class="button full-width w3-button w3-card-4 tr w3-hover-white hi" :disabled="alreadyStart">Игра со случайным соперником</button>
        <button @click='startGameWithBot()' class="button full-width w3-button w3-card-4 tr w3-hover-white lamp" :disabled="alreadyStart">Игра с ИИ</button>
        <router-link class="button full-width w3-button w3-card-4 tr w3-hover-white loocker" to="/closegame" tag="button" :disabled="alreadyStart">Частная игра</router-link>
      </div>
    </article>
    <router-link to="/passport" class="bookmarck tr">
      <img v-bind:src="ava">
      <span>{{nick}}</span>
    </router-link>
  </main>
</template>

<style scoped>
  .bookmarck {
    transform: translateX(-120px) rotate(90deg);
    position: fixed;
    left: 0;
    padding: 10px 30px 50px 30px;
    background: #1f1233;
    border-radius: 5px;
  }
  .bookmarck:hover {
    transform: translateX(-80px) rotate(90deg) scale(1.05);
  }
  .bookmarck img {
    width: 50px;
    border-radius: 50%;
    margin-right: 10px;
  }
  .bookmarck span {
    color: #fff;
    font-size: 20px;
  }
</style>

<script>
  export default {
    name: 'Menu',
    data() {
      return {
          alreadyStart: false,
          ava: 'https://www.castorama.ru/media/catalog/product/cache/image/1800x/040ec09b1e35df139433887a97daa66f/2/e/2ef250_510229_1.jpg',
          nick: 'ex@mple'
      }
    },
    components: {

    },
    methods: {
        continueGame(start = true) {
            get("/game/current?token=" + storage('token'), null, data => {
                this.alreadyStart = (data.data.gameId !== null);
                if (start)
                    startGame(data.data.gameId);
            });
        },
        randomGame() {
            post("/game/create/random?token=" + storage('token'), null, data => {
                setStorage('curGameId', data.data.gameId);
                startGame(data.data.gameId);
            })
        },
        startGameWithBot() {
            post("/game/create/bot?token=" + storage('token'), null, data => {
                setStorage('curGameId', data.data.gameId);
                startGame(data.data.gameId);
            })
        }
    },
    created() {
        this.continueGame(false);
    }
  }
</script>

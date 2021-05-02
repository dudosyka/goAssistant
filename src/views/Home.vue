<template>
  <main class="menu">
  <!-- LOADER !-->
    <aside class="modal loading" v-show="showLoader">
      <header class="modal">
        <h1 class="modal">Подключение к боту</h1>
        <span></span>
        <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
      </header>
    </aside>
  <!-- LOADER !-->

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
import * as Hint from "../Models/Hint";

  export default {
    name: 'Menu',
    data() {
      return {
          alreadyStart: false,
          ava: 'https://www.castorama.ru/media/catalog/product/cache/image/1800x/040ec09b1e35df139433887a97daa66f/2/e/2ef250_510229_1.jpg',
          nick: 'ex@mple',
          search: false,
		  showLoader: false,

      }
    },
    components: {

    },
    methods: {
        continueGame(start = true) {
          this.showLoader = true;
            get("/game/current?token=" + storage('token'), null, data => {
                this.showLoader = false;
                if (data.data.gameId !== null) {
                  this.alreadyStart = true;
                }
                else {
                  setStorage('curGameId', null);
                }

                if (start)

                    startGame(data.data.gameId);
            });
        },
        randomGame() {
          this.showLoader = true;
            post("/game/create/random?token=" + storage('token'), null, data => {
              this.showLoader = false;
                setStorage('curGameId', data.data.gameId);
                startGame(data.data.gameId);
            })
        },
        startGameWithBot() {
			console.log(12121);
          this.showLoader = true;
            post("/game/create/bot?token=" + storage('token'), null, data => {
              this.showLoader = false;
                setStorage('curGameId', data.data.gameId);
                startGame(data.data.gameId);
            })
        }
    },
    async created() {
        //let hint = new Hint.default(11494);
        // const playerBestMove = await hint.bestMoves(1);
        // const enemyBestMove = await hint.bestMovesEnemy(3);
        // const bestMovesOf = await hint.bestMovesOf(playerBestMove);
        // const superiority = await hint.superiority();
        // const winner = await hint.winner();
        //const heatmapQuarter = await hint.heatmapQuarter(1);
        // const heatmapQuarters = await hint.heatmapQuarters([1,4]);
        // const heatmapBestZone = await hint.heatmapBestZone();
        // const heatmapEnemyBestZone = await hint.heatmapEnemyBestZone();
        // console.log(playerBestMove);
        // console.log(enemyBestMove);
        // console.log(bestMovesOf);
        // console.log(superiority);
        // console.log(winner);
        //console.log(heatmapQuarter);
        // console.log(heatmapQuarters);
        // console.log(heatmapBestZone);
        // console.log(heatmapEnemyBestZone);
        // console.log('res', hint);
        this.continueGame(false);
    }
  }
</script>

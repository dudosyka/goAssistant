<template>
  <main class="menu">
    <article class="form_window menu">
      <div class="">
        <button @click='continueGame()' class="button full-width w3-button w3-card-4 tr w3-hover-white" v-if="alreadyStart">Продолжить игру</button>
        <button @click='randomGame()' class="button full-width w3-button w3-card-4 tr w3-hover-white hi" :disabled="alreadyStart">Игра со случайным соперником</button>
        <button @click='startGameWithBot()' class="button full-width w3-button w3-card-4 tr w3-hover-white lamp" :disabled="alreadyStart">Игра с ИИ</button>
        <router-link v-bind:class="{button:true, 'full-width':true, 'w3-button':true, 'w3-card-4':true, tr:true, 'w3-hover-white':true, disabled: alreadyStart, loocker:true}" to="closegame">Частная игра</router-link>
      </div>
    </article>
  </main>
</template>
<script>
  export default {
    name: 'Menu',
    data() {
      return {
          alreadyStart: false,
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

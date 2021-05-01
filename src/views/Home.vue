<template>
  <main class="menu">
    <article class="form_window menu">
      <div class="">
        <button @click='continueGame()' class="button-light w3-button w3-card-4 tr w3-hover-white">Продолжить игру</button>
        <button @click='randomGame()' class="button-light w3-button w3-card-4 tr w3-hover-white" :disabled="alreadyStart">Игра со случайным соперником</button>
        <button @click='startGameWithBot()' class="button-light w3-button w3-card-4 tr w3-hover-white" :disabled="alreadyStart">Игра с ИИ</button>
        <button class="button-light w3-button w3-card-4 tr w3-hover-white" onclick="window.location = '/menu/closegame'" :disabled="alreadyStart">Частная игра</button>
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

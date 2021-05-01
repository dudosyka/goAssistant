<template>
  <main class="menu">
    <article class="form_window menu">
      <h1 class="title">Укажите код гобана</h1>
      <div class="">
        <input v-model='code' type="text" class="input" placeholder="code">
        <button class="button full-width w3-button w3-card-4 tr w3-hover-white" @click="join()" :disabled="code.length != 4">Присоединиться</button>
        <router-link class="button full-width w3-button w3-card-4 tr w3-hover-white back-button" to="/closegame">Назад</router-link>
      </div>
    </article>
    <div style="display: block" class="w3-modal" v-show="modal">
      <div class="w3-modal-content w3-animate-top w3-card-4">
        <header class="w3-container w3-purple">
          <span @click="modal = false"
          class="w3-button w3-display-topright">&times;</span>
          <h2>Modal Header</h2>
        </header>
        <div class="w3-container">
          <p>Some text..</p>
          <p>Some text..</p>
        </div>
        <footer class="w3-container w3-purple">
          <p>Modal Footer</p>
        </footer>
      </div>
    </div>
  </main>
</template>

<script>
  export default {
    name: 'JoinToCloseGame',
    data() {
      return {
        code: "",
        modal: true,
      }
    },
    components: {

    },
    methods: {
        join() {
            post('/game/join/' + this.code + "?token=" + storage('token'), {token: storage('token')}, data => {
                get("/game/current?token=" + storage('token'), null, data => {
                    if (data.data.gameId === null) {
                        window.location = "/"
                    } else {
                      setStorage('curGameId', data.data.gameId);
                      window.location = "/game";
                    }
                });
                console.log("DATA", data);
            });
        }
    },
  }
</script>

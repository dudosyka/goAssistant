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
  </main>
</template>

<script>
  export default {
    name: 'JoinToCloseGame',
    data() {
      return {
        code: ""
      }
    },
    components: {

    },
    methods: {
        join() {
            post('/game/join/' + this.code + "?token=" + storage('token'), {token: storage('token')}, data => {
                get("/game/current?token=" + storage('token'), null, data => {
                  //debugger;
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

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
    <transition name="top-fade">
      <aside class="modal_bg" v-show="modal">
        <div class="modal">
          <header class="modal">
            <h1 class="modal">Error</h1>
            <span></span>
            <button class="modal-close" @click="modal = false">❌</button>
          </header>
          <p class="modal">Ошибка подключения</p>
        </div>
      </aside>
    </transition>
  </main>
</template>

<script>
  export default {
    name: 'JoinToCloseGame',
    data() {
      return {
        code: "",
        modal: false,
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

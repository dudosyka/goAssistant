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
      <div class="modal_bg" v-show="modal">
        <div class="modal">
          <header>
              <h1 class="modal-title">Lorem ipsum</h1><span></span>
              <button class="modal-close" @click="modal = false">❌</button>
          </header>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
      </div>
    </transition>
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

<template>
  <main class="menu">
  <!-- LOADER !-->
    <aside class="modal loading" v-show="search">
      <header class="modal">
        <h1 class="modal">Ожидание присоединения</h1>
        <span></span>
        <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
      </header>
    </aside>
  <!-- LOADER !-->

    <article class="form_window menu">
      <h1 class="title">Укажите код гобана</h1>
      <div class="">
        <input v-model='code' type="text" class="input" placeholder="code">
        <button class="button full-width w3-button w3-card-4 tr w3-hover-white" @click="join()" :disabled="code.length != 4">Присоединиться</button>
        <router-link class="button full-width w3-button w3-card-4 tr w3-hover-white back-button" to="/closegame">Назад</router-link>
      </div>
    </article>

    <!-- MODAL !-->
    <div id="modal" class="w3-modal">
        <div class="w3-modal-content w3-animate-top w3-card-4">
            <header class="w3-container w3-purple">
                <span onclick="document.getElementById('modal').style.display='none'"
                class="w3-button w3-display-topright">&times;</span>
            <h2 id="modalHeader">-</h2>
        </header>
        <div class="w3-container">
            <p id="modalText">Some text..</p>
        </div>
        <footer class="w3-container w3-purple" id="modalFooter">
        </footer>
      </div>
    </div>
    <!--transition name="top-fade">
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
    </transition-->
    <!-- MODAL !-->

  </main>
</template>

<script>
  export default {
    name: 'JoinToCloseGame',
    data() {
      return {
        code: "",
        search: false
      }
    },
    components: {

    },
    methods: {
        showModal(header,text) {
            document.getElementById('modal').style.display='block';
            document.getElementById('modalHeader').innerHTML = header;
            document.getElementById('modalText').innerHTML = text;
            document.getElementById('modalFooter').innerHTML = `<button class="w3-button w3-white w3-hover-white w3-card-4 tr" onclick="document.getElementById('modal').style.display='none'">Закрыть</button>`;
        },
        join() {
            this.search = true;
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
            },err => {
              this.search = false;
              this.showModal(`Присоединение к игре`,`Игра с указанным кодом не найдена! Проверьте правильность написания кода гобана и повторите попытку`);
            });
        }
    },
  }
</script>

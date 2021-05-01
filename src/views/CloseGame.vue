<template>
  <main class="menu">
    <article class="form_window menu">
      <h1 class="title">Частная игра</h1>
      <div class="">
        <router-link @click="create()" class="button full-width w3-button w3-card-4 tr w3-hover-white god" to="/closegame/newgame">Создать</router-link>
        <router-link class="button full-width w3-button w3-card-4 tr w3-hover-white join" to="/closegame/joingame">Присоединиться</router-link>
        <router-link class="button full-width w3-button w3-card-4 tr w3-hover-white back-button" to="/">Назад</router-link>
      </div>
    </article>
  </main>
</template>
<script>
  export default {
    name: 'CloseGame',
    data() {
      return {

      }
    },
    components: {

    },
    methods: {
        create() {
            post('/game/create/code', { token: storage('token') }, data => {
                setStorage('secretRoom', data.data.code);
                console.log(data.data.code);
            });
        }
    },
    created() {
    }
  }
</script>

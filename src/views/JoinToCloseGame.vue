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
            console.log(1);
            // post('/game/join/' + this.code, {token: storage('token')}, data => {
            //     console.log(data);
            // });
        }
    },
  }
</script>

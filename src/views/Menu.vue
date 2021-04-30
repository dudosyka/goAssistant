<template>
  <div class="">
    <header class="user w3-card-4">
      <h1 class="user-nick"><router-link to="/pasport">{{nick}}</router-link></h1>
      <img v-bind:src="ava" height="100%">
    </header>
    <main class="menu">
      <article class="form_window menu">
        <div class="">
          <button class="button-light w3-button w3-card-4 tr w3-hover-white">Продолжить игру</button>
          <button class="button-light w3-button w3-card-4 tr w3-hover-white">Игра со случайным соперником</button>
          <button class="button-light w3-button w3-card-4 tr w3-hover-white">Игра с ИИ</button>
          <router-link class="button-light w3-button w3-card-4 tr w3-hover-white" to="/menu/closegame">Частная игра</router-link>
        </div>
      </article>
    </main>
  </div>
</template>

<script type="text/javascript">

  export default {
    data() {
      return {
        ava: 'https://www.castorama.ru/media/catalog/product/cache/image/1800x/040ec09b1e35df139433887a97daa66f/6/6/66d549_510228_1.jpg',
        nick: 'ex@mp1e',
      }
    },
    computed: {

    }
  }
</script>

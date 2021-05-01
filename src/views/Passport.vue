<template>
  <main class="menu">
    <article class="form_window menu">
      <h1 class="title">Профиль</h1>
      <div class="back">
        <img src="src/assets/example.png">
        <div class="back-profile">
          <div class="output full-width" style="text-align: center; width: 100%">Lorem Ipsum</div>
          <div class="output full-width" style="text-align: center; width: 100%">Lorem Ipsum</div>
          <div class="output full-width" style="text-align: center; width: 100%">Lorem Ipsum</div>
        </div>
        <div><div class="output full-width"></div></div>
      </div>
      <router-link class="button full-width w3-button w3-card-4 tr w3-hover-white back-button" to="/closegame">Назад</router-link>
    </article>
  </main>
</template>

<style scoped>

img{
  width: 200px;
  height: 200px;
  margin-right: 20px;
}
.back{
  display: flex;
  flex-flow: row;
  align-items: center;
}
.back-profile{
  display: flex;
  flex-flow: column;
  margin: 0 40px 0 0;
}

</style>

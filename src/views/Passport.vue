<template>
  <main class="menu">
    <article class="window menu">
      <h1 class="title">Профиль</h1>
      <div class="back">
        <img src="https://www.castorama.ru/media/catalog/product/cache/image/1800x/040ec09b1e35df139433887a97daa66f/2/e/2ef250_510229_1.jpg">
        <div class="back-profile">
          <div class="output full-width">Lorem Ipsum</div>
          <div class="output full-width">Lorem Ipsum</div>
          <div class="output full-width">Lorem Ipsum</div>
        </div>
        <div><div class="output full-width"></div></div>
      </div>
      <router-link class="button full-width w3-button w3-card-4 tr w3-hover-white back-button" to="/">Назад</router-link>
    </article>
  </main>
</template>

<style scoped>

img{
  width: 200px;
  height: 200px;
  border-radius: 50%;
}
.back{
  display: grid;
  grid-template-columns: 200px 1fr 1fr;
  grid-gap: 20px;
  margin-bottom: 30px;
}
.back-profile{

}
.window {
  max-width: 1000px;
}

</style>

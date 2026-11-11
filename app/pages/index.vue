<template>
  <div>
    <main>
      <section class="home">
        <div class="home__container">
          <h1 class="home__title">НОВАЯ КОЛЛЕКЦИЯ ОБУВИ</h1>
          <NuxtLink to="/catalog" class="home__button"> В каталог </NuxtLink>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Главная страница",
});

definePageMeta({
  layout: "default",
});
</script>

<style lang="scss" scoped>
@import "~/assets/styles/blocks/home.scss";
</style>

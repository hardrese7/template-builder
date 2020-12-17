<template>
  <div class="container">
    <h1 class="title">Произошла ошибка</h1>
    <h1 v-if="error.statusCode === 404" class="subtitle">
      Ой, такой страницы нет, проверьте правильность адреса
    </h1>
    <h1 v-else class="subtitle">
      Ой, вы куда-то нажали и что-то сломалось, напишите нам об этом на
      <a href="mailto:support@templatebuilder.com"
        >support@templatebuilder.com</a
      >
    </h1>
    <NuxtLink to="/">На главную</NuxtLink>
  </div>
</template>

<script>
export default {
  props: ['error'],
}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  align-items: center;
  text-align: center;
  padding: 10px 5px;
}
</style>

<template>
  <div class="container">
    <h1 class="title">Создайте свой уникальный шаблон из блоков</h1>
    <b-dropdown>
      <b-button slot="trigger" type="is-primary" icon-left="plus"
        >Добавить новый блок</b-button
      >

      <b-dropdown-item has-link icon-left="plus">
        <nuxt-link to="/add-block/text">Текст</nuxt-link>
      </b-dropdown-item>
      <b-dropdown-item>
        <nuxt-link to="/add-block/image">Изображение</nuxt-link>
      </b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>

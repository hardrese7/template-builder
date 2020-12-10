<template>
  <div class="container">
    <h1 class="title">Создайте свой уникальный шаблон из блоков</h1>
    <b-button type="is-primary" icon-left="plus">Добавить новый блок</b-button>
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

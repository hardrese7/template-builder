<template>
  <div class="container">
    <b-dropdown class="add-new-block">
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
    <h1 v-if="!blocks.length" class="title">
      Создайте свой уникальный шаблон из блоков
    </h1>
    <div v-else class="blocks">
      <!-- eslint-disable-next-line prettier/prettier -->
      <div v-for="block in blocks" :key="block.id" class="blocks__item">{{ block.data }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import blocks from '@/store/blocks'

@Component
export default class Home extends Vue {
  blocksStore = getModule(blocks, this.$store)

  get blocks() {
    return this.blocksStore.blocks
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.title {
  font-size: 10vw;
}
.add-new-block {
  position: sticky;
  margin-top: 10px;
  margin-bottom: 10px;
  align-self: flex-end;
}
.blocks {
  height: 100%;
  width: 100%;
  &__item {
    $border-settings: 2px dashed;

    white-space: pre-wrap;
    border: $border-settings transparent;
    &:hover {
      border: $border-settings #929292;
    }
  }
}
</style>

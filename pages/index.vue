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
      <div v-for="block in blocks" :key="block.id" class="block">
        <!-- eslint-disable-next-line prettier/prettier -->
        <div v-if="block.type === BlockType.Text" class="block__data">{{ block.data }}</div>
        <b-image
          v-else
          class="block__data"
          :src="`https://picsum.photos/id/${block.data}/300/200.webp`"
          webp-fallback=".jpg"
        />
        <div class="block__btns">
          <b-button type="is-info" icon-right="pencil" />
          &nbsp;
          <b-button
            type="is-danger"
            icon-right="delete"
            @click="confirmDeleteBlock(block.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import blocks from '@/store/blocks'
import { BlockType } from '@/models/block'

@Component
export default class Home extends Vue {
  BlockType = BlockType
  blocksStore = getModule(blocks, this.$store)
  confirmDeleteBlock(blockId: number) {
    this.$buefy.dialog.confirm({
      message: 'Вы уверены, что хотите удалить этот блок?',
      onConfirm: () => {
        this.deleteBlock(blockId)
        this.$buefy.toast.open('Блок удалён')
      },
    })
  }

  deleteBlock(blockId: number) {
    this.blocksStore.deleteBlock(blockId)
  }

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
  z-index: 2;
}
.blocks {
  height: 100%;
  width: 100%;
}
.block {
  $parent: &;

  margin-bottom: 0;
  border: 2px dashed transparent;
  position: relative;
  display: flex;
  &:hover {
    border-color: #929292; // TODO move to variable
    #{$parent}__btns {
      visibility: visible;
    }
  }
  &__data {
    white-space: pre-wrap;
  }
  &__btns {
    background: #1d1d1db2; // TODO move to variable
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: absolute;
    visibility: hidden;
  }
}
</style>

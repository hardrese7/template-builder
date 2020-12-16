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
      <draggable
        v-model="blocks"
        v-bind="dragOptions"
        @start="dragInProgress = true"
        @end="dragInProgress = false"
      >
        <transition-group
          type="transition"
          :name="!dragInProgress ? 'flip-list' : null"
        >
          <data-block
            v-for="block in blocks"
            :key="block.id"
            class="draggable"
            :block="block"
            :drag-in-progress="dragInProgress"
          />
        </transition-group>
      </draggable>
    </div>
  </div>
</template>

<script lang="ts">
import draggable from 'vuedraggable'
import { Component, Vue } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import blocks from '@/store/blocks'
import DataBlock from '@/components/DataBlock.vue'

@Component({
  components: { draggable, DataBlock },
})
export default class Home extends Vue {
  blocksStore = getModule(blocks, this.$store)
  dragInProgress = false

  get dragOptions() {
    return {
      animation: 200,
      group: 'blocks',
      disabled: false,
      ghostClass: 'ghost',
    }
  }

  set blocks(blocks) {
    this.blocksStore.setBlocks(blocks)
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
.draggable {
  cursor: move;
}

.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
</style>

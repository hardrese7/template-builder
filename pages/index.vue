<template>
  <div class="container">
    <blocks-list v-if="hasBlocks" @showBlockOptions="showBlockOptions" />
    <h1 v-else class="title">Создайте свой уникальный шаблон из блоков</h1>
    <add-block-menu />
    <block-options-modal
      v-if="selectedBlock"
      v-model="blockOptionsIsOpen"
      :block="selectedBlock"
    />
  </div>
</template>

<script lang="ts">
import draggable from 'vuedraggable'
import { Component, Vue } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import { Block } from '@/models/block'
import DataBlock from '@/components/DataBlock.vue'
import BlockOptionsModal from '@/components/BlockOptionsModal.vue'
import AddBlockMenu from '@/components/AddBlockMenu.vue'
import BlocksList from '@/components/BlocksList.vue'
import blocks from '@/store/blocks'

@Component({
  components: {
    draggable,
    DataBlock,
    BlockOptionsModal,
    AddBlockMenu,
    BlocksList,
  },
})
export default class Home extends Vue {
  blocksStore = getModule(blocks, this.$store)
  blockOptionsIsOpen = false
  selectedBlock: Block | null = null

  get hasBlocks() {
    return !!this.blocksStore.blocks.length
  }

  showBlockOptions(block: Block) {
    this.blockOptionsIsOpen = true
    this.selectedBlock = block
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  min-height: 100%;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
}
.title {
  font-size: 10vw;
  margin: auto;
}
</style>

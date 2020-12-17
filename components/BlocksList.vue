<template>
  <draggable
    v-model="blocks"
    class="blocks"
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
        @click.native="$emit('showBlockOptions', block)"
      />
    </transition-group>
  </draggable>
</template>

<script lang="ts">
import draggable from 'vuedraggable'
import { Component, Vue } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import DataBlock from '@/components/DataBlock.vue'
import blocks from '@/store/blocks'

@Component({ components: { draggable, DataBlock } })
export default class extends Vue {
  dragInProgress = false
  blocksStore = getModule(blocks, this.$store)

  set blocks(blocks) {
    this.blocksStore.setBlocks(blocks)
  }

  get blocks() {
    return this.blocksStore.blocks
  }

  get dragOptions() {
    return {
      animation: 200,
      group: 'blocks',
      disabled: false,
      ghostClass: 'ghost',
    }
  }
}
</script>

<style scoped lang="scss">
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

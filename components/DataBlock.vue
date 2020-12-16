<template>
  <div class="block">
    <b-image
      v-if="block.type === BlockType.Image"
      :src="`https://picsum.photos/id/${block.data}/300/200.webp`"
      webp-fallback=".jpg"
    />
    <div v-else class="text">{{ block.data }}</div>
    <div v-show="!dragInProgress" class="btns">
      <b-button type="is-info" icon-right="pencil" />
      <b-button
        type="is-danger"
        icon-right="delete"
        @click="confirmDeleteBlock(block.id)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import blocks from '@/store/blocks'
import { BlockType, Block } from '@/models/block'

@Component
export default class extends Vue {
  @Prop({ type: Object, required: true }) readonly block!: Block
  @Prop({ type: Boolean }) readonly dragInProgress!: boolean

  readonly BlockType = BlockType
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
}
</script>

<style scoped lang="scss">
.btns {
  position: absolute;
  visibility: hidden;
}
.block {
  margin-bottom: 0;
  border: 2px dashed transparent;
  position: relative;
  display: flex;
  &:hover {
    .btns {
      visibility: visible;
    }
  }
}
.data {
  white-space: pre-wrap;
}
.ghost {
  opacity: 0.5;
  border-color: #929292; // TODO move to variable
}
</style>

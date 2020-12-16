<template>
  <div class="block">
    <b-image
      v-if="block.type === BlockType.Image"
      class="block__data"
      :src="`https://picsum.photos/id/${block.data}/300/200.webp`"
      webp-fallback=".jpg"
    />
    <div v-else class="block__data">{{ block.data }}</div>
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
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import blocks from '@/store/blocks'
import { BlockType, Block } from '@/models/block'

@Component
export default class extends Vue {
  @Prop({ type: Object, required: true }) readonly block!: Block

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

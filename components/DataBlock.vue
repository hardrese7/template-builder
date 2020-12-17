<template>
  <div class="block">
    <b-image
      v-if="block.type === BlockType.Image"
      :src="`https://picsum.photos/id/${block.data}/300/200.webp`"
      webp-fallback=".jpg"
      class="image"
    />
    <div v-else class="text">{{ block.data }}</div>
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
}
</script>

<style scoped lang="scss">
.block {
  padding: 5px;
  margin-bottom: 0;
  position: relative;
  display: flex;
  justify-content: space-between;
}
.btns {
  display: flex;
  flex-direction: column;
}
.text {
  white-space: pre-wrap;
}
.ghost {
  opacity: 0.5;
}
.image {
  pointer-events: none;
}
</style>

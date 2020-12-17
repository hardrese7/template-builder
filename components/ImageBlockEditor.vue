<template>
  <section class="images">
    <div v-for="imageId in imagesIds" :key="imageId">
      <input
        :id="`image${imageId}`"
        v-model="selectedImageId"
        class="input"
        type="radio"
        name="image"
        :value="imageId"
      />
      <label class="image" :for="`image${imageId}`">
        <b-image
          :src="`https://picsum.photos/id/${imageId}/200/200.webp`"
          webp-fallback=".jpg"
        />
      </label>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import { Block } from '@/models/block'
import events from '@/models/events'
import blocks from '@/store/blocks'

@Component({
  layout: 'editor',
})
export default class ImageEditor extends Vue {
  blocksStore = getModule(blocks, this.$store)
  selectedImageId: number | null = null
  blockForEdit: Block | undefined

  async initEditor() {
    // TODO add pagination for images
    // TODO add spinner
    // TODO update images on every page mount, and don't forget it's possible to lose the current image
    if (!this.imagesIds.length) {
      await this.blocksStore.loadImagesList()
    }
    if (!this.$route.params.id) {
      return
    }
    const id = +this.$route.params.id
    this.blockForEdit = this.blocksStore.blocks.find((b) => b.id === id)
    if (!this.blockForEdit) {
      this.$router.push('/404')
      return
    }
    this.selectedImageId = +this.blockForEdit.data
  }

  saveImageBlock() {
    if (this.blockForEdit) {
      this.blocksStore.updateBlockData({
        id: this.blockForEdit.id,
        data: this.selectedImageId!.toString(),
      })
    } else {
      this.blocksStore.addImageBlock(this.selectedImageId!.toString())
    }
    this.$router.push('/')
  }

  tryToSaveImageBlock() {
    if (this.imageIsNotSelected) {
      // TODO show error
      return
    }
    this.saveImageBlock()
  }

  created() {
    this.initEditor()
    this.$nuxt.$emit(events.SET_HEADER, 'Выберите изображение')
    this.$nuxt.$on(events.SAVE_EDITOR, this.tryToSaveImageBlock)
  }

  beforeDestroy() {
    this.$nuxt.$off(events.SAVE_EDITOR, this.tryToSaveImageBlock)
  }

  get imagesIds() {
    return this.blocksStore.imagesIds
  }

  get imageIsNotSelected() {
    return this.selectedImageId === null
  }
}
</script>

<style scoped lang="scss">
.images {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
}

.image {
  border: 5px solid transparent;
  cursor: pointer;
}
.input {
  display: none;
  &:checked + .image {
    border-color: #f64545; // todo move to variables
  }
}
</style>

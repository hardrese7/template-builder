<template>
  <section class="container">
    <form class="form">
      <h1 class="title">Выберите изображение</h1>
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
      <b-button
        :disabled="imageIsNotSelected"
        type="is-success"
        icon-left="plus"
        @click.prevent="saveImageBlock"
      >
        Сохранить
      </b-button>
      <b-button tag="nuxt-link" icon-left="close" to="/" type="is-danger">
        Закрыть
      </b-button>
    </form>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import { Block } from '@/models/block'
import blocks from '@/store/blocks'

@Component
export default class ImageEditor extends Vue {
  blocksStore = getModule(blocks, this.$store)
  imagesIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] // TODO implement api call
  selectedImageId: number | null = null
  blockForEdit: Block | undefined

  initEditor() {
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

  created() {
    this.initEditor()
  }

  get textDraft() {
    return this.blocksStore.textDraft
  }

  get imageIsNotSelected() {
    return Number.isNaN(this.selectedImageId)
  }
}
</script>

<style scoped lang="scss">
.container {
  height: 100%;
  display: flex;
  align-items: center;
}
.form {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.images {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
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

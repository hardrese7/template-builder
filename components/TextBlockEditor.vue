<template>
  <section class="container">
    <form class="form">
      <b-field>
        <b-input
          placeholder="Введите текст"
          type="textarea"
          :value="textDraft"
          @input="setTextDraft"
        ></b-input>
      </b-field>
      <b-button
        :disabled="!textDraft"
        type="is-success"
        icon-left="plus"
        @click.prevent="saveTextBlock"
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
export default class TextBlockEditor extends Vue {
  blocksStore = getModule(blocks, this.$store)
  setTextDraft(textDraft: string) {
    this.blocksStore.setTextDraft(textDraft)
  }

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
    this.setTextDraft(this.blockForEdit.data)
  }

  saveTextBlock() {
    if (this.blockForEdit) {
      this.blocksStore.updateBlockData({
        id: this.blockForEdit.id,
        data: this.textDraft,
      })
      this.setTextDraft('')
    } else {
      this.blocksStore.convertDraftToTextBlock()
    }
    this.$router.push('/')
  }

  created() {
    this.initEditor()
  }

  get textDraft() {
    return this.blocksStore.textDraft
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
}
</style>

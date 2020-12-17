<template>
  <section class="form">
    <b-field>
      <b-input
        placeholder="Введите текст"
        type="textarea"
        :value="textDraft"
        @input="setTextDraft"
      ></b-input>
    </b-field>
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

  tryToSaveImageBlock() {
    if (!this.textDraft) {
      // TODO show error
      return
    }
    this.saveTextBlock()
  }

  created() {
    this.initEditor()
    this.$nuxt.$emit(events.SET_HEADER, 'Введите текст')
    this.$nuxt.$on(events.SAVE_EDITOR, this.tryToSaveImageBlock)
  }

  beforeDestroy() {
    this.$nuxt.$off(events.SAVE_EDITOR, this.tryToSaveImageBlock)
  }

  get textDraft() {
    return this.blocksStore.textDraft
  }
}
</script>

<style scoped lang="scss">
.form {
  flex: 1;
}
</style>

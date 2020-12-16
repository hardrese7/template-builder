<template>
  <section>
    <nuxt-link to="/">Назад</nuxt-link>
    <b-field>
      <b-input
        placeholder="Введите текст"
        maxlength="200"
        type="textarea"
        :value="textDraft"
        @input="setTextDraft"
      ></b-input>
    </b-field>
    <b-button
      :disabled="!textDraft"
      type="is-success"
      icon-left="plus"
      @click.prevent="addTextBlock"
    >
      Сохранить
    </b-button>
    <b-button type="is-danger" icon-left="close">Закрыть</b-button>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import blocks from '@/store/blocks'

@Component
export default class TextBlockEditor extends Vue {
  blocksStore = getModule(blocks, this.$store)
  setTextDraft(textDraft: string) {
    this.blocksStore.setTextDraft(textDraft)
  }

  addTextBlock() {
    this.blocksStore.convertDraftToTextBlock()
    this.$router.push('/')
  }

  get textDraft() {
    return this.blocksStore.textDraft
  }
}
</script>

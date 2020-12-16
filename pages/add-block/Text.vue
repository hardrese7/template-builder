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
        @click.prevent="addTextBlock"
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

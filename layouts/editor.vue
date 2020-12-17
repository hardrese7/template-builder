<template>
  <div class="modal-card">
    <header v-if="header" class="modal-card-head">
      <p class="modal-card-title">{{ header }}</p>
    </header>
    <section class="modal-card-body">
      <Nuxt />
    </section>
    <footer class="modal-card-foot">
      <b-button
        type="is-success"
        icon-left="content-save"
        @click.prevent="saveEditor"
      >
        Сохранить
      </b-button>
      <b-button tag="nuxt-link" icon-left="close" to="/" type="is-danger">
        Закрыть
      </b-button>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import events from '@/models/events'

@Component
export default class EditorLayout extends Vue {
  header = ''

  created() {
    this.$nuxt.$on(events.SET_HEADER, this.setHeader)
  }

  saveEditor() {
    this.$nuxt.$emit(events.SAVE_EDITOR)
  }

  setHeader(header: string) {
    this.header = header
  }

  beforeDestroy() {
    this.$nuxt.$off('update-header', this.setHeader)
  }
}
</script>

<style>
.modal-card {
  width: 100%;
  min-height: 100vh;
  max-height: 100vh;
  margin: 0;
}
</style>

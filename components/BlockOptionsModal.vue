<template>
  <b-modal v-model="modalIsOpen" has-modal-card>
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Опции блока</p>
        <button type="button" class="delete" @click="modalIsOpen = false" />
      </header>
      <section class="modal-card-body">
        <data-block :block="block" />
      </section>
      <footer class="modal-card-foot">
        <b-button type="is-info" icon-right="pencil">Редактировать</b-button>
        <b-button
          type="is-danger"
          icon-right="delete"
          @click="confirmDeleteBlock(block.id)"
          >Удалить</b-button
        >
      </footer>
    </div>
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import blocks from '@/store/blocks'
import { Block } from '@/models/block'

@Component
export default class extends Vue {
  @Prop({ type: Boolean }) readonly value!: Boolean
  @Prop({ type: Object, required: true }) readonly block!: Block

  blocksStore = getModule(blocks, this.$store)

  closeModal() {
    this.modalIsOpen = false
  }

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
    this.closeModal()
  }

  set modalIsOpen(value) {
    this.$emit('input', value)
  }

  get modalIsOpen() {
    return this.value
  }
}
</script>

<style scoped lang="scss">
.modal-card-body {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.btns {
  display: flex;
  justify-content: space-around;
  align-self: stretch;
}
</style>

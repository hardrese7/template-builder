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
        <b-button
          tag="nuxt-link"
          :to="urlOfEditPage"
          type="is-info"
          icon-right="pencil"
          >Редактировать</b-button
        >
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
import { Component, Vue, Prop, VModel } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import blocks from '@/store/blocks'
import { Block, BlockType } from '@/models/block'

@Component
export default class extends Vue {
  @VModel({ type: Boolean }) modalIsOpen!: boolean
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

  get urlOfEditPage() {
    if (this.block.type === BlockType.Image) {
      return `/edit-block/image/${this.block.id}`
    }
    if (this.block.type === BlockType.Text) {
      return `/edit-block/text/${this.block.id}`
    }
    // TODO log error
    return ''
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

import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { BlockType, BlockData, Block } from '@/models/block'

const types = {
  ADD_IMAGE_BLOCK: 'ADD_IMAGE_BLOCK',
  ADD_TEXT_BLOCK: 'ADD_TEXT_BLOCK',
  SET_TEXT_DRAFT: 'SET_TEXT_DRAFT',
  DELETE_BLOCK: 'DELETE_BLOCK',
}

@Module({
  name: 'blocks',
  stateFactory: true,
  namespaced: true,
})
export default class Blocks extends VuexModule {
  textDraft: string = ''
  blocks: Block[] = []
  get nextBlockId() {
    return Math.max(...this.blocks.map((b) => b.id), -1) + 1
  }

  @Action
  setTextDraft(textDraft: string) {
    this.context.commit(types.SET_TEXT_DRAFT, textDraft)
  }

  @Action
  deleteBlock(blockId: number) {
    this.context.commit(types.DELETE_BLOCK, blockId)
  }

  @Action
  addImageBlock(imageId: number) {
    this.context.commit(types.ADD_IMAGE_BLOCK, {
      data: imageId,
      id: this.nextBlockId,
    })
  }

  @Action
  convertDraftToTextBlock() {
    this.context.commit(types.ADD_TEXT_BLOCK, {
      data: this.textDraft,
      id: this.nextBlockId,
    })
    this.context.commit(types.SET_TEXT_DRAFT, '')
  }

  @Mutation
  [types.ADD_IMAGE_BLOCK]({ data, id }: BlockData) {
    this.blocks.push({
      id,
      data,
      type: BlockType.Image,
    })
  }

  @Mutation
  [types.SET_TEXT_DRAFT](textDraft: string) {
    this.textDraft = textDraft
  }

  @Mutation
  [types.DELETE_BLOCK](blockId: number) {
    this.blocks = this.blocks.filter((b) => b.id !== blockId)
  }

  @Mutation
  [types.ADD_TEXT_BLOCK]({ data, id }: BlockData) {
    this.blocks.push({
      id,
      data,
      type: BlockType.Text,
    })
  }
}

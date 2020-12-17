import Vue from 'vue'
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { BlockType, BlockData, Block } from '@/models/block'
import { getImages } from '@/utils/apiService.ts'

const types = {
  SET_BLOCKS: 'SET_BLOCKS',
  ADD_IMAGE_BLOCK: 'ADD_IMAGE_BLOCK',
  ADD_TEXT_BLOCK: 'ADD_TEXT_BLOCK',
  SET_TEXT_DRAFT: 'SET_TEXT_DRAFT',
  DELETE_BLOCK: 'DELETE_BLOCK',
  UPDATE_BLOCK_DATA: 'UPDATE_BLOCK_DATA',
  SET_IMAGES_IDS: 'SET_IMAGES_IDS',
}

@Module({
  name: 'blocks',
  stateFactory: true,
  namespaced: true,
})
export default class Blocks extends VuexModule {
  textDraft: string = ''
  blocks: Block[] = []
  imagesIds: number[] = []
  get nextBlockId() {
    return Math.max(...this.blocks.map((b) => b.id), -1) + 1
  }

  @Action({ commit: 'SET_IMAGES_IDS' }) // TODO use it in other commits
  async loadImagesList() {
    const images: { id: number }[] = await getImages()
    return images.map((i) => i.id)
  }

  @Action
  setBlocks(blocks: Block[]) {
    this.context.commit(types.SET_BLOCKS, blocks)
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
  updateBlockData(blockData: BlockData) {
    this.context.commit(types.UPDATE_BLOCK_DATA, blockData)
  }

  @Action
  addImageBlock(imageId: string) {
    // TODO refactor — use one mutation for all block types
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
  [types.SET_IMAGES_IDS](imagesIds: number[]) {
    this.imagesIds = imagesIds
  }

  @Mutation
  [types.SET_BLOCKS](blocks: Block[]) {
    this.blocks = blocks
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
  [types.UPDATE_BLOCK_DATA]({ id, data }: BlockData) {
    const blockIndex = this.blocks.findIndex((b) => b.id === id)
    Vue.set(this.blocks[blockIndex], 'data', data)
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

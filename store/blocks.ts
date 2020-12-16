import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

enum BlockType {
  Image,
  Text,
}

interface BlockData {
  id: number
  data: string
}

interface Block extends BlockData {
  type: BlockType
}

const types = {
  ADD_TEXT_BLOCK: 'ADD_TEXT_BLOCK',
  SET_TEXT_DRAFT: 'SET_TEXT_DRAFT',
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
  convertDraftToTextBlock() {
    this.context.commit(types.ADD_TEXT_BLOCK, {
      data: this.textDraft,
      id: this.nextBlockId,
    })
    this.context.commit(types.SET_TEXT_DRAFT, '')
  }

  @Mutation
  [types.SET_TEXT_DRAFT](textDraft: string) {
    this.textDraft = textDraft
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

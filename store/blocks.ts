import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

enum BlockType {
  Image,
  Text,
}

interface Block {
  type: BlockType
  data: string
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

  @Action
  setTextDraft(textDraft: string) {
    this.context.commit(types.SET_TEXT_DRAFT, textDraft)
  }

  @Action
  convertDraftToTextBlock() {
    this.context.commit(types.ADD_TEXT_BLOCK, this.textDraft)
    this.context.commit(types.SET_TEXT_DRAFT, '')
  }

  @Mutation
  [types.SET_TEXT_DRAFT](textDraft: string) {
    this.textDraft = textDraft
  }

  @Mutation
  [types.ADD_TEXT_BLOCK](text: string) {
    this.blocks.push({
      type: BlockType.Text,
      data: text,
    })
  }
}

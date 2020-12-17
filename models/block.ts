export enum BlockType {
  Image,
  Text,
}

export interface BlockData {
  readonly id: number
  data: string
}

export interface Block extends BlockData {
  type: BlockType
}

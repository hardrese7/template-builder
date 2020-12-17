export enum BlockType {
  Image,
  Text,
}

export interface BlockData {
  readonly id: number
  data: string | number
}

export interface Block extends BlockData {
  type: BlockType
}

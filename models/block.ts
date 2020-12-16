export enum BlockType {
  Image,
  Text,
}

export interface BlockData {
  id: number
  data: string | number
}

export interface Block extends BlockData {
  type: BlockType
}

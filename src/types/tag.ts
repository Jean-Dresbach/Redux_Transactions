export interface Tag {
  name: string
  emoji: string
}

export interface addTagDTO {
  transactionType: "Entrada" | "Saída"
  tag: Tag
}

export interface deleteTagDTO {
  transactionType: "Entrada" | "Saída"
  namesToDelete: string[]
}

export interface TagsInitialState {
  entrys: Tag[]
  outs: Tag[]
}

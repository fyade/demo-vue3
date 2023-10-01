import { pageParamsT } from "@/type/base.ts"

interface orderByDtoT {
  num: number,
  field: string,
  isAsc: boolean
}

export interface queryParamsOfSelFileFullUploadList extends pageParamsT {
  orderByDto: orderByDtoT[]
}

export interface queryParamsOfSelFileChunkUploadList extends pageParamsT {
  fileName: string,
  fileMd5: string,
  ignoreSame: boolean,
  orderByDto: orderByDtoT[]
}

export interface queryParamsOfFileChunkUploadCheck {
  fileName: string,
  fileMd5: string,
  fileSize: number,
  chunkNum: number
}

export interface queryParamsOfFileChunkMerge {
  fileMd5: string
}
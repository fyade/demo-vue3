import request from "./request.ts";
import {
  queryParamsOfFileChunkMerge,
  queryParamsOfFileChunkUploadCheck,
  queryParamsOfSelFileChunkUploadList,
  queryParamsOfSelFileFullUploadList
} from "@/type/common.ts";

/**
 * 文件完整上传记录
 * @param data
 */
export function selFileFullUploadList(data: queryParamsOfSelFileFullUploadList) {
  return request({
    url: '/file/full/list',
    method: 'POST',
    data
  })
}

/**
 * 文件完整上传
 * @param file
 */
export function fileFullUpload(file: FormData) {
  return request({
    url: '/file/full/upload',
    method: 'POST',
    data: file
  })
}

/**
 * 文件分片上传记录
 * @param data
 */
export function selFileChunkUploadList(data: queryParamsOfSelFileChunkUploadList) {
  return request({
    url: '/file/chunk/list',
    method: 'POST',
    data
  })
}

/**
 * 文件分片上传前置检查
 * @param data
 */
export function fileChunkUploadCheck(data: queryParamsOfFileChunkUploadCheck) {
  return request({
    url: '/file/chunk/check',
    method: 'POST',
    data
  })
}

/**
 * 文件分片上传
 * @param data
 */
export function fileChunkUpload({fileMd5, orderNum, file}: { fileMd5: string, orderNum: number, file: Blob }) {
  return request({
    url: `/file/chunk/upload/${fileMd5}/${orderNum}`,
    method: 'POST',
    data: file
  })
}

/**
 * 文件分片合并
 * @param data
 */
export function fileChunkMerge(data: queryParamsOfFileChunkMerge) {
  return request({
    url: '/file/chunk/merge',
    method: 'POST',
    data
  })
}

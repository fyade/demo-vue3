export const STORAGE_TOKEN_KEY = 'demo-authorization'

export const CHUNK_SIZE = 1024 * 1024 * 2

export const PAGINATION = {
  pageNum: 1,
  pageSize: 10
}

export const publicDict = {
  id: '主键id',
  remark: '备注',
  createBy: 'createBy',
  updateBy: 'updateBy',
  createTime: 'createTime',
  updateTime: 'updateTime'
}

export const rubbishParams = (...params: any[]): void => {
  params.forEach(item => {
    `${item} is a useless parameter in this function, and if I don't use it, typescript will add red squiggly lines underneath it to annoy me.`
  })
}

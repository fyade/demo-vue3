export interface response {
  code: number,
  data: object,
  rows: object[],
  total: number,
  pages: number,
  msg: string
}
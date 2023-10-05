import axios from "axios"
import { STORAGE_TOKEN_KEY } from "@/utils/base.js"
import { response } from "../type/request.ts";

const env = import.meta.env
const request = axios.create({
  baseURL: env.VITE_APP_REQ_PREFIX
})

request.interceptors.request.use(
    function (config) {
      config.headers['Authorization'] = localStorage.getItem(STORAGE_TOKEN_KEY)
      return config
    },
    function (error) {
      return Promise.reject(error)
    }
)

let isExpired = false
request.interceptors.response.use(
    function (response) {
      if (response.status >= 200 && response.status < 300) {
        const res = response.data
        if (res.code >= 200 && res.code < 300) {
          if (res.total) {
            res.total = Number(res.total)
            res.pages = Number(res.pages)
          }
          return res
        } else if (res.code === 401) {
          if (!isExpired) {
            isExpired = true
            console.log('登录过期')
          }
        } else {
          console.log(res.msg)
          return Promise.reject(res)
        }
      } else {
        console.log(response.data.msg)
        return Promise.reject(response)
      }
    },
    function (error) {
      console.log(error.message)
      return Promise.reject(error)
    }
)

interface reqParams {
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  params?: any,
  data?: any,
  headers?: object
}

export default function (config: reqParams): Promise<response> {
  return request(config)
}

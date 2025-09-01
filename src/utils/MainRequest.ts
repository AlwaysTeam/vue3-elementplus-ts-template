import config from './config'
import utils from '@/utils/utils'
import { ElLoading, ElMessage } from 'element-plus'
import axios, { type AxiosPromise, type Method } from 'axios'
const { VITE_TIME_OUT } = import.meta.env
const instance = axios.create({
  baseURL: config.BaseURL,
  timeout: VITE_TIME_OUT,
})
let loading
instance.interceptors.request.use(
  async (reqConfig) => {
    const token = localStorage.getItem('token')
    if (token) {
      reqConfig.headers.FingerPrint = await utils.getFingerPrintID()
    }
    if (reqConfig.method == 'post') {
      reqConfig.data = {
        ...reqConfig.data,
      }
    } else if (reqConfig.method == 'get') {
      reqConfig.params = {
        ...reqConfig.params,
      }
    }
    if (reqConfig.params?.loading || reqConfig.data?.loading) {
      loading = ElLoading.service({
        lock: true,
        text: '正在处理数据中,请耐心等待!',
        background: 'rgba(0, 0, 0, 0.7)',
      })
    }
    return reqConfig
  },
  (err) => {
    console.log('请求前error', err)
    ElMessage.warning({ message: '与服务器链接失败!', grouping: true })
    loading?.close()
    return Promise.reject(err)
  },
)
instance.interceptors.response.use(
  (res) => {
    loading?.close()
    if (res.data.error) {
      ElMessage.warning({ message: res.data.msg, grouping: true })
      return Promise.reject(res.data.msg)
    }
    try {
      return res.data
    } catch (error) {
      return res
    }
  },
  (error) => {
    console.log(error.response.data)
    loading?.close()
    if (error.response.data.noLogin) {
      if (sessionStorage.getItem('redirectURL')) return
      sessionStorage.setItem('redirectURL', window.location.hash.replace(/^#/, ''))
      ElMessage.error('登录超时，请重新登录')
      utils.Logout()
      return
    }
    ElMessage.warning({
      message: error.response?.data.msg || '后端接口出错了~!',
      grouping: true,
    })
    return Promise.reject(error)
  },
)

export default (url: string, method: Method, data?: unknown): AxiosPromise => {
  return instance({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: data,
  })
}

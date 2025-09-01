import router from '@/router'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { useClipboard, useDark, useToggle } from '@vueuse/core'
import { ElMessage } from 'element-plus'
export default {
  switchDark: () => {
    const toggleDark = useToggle(useDark())
    toggleDark()
  },
  /**
   * 获取浏览器指纹
   * @returns
   */
  getFingerPrintID: async () => {
    const fpPromise = FingerprintJS.load()
    const fp = await fpPromise
    const result = await fp.get()
    return result.visitorId
  },
  /**
   * 获取系统信息
   * @returns "{name: 'Windows', version: 'Windows 10'}"
   */
  getOsInfo: () => {
    const userAgent = navigator.userAgent.toLowerCase()
    let name = 'Unknown'
    let version = 'Unknown'
    if (userAgent.indexOf('win') > -1) {
      name = 'Windows'
      if (userAgent.indexOf('windows nt 5.0') > -1) {
        version = 'Windows 2000'
      } else if (
        userAgent.indexOf('windows nt 5.1') > -1 ||
        userAgent.indexOf('windows nt 5.2') > -1
      ) {
        version = 'Windows XP'
      } else if (userAgent.indexOf('windows nt 6.0') > -1) {
        version = 'Windows Vista'
      } else if (userAgent.indexOf('windows nt 6.1') > -1 || userAgent.indexOf('windows 7') > -1) {
        version = 'Windows 7'
      } else if (userAgent.indexOf('windows nt 6.2') > -1 || userAgent.indexOf('windows 8') > -1) {
        version = 'Windows 8'
      } else if (userAgent.indexOf('windows nt 6.3') > -1) {
        version = 'Windows 8.1'
      } else if (
        userAgent.indexOf('windows nt 6.2') > -1 ||
        userAgent.indexOf('windows nt 10.0') > -1
      ) {
        version = 'Windows 10'
      } else {
        version = 'Windows'
      }
    } else if (userAgent.indexOf('iphone') > -1) {
      name = 'iPhone'
      version = 'iPhone'
    } else if (userAgent.indexOf('mac') > -1) {
      name = 'Mac'
      version = 'Mac'
    } else if (
      userAgent.indexOf('x11') > -1 ||
      userAgent.indexOf('unix') > -1 ||
      userAgent.indexOf('sunname') > -1 ||
      userAgent.indexOf('bsd') > -1
    ) {
      name = 'Unix'
    } else if (userAgent.indexOf('linux') > -1) {
      if (userAgent.indexOf('android') > -1) {
        name = 'Android'
      } else {
        name = 'Linux'
      }
    } else {
      name = 'Unknown'
    }
    return { name, version }
  },
  /**
   * 获取浏览器信息
   * @returns chrome 0.0.0
   */
  getBrowser: () => {
    const agent = navigator.userAgent.toLowerCase()
    const regStr_ie = /msie [\d.]+;/gi
    const regStr_ff = /firefox\/[\d.]+/gi
    const regStr_chrome = /chrome\/[\d.]+/gi
    const regStr_saf = /safari\/[\d.]+/gi
    //IE
    if (agent.indexOf('msie') > 0) {
      return agent.match(regStr_ie)?.toString()
    }
    //firefox
    if (agent.indexOf('firefox') > 0) {
      return agent.match(regStr_ff)?.toString()
    }
    //Chrome
    if (agent.indexOf('chrome') > 0) {
      return agent.match(regStr_chrome)?.toString()
    }
    //Safari
    if (agent.indexOf('safari') > 0 && agent.indexOf('chrome') < 0) {
      return agent.match(regStr_saf)?.toString()
    }
  },
  /**
   * 退出登录
   * @returns
   */
  Logout: async () => {
    const redirectURL = sessionStorage.getItem('redirectURL') || ''
    const url = redirectURL ? '/login?redirectURL=' + redirectURL : '/login'
    router.replace(url)
    ElMessage.success('退出成功!')
  },
  /**
   * 复制文本到粘贴板
   * @param content 内容
   */
  copyText: (content: string) => {
    const { copy, isSupported } = useClipboard({
      source: content,
    })
    if (isSupported) {
      copy()
      ElMessage.success('复制成功!')
    } else {
      ElMessage.error('复制失败!请手动复制!')
    }
  },
}

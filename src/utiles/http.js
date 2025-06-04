// axios 基础配置
import axios from 'axios'
import { useUserStore } from '@/stores/index'
import  router from '@/router/index'



const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 10000,
})

// 请求拦截器
httpInstance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    // 这里可以添加请求头等
    const userStore =useUserStore()
    const token = userStore.userInfo.token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}` // 这里添加请求头
    }
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 响应拦截器
httpInstance.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    // 这里可以处理响应数据
    return response.data
  },
  (error) => {
    const userStore =useUserStore()
    // 对响应错误做点什么
    ElMessage({
      type:'warning',
      message: error.response?.data.message || '请求失败',
    })
    // 401token失效处理
    // 清除本地用户数据
    if (error.response.status === 401) {
      userStore.clearUserInfo()
      // 跳转登录页
      router.push('/login')
    }

    return Promise.reject(error)
  }
)

export default httpInstance
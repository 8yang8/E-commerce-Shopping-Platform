import { defineStore } from 'pinia'
import { userAccountLoginAPI, userMobileLoginAPI, userQQPatchLogin, userQQBindLogin } from '@/apis/user'
import { ref } from 'vue'
import { useCartStore } from './cartStore'
import { userQQLogin } from '@/apis/user'


export const useUserStore = defineStore(
  'user', 
  () => {
    // 1. 定义管理用户数据的state
    const userInfo = ref({})
    const CartStore = useCartStore()
    // 2.1 账号登录获取接口数据的action函数
    const getUserAccountInfo = async ({ account, password }) => {
      const res = await userAccountLoginAPI({ account, password })
      userInfo.value = res.result
      // 获取合并后的购物车数据
      CartStore.getMergeCart()
    }

    // 2.2手机号登录获取接口数据的action函数
    const getUserMobileLogin = async ({ mobile, code }) => {
      const res = await userMobileLoginAPI({ mobile, code })
      userInfo.value = res.result
      // 获取合并后的购物车数据
      CartStore.getMergeCart()
    }

    // 2.3 QQ登录（未注册版）绑定获取接口数据的action函数
    const getUserQQPatchLogin = async ({ unionId, mobile, code, account, password }) => {
      const res = await userQQPatchLogin({ unionId, mobile, code, account, password })
      userInfo.value = res.result
      // 获取合并后的购物车数据
      CartStore.getMergeCart()
    }
    
    // 2.4 QQ登录（已注册未绑定版）绑定获取接口数据的action函数
    const getUserQQBindLogin = async ({ unionId, mobile, code }) => {
      const res = await userQQBindLogin({ unionId, mobile, code })
      userInfo.value = res.result
      // 获取合并后的购物车数据
      CartStore.getMergeCart()
    }

    // 2.5  QQ登录（已注册已绑定版）绑定获取接口数据的action函数
   
    const getUserQQLogin = async ({ unionId, source = 1 }) => {
      const res = await userQQLogin({ unionId, source })
      userInfo.value = res.result
      CartStore.getMergeCart()
    }


    // 3. 定义清除用户数据的action函数
    const clearUserInfo = () => {
      userInfo.value = {}
    }
    // 4. 以对象的格式把state和action return
    return {
      userInfo,
      getUserAccountInfo,
      getUserMobileLogin,
      getUserQQPatchLogin,
      getUserQQBindLogin,
      getUserQQLogin,
      clearUserInfo
    }
  },
  {
    // 持久化生效
    persist: true,
  }
)
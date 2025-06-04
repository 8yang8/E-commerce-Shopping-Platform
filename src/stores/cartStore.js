// 封装购物车模块
import { defineStore } from 'pinia';
import { computed, ref } from 'vue'
import { useUserStore } from './userStore'
import { insertCartAPI, findNewCartListAPI, delCartAPI, mergeCartAPI } from '@/apis/cart.js'

export const useCartStore = defineStore('cart',() =>{
  const userStore = useUserStore()
  // 判断用户是否登录
  const isLogin = computed(() => userStore.userInfo.token)
  // 购物车数据
  const cartList = ref([])

  //获取最新购物车列表函数
  const updateNewList = async () => {
    // 1.调用接口获取最新的购物车列表数据
    const { result } = await findNewCartListAPI()
    // 2.用接口返回的数据替换掉购物车数据
    cartList.value = result
  }


  // 添加购物车
  const addCart =async (goods) => {
    if (isLogin.value) {
      // 登录之后的加入逻辑
      // 1调用接口添加购物车数据
      await insertCartAPI({skuId: goods.skuId, count: goods.count})
      // 2.如果添加成功，购物车数据重新请求
      updateNewList()
    }else{
      // 未登录的加入逻辑
      // 判断购物车是否有该商品
      const index = cartList.value.findIndex((cartItem) => cartItem.skuId === goods.skuId)
      if (index !== -1) {
        // 如果有，数量加1
        cartList.value[index].count += goods.count
      } else {
        // 如果没有，添加到购物车
        cartList.value.push(goods)
      }
    }
  }

  // 删除购物车里面的商品
  const delCart = async  (skuId) => {
    if(isLogin.value){
      // 登录之后的删除逻辑
      // 1.调用接口删除购物车数据
      await delCartAPI([skuId])
      // 2.如果删除成功，购物车数据重新请求
      updateNewList()
    }else{
      // 未登录的删除逻辑
      // 1.根据skuId找到购物车里面的商品项的下标值，采用splice删除
      // 2.使用数组的过滤方法，filter过滤出不需要删除的商品项，重新赋值给cartList
      const index = cartList.value.findIndex((cartItem) => cartItem.skuId === skuId)
      if (index !== -1) {
        cartList.value.splice(index, 1)
      }
    }
  }
    // 购物车商品总数量
  const cartCount = computed(() => {
    return cartList.value.reduce((total, item) => total + item.count, 0)
  })

  // 购物车商品总价
  const cartTotalPrice = computed(() => {
    return cartList.value.reduce((total, item) => total + item.count * item.price, 0)
  })  

  // 单选功能
  const singleCheck = (skuId, selected) =>{
    // 1.根据skuId找到购物车里面的已经选中的商品，将他的selected属性值改为selected
    const index = cartList.value.findIndex((cartItem) => cartItem.skuId === skuId)
    if (index !== -1) {
      cartList.value[index].selected = selected
    }
  }
  
  // 已选商品数量
  const selectedCount = computed(() => {
    return cartList.value.filter(item => item.selected).reduce((total, item) => total + item.count, 0)
  })  

  // 已选商品总价
  const selectedPrice = computed(() => {
    return cartList.value.filter(item => item.selected).reduce((total, item) => total + item.count*item.price, 0)
  })

  // 清除购物车数据
  const clearCart = () => {
    cartList.value = []
  } 

  // 获取合并后的最新的购物车数据
  const getMergeCart = async () => {
    await mergeCartAPI(cartList.value.map(item => ({skuId: item.skuId, selected:item.selected, count: item.count})))
    // 合并成功之后，购物车数据重新请求
    updateNewList()
  }


  return {
    cartList,
    getMergeCart,
    updateNewList,
    addCart,
    delCart,
    cartCount,
    cartTotalPrice,
    singleCheck,
    selectedCount,
    selectedPrice,
    clearCart
  }
},{
  persist: true,
})
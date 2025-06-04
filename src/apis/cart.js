// 封装购物车相关接口
import httpInstance from "@/utiles/http"


// 添加购物车数据
export const insertCartAPI = ({skuId,count}) => {
  return httpInstance.post('/member/cart',{skuId,count})
}

// 获取最新的购物车列表数据
export const findNewCartListAPI = () => {
  return httpInstance.get('/member/cart')
}

// 删除购物车数据
export const delCartAPI = (ids) => {
  return httpInstance.delete('/member/cart', {data: {ids}}) // delete请求传参需要data
}

// 合并购物车
export const mergeCartAPI = ( data ) => {
  return httpInstance.post('/member/cart/merge',data)
}

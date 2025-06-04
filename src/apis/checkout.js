// 封装结算相关接口
import httpInstance from "@/utiles/http"

// 生成订单，结算页接口
export const getCheckInfoAPI = () => {
  return httpInstance.get('/member/order/pre')
}

// 提交订单接口
export const createOrderAPI = (data) =>{
  return httpInstance.post('/member/order',data)
}
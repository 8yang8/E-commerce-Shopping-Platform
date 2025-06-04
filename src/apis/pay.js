// 封装订单详情的接口（支付页面）
import httpInstance from "@/utiles/http";
 export const getOrderAPI = (id) => {
   return httpInstance.get(`/member/order/${id}`)
 }

import httpInstance from "@/utiles/http"; 

/*
params: {
	orderState:0,
  page:1,
  pageSize:2
}
*/
// 获取订单数据
export const getUserOrderAPI = (params) => {
  return httpInstance.get('/member/order', {params})
}

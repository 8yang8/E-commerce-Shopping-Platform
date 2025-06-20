import httpInstance from "@/utiles/http";

// 获取商品详情数据
export const getDetailAPI = (id) => {
  return httpInstance.get('/goods', {
    params: {
      id
    }
  })
}

/**
 * 获取热榜商品
 * @param {Number} id - 商品id
 * @param {Number} type - 1代表24小时热销榜 2代表周热销榜
 * @param {Number} limit - 获取个数
 */
 // 获取热榜商品
 export const getHotGoodsAPI = ({ id, type, limit = 3 }) => {
  return httpInstance.get('/goods/hot',{
    params:{
      id,
      type,
      limit
    }
  })
 }

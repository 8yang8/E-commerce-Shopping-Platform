import httpInstance from "@/utiles/http";
// 获取banner数据 
export const getBannerAPI = (distributionSite) => {
  return httpInstance.get('/home/banner',{
    params:{
      distributionSite
    }
  })
}

export const findNewAPI = () => {
  return httpInstance.get('/home/new')
}

export const getHotAPI = () => {
  return httpInstance.get('home/hot')
}

export const getPopularAPI = () => {
  return httpInstance.get('/home/brand')
}

export const getGoodsAPI = () => {
  return httpInstance.get('/home/goods')
}


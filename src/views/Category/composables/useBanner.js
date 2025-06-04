// 封装banner轮播图相关的业务代码
import { onMounted, ref } from 'vue'
import { getBannerAPI } from '@/apis/home.js' 

export function useBanner (){
  // 获取轮播图数据
  const bannerList = ref([])
  const getBanner = async () => {
    const {result} = await getBannerAPI('2')
    bannerList.value = result
  }
  
  onMounted(() => {
    // 使用onBeforeRouteUpdate时，需要在onMounted中获取一次数据
    // getCategory()
    getBanner()
  })

  return {
    bannerList,
  }
}
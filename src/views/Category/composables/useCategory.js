// 封装分类数据业务相关的代码
import { ref, watch } from 'vue'
import { getCategoryAPI } from '@/apis/category'
import { useRoute } from 'vue-router'
export function useCategory() {
  const route = useRoute()
  const categoryData = ref({})
  const getCategory = async (id = route.params.id) => {
    const res  = await getCategoryAPI(id)
    categoryData.value = res.result
  }

  // 三种方法解决路由缓存问题(产生原因：路由只有一个参数id，导致复用机制，数据不更新)
  // 1. 通过watch监听路由参数变化，重新获取分类数据
  // 2. 通过onBeforeRouteUpdate监听路由参数变化，重新获取分类数据 （精细化控制）
  // 3. 添加key属性，破坏复用机制，强制销毁重建Layout index.vue中的router-view组件添加

  // 1. 通过watch监听路由参数变化，重新获取分类数据
  watch(() => route.params.id, (newId) => {
    getCategory(newId)
  }, { immediate: true })

  // 2. 通过onBeforeRouteUpdate监听路由参数变化，重新获取分类数据 
  // onBeforeRouteUpdate((to) =>{
  //   // to为一个对象，包含了新的路由信息
  //   getCategory(to.params.id)
  // })
  // onMounted(() => {
  //   getCategory()  //需要在onMounted中获取一次数据
  // })

  return {
    categoryData
  } 
}

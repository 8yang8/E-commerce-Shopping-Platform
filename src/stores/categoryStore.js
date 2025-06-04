import { defineStore } from 'pinia';
import {ref} from 'vue';
import { getCategoryAPI } from '@/apis/layout.js'

export const useCategoryStore = defineStore('category', () => {
  // 导航列表的逻辑
  const categoryList = ref([])
  const getCategory = async () => {
  const { result } = await getCategoryAPI()
  categoryList.value = result
}
  return {
    categoryList,
    getCategory
  };
})
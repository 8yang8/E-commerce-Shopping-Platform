import httpInstance from "@/utiles/http";

// 获取一级分类列表
export const getCategoryAPI = (id) => {
  return httpInstance.get('/category',{
    params:{
      id
    }
  })
}

// 获取二级分类列表
export const getCategoryFilterAPI = (id) => {
  return httpInstance.get('/category/sub/filter',{
    params:{
      id
    }
  })
}

// 获取导航数据
export const getSubCategoryAPI = (data) =>{
  return httpInstance.post('/category/goods/temporary',{data})
}
<script setup>
import { getCategoryFilterAPI } from '@/apis/category'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getSubCategoryAPI } from '@/apis/category'
import GoodsItems from '../Home/components/GoodsItems.vue'

// 获取分类数据
const categoryData = ref({})
const route = useRoute()
const getCategoryData = async () => {
  const {result} = await getCategoryFilterAPI(route.params.id)
  categoryData.value = result
}
onMounted(() => {
  getCategoryData()
})

// 获取基础列表数据
const goodsList = ref([]) 
const reqData = ref({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  sortField: 'publishTime' | 'orderNum' | 'evaluateNum'
})
const getGoodsList = async () => {
  const { result } = await getSubCategoryAPI(reqData.value)
  goodsList.value = result.items
  console.log(result)
}
onMounted(() => {
  getGoodsList()
})
// tab切换回调
const tabChange = () => {
  reqData.value.page = 1
  getGoodsList()
  disabled.value = false
}

// 加载更多
const disabled = ref(false)
const load = async () => {
  // 获取下一页的数据
  reqData.value.page++
  const { result } = await getSubCategoryAPI(reqData.value)
  // 拼接数据
  goodsList.value = [...goodsList.value, ...result.items]
  // goodsList.value.push(...result.items)
  // 判断是否还有数据
  if (result.items.length === 0) {
    // 没有数据了，停止加载
    disabled.value = true
  }
}
</script>

<template>
  <div class="container ">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${categoryData.parentId}` }">{{categoryData.parentName}}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{categoryData.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="reqData.sortField" @tab-change="tabChange" >
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
        <!-- 商品列表-->
        <GoodsItems v-for="good in goodsList" :good="good" :key="good.id"></GoodsItems>
      </div>
    </div>
  </div>

</template>



<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }


}
</style>
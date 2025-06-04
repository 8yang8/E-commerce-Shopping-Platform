<script setup>
import HomeBanner from './components/HomeBanner.vue';
import HomeCategory from './components/HomeCategory.vue';
import HomeHot from './components/HomeHot.vue';
import HomeNew from './components/HomeNew.vue';
import HomeProduct from './components/HomeProduct.vue';
import HomePopular from './components/HomePopular.vue'; 
</script>
<template>
  <div class="container">
    <!-- 左侧分类 -->
    <HomeCategory></HomeCategory>
    <!-- 轮播图 -->
    <HomeBanner></HomeBanner>
  </div>
  <!-- 新鲜好物 -->
  <HomeNew></HomeNew>
  <!-- 人气推荐 -->
  <HomeHot></HomeHot>
  <!-- 热门品牌 -->
  <HomePopular></HomePopular>
  <!-- 产品列表 -->
  <HomeProduct></HomeProduct>
</template>
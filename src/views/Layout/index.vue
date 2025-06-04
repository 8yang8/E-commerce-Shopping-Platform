<script setup>
import LayoutFooter from './components/LayoutFooter.vue'; 
import LayoutHeader from './components/LayoutHeader.vue';
import LayoutNav from './components/LayoutNav.vue';
import LayoutFixed from './components/LayoutFixed.vue';

// 触发获取列表的函数
import { useCategoryStore } from '@/stores/categoryStore';
const categoryStore = useCategoryStore()
categoryStore.getCategory()
</script>
<template>
  <LayoutFixed></LayoutFixed>
  <LayoutNav></LayoutNav>
  <LayoutHeader></LayoutHeader>
  <!-- 二级路由出口 -->
  <!-- 添加key属性，破坏复用机制，强制销毁重建 -->
  <!-- <router-view :key="$route.fullPath"></router-view> -->
  <router-view></router-view>
  <LayoutFooter></LayoutFooter>
</template>
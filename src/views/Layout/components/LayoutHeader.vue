<script setup>
// 自动包装后的 setup()
import { useCategoryStore } from '@/stores/categoryStore'
import HeaderCart from '@/views/Layout/components/HeaderCart.vue'
// 获取pinia的数据
const categoryStore = useCategoryStore()
</script>

<template>
  <header class='app-header'>
    <div class="container">
      <h1 class="logo">
        <!-- <RouterLink>会被渲染成 <a> 标签 -->
        <RouterLink to="/">小兔鲜</RouterLink>
      </h1>
      <ul class="app-header-nav">
        <li class="home" v-for="item in categoryStore.categoryList" :key="item.id">
          <!-- active-class="active" 表示当当前路由匹配该链接时，会自动添加 .active 类 -->
          <RouterLink :to="`/category/${item.id}`" active-class="active">{{ item.name }}</RouterLink>
        </li>
      </ul>
      <div class="search">
        <i class="iconfont icon-search"></i>
        <input type="text" placeholder="搜一搜">
      </div>
      <!-- 头部购物车 -->
      <HeaderCart></HeaderCart>
    </div>
  </header>
</template>

<!-- scoped：表示该样式是作用域样式。使用 scoped 后，该组件内的 CSS 样式只会作用于当前组件的模板内容，不会影响其他组件或全局样式 -->
 <!-- 表示当前样式使用的语言是 SCSS（Sassy CSS），它是 Sass 的一种语法形式，支持嵌套规则、变量、混合等特性，使 CSS 编写更加灵活和模块化 -->
<style scoped lang='scss'>
.app-header {
  background: #fff;

  .container {
    display: flex;
    align-items: center;
  }

  .logo {
    width: 200px;

    a {
      // <a> 是行内元素（inline），不能直接设置宽度和高度，独占一行布局
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -9999px;
      background: url('@/assets/images/logo.png') no-repeat center 18px / contain;
    }
  }

  .app-header-nav {
    width: 820px;
    // 只作用于直接子元素（这里是 <li>），水平排列 <li>
    display: flex;
    padding-left: 40px;
    // 使元素成为定位元素，允许使用 z-index
    position: relative;
    // 确保导航菜单不会被其他元素遮挡
    z-index: 998;
  
    li {
      margin-right: 40px;
      width: 38px;
      text-align: center;
  
      a {
        font-size: 16px;
        line-height: 32px;
        height: 32px;
        // 水平排列的场景中，设置为 inline-block更合适
        display: inline-block;
  
        &:hover {
          color: $xtxColor;
          border-bottom: 1px solid $xtxColor;
        }
      }
  
      .active {
        color: $xtxColor;
        border-bottom: 1px solid $xtxColor;
      }
    }
  }

  .search {
    width: 170px;
    height: 32px;
    // 为内部绝对定位元素提供定位基准， 防止布局塌陷或错位
    position: relative;
    border-bottom: 1px solid #e7e7e7;
    line-height: 32px;

    .icon-search {
      font-size: 18px;
      margin-left: 5px;
    }

    input {
      width: 140px;
      padding-left: 5px;
      color: #666;
    }
  }
}
</style>
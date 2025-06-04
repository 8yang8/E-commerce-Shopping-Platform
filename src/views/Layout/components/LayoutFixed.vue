<script setup>
import { useScroll } from '@vueuse/core'
import { useCategoryStore } from '@/stores/categoryStore'
// 获取pinia的数据
const categoryStore = useCategoryStore()
const { y } = useScroll(window)


</script>

<template>
  <div class="app-header-sticky" :class="{ show: y > 78 }">
    <div class="container">
      <RouterLink class="logo" to="/" />
      <!-- 导航区域 -->
      <ul class="app-header-nav ">
        <li class="home" >
          <RouterLink to="/">首页</RouterLink>
        </li>
        <li class="home" v-for="item in categoryStore.categoryList" :key="item.id">
          <RouterLink :to="`/category/${item.id}`" active-class="active">{{ item.name }}</RouterLink>
        </li>
      </ul>

      <div class="right">
        <RouterLink to="/">品牌</RouterLink>
        <RouterLink to="/">专题</RouterLink>
      </div>
    </div>
  </div>
</template>


<style scoped lang='scss'>
.app-header-sticky {
  width: 100%; //设置宽度为浏览器窗口的 100%，让导航栏占满整个页面顶部宽度；
  height: 80px;
  position: fixed; //使用 fixed 定位，使该元素脱离文档流并固定在浏览器视口顶部；
  left: 0;
  top: 0;
  z-index: 999;  //设置层叠顺序，确保该导航栏始终位于其他内容之上；
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4; //添加底部边框线，视觉上与下方内容分隔开；
  // 此处为关键样式!!!
  // 状态一：往上平移自身高度 + 完全透明
  transform: translateY(-100%); //默认状态下，将元素向上移动它自身高度的 100%，也就是完全移出屏幕上方；
  opacity: 0; //默认设置为完全透明，进一步隐藏该导航栏；

  // 状态二：移除平移 + 完全不透明
  &.show {  //Sass 的嵌套语法，表示当元素同时拥有 .app-header-sticky 和 .show 类时应用的样式
    transition: all 0.3s linear; //添加过渡动画,all 表示所有属性都参与动画,持续时间为 0.3 秒,linear 表示匀速变化，没有加速或减速效果；
    transform: none; //取消之前的 translateY(-100%)，使元素回到原始位置；
    opacity: 1; //设置为完全不透明，使导航栏可见；
  }

  .container {
    display: flex;
    align-items: center;
  }

  .logo {
    width: 200px;
    height: 80px;
    background: url("@/assets/images/logo.png") no-repeat right 2px;
    background-size: 160px auto;
  }

  .right {
    width: 220px;
    display: flex;
    text-align: center;
    padding-left: 40px;
    border-left: 2px solid $xtxColor;

    a {
      width: 38px;
      margin-right: 40px;
      font-size: 16px;
      line-height: 1;

      &:hover {
        color: $xtxColor;
      }
    }
  }
}

.app-header-nav {
  width: 820px;
  display: flex;
  padding-left: 40px;
  position: relative; //position: relative; z-index: 998;	确保导航栏不会被其他元素遮挡
  z-index: 998;

  li {
    margin-right: 40px;
    width: 38px;
    text-align: center;

    a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
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
</style>
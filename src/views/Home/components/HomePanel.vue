<script setup>
defineProps({
  title: {
    type: String,
  },
  subTitle: {
    type: String,
  },
  path:{
    type: String,
    default: '/'
  }
})
</script>


<template>
  <div class="home-panel">
    <div class="container">
      <div class="head">
         <!-- 主标题和副标题 -->
        <h3>
          {{ title }}<small>{{ subTitle }}</small>
        </h3>
        <RouterLink :to="path" class="view-all">
          <span>查看全部</span>
          <i class="iconfont icon-angle-right"></i>
        </RouterLink>
      </div>
      <!-- 主体内容区域 -->
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.home-panel {
  background-color: #fff;

  .head {
    padding: 40px 0;
    display: flex;
    align-items: flex-end; // 底部对齐

    h3 {
      flex: 1;  // 宽度自动
      font-size: 32px;
      font-weight: normal;
      margin-left: 6px;
      height: 35px;
      line-height: 35px;

      small {
        font-size: 16px;
        color: #999;
        margin-left: 20px;
      }
    }
    .view-all {
      font-size: 16px;
      text-decoration: none;
      display: flex;
      align-items: center;

      .iconfont{
        margin-left: 5px;
      }
    }
  }
}
</style>

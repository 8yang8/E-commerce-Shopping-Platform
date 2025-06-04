<script setup>
</script>

<template>
  <header class="login-header">
    <div class="container m-top-20">
      <h1 class="logo">
        <RouterLink to="/">小兔鲜</RouterLink>
      </h1>
      <RouterLink class="entry" to="/">
        进入网站首页
        <i class="iconfont icon-angle-right"></i>
        <i class="iconfont icon-angle-right"></i>
      </RouterLink>
    </div>
  </header>
</template>

<style scoped lang='scss'>
.login-header {
  background: #fff;
  border-bottom: 1px solid #e4e4e4;

  .container {
    display: flex; // 使用 Flexbox 布局
    align-items: flex-end; // 垂直对齐底部
    justify-content: space-between; // 水平分布两端
  }

  .logo {
    width: 200px;

    a {
      display: block; //让 <a> 支持宽高设置
      height: 132px;
      width: 100%;
      text-indent: -9999px; //隐藏文字，保留语义
      background: url("@/assets/images/logo.png") no-repeat center 18px / contain;
    }
  }

  .entry {
    width: 120px;
    margin-bottom: 38px;
    font-size: 16px;

    i {
      font-size: 14px;
      color: $xtxColor;
      letter-spacing: -5px; // 字符间距
    }
  }
}
</style>
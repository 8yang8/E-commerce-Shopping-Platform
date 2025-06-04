<script setup>
</script>

<template>
  <footer class="login-footer">
    <div class="container">
      <p>
        <a href="javascript:;">关于我们</a>
        <a href="javascript:;">帮助中心</a>
        <a href="javascript:;">售后服务</a>
        <a href="javascript:;">配送与验收</a>
        <a href="javascript:;">商务合作</a>
        <a href="javascript:;">搜索推荐</a>
        <a href="javascript:;">友情链接</a>
      </p>
      <p>CopyRight &copy; 小兔鲜儿</p>
    </div>
  </footer>
</template>

<style scoped lang='scss'>
.login-footer {
  padding: 30px 0 50px;
  background: #fff;

  p {
    text-align: center; // 文本居中
    color: #999;
    padding-top: 20px; 

    a {
      line-height: 1;  //让文字更紧凑，提升视觉一致性
      padding: 0 10px;
      color: #999;
      display: inline-block;  //使多个 <a> 标签在同一行展示，同时支持 padding 和 border

      ~a {
        border-left: 1px solid #ccc; // 使用 ~a 选择器，确保第一个 <a> 不会有左边框
      }
    }
  }
}
</style>
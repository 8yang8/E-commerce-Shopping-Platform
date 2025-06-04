<script setup>
import loginHeader from './components/login-header.vue'
import loginFooter from './components/login-footer.vue'
import CallbackBind from './components/callback-bind.vue'
import CallbackPatch from './components/callback-patch.vue'
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()
const router = useRouter()
const isBind = ref(false)
const unionId = ref(null)
const hasAccount = ref(true)
    // 首先：默认认为已经注册且已经绑定
    // 通过QQ的API获取openId就是后台需要的unionId然后去进行登录
    // 如果成功：登录成功
    // 如果失败：改QQ未和小兔仙进行绑定（有帐号未绑定QQ，没有帐号未绑定QQ）

onMounted(() => {
  const checkQC = () => {
    if (window.QC) {
      // 如果QC对象存在，说明已经加载完成
      if (QC.Login.check()) {
        // 如果已经登录，获取用户信息
        // 第三方唯一标识QQ唯一标识
        QC.Login.getMe((openId) => {
          unionId.value = openId
          // 通过openId去请求后台接口，判断是否已经绑定
          // 如果绑定了，直接登录 
          userStore.getUserQQLogin(openId).then(res => {
            // 已经绑定，直接登录，成功提示
            // 直接跳转到首页
            router.replace('/')
            ElMessage.success('登录成功')
          }).catch(err => {
            // 登录失败：没有和小兔鲜绑定
            isBind.value = false
          })
        })
      }
    } else {
      setTimeout(checkQC, 500)
    }
  }
  checkQC()
})

</script>
<template>
  <login-header />
  <section class="container" v-if = "isBind"> 
    <div class="unbind">
      <div class="loading"></div>
    </div>
  </section>
  <section class="container" v-else>
    <nav class="tab">
      <a @click="hasAccount=true" :class="{active:hasAccount}" href="javascript:;">
        <i class="iconfont icon-bind" />
        <span>已有小兔鲜账号，请绑定手机</span>
      </a>
      <a @click="hasAccount=false" :class="{active:!hasAccount}" href="javascript:;">
        <i class="iconfont icon-edit" />
        <span>没有小兔鲜账号，请完善资料</span>
      </a>
    </nav>
    <div class="tab-content" v-if="hasAccount">
      <CallbackBind :unionId="unionId" />
    </div>
    <div class="tab-content" v-else>
      <CallbackPatch :unionId="unionId"/>
    </div>
  </section>
  <login-footer />
</template>

<style lang="scss" scoped>
.container {
  padding: 25px 0;
  position: relative;
  height: 730px;
  .unbind {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 25px 0;
    z-index: 99;
    .loading {
      height: 100%;
      background: #fff url(../../assets/images/load.gif) no-repeat center / 100px 100px;
    }
  }
}
.tab {
  background: #fff;
  height: 80px;
  padding-top: 40px;
  font-size: 18px;
  text-align: center;
  a {
    color: #666;
    display: inline-block;
    width: 350px;
    line-height: 40px;
    border-bottom: 2px solid #e4e4e4;
    i {
      font-size: 22px;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
      margin-left: 4px;
    }
    &.active {
      color: #27ba9b;
      border-color: #27ba9b;
    }
  }
}
.tab-content {
  min-height: 600px;
  background: #fff;
}
</style>
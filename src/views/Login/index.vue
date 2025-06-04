<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore, useCartStore } from '@/stores/index'
import { userMobileLogincodeAPI, userAccountLoginAPI, userMobileLoginAPI } from '@/apis/user'
import { baseRules } from '@/utiles/validate'
// 引入新组件
import LoginHeader from './components/login-header.vue'
import LoginFooter from './components/login-footer.vue'

const router = useRouter()
const userStore = useUserStore()
// 获取表单实例
const formRefAccount = ref(null)
const formRefMobile = ref(null)
const isMsgLogin = ref(false)
// 控制账号登录或者扫码登录
const activeName = ref('account')
// 表单校验
const form = ref({
  account: '',
  password: '',
  agree: true,
  mobile: null,
  code: null
})
// const rules = ref({
//   account: [
//     { required: true, message: '请输入账号', trigger: 'blur' },
//     { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
//   ],
//   password: [
//     { required: true, message: '请输入密码', trigger: 'blur' },
//     { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
//   ],
//   agree: [
//     { 
//       validator: (rule, val, callback) => {
//         return val ? callback() : new Error('请先同意协议')
//       },
//      }
//   ],
//   mobile: [
//     { required: true, message: '请输入手机号', trigger: 'blur' },
//     { pattern: /^1[2-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
//   ],
//   code: [
//     { required: true, message: '请输入验证码', trigger: 'blur' },
//     { pattern: /^\d{6}$/, message: '请输入6位数字验证码', trigger: 'blur' }
//   ]
// })
const totalsecond = ref(60)
const second = ref(60)
const timer = ref(null) // 定义 timer 为响应式变量

// 获取短信验证码
const getcode = async () => {
  // 确认已经正确填写了11位手机号，如果没有进行提示
  if (!form.value.mobile) {
    ElMessage.warning('请输入正确的手机号')
    return
  }
  // 当前目前没有定时器开着，且totalsecond与second一致的时候，才可以开始倒计时
  if (!timer.value && second.value === totalsecond.value) {
    // 发送请求获得验证码
    await userMobileLogincodeAPI(form.value.mobile)
    // 提示获取验证码成功
    ElMessage.success('短信发送成功，请注意查收')
    // 开启倒计时
    timer.value = setInterval(() => {
      second.value--
      if (second.value === 0) {
        clearInterval(timer.value)
        timer.value = null // 重置 timer
        second.value = totalsecond.value
      }
    }, 1000)
  }
}

const doLogin = () => {
  // 根据 isMsgLogin 的值选择不同的表单进行校验
  const formRef = isMsgLogin.value ? formRefMobile.value : formRefAccount.value

  // 登陆前预检验
  if (formRef) {
    formRef.validate(async (valid) => {
      // 所有表单通过校验，valid为true
      if (valid) {
        if (isMsgLogin.value) {
          // 手机号登录
          await userStore.getUserMobileLogin({
            mobile: form.value.mobile,
            code: form.value.code
          })
        } else {
          // 账号登录
          await userStore.getUserAccountInfo({
            account: form.value.account,
            password: form.value.password
          })
        }
        ElMessage.success('登录成功') // 第一次使用记得去配置文件中设置忽略警告
        // 登录成功后跳转到首页
        // replace方法会替换当前路由，避免用户点击后退按钮返回到登录页
        router.replace('/')
      } else {
        console.log('登录失败')
        return false
      }
    })
  } else {
    console.error('表单引用未正确绑定')
  }
}
</script>

<template>
  <div>
    <!-- 使用新组件 -->
    <LoginHeader />
    
    <section class="login-section">
      <div  class="wrapper">
        <nav>
          <a href="javascript:;" @click="activeName='account'" :class="{active:activeName==='account'}">账户登录</a>
          <a href="javascript:;" @click="activeName='qrcode'" :class="{active:activeName==='qrcode'}">扫码登录</a>
        </nav>
        <div v-if="activeName==='account'" class="account-box">
          <div class="toggle">
            <a @click="isMsgLogin=false" href="javascript:;" v-if="isMsgLogin">
              <i class="iconfont icon-user"></i> 使用账号登录
            </a>
            <a @click="isMsgLogin=true" href="javascript:;" v-else>
              <i class="iconfont icon-msg"></i> 使用短信登录
            </a>
          </div>
          <div class="form">
            <el-form v-if="isMsgLogin" :model="form" :rules="baseRules" ref="formRefMobile" label-position="left" label-width="70px" status-icon>
              <el-form-item label="手机号" prop="mobile">
                <el-input v-model="form.mobile"/>
              </el-form-item>
              <el-form-item label="验证码" prop="code">
                <div class="codeBox">
                  <el-input class="inp" v-model="form.code" ></el-input>
                  <el-button class="but" @click="getcode">{{ second === totalsecond ? '获取验证码' : second + '秒后重新发送' }}</el-button>
                </div>
              </el-form-item>
              <el-form-item label-width="22px" prop="agree">
                <el-checkbox v-model="form.agree" size="large" class="agree">
                  <span>我已同意</span>
                  <a href="javascript:;">《隐私条款》</a>
                  <span>和</span>
                  <a href="javascript:;">《服务条款》</a>
                </el-checkbox>
              </el-form-item>
              <el-button size="large" class="subBtn" @click="doLogin">点击登录</el-button>
            </el-form>
            <el-form v-else :model="form" :rules="rules" ref="formRefAccount" label-position="left" label-width="70px" status-icon>
              <el-form-item label="账户" prop="account">
                <el-input v-model="form.account"/>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="form.password"/>
              </el-form-item>
              <el-form-item label-width="22px" prop="agree">
                <el-checkbox v-model="form.agree" size="large" class="agree">
                  <span>我已同意</span>
                  <a href="javascript:;">《隐私条款》</a>
                  <span>和</span>
                  <a href="javascript:;">《服务条款》</a>
                </el-checkbox>
              </el-form-item>
              <el-button size="large" class="subBtn" @click="doLogin">点击登录</el-button>
            </el-form>
          </div>
          <div class="action">
            <a href="https://graph.qq.com/oauth2.0/authorize?client_id=100556005&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fwww.corho.com%3A8080%2F%23%2Flogin%2Fcallback">
              <img src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png" alt="">
            </a>
            <div class="url">
              <a href="javascript:;">忘记密码</a>
              <a href="javascript:;">免费注册</a>
            </div>
          </div>
        </div>
        <div v-else class="qrcode">
          <img src="@/assets/images/qrcode.jpg" alt="">
          <p>打开 <a href="javascript:;">APP小兔鲜</a>扫码登录</p>
        </div>
      </div>
    </section>

    <!-- 使用新组件 -->
    <LoginFooter />
  </div>
</template>

<style scoped lang='scss'>

.login-section {
  background: url('@/assets/images/login-bg.png') no-repeat center / cover;
  height: 488px;
  position: relative;

  .wrapper {
    padding: 0 40px;
    width: 380px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

    nav {
      font-size: 14px;
      height: 55px;
      margin-bottom: 20px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;  /* 使用 Flexbox 布局来排列子元素 */
      padding: 0 40px;
      text-align: right; /* 文本对齐方式为右侧对齐 */
      align-items: center;  /* 垂直居中对齐子元素 */

      a {
        flex: 1;  /* 让每个链接占据相等的空间 */
        line-height: 1;  /* 设置行高为 1，确保文字紧凑 */
        display: inline-block; /* 将链接设置为内联块级元素，确保 <a> 标签能够正确应用宽度、高度和内边距等样式，让多个链接在同一行内水平排列，同时保留块级元素的样式灵活性 */
        font-size: 18px;
        position: relative; /* 添加相对定位，以便设置绝对定位 */
        text-align: center;
        &:first-child {
          border-right: 1px solid #f5f5f5; /* 对第一个子元素添加右侧边框 */
          text-align: left; /* 第一个子元素的文字对齐方式为左侧对齐 */
        }
        &.active {
          color: $xtxColor; /* 当链接处于激活状态时，文字颜色为变量 @xtxColor 的值 */
          font-weight: bold; /* 激活状态的文字加粗 */
        }        
      }
    }
    .account-box {
      .toggle {
        text-align: right;
        margin-bottom: 40px;
        a {
          color: $xtxColor;
          i {
            font-size: 14px;
          }
        }
      }
      .agree {
        span {
          color: #666;
        }
        a {
          color: #069;

        }
      }
      .form {
        .codeBox{
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: 1px solid #f3f1f2;
          .inp {
            border: none;
            outline: none;
            flex: 1;
          }
          .but {
            border: none;

          }
        }
      }

      .action {
        padding: 20px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .url {
          a {
            color: #999;
            margin-left: 10px;
          }
        }
      }
    }

    .qrcode {
      text-align: center;
      margin-bottom: 40px;
      p {
        margin-bottom: 40px;
        a {
          color: $xtxColor;
          font-size: 16px;
        }
      }
    }

  }
}

.login-footer {
  padding: 30px 0 50px;
  background: #fff;

  p {
    text-align: center;  // 设置 <p> 标签内的文本居中对齐
    color: #999;
    padding-top: 20px;

    a {
      line-height: 1;  // 设置 <a> 标签的行高为 1，使其文字高度与字体大小一致
      padding: 0 10px;
      color: #999;
      display: inline-block; // 将 <a> 标签设置为内联块级元素，使其宽度和高度可以由内容决定</a>

      ~a {
        border-left: 1px solid #ccc; // 链接之间的分隔线效果
      }
    }
  }
}

.subBtn {
  background: $xtxColor;
  width: 100%;
  color: #fff;
}
</style>
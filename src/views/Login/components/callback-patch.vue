<script setup>
import { ref, reactive } from 'vue'
import { baseRules, createRePasswordRule, createCheckAccount } from '@/utiles/validate'
import { userQQPatchCode } from '@/apis/user'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

// 接收 unionId 属性
const props = defineProps({
  unionId: {
    type: String,
    default: ''
  }
})

// 表单数据
const form = reactive({
  account1: '',
  mobile: '',
  code: '',
  password: '',
  rePassword: '',
  agree: true
})

// 表单引用
const formRef = ref(null)

// 倒计时相关
const time = ref(60)
const totalsecond = ref(60)
const timer = ref(null)

// 创建确认密码校验规则
const rePasswordRule = createRePasswordRule(form)

// 校验用户是否存在且唯一
const checkAccount = createCheckAccount(form.account)

// 合并校验规则
const rules = {
  ...baseRules,
  rePassword: rePasswordRule,
  account1: checkAccount
}

// 发送验证码
const send = async () => {
  if (!form.mobile) {
    ElMessage.warning('请输入正确的手机号')
    return
  }

  if (!timer.value && time.value === totalsecond.value) {
    try {
      await userQQPatchCode(form.mobile)
      ElMessage.success('短信发送成功，请注意查收')
      startCountdown()
    } catch (error) {
      ElMessage.error('验证码发送失败')
    }
  }
}

// 开启倒计时
const startCountdown = () => {
  timer.value = setInterval(() => {
    time.value--
    if (time.value === 0) {
      clearInterval(timer.value)
      timer.value = null
      time.value = totalsecond.value
    }
  }, 1000)
}

// 提交表单
const submit = () => {
  formRef.value.validate(async valid => {
    if (valid) {
      try {
        await userStore.getUserQQPatchLogin({
          unionId: props.unionId,
          account: form.account,
          mobile: form.mobile,
          code: form.code,
          password: form.password,
          rePassword: form.rePassword
        })
        ElMessage.success('提交成功')
        router.replace('/')
      } catch (error) {
        ElMessage.error('提交失败，请检查信息或稍后再试')
      }
    }
  })
}
</script>

<template>
  <div class="form">
    <el-form :model="form" :rules="rules" ref="formRef" label-position="left" label-width="auto">
      <!-- 用户名 -->
      <el-form-item prop="account1">
        <div class="form-row">
          <i class="icon iconfont icon-user"></i>
          <el-input v-model="form.account1" placeholder="请输入用户名" />
        </div>
      </el-form-item>

      <!-- 手机号 -->
      <el-form-item prop="mobile">
        <div class="form-row">
          <i class="icon iconfont icon-phone"></i>
          <el-input v-model="form.mobile" placeholder="请输入手机号" />
        </div>
      </el-form-item>

      <!-- 验证码 -->
      <el-form-item prop="code">
        <div class="form-row">
          <i class="icon iconfont icon-code"></i>
          <el-input v-model="form.code" placeholder="请输入验证码" />
          <el-button class="action-btn">{{ time === 60 ? '获取验证码' : `${time}秒后发送` }}</el-button>
        </div>
      </el-form-item>

      <!-- 密码 -->
      <el-form-item prop="password">
        <div class="form-row">
          <i class="icon iconfont icon-lock"></i>
          <el-input v-model="form.password" type="password" show-password placeholder="请输入密码" />
        </div>
      </el-form-item>

      <!-- 确认密码 -->
      <el-form-item prop="rePassword">
        <div class="form-row">
          <i class="icon iconfont icon-lock"></i>
          <el-input v-model="form.rePassword" type="password" show-password placeholder="请再次输入密码" />
        </div>
      </el-form-item>

      <!-- 提交按钮 -->
      <el-form-item>
        <el-button class="submit-btn" type="primary" @click="submit">立即绑定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<style scoped lang="scss">
.form {
  width: 30%;
  margin: 0 auto;
  padding: 40px;
  .el-form-item {
    width: 100%;
    margin-bottom: 20px;
  }

  .form-row {
    display: flex;
    align-items: center;
    width: 100%; 

    .icon {
      margin-right: 10px;
      font-size: 18px;
      color: #999;
      flex-shrink: 0;
    }
  
    .el-input {
      flex: 1;
    }
  
    .action-btn {
      flex-shrink: 0;
      white-space: nowrap;
      padding: 0 12px;
      height: 32px;
    }
  }

  .submit-btn {
    width: 100%;
  }
}

.input-with-button {
  display: flex;
  flex: 1;
  .el-input {
    flex: 1;
    margin-right: 10px;
  }
  .action-btn {
    flex-shrink: 0;
    white-space: nowrap;
    padding: 0 12px;
  }
}
</style>
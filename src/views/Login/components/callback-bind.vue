<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import { userQQBindCode } from '@/apis/user'
import { baseRules } from '@/utiles/validate'

const userStore = useUserStore()
const router = useRouter()

const props = defineProps({
  unionId: {
    type: String,
    default: ''
  }
})

const form = reactive({
  mobile: '',
  code: ''
})

const rules = {
  ...baseRules
}

const nickname = ref('')
const avatar = ref('')

onMounted(() => {
  const checkQC = () => {
    if (window.QC) {
      if (QC.Login.check()) {
        QC.api('get_user_info').success(res => {
          avatar.value = res.data.figureurl_qq_1
          nickname.value = res.data.nickname
        })
      }
    } else {
      setTimeout(checkQC, 500)
    }
  }

  checkQC()
})

const formRef = ref(null)

const time = ref(60)
const totalsecond = ref(60)
const timer = ref(null)

const send = async () => {
  if (!form.mobile) {
    ElMessage.warning('请输入正确的手机号')
    return
  }

  if (!timer.value && time.value === totalsecond.value) {
    await userQQBindCode(form.mobile)
    ElMessage.success('短信发送成功，请注意查收')
    timer.value = setInterval(() => {
      time.value--
      if (time.value === 0) {
        clearInterval(timer.value)
        timer.value = null
        time.value = totalsecond.value
      }
    }, 1000)
  }
}

const submit = () => {
  formRef.value.validate(async valid => {
    if (valid) {
      try {
        await userStore.getUserQQPatchLogin({
          unionId: props.unionId,
          ...form
        })
        ElMessage.success('提交成功')
        router.replace('/')
      } catch (error) {
        ElMessage.error('登录失败，请重试')
      }
    }
  })
}
</script>

<template>
  <div class="form">
    <el-form ref="formRef" :model="form" :rules="rules" label-position="left" label-width="auto">
      <!-- 用户信息 -->
      <el-form-item>
        <div class="form-row user-info">
          <img :src="avatar" alt="" />
          <p>Hi，{{ nickname }} 欢迎来小兔鲜，完成绑定后可以QQ账号一键登录哦~</p>
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
          <el-button class="action-btn" @click="send">{{ time === 60 ? '发送验证码' : `${time}秒后发送` }}</el-button>
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
    width: 100%; //保证整个表单项占满父容器宽度。

    .icon {
      margin-right: 10px;
      font-size: 18px;
      color: #999;
      flex-shrink: 0;
    }

    .el-input {
      flex: 1;  // 让输入框自动填充剩余空间，适应不同布局结构
    }

    .action-btn {
      flex-shrink: 0;  // 防止图标在空间不足时被压缩
      white-space: nowrap; //按钮文字不换行，保持完整显示
      padding: 0 12px;
      height: 32px;
    }
  }

  .user-info {
    display: flex;
    align-items: center; // 让头像和文字垂直居中对齐
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 10px;
    }
    p {
      margin: 0;
      font-size: 14px;
      color: #666;
    }
  }

  .submit-btn {
    width: 100%;
  }
}
</style>
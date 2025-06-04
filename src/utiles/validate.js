import { userAccountCheck } from '@/apis/user.js'
export const createRePasswordRule = (form) => [
  { required: true, message: '请输入确认密码', trigger: 'blur' },
  { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
  { validator: (rule, value, callback) => {
    if (value !== form.password) {
      callback(new Error('两次密码不一致'));
    } else {
      callback();
    }
  }, trigger: 'blur' }
];

// 校验用户是否存在
export const createCheckAccount = (value) => [
  { required: true, message: '请输入账号', trigger: 'blur' },
  { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' },
  { validator: (rule, value, callback) => {
    if (value) {
      userAccountCheck(value).then(res => {
        if (res.result.valid) {
          callback(new Error('账号已存在'));
        } else {
          callback();
        }
      })
    } 
  }, trigger: 'blur' }
]

export const baseRules = {
  account: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
  ],
  agree: [
    { 
      validator: (rule, value, callback) => {
        if (value) {
          callback();
        } else {
          callback(new Error('请先同意协议'));
        }
      },
    }
  ],
  mobile: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[2-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { pattern: /^\d{6}$/, message: '请输入6位数字验证码', trigger: 'blur' }
  ]
};
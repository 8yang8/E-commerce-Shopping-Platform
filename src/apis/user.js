import httpInstance from "@/utiles/http";
// 账号登录接口
export const userAccountLoginAPI = ({account,password}) =>{  
  return httpInstance.post('/login',{account,password})
}

// 猜你喜欢
export const getLikeListAPI = ({ limit = 4 }) =>{
  return httpInstance.get('/goods/relevant',{
    params:{
      limit 
    }
  })
}

// 获取手机验证码
export const userMobileLogincodeAPI = (mobile) =>{
  return httpInstance.get('/login/code',{params:{mobile}})
}

// 手机号登录
export const userMobileLoginAPI = ({mobile,code}) =>{
  return httpInstance.post('/login/code',{mobile,code})
}

/**
 * QQ登录
 * @param {String} unionId - QQ唯一标识，openId
 * @param {String} source - 客户端类型 1 PC
 * @returns
 */
export const userQQLogin = ({ unionId, source = 1 }) => {
  return httpInstance.post('/login/social', { unionId, source });
}

/**
 * 校验用户是否存在
 * @param {String} account - 帐号
 * @returns promise
 */
export const userAccountCheck = (account) => {
  return httpInstance.get('/register/code', { params: { account } });
}

/**
 * 获取QQ绑定的时候短信验证码
 * @param {String} mobile - 手机号
 * @returns promise
 */
export const userQQBindCode = (mobile) => {
  return httpInstance.get('/login/social/code', { params: { mobile } });
}

/**
 * QQ登录-绑定帐号
 * @param {String} unionId - QQ唯一标识，openId
 * @param {String} mobile - 手机号
 * @param {String} code - 验证码
 * @returns
 */
export const userQQBindLogin = ({ unionId, mobile, code }) => {
  return httpInstance.post('/login/social/bind', { unionId, mobile, code });
}

/**
 * 获取QQ完善信息的时候短信验证码
 * @param {String} mobile - 手机号
 * @returns promise
 */
export const userQQPatchCode = (mobile) => {
  return httpInstance.get('/register/code', { params: { mobile } });
}

/**
 * QQ登录-完善信息
 * @param {String} unionId - QQ唯一标识，openId
 * @param {String} mobile - 手机号
 * @param {String} code - 验证码
 * @param {String} account - 帐号
 * @param {String} password - 密码
 * @returns
 */
export const userQQPatchLogin = ({ unionId, mobile, code, account, password }) => {
  return httpInstance.post(`/login/social/${unionId}/complement`, { unionId, mobile, code, account, password });
}


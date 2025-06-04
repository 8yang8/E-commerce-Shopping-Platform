// createRouter：创建router实例对象
// createWebHistory：创建history模式的路由
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  // history模式：http://www.corho.com:8080/login，默认是hash模式：http://www.corho.com:8080/#/login
  // history模式的路由：使用history模式的路由，url中没有#号
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(),
  routes: [
   {path: '/', component: () => import('@/views/Layout/index.vue'), // 布局路由
    // 二级路由
    children: [
      {path: '', component: () => import('@/views/Home/index.vue')}, // 首页路由
      {path: 'category/:id', component: () => import('@/views/Category/index.vue')}, // 一级分类路由
      {path: 'category/sub/:id', component: () => import('@/views/SubCategory/index.vue')}, // 二级分类路由
      {path: 'detail/:id', component: () => import('@/views/Detail/index.vue')}, // 商品详情路由
      {path: 'cartlist', component: () => import('@/views/CartList/index.vue')}, // 购物车列表路由
      {path: 'checkout', component: () => import('@/views/Checkout/index.vue')}, // 支付页面路由
      {path: 'pay', component: () => import('@/views/Pay/index.vue')},  // 支付路由
      {path: 'paycallback', component: () => import('@/views/Pay/PayBack.vue')}, // 支付回调路由  
      {path: '/member', component: () => import('@/views/Member/index.vue'),
        children: [
          {path: 'user', component: () => import('@/views/Member/components/Userinfo.vue'),
            redirect: '',  
          },
          {path: 'order', component: () => import('@/views/Member/components/UserOrder.vue')}
        ]
      } // 个人中心路由
    ]},
    // 登录路由
   {path: '/login', component: () => import('@/views/Login/index.vue')},
   {path: '/login/callback', component: () => import('@/views/Login/callback.vue')}
  ],

  // 路由行为的配置项
  scrollBehavior(){
    return {top: 0}
  }
})



export default router

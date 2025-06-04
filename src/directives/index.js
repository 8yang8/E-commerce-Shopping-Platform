import { useIntersectionObserver } from '@vueuse/core'

// 定义并导出一个名为 lazyPlugin 的插件对象，供在 Vue 应用中通过 app.use() 使用
export const lazyPlugin = {
  // install 方法是插件的核心，用于注册指令
  install (app) {
    // 注册一个名为 img-lazy 的全局自定义指令
    app.directive('img-lazy',{
      mounted(el,binding){
        // el：是绑定的 DOM 元素（即 <img>）
        // binding：是一个对象，其中 binding.value 表示传入的图片 URL
        // binding.arg：指令绑定的参数
        const { stop } = useIntersectionObserver(
          el,
          ([entry]) => {
          //使用 useIntersectionObserver 监听 el 是否进入视口。
          // 返回值中的 stop 可以停止监听。
          // 回调函数参数 [entry] 是观察的目标对象数组的第一个元素。
            if(entry.isIntersecting){
              // 如果 entry.isIntersecting 为 true，表示该图片进入了用户可视区域
              // 将图片的真实地址赋值给 el.src，触发图片加载
              el.src = binding.value
              stop() // 调用 stop() 停止继续监听，避免重复触发
            }
          }
        )
      }
    })
  }
}

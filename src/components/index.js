// 把components中的组件都进行全局化注册
// 通过插件的方式
// 其实component里的组件本身就不需要引用，这个步骤可以省略
import ImgView from '@/components/ImgView/index.vue'
import XtxSku from '@/components/XtxSku/index.vue'
export const componentPlugin = {
  install(app) {
    app.component('ImgView', ImgView),
    app.component('XtxSku', XtxSku)
  }
}

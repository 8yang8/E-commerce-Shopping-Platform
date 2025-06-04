<script setup>
import { useCartStore } from '@/stores/index'
const cartStore = useCartStore()


</script>

<template>
  <div class="cart">
    <a class="curr" href="javascript:;">
      <i class="iconfont icon-cart"></i><em>{{cartStore.cartList.length}}</em>
    </a>
    <div class="layer">
      <div class="list">
        <div class="item" v-for="i in cartStore.cartList" :key="i.id">
          <RouterLink :to="`/detail/${i.id}`">
            <img :src="i.picture" alt="" />
            <div class="center">
              <p class="name ellipsis-2">
                {{ i.name }}
              </p>
              <p class="attr ellipsis">{{ i.attrsText }}</p>
            </div>
            <div class="right">
              <p class="price">&yen;{{ i.price }}</p>
              <p class="count">x{{ i.count }}</p>
            </div>
          </RouterLink>
          <i class="iconfont icon-close-new" @click="cartStore.delCart(i.skuId)"></i>
        </div>
      </div>
      <div class="foot">
        <div class="total">
          <p>共 {{cartStore.cartCount}} 件商品</p>
          <!-- toFixed保留两位小数 -->
          <p>&yen; {{cartStore.cartTotalPrice.toFixed(2)}} </p>
        </div>
        <!--$router 不需要引入 -->
        <el-button size="large" type="primary" @click="$router.push('/cartlist')">去购物车结算</el-button>
      </div>
    </div>
</div>
</template>

<style scoped lang="scss">
.cart {
  width: 50px;
  position: relative;
  z-index: 600;

  .curr {
    height: 32px;
    line-height: 32px;
    text-align: center;
    position: relative;
    display: block;

    .icon-cart {
      font-size: 22px;
    }

    // 这是一个位于购物车图标右上角的小红点，显示当前购物车商品数量，增强视觉提示
    em {
      font-style: normal;
      position: absolute;
      //将徽章定位到购物车图标的右上角
      right: 0;
      top: 0;
      padding: 1px 6px; // 设置内边距，让数字周围有一定空间
      line-height: 1; // 控制行高，避免文本垂直居中问题
      background: $helpColor;
      color: #fff;
      font-size: 12px;
      border-radius: 10px; //圆角效果，使徽章呈圆形或椭圆状
      font-family: Arial;
    }
  }
  // 鼠标悬停在购物车图标上时，显示购物车悬浮面板
  &:hover {
    .layer {
      opacity: 1;
      transform: none;
    }
  }

  .layer {
    opacity: 0;
    transition: all 0.4s 0.2s;
    // 初始状态向上偏移并压缩高度为 0，形成“折叠”效果
    transform: translateY(-200px) scale(1, 0);
    width: 400px;
    height: 400px;
    position: absolute; // 绝对定位，使其相对于 .cart 元素定位
    top: 50px; // 距离顶部 50px，确保悬浮面板位于购物车图标下方
    right: 0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); //添加阴影，提升立体感
    background: #fff;
    border-radius: 4px; // 圆角效果，提升视觉美感
    padding-top: 10px; // 设置内边距，确保内容不紧贴边缘


    // .layer 悬浮层的一个伪元素 ::before 样式定义，用于在购物车悬浮面板的顶部添加一个“小三角”形状的装饰元素，
    //通常用来作为指向购物车图标的“尖角”，增强 UI 的视觉引导性
    &::before {
      content: "";
      position: absolute;
      right: 14px;
      top: -10px;
      width: 20px;
      height: 20px;
      background: #fff;
      transform: scale(0.6, 1) rotate(45deg);
      box-shadow: -3px -3px 5px rgba(0, 0, 0, 0.1);
    }

    .foot {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 70px;
      width: 100%;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      background: #f8f8f8;
      align-items: center;

      .total {
        padding-left: 10px;
        color: #999;

        p {
          &:last-child {
            font-size: 18px;
            color: $priceColor;
          }
        }
      }
    }
  }

  .list {
    height: 310px;
    overflow: auto;
    padding: 0 10px;

    &::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }

    &::-webkit-scrollbar-track {
      background: #f8f8f8;
      border-radius: 2px;
    }

    &::-webkit-scrollbar-thumb {
      background: #eee;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #ccc;
    }

    .item {
      border-bottom: 1px solid #f5f5f5;
      padding: 10px 0;
      position: relative;

      i {
        position: absolute;
        bottom: 38px;
        right: 0;
        opacity: 0;
        color: #666;
        transition: all 0.5s;
      }

      &:hover {
        i {
          opacity: 1;
          cursor: pointer;
        }
      }

      a {
        display: flex;
        align-items: center;

        img {
          height: 80px;
          width: 80px;
        }

        .center {
          padding: 0 10px;
          width: 200px;

          .name {
            font-size: 16px;
          }

          .attr {
            color: #999;
            padding-top: 5px;
          }
        }

        .right {
          width: 100px;
          padding-right: 20px;
          text-align: center;

          .price {
            font-size: 16px;
            color: $priceColor;
          }

          .count {
            color: #999;
            margin-top: 5px;
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>
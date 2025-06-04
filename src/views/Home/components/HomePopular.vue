<script setup>
import HomePanel from './HomePanel.vue'
import { getPopularAPI } from '@/apis/home'
import {onMounted, ref} from 'vue'
const pularList = ref([])
const getopularList = async () => {
  const {result} = await getPopularAPI()
  pularList.value = result
}
onMounted(() => {
  getopularList()
})
</script>

<template>
  <HomePanel title="热门品牌" subTitle="国际经典 品质保障">
    <!-- 下面是插槽主体内容模版 -->
    <ul class="goods-list">
      <li v-for="item in pularList.slice(0,4)" :key="item.id">
        <RouterLink to="/">
          <img v-img-lazy="item.picture" alt="" />
          <p class="name">{{ item.name }}</p>
        </RouterLink>
      </li>
    </ul>
  </HomePanel>

 
</template>


<style scoped lang='scss'>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;

  li {
    width: 306px;
    height: 406px;

    background: #f0f9f4;
    transition: all .5s;

    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .price {
      color: $priceColor;
    }
  }
}
</style>
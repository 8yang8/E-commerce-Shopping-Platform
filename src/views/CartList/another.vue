<script setup>
// element-plus中的el-table编写index里面的购物车组件,来替代原本的原生JS的table
import { useCartStore } from '@/stores/index'
import { ElMessageBox } from 'element-plus'

const cartStore = useCartStore()

// 单选商品
const singleCheck = (item, selected) => {
  cartStore.singleCheck(item.skuId, selected)
}

// 删除商品
const delCart = (item) => {
  ElMessageBox.confirm('确认删除该商品吗?', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    cartStore.delCart(item.skuId)
  })
}

// 全选功能
const toggleAll = (selected) => {
  cartStore.cartList.forEach((item) => {
    item.selected = selected
  })
}
</script>

<template>
  <div class="xtx-cart-page">
    <div class="container m-top-20">
      <div class="cart">
        <!-- 使用 el-table 替代原生 table -->
        <el-table :data="cartStore.cartList" border style="width: 100%">
          <!-- 全选 -->
          <el-table-column width="120" align="center">
            <template #header>
              <el-checkbox
                :model-value="cartStore.cartList.every((i) => i.selected)"
                :indeterminate="cartStore.cartList.some((i) => i.selected) && !cartStore.cartList.every((i) => i.selected)"
                @change="(selected) => toggleAll(selected)"
              />
            </template>
            <template #default="{ row }">
              <el-checkbox v-model="row.selected" @change="(selected) => singleCheck(row, selected)" />
            </template>
          </el-table-column>

          <!-- 商品信息 -->
          <el-table-column label="商品信息" width="400">
            <template #default="{ row }">
              <div class="goods">
                <RouterLink :to="`/detail/${i.id}`">
                  <img :src="row.picture" alt="" />
                </RouterLink>
                <div>
                  <p class="name ellipsis">{{ row.name }}</p>
                </div>
              </div>
            </template>
          </el-table-column>

          <!-- 单价 -->
          <el-table-column label="单价" width="220" align="center">
            <template #default="{ row }">
              <p>&yen;{{ row.price }}</p>
            </template>
          </el-table-column>

          <!-- 数量 -->
          <el-table-column label="数量" width="180" align="center">
            <template #default="{ row }">
              <el-input-number v-model="row.count" :min="1" />
            </template>
          </el-table-column>

          <!-- 小计 -->
          <el-table-column label="小计" width="180" align="center">
            <template #default="{ row }">
              <p class="f16 red">&yen;{{ (row.price * row.count).toFixed(2) }}</p>
            </template>
          </el-table-column>

          <!-- 操作 -->
          <el-table-column label="操作" width="140" align="center">
            <template #default="{ row }">
              <el-button type="text" @click="() => delCart(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 操作栏 -->
        <div class="action">
          <div class="batch">
            共 {{ cartStore.cartCount }} 件商品，已选择{{cartStore.selectedCount}}件商品，商品合计：
            <span class="red">¥ {{cartStore.selectedPrice.toFixed(2)}} </span>
          </div>
          <div class="total">
            <el-button size="large" type="primary">下单结算</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.xtx-cart-page {
  margin-top: 20px;

  .cart {
    background: #fff;
    color: #666;

    .goods {
      display: flex;
      align-items: center;

      img {
        width: 100px;
        height: 100px;
      }

      > div {
        width: 280px;
        font-size: 16px;
        padding-left: 10px;

        .name {
          font-size: 14px;
          color: #333;
        }
      }
    }
  }

  .action {
    display: flex;
    background: #fff;
    margin-top: 20px;
    height: 80px;
    align-items: center;
    font-size: 16px;
    justify-content: space-between;
    padding: 0 30px;

    .red {
      font-size: 18px;
      margin-right: 20px;
      font-weight: bold;
    }
  }
}
</style>
<template>
  <el-card>
    <el-button type="primary" icon="Plus">添加品牌</el-button>
    <el-table style="margin: 10px 0;" border :data="trademarkArr">
      <el-table-column label="序号" width="80px" align="center" type="index"/>
      <!-- 默认div 可以插槽 -->
      <el-table-column label="品牌名称" prop="tmName" >
        <template #default="{row}">
          <pre style="color:brown">{{ row.tmName }}</pre>
        </template>
      </el-table-column>
      <el-table-column label="品牌LOGO" >
        <template #default="{row}">
          <img :src="row.logoUrl" style="width: 100px; height: 100px; border-radius: 10px" alt="图片无法显示" />
        </template>
      </el-table-column>
      <el-table-column label="品牌操作" >
        <template #default>
          <el-button type="primary" size="small" icon="Edit"></el-button>
          <el-button type="primary" size="small" icon="Delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <!-- 分页器 -->
   <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]" :background="true" layout="prev, pager, next, jumper, -> , sizes, total" :total="total"/>
</template>

<script setup lang="ts" name="Trademark">
import { ref, onMounted } from 'vue'
import { reqHasTrademark } from '@/api/product/trademark'
import type { Records, TradeMarkResponseData } from '@/api/product/trademark/type'

// 当前页码
const pageNo = ref<number>(1)
// 每页条数
const limit = ref<number>(3)
// 存储总数
const total = ref<number>(0)
// 存储已有品牌数组
const trademarkArr = ref<Records>([])


// 获取商标列表
const getHasTrademark = async () => {
  console.log('获取商标列表');
  const res: TradeMarkResponseData = await reqHasTrademark(pageNo.value, limit.value)
  console.log('res: ',res);
  console.log('res.data: ', res.data);
  if(res.code === 200) {
    total.value = res.data.total
    trademarkArr.value = res.data.records
  }
}

onMounted(() => {
  getHasTrademark()
})

</script>

<style scoped>

</style>

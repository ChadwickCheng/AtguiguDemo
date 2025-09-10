<template>
  <div>
    <el-card>
      <el-button type="primary" icon="Plus" @click="addTradeMark">添加品牌</el-button>
      <el-table style="margin: 10px 0" border :data="trademarkArr">
        <el-table-column label="序号" width="80px" align="center" type="index" />
        <!-- 默认div 可以插槽 -->
        <el-table-column label="品牌名称" prop="tmName">
          <template #default="{ row }">
            <pre style="color: brown">{{ row.tmName }}</pre>
          </template>
        </el-table-column>
        <el-table-column label="品牌LOGO">
          <template #default="{ row }">
            <img
              :src="row.logoUrl"
              style="width: 100px; height: 100px; border-radius: 10px"
              alt="图片无法显示"
            />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作">
          <template #default="{ row, $index }">
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="updateTrademark(row)"
            ></el-button>
            <el-button type="primary" size="small" icon="Delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分页器 -->
    <el-pagination
      @size-change="sizeChange"
      @current-change="changePageNo"
      :pager-count="9"
      v-model:current-page="pageNo"
      v-model:page-size="limit"
      :page-sizes="[3, 5, 7, 9]"
      :background="true"
      layout="prev, pager, next, jumper, -> , sizes, total"
      :total="total"
    />
    <!-- 对话框 添加和修改使用 -->
    <el-dialog v-model="dialogFormVisible" :title="trademarkParams.id ? '修改品牌' : '添加品牌'">
      <el-form style="width: 80%" :model="trademarkParams" :rules="rules" ref="formRef">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input placeholder="请输入品牌名称" v-model="trademarkParams.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <!-- footer插槽 -->
      <template #footer>
        <el-button type="primary" @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="Trademark">
import { ref, reactive, onMounted, nextTick } from 'vue'
import { reqHasTrademark, reqAddOrUpdateTrademark } from '@/api/product/trademark'
import type { Records, TradeMarkResponseData, TradeMark } from '@/api/product/trademark/type'
import type { UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'

// 当前页码
const pageNo = ref<number>(1)
// 每页条数
const limit = ref<number>(3)
// 存储总数
const total = ref<number>(0)
// 存储已有品牌数组
const trademarkArr = ref<Records>([])
// 对话框是否显示
const dialogFormVisible = ref<boolean>(false)
// 收集品牌数据
const trademarkParams = reactive<TradeMark>({
  tmName: '',
  logoUrl: '',
  id: undefined,
})
// 获取form实例
const formRef = ref(null)

// 获取商标列表
const getHasTrademark = async () => {
  // console.log('获取商标列表')
  const res: TradeMarkResponseData = await reqHasTrademark(pageNo.value, limit.value)
  // console.log('res: ', res)
  // console.log('res.data: ', res.data)
  if (res.code === 200) {
    total.value = res.data.total
    trademarkArr.value = res.data.records
  }
}

// 分页器页码变化触发
const changePageNo = (page: number) => {
  // console.log('当前页码: ', page)
  pageNo.value = page // 由于双向数据绑定 不写也行
  getHasTrademark()
}

// 下拉菜单发生变化时触发
const sizeChange = (size: number) => {
  // console.log('每页条数: ', size)
  limit.value = size
  pageNo.value = 1 // 每次改变每页条数时，重置页码为1;另一种思路是默认参数
  getHasTrademark()
}

// 添加品牌
const addTradeMark = () => {
  dialogFormVisible.value = true
  // 每次添加品牌前先清空一次
  trademarkParams.id = undefined
  trademarkParams.tmName = ''
  trademarkParams.logoUrl = ''
  // 每次添加前清除表单校验结果 但是第一次点击还没form 使用可选链或nextTick
  // formRef.value?.clearValidate(['tmName', 'logoUrl'])
  nextTick(() => {
    formRef.value?.clearValidate(['tmName', 'logoUrl'])
  })
}

// 修改品牌
const updateTrademark = (row: TradeMark) => {
  nextTick(() => {
    formRef.value?.clearValidate(['tmName', 'logoUrl'])
  })
  dialogFormVisible.value = true
  Object.assign(trademarkParams, row)
}

// 取消按钮
const cancel = () => {
  dialogFormVisible.value = false
}

// 确定按钮
// 逻辑正确 由于mock接口并非实际后端所以数据都在内存无法通过getHasTrademark()展示
const confirm = async () => {
  // 发请求前触发表单验证
  await formRef.value.validate()
  const res: any = await reqAddOrUpdateTrademark(trademarkParams)
  if (res.code === 200) {
    dialogFormVisible.value = false
    ElMessage.success(trademarkParams.id ? '修改成功' : '添加成功')
    getHasTrademark()
  } else {
    ElMessage.error(trademarkParams.id ? '修改失败' : '添加失败')
    dialogFormVisible.value = false
  }
}

// 上传图片前的钩子
const beforeAvatarUpload: UploadProps['beforeUpload'] = (file) => {
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isJPG) {
    ElMessage.error('上传图片只能是 JPG/PNG 格式!')
  }
  if (!isLt2M) {
    ElMessage.error('上传图片大小不能超过 2MB!')
  }
  return isJPG && isLt2M
}

// 上传图片成功
const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
  trademarkParams.logoUrl = response.data.url
  // 图片上传成功清除图片校验结果
  formRef.value.clearValidate('logoUrl')
}

// 自定义校验
const validatorTmName = (rule: any, value: string, callback: any) => {
  if (value.trim().length >= 2) {
    callback()
  } else {
    callback(new Error('品牌名称至少2个字符'))
  }
}

const validatorLogoUrl = (rule: any, value: string, callback: any) => {
  // 图片上传 value是地址 通过
  if (value) {
    callback()
  } else {
    callback(new Error('请上传品牌LOGO图片'))
  }
}

// 表单校验
const rules = {
  tmName: [
    {
      required: true, // 字段必须校验，表单项前出现红色五角星
      trigger: 'blur', // 失去焦点时触发
      validator: validatorTmName, // 根据trigger触发
    },
  ],
  logoUrl: [
    {
      required: true,
      validator: validatorLogoUrl,
    },
  ],
}

onMounted(() => {
  getHasTrademark()
})
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

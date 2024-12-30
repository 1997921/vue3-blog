<template>
  <div class="monitor-page">
    <!-- 顶部导航标签 -->
    <div class="nav-tabs">
      <div
    v-for="(tab, index) in tabs"
    :key="index"
    :class="['tab-item', { active: activeTab === index }]"
    @click="handleTabClick(index)"
  >
    {{ tab }}
  </div>
    </div>

    <!-- 搜索过滤区 -->
    <div class="search-bar">
      <div class="left-actions">
        <el-button type="primary" icon="Plus" @click="handleAddMonitor">添加监测方案</el-button>
        <el-checkbox>显示全部群聊消息</el-checkbox>
        <el-checkbox v-model="hideRepeated">去重减噪</el-checkbox>
      </div>
      <div class="right-search">
        <el-input
          placeholder="请输入内容进行搜索"
          v-model="searchText"
          :suffix-icon="Search"
        >
        </el-input>
        <el-button type="primary" @click="exportTableData">

          <el-icon><Download /></el-icon>
          导出数据
        </el-button>
      </div>
    </div>

    <!-- 列表内容 -->
    <div class="list-content">

      <!-- 左侧菜单 -->
      <div class="left-menu">
        <div
          v-for="item in menuItems"
          :key="item.id"
          :class="['menu-item', { active: activeMenuItem === item.id }]"
          @click="handleMenuClick(item.id)"
        >
          <i :class="item.icon"></i>
          {{ item.name }}
        </div>
      </div>

      <!-- 右侧列表 -->
      <div class="right-list">
        <el-table :data="filteredTableData" border style="width: 100%">
          <el-table-column prop="time" label="发言时间" width="150" align="center" />
          <el-table-column
            prop="content"
            label="消息内容"
            width="800"
          >
            <template #default="{ row }">
              <el-tooltip
                :content="row.content"
                placement="top"
                :show-after="100"
                effect="light"
                max-width="400"
              >
                <div class="message-content">{{ row.content }}</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="sender" label="发言人昵称" width="120" align="center" />
          <el-table-column prop="groupName" label="群名称" width="180" align="center" />
          <el-table-column prop="contentType" label="内容监测名称" width="120" align="center" />
          <el-table-column prop="unit" label="管理单位" width="120" align="center" />
          <el-table-column label="操作" width="80" fixed="right" align="center">
            <template #default>
              <el-button link type="primary">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!-- 在 template 中添加 dialog -->
    <el-dialog
      v-model="dialogVisible"
      title="添加监测配置"
      width="640px"
      :close-on-click-modal="false"
      class="monitor-dialog"
      align-center
    >
      <el-form
        :model="monitorForm"
        label-position="top"
        label-width="auto"
      >
        <el-form-item  required>
          <template #label>
            方案名称
            <el-tooltip
              content="请输入易于识别的方案名称，最多30个字符"
              placement="top"
              effect="light"
            >
              <el-icon class="question-icon"><QuestionFilled /></el-icon>
            </el-tooltip>
          </template>
          <el-input v-model="monitorForm.name" placeholder="请输入方案名称" maxlength="30" show-word-limit />
        </el-form-item>

        <el-form-item label="关键词" required>
          <el-input
            v-model="monitorForm.keywords"
            type="textarea"
            rows="4"
            placeholder="请输入事件关键词，不同的关键词之间请使用'或'、&（与）进行隔开，优先配配'()'括弧里的词语。"
            maxlength="500"
            show-word-limit
          />
          <div class="keyword-hint">
            关键词之间请使用 | & ( ) 隔开
          </div>
        </el-form-item>

        <el-form-item label="排除关键词" >
          <el-input
            v-model="monitorForm.excludeKeywords"
            type="textarea"
            rows="4"
            placeholder="请输入排除关键词，不同的关键词之间请使用'或'、&（与）进行隔开，优先配配'()'括弧里的词语。"
            maxlength="500"
            show-word-limit
          />
          <div class="keyword-hint">
            关键词之间请使用 | & ( ) 隔开
          </div>
        </el-form-item>

        <el-form-item label="其他设置">
          <div class="settings-group">
            <div class="checkbox-item">
              <el-checkbox v-model="monitorForm.monitorDownstream">监测方案对下级共享</el-checkbox>
            </div>
            <div class="checkbox-item">
              <el-checkbox v-model="monitorForm.autoNotify">敏感消息自动发送至指定人员企业微信</el-checkbox>
            </div>
            <div class="checkbox-item">
              <el-checkbox v-model="monitorForm.autoLabel">自动识别有害群、人</el-checkbox>
            </div>
          </div>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.monitor-page {
  padding: 20px;
  background: #f5f7fa;
  min-height: 100vh;
}

.nav-tabs {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #e4e7ed;
  padding-bottom: 10px;
}

.tab-item {
  padding: 8px 16px;
  cursor: pointer;
}

.tab-item.active {
  color: #409eff;
  border-bottom: 2px solid #409eff;
}

.search-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.left-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.right-search {
  display: flex;
  gap: 10px;
}

.list-content {
  display: flex;
  gap: 20px;
  background: white;
  padding: 20px;
  border-radius: 4px;
  height: calc(100vh - 200px);
}

.left-menu {
  width: 200px;
  border-right: 1px solid #e4e7ed;
}

.menu-item {
  padding: 12px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

.menu-item.active {
  background: #ecf5ff;
  color: #409eff;
}

.right-list {
  flex: 1;
  overflow: auto;
}

/* 表格样式优化 */
:deep(.el-table) {
  --el-table-border-color: #e4e7ed;
  --el-table-header-bg-color: #f5f7fa;
  --el-table-row-hover-bg-color: #f5f7fa;
}

:deep(.el-table th) {
  background-color: #f5f7fa;
  color: #606266;
  font-weight: 500;
}

.message-content {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.5;
  cursor: pointer;
}

:deep(.el-tooltip__popper) {
  max-width: 400px;
  line-height: 1.5;
  padding: 8px 12px;
}
:deep(.el-table) {
  --el-table-border-color: transparent;  /* 移除表格边框 */
  --el-table-header-bg-color: #f5f7fa;
  --el-table-row-hover-bg-color: #f5f7fa;
  --el-table-border: none;  /* 移除外边框 */
}

:deep(.el-table td),
:deep(.el-table th.is-leaf) {
  border: none;  /* 移除单元格边框 */
}

:deep(.el-table--enable-row-hover .el-table__body tr:hover > td) {
  background-color: #f5f7fa;
}
monitor-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: #f5f7fa;
}

.nav-tabs {
  margin-bottom: 20px;
}

.search-bar {
  margin-bottom: 20px;
}

.table-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.keyword-hint {
  font-size: 12px;
  color: #909399;
  margin-top: 4px;
}

:deep(.el-dialog__body) {
  padding: 20px 40px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.monitor-dialog {
  :deep(.el-form-item) {
    margin-bottom: 24px;
  }

  :deep(.el-form-item__label) {
    font-weight: normal;
    color: #606266;
    padding-bottom: 8px;  /* 增加label和输入框的间距 */
    line-height: 1.4;
  }

  :deep(.el-form--label-top .el-form-item__label) {
    margin-bottom: 0;  /* 移除默认的下边距 */
  }

  .settings-group {
    display: flex;
    flex-direction: column;
    gap: 0;  /* 移除垂直间距 */
  }

  .checkbox-item {
    padding: 8px 0;  /* 增加每个选项的上下内边距 */
    border-bottom: 1px solid #EBEEF5;  /* 添加底部分隔线 */

    &:last-child {
      border-bottom: none;  /* 最后一项移除底部分隔线 */
    }

    :deep(.el-checkbox) {
      height: 20px;  /* 调整复选框高度 */
      margin-right: 0;
      width: 100%;  /* 让复选框占满整行 */

      .el-checkbox__label {
        color: #606266;
      }
    }
  }

  :deep(.el-dialog) {
    margin: 0 auto;  /* 水平居中 */
    position: absolute;
    top: 50%;        /* 垂直居中 */
    left: 50%;
    transform: translate(-50%, -50%);
    max-height: 90vh;  /* 设置最大高度 */
    overflow-y: auto;  /* 内容过多时显示滚动条 */
  }

  /* 优化滚动条样式 */
  :deep(.el-dialog)::-webkit-scrollbar {
    width: 6px;
  }

  :deep(.el-dialog)::-webkit-scrollbar-thumb {
    background: #dcdfe6;
    border-radius: 3px;
  }

  :deep(.el-dialog)::-webkit-scrollbar-track {
    background: transparent;
  }
}

.question-icon {
  margin-left: 4px;
  font-size: 14px;
  color: #909399;
  cursor: help;
}
</style>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Search, Download, QuestionFilled } from '@element-plus/icons-vue'

const searchText = ref('')
const hideRepeated = ref(true)
const tabs = ['自定义舆情', '关注群动态', '关注人动态']
const activeTab = ref(0)

const handleTabClick = (index: number) => {
  activeTab.value = index
  // TODO: Add logic to switch content based on selected tab
}

const tableData = ref([
  {
    time: '2024-11-08 11:11',
    content: '通知：11点15分区消防联动测试，会有持续...',
    sender: 'Rui鑫',
    groupName: '宏悦未来小区大家庭',
    contentType: '关注事件',
    unit: '红旗楼'
  },
  {
    time: '2024-11-08 11:09',
    content: '警示：电梯维修通知',
    sender: '王军',
    groupName: '工业路东田社区居民群',
    contentType: '关注事件',
    unit: '工业路'
  },
  {
    time: '2024-11-08 11:01',
    content: '税费出来的时候电梯上缴和和一堆箱子。。。',
    sender: '星星',
    groupName: '维多利亚区7号楼民...',
    contentType: '关注事件',
    unit: '五一路'
  }
])

// Add computed property for filtered table data
const filteredTableData = computed(() => {
  if (!searchText.value) return tableData.value

  const searchLower = searchText.value.toLowerCase()
  return tableData.value.filter(row => {
    return Object.values(row).some(value =>
      String(value).toLowerCase().includes(searchLower)
    )
  })
})

// Add export function
const exportTableData = () => {
  // Define headers based on actual table columns
  const headers = ['发言时间', '消息内容', '发言人昵称', '群名称', '内容监测名称', '管理单位']
  const csvContent = [
    headers.join(','),
    ...filteredTableData.value.map(row => [
      row.time,
      `"${row.content}"`, // Wrap content in quotes to handle commas
      row.sender,
      row.groupName,
      row.contentType,
      row.unit
    ].join(','))
  ].join('\n')

  // Create and trigger download
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' }) // Add BOM for Chinese character support
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)

  link.setAttribute('href', url)
  link.setAttribute('download', `table-data-${new Date().toISOString().split('T')[0]}.csv`)
  link.style.visibility = 'hidden'

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url) // Clean up the URL object
}

// 添加新的响应式变量
const dialogVisible = ref(false)
const monitorForm = ref({
  name: '',
  keywords: '',
  excludeKeywords: '',
  monitorDownstream: false,
  autoNotify: false,
  autoLabel: false
})

// 添加按钮点击处理函数
const handleAddMonitor = () => {
  // 重置表单
  monitorForm.value = {
    name: '',
    keywords: '',
    excludeKeywords: '',
    monitorDownstream: false,
    autoNotify: false,
    autoLabel: false
  }
  // 打开弹框
  dialogVisible.value = true
}

// 表单提交处理函数
const handleSubmit = () => {
  // TODO: 处理表单提交逻辑
  dialogVisible.value = false
}

// Add menu state and data
const activeMenuItem = ref('focus') // Default active menu
const menuItems = [
  { id: 'focus', name: '关注事件', icon: 'el-icon-star-on' },
  { id: 'security', name: '涉安', icon: 'el-icon-warning' },
  { id: 'property', name: '房产', icon: 'el-icon-house' },
]

// Add menu click handler
const handleMenuClick = (menuId: string) => {
  activeMenuItem.value = menuId
  // TODO: Add logic to filter table data based on selected menu
}
</script>


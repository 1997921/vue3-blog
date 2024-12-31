<template>
  <div class="data-screen">
    <!-- 顶部标题栏 -->
    <header class="header">
      <div class="header-left">
        <el-button-group>
          <el-button type="primary" size="small">近一周</el-button>
          <el-button type="primary" size="small">近一月</el-button>
          <el-button type="primary" size="small">近一年</el-button>
          <el-button type="primary" size="small">开始日期</el-button>
          <el-button type="primary" size="small">结束日期</el-button>
        </el-button-group>
      </div>
      <div class="header-center">社情感知中心</div>
      <div class="header-right">
        <span class="time">2024年12月10日 09:58:00</span>
        <el-button type="primary" size="small">退出</el-button>
      </div>
    </header>

    <!-- 主要内容区 -->
    <div class="main-content">
      <!-- 左侧数据统计 -->
      <div class="left-panel">
        <div class="panel-title">数据统计</div>
        <div class="data-cards">
          <div class="data-card">
            <div class="card-icon blue">
              <i class="el-icon-user"></i>
            </div>
            <div class="card-info">
              <div class="card-value">5058</div>
              <div class="card-label">群管总数</div>
            </div>
          </div>
          <div class="data-card">
            <div class="card-icon purple">
              <i class="el-icon-chat-dot-round"></i>
            </div>
            <div class="card-info">
              <div class="card-value">9115058</div>
              <div class="card-label">管理网民数</div>
            </div>
          </div>
          <div class="data-card">
            <div class="card-icon red">
              <i class="el-icon-pie-chart"></i>
            </div>
            <div class="card-info">
              <div class="card-value">20%</div>
              <div class="card-label">人口覆盖率</div>
            </div>
          </div>
          <div class="data-card">
            <div class="card-icon cyan">
              <i class="el-icon-message"></i>
            </div>
            <div class="card-info">
              <div class="card-value">11500</div>
              <div class="card-label">政民互动办理发布</div>
            </div>
          </div>
        </div>

        <!-- 单位表格 -->
        <div class="unit-table">
          <div class="table-header">
            <span>单位</span>
            <div class="header-buttons">
              <el-button type="text" size="small">单位</el-button>
              <el-button type="text" size="small">群类别</el-button>
              <el-button type="text" size="small">群对象</el-button>
            </div>
          </div>
          <el-table :data="unitData" style="width: 100%">
            <el-table-column prop="name" label="单位" />
            <el-table-column prop="count" label="管理网民数" />
            <el-table-column prop="rate" label="覆盖率">
              <!-- <template #default="scope">
                <div class="rate-bar">
                  <div class="rate-progress" :style="{ width: scope.row.rate }"></div>
                  <span>{{ scope.row.rate }}</span>
                </div>
              </template> -->
            </el-table-column>
          </el-table>
        </div>

        <!-- 热词模块 -->
        <div class="hot-words">
          <div class="panel-title">热词</div>

          <div class="word-cloud">
            <div v-for="word in hotWords"
                 :key="word.id"
                 class="word-item"
                 :class="word.highlight ">
              <span class="word-value">{{ word.value }}</span>
              <span class="word-label">{{ word.label }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 中间地图区域 -->
      <div class="center-map">
        <div id="map"></div>
        <!-- 地图上的信息卡片 -->
        <div class="map-card">
          <div class="card-title">张家窝派出所</div>
          <div class="card-content">
            <div class="card-item">
              <span>群管总数</span>
              <span class="value">388</span>
            </div>
            <div class="card-item">
              <span>管理网民数</span>
              <span class="value">911508</span>
            </div>
            <div class="card-item">
              <span>人口覆盖率</span>
              <span class="value">30%</span>
            </div>
            <div class="card-item">
              <span>政民互动办理发布</span>
              <span class="value">11500</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧面板 -->
      <div class="right-panel">
        <!-- 问答统计 -->
        <div class="qa-stats">
          <div class="panel-title">问答统计</div>
          <div id="qaChart"></div>
          <div class="qa-legend">
            <div class="legend-item">
              <span class="dot red"></span>
              <span>追问问题数 32</span>
            </div>
            <div class="legend-item">
              <span class="dot blue"></span>
              <span>问题解决数 21</span>
            </div>
            <!-- 其他图例项... -->
          </div>
        </div>

        <!-- 信息发布 -->
        <div class="info-publish">
          <div class="panel-title">信息发布</div>
          <div id="publishChart"></div>
        </div>

        <!-- 自定义舆情 -->
        <div class="custom-opinion">
          <div class="panel-title">自定义舆情</div>
          <div class="opinion-data">
            <div class="data-item">
              <div class="value">4875</div>
              <div class="label">总关注人数</div>
            </div>
            <div class="data-item">
              <div class="value">9115058</div>
              <div class="label">7日每定义舆情消息</div>
            </div>
            <div class="data-item">
              <div class="value">20%</div>
              <div class="label">总关注群数</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import * as echarts from 'echarts'

// 单位数据
const unitData = ref([
  { name: '五星派出所', count: 51, rate: '100%' },
  { name: '温泉派出所', count: 65, rate: '98.88%' },
  { name: '武清派出所', count: 124, rate: '97.77%' },
  { name: '程林派出所', count: 38, rate: '96.66%' },
  { name: '大孟派出所', count: 38, rate: '96.66%' },
  { name: '大碱派出所', count: 38, rate: '96.66%' }
])

// 热词数据
const hotWords = ref([
  { id: 1, value: 982, label: '群众关系', highlight: "highlight", size: 95 },
  { id: 2, value: 962, label: '治安维护', highlight: "light1", size: 90 },
  { id: 3, value: 923, label: '电信诈骗', highlight: "light2", size: 85 },
  { id: 4, value: 882, label: '食品安全', highlight: "light1", size: 80 },
  { id: 5, value: 862, label: '垃圾清理', highlight: "light2", size: 75 },
  { id: 6, value: 842, label: '火灾隐患', highlight: "light3", size: 70 },
  { id: 7, value: 822, label: '电力安全', highlight: "light1", size: 65 }
])

// Add this interface before calculateBubblePositions
interface Position {
  x: number;
  y: number;
}

onMounted(() => {
  initCharts()
  positionBubbles()
})

const initCharts = () => {
  // 初始化问答统计图表
  const qaChart = echarts.init(document.getElementById('qaChart'))
  qaChart.setOption({
    tooltip: {
      trigger: 'item'
    },
    legend: {
      show: false
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false
        },
        data: [
          { value: 198, name: '追问问题数', itemStyle: { color: '#F56C6C' } },
          { value: 121, name: '问题解决数', itemStyle: { color: '#409EFF' } },
          { value: 130, name: '办结问题数', itemStyle: { color: '#67C23A' } },
          { value: 100, name: '无需回复数', itemStyle: { color: '#E6A23C' } },
          { value: 8, name: '未及时回复', itemStyle: { color: '#909399' } }
        ]
      }
    ]
  })

  // 监听窗口大小变化
  window.addEventListener('resize', () => {
    qaChart.resize()
  })

  // 初始化信息发布图表
  const publishChart = echarts.init(document.getElementById('publishChart'))
  publishChart.setOption({
    // 配置信息发布柱状图
  })
}

const positionBubbles = () => {
  const container = document.querySelector('.word-cloud')
  if (!container) return

  const containerWidth = container.clientWidth
  const containerHeight = container.clientHeight
  const bubbles = hotWords.value
  const borderPadding = 10  // 与边框的距离

  nextTick(() => {
    const positions = calculateBubblePositions(bubbles, containerWidth, containerHeight)

    bubbles.forEach((bubble, index) => {
      const element = document.querySelector(`.word-item:nth-child(${index + 1})`) as HTMLElement
      if (element) {
        const size = Math.max(60, Math.min(100, bubble.value / 10))
        element.style.width = `${size}px`
        element.style.height = `${size}px`

        // 确保圆圈与边界保持 10px 距离
        const radius = size / 2
        const left = Math.max(radius + borderPadding,
                            Math.min(containerWidth - radius - borderPadding, positions[index].x))
        const top = Math.max(radius + borderPadding,
                           Math.min(containerHeight - radius - borderPadding, positions[index].y))

        // 设置位置（减去半径以使用中心点定位）
        element.style.left = `${left - radius}px`
        element.style.top = `${top - radius}px`
      }
    })
  })
}

const calculateBubblePositions = (bubbles, width, height) => {
  const positions: Position[] = []
  const minSpacing = 5   // 气泡之间的最小间距
  const borderPadding = 10  // 与边框的距离

  const sortedBubbles = [...bubbles].sort((a, b) => (b.size || 80) - (a.size || 80))

  sortedBubbles.forEach((bubble) => {
    let x, y
    let overlapping
    let attempts = 0
    const maxAttempts = 1000
    const bubbleSize = Math.max(60, Math.min(100, bubble.value / 10))
    const bubbleRadius = bubbleSize / 2

    do {
      overlapping = false
      attempts++

      // 生成随机位置（考虑边框padding）
      x = bubbleRadius + borderPadding +
          Math.random() * (width - 2 * (bubbleRadius + borderPadding))
      y = bubbleRadius + borderPadding +
          Math.random() * (height - 2 * (bubbleRadius + borderPadding))

      // 检查与所有现有气泡的距离
      for (let j = 0; j < positions.length; j++) {
        const dx = x - positions[j].x
        const dy = y - positions[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        const currentBubbleRadius = bubbleRadius
        const existingBubbleRadius = (Math.max(60, Math.min(100, sortedBubbles[j].value / 10))) / 2
        const minDistance = currentBubbleRadius + existingBubbleRadius + minSpacing

        if (distance < minDistance) {
          overlapping = true
          break
        }
      }

      // 检查是否满足边框距离要求
      const isTooCloseToEdge =
        x - bubbleRadius < borderPadding ||
        x + bubbleRadius > width - borderPadding ||
        y - bubbleRadius < borderPadding ||
        y + bubbleRadius > height - borderPadding

      if (isTooCloseToEdge) {
        overlapping = true
      }

      if (attempts >= maxAttempts) {
        console.log(`Could not find ideal position for bubble ${bubble.label}`)
        break
      }
    } while (overlapping)

    positions.push({ x, y })
  })

  return positions
}

// Add window resize handler
window.addEventListener('resize', () => {
  positionBubbles()
})
</script>

<style scoped>
.data-screen {
  width: 100vw;
  height: 100vh;
  background: #001529;
  color: #fff;
  overflow: hidden;
}

.header {
  height: 60px;
  background: linear-gradient(90deg, #0f2f4d, #1a4980);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.header-center {
  font-size: 24px;
  font-weight: bold;
  background: linear-gradient(180deg, #fff, #7cd7ff);
  -webkit-background-clip: text;
  color: transparent;
}

.main-content {
  display: grid;
  grid-template-columns: 450px 1fr 400px;
  gap: 10px;
  padding: 10px;
  height: calc(100vh - 60px);
}

.left-panel,
.right-panel {
  background: rgba(0, 21, 41, 0.8);
  border: 1px solid rgba(0, 255, 255, 0.1);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.1);
  border-radius: 4px;
  padding: 15px;
}

.panel-title {
  font-size: 18px;
  color: #7cd7ff;
  margin-bottom: 15px;
  border-bottom: 1px solid rgba(124, 215, 255, 0.3);
  padding-bottom: 10px;
}

.data-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 20px;
}

.data-card {
  background: rgba(0, 21, 41, 0.8);
  border: 1px solid rgba(0, 255, 255, 0.1);
  border-radius: 4px;
  padding: 15px;
  display: flex;
  align-items: center;
  transition: all 0.3s;
}

.data-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.2);
}

.card-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
}

.blue { background: #1890ff; }
.purple { background: #722ed1; }
.red { background: #f5222d; }
.cyan { background: #13c2c2; }

.card-value {
  font-size: 24px;
  font-weight: bold;
  color: #00ffff;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
}

.card-label {
  font-size: 14px;
  color: #7cd7ff;
}

/* 地图区域样式 */
.center-map {
  position: relative;
  height: 100%;
  background: rgba(0, 21, 41, 0.5);
  border: 1px solid rgba(0, 255, 255, 0.1);
  border-radius: 4px;
}

#map {
  width: 100%;
  height: 100%;
  background: rgba(6, 30, 93, 0.3);
}

.map-card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 21, 41, 0.9);
  border: 1px solid rgba(0, 255, 255, 0.3);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.2);
  border-radius: 4px;
  padding: 15px;
  min-width: 300px;
}

.word-cloud {
  position: relative;
  height: 400px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: rgba(0, 21, 41, 0.5);
  border-radius: 4px;
  padding: 10px;
}

.word-item {
  position: absolute;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(24, 144, 255, 0.3);
  background-image: radial-gradient(circle at center,
    rgba(24, 144, 255, 0.2) 0%,
    rgba(6, 30, 93, 0.8) 100%
  );
  box-shadow: inset 0 0 20px rgba(24, 144, 255, 0.3),
             0 0 10px rgba(24, 144, 255, 0.3);
  background: rgba(0, 150, 255, 0.1);
  border: 1px solid rgba(0, 255, 255, 0.3);
  color: #00ffff;
}

.word-item.highlight {
  background: rgba(0, 255, 255, 0.2);
  border: 1px solid rgba(0, 255, 255, 0.5);
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
}
.word-item.light1 {
  background-image: url("../assets/paopao/p2.png");
  background-size: 100% 100%;
  /* border: 2px solid #ffd700; */
  box-shadow: inset 0 0 30px rgba(24, 144, 255, 0.5),
             0 0 15px rgba(24, 144, 255, 0.5);
  transform: scale(1.1);

}
.word-item.light2 {
  background-image: url("../assets/paopao/p3.png");
  background-size: 100% 100%;
  /* border: 2px solid #ffd700; */
  box-shadow: inset 0 0 30px rgba(24, 144, 255, 0.5),
             0 0 15px rgba(24, 144, 255, 0.5);
  transform: scale(1.1);

}
.word-item.light3 {
  background-image: url("../assets/paopao/p4.png");
  /* border: 2px solid #ffd700; */
  box-shadow: inset 0 0 30px rgba(24, 144, 255, 0.5),
             0 0 15px rgba(24, 144, 255, 0.5);
  transform: scale(1.1);

}

.word-value {
  color: #7cd7ff;
  font-size: 16px;
  font-weight: bold;
}

.word-label {
  color: #fff;
  font-size: 12px;
  margin-top: 4px;
}

.word-item:hover {
  transform: scale(1.1);
  box-shadow: 0 0 15px rgba(24, 144, 255, 0.5);
}

/* 其他样式... */

/* 表格样式 */
.unit-table {
  background: rgba(0, 21, 41, 0.5);
  border-radius: 4px;
  padding: 10px;
}

:deep(.el-table) {
  background-color: transparent;
  color: #fff;
}

:deep(.el-table th),
:deep(.el-table tr) {
  background-color: transparent;
  border-bottom: 1px solid rgba(0, 255, 255, 0.1);
}

:deep(.el-table--enable-row-hover .el-table__body tr:hover > td) {
  background-color: rgba(0, 255, 255, 0.1);
}
</style>

<template>
  <div class="home-container">
    <!-- 顶部导航 -->
    <nav class="nav-bar">
      <div class="nav-left">
        <h1 class="logo">My Blog</h1>
      </div>

      <!-- 新增导航菜单 -->
      <div class="nav-menu">
        <router-link to="/home" class="nav-item" active-class="active">
          <span class="nav-icon">🏠</span>
          <span class="nav-text">首页</span>
        </router-link>
        <router-link to="/projects" class="nav-item" active-class="active">
          <span class="nav-icon">🎨</span>
          <span class="nav-text">项目墙</span>
        </router-link>
        <router-link to="/messages" class="nav-item" active-class="active">
          <div class="nav-icon-badge">
            <span class="nav-icon">💌</span>
            <span class="badge" v-if="unreadCount">{{ unreadCount }}</span>
          </div>
          <span class="nav-text">消息</span>
        </router-link>
        <router-link to="/profile" class="nav-item" active-class="active">
          <span class="nav-icon">👤</span>
          <span class="nav-text">我的</span>
        </router-link>
      </div>

      <div class="nav-right">
        <div class="user-info">
          <div class="avatar-container">
            <img :src="userInfo?.avatar || '/default-avatar.png'" class="avatar" />
          </div>
          <span class="username">{{ userInfo?.username }}</span>
        </div>
      </div>
    </nav>

    <!-- 主要内容区 -->
    <main class="main-content">
      <!-- 文章列表 -->
      <div class="article-list">
        <article v-for="article in articles" :key="article.id" class="article-card">
          <div class="article-cover" v-if="article.cover">
            <img :src="article.cover" :alt="article.title">
          </div>
          <div class="article-content">
            <h2 class="article-title">{{ article.title }}</h2>
            <p class="article-excerpt">{{ article.excerpt }}</p>
            <div class="article-meta">
              <span class="publish-date">📅 {{ formatDate(article.createTime) }}</span>
              <span class="read-count">👀 {{ article.readCount }}</span>
              <span class="like-count">❤️ {{ article.likeCount }}</span>
            </div>
          </div>
        </article>
      </div>

      <!-- 侧边栏 -->
      <aside class="sidebar">
        <!-- 个人简介卡片 -->
        <div class="profile-card">
          <div class="profile-avatar-container">
            <img :src="userInfo?.avatar || '/default-avatar.png'" class="profile-avatar" />
          </div>
          <h3 class="profile-name">{{ userInfo?.username }}</h3>
          <p class="profile-bio">这里是个人简介...</p>
          <div class="profile-stats">
            <div class="stat-item">
              <strong>📝 {{ stats.articles }}</strong>
              <span>文章</span>
            </div>
            <div class="stat-item">
              <strong>👀 {{ stats.views }}</strong>
              <span>阅读</span>
            </div>
            <div class="stat-item">
              <strong>❤️ {{ stats.likes }}</strong>
              <span>获赞</span>
            </div>
          </div>
        </div>

        <!-- 标签云 -->
        <div class="tag-cloud">
          <h3>🏷️ 标签云</h3>
          <div class="tags">
            <span v-for="tag in tags"
                  :key="tag.id"
                  class="tag"
                  :style="{ fontSize: tag.weight + 'px' }">
              {{ tag.name }}
            </span>
          </div>
        </div>
      </aside>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getUserInfo } from '@/utils/login'

defineOptions({
  name: 'HomeView'
})

// 用户信息
const userInfo = ref(getUserInfo())

// 文章列表数据
const articles = ref([
  {
    id: 1,
    title: '示例文章标题',
    excerpt: '这是文章的摘要内容，简短介绍文章的主要内容...',
    cover: '/article-cover.jpg',
    createTime: '2024-01-20',
    readCount: 1234,
    likeCount: 56
  },
  // ... 更多文章
])

// 统计数据
const stats = ref({
  articles: 42,
  views: 12345,
  likes: 789
})

// 标签云数据
const tags = ref([
  { id: 1, name: 'JavaScript', weight: 16 },
  { id: 2, name: 'Vue', weight: 18 },
  { id: 3, name: 'TypeScript', weight: 14 },
  // ... 更多标签
])

// 格式化日期
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString()
}

const unreadCount = ref(5) // 未读消息数量
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  background: #fef6e4;
  font-family: 'Comic Sans MS', cursive;
}

/* 导航栏样式 */
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: #fff;
  box-shadow: 0 4px 15px rgba(255, 153, 153, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  z-index: 100;
  border-bottom: 3px solid #ff9999;
}

.logo {
  font-size: 28px;
  color: #ff6666;
  text-shadow: 2px 2px 0 #ffb3b3;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.avatar-container {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  padding: 3px;
  background: linear-gradient(45deg, #ff9999, #ff6666);
  box-shadow: 0 4px 10px rgba(255, 102, 102, 0.3);
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid white;
}

.username {
  color: #ff6666;
  font-weight: bold;
}

/* 主要内容区样式 */
.main-content {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 30px;
  max-width: 1200px;
  margin: 90px auto 40px;
  padding: 0 20px;
}

/* 文章卡片样式 */
.article-card {
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 25px;
  transition: all 0.3s ease;
  box-shadow: 0 8px 20px rgba(255, 153, 153, 0.15);
  border: 3px solid #ffb3b3;
}

.article-card:hover {
  transform: translateY(-5px) rotate(1deg);
  box-shadow: 0 12px 25px rgba(255, 153, 153, 0.25);
}

.article-cover img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-bottom: 3px solid #ffb3b3;
}

.article-content {
  padding: 25px;
}

.article-title {
  font-size: 22px;
  color: #ff6666;
  margin-bottom: 12px;
}

.article-excerpt {
  color: #666;
  font-size: 15px;
  line-height: 1.6;
  margin-bottom: 20px;
}

.article-meta {
  display: flex;
  gap: 20px;
  color: #ff9999;
  font-size: 14px;
}

/* 侧边栏样式 */
.sidebar {
  position: sticky;
  top: 90px;
}

.profile-card {
  background: #fff;
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  margin-bottom: 25px;
  box-shadow: 0 8px 20px rgba(255, 153, 153, 0.15);
  border: 3px solid #ffb3b3;
}

.profile-avatar-container {
  width: 100px;
  height: 100px;
  margin: 0 auto 20px;
  border-radius: 50%;
  padding: 4px;
  background: linear-gradient(45deg, #ff9999, #ff6666);
  box-shadow: 0 6px 15px rgba(255, 102, 102, 0.3);
}

.profile-avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 3px solid white;
  object-fit: cover;
}

.profile-name {
  color: #ff6666;
  font-size: 20px;
  margin-bottom: 10px;
}

.profile-bio {
  color: #666;
  margin-bottom: 20px;
}

.profile-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  padding-top: 20px;
  border-top: 2px dashed #ffb3b3;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.stat-item strong {
  color: #ff6666;
  font-size: 18px;
}

.stat-item span {
  color: #999;
  font-size: 14px;
}

.tag-cloud {
  background: #fff;
  border-radius: 20px;
  padding: 25px;
  box-shadow: 0 8px 20px rgba(255, 153, 153, 0.15);
  border: 3px solid #ffb3b3;
}

.tag-cloud h3 {
  color: #ff6666;
  margin-bottom: 20px;
  font-size: 20px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag {
  padding: 6px 15px;
  background: #fff5f5;
  border: 2px solid #ffb3b3;
  border-radius: 25px;
  color: #ff6666;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tag:hover {
  background: #ff9999;
  color: white;
  transform: scale(1.05) rotate(2deg);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .main-content {
    grid-template-columns: 1fr;
  }

  .nav-bar {
    padding: 0 20px;
  }

  .article-cover img {
    height: 180px;
  }
}

/* 添加一些动画效果 */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.profile-avatar-container {
  animation: float 3s ease-in-out infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.like-count:hover {
  animation: pulse 0.5s ease-in-out;
}

.nav-menu {
  display: flex;
  gap: 20px;
  align-items: center;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 15px;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  position: relative;
  overflow: hidden;
}

.nav-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff5f5;
  border-radius: 15px;
  transform: scale(0);
  transition: transform 0.3s ease;
  z-index: -1;
}

.nav-item:hover::before {
  transform: scale(1);
}

.nav-item:hover {
  transform: translateY(-3px);
}

.nav-item:active {
  transform: translateY(1px);
}

.nav-icon {
  font-size: 24px;
  margin-bottom: 4px;
  transition: transform 0.3s ease;
}

.nav-text {
  font-size: 14px;
  color: #ff6666;
  font-weight: bold;
  transition: color 0.3s ease;
}

.nav-item:hover .nav-icon {
  transform: scale(1.2);
}

.nav-item.active {
  background: #fff5f5;
  box-shadow: 0 4px 10px rgba(255, 102, 102, 0.2);
}

.nav-item.active .nav-text {
  color: #ff4444;
}

/* 消息徽标样式 */
.nav-icon-badge {
  position: relative;
}

.badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ff4444;
  color: white;
  font-size: 12px;
  min-width: 18px;
  height: 18px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  border: 2px solid white;
  font-weight: bold;
  animation: bounce 1s ease infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}

/* 添加悬浮特效 */
@keyframes wobble {
  0%, 100% { transform: rotate(0); }
  25% { transform: rotate(-5deg); }
  75% { transform: rotate(5deg); }
}

.nav-item:hover .nav-icon {
  animation: wobble 0.5s ease;
}

/* 点击涟漪效果 */
.nav-item::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  background: rgba(255, 102, 102, 0.3);
  opacity: 0;
  border-radius: 100%;
  transform: scale(1, 1) translate(-50%);
  transform-origin: 50% 50%;
}

.nav-item:active::after {
  animation: ripple 0.6s ease-out;
}

@keyframes ripple {
  0% {
    transform: scale(0, 0);
    opacity: 0.5;
  }
  100% {
    transform: scale(20, 20);
    opacity: 0;
  }
}

/* 响应式调整 */
@media (max-width: 768px) {
  .nav-menu {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    padding: 10px;
    box-shadow: 0 -2px 10px rgba(255, 153, 153, 0.2);
    justify-content: space-around;
    z-index: 100;
  }

  .nav-item {
    padding: 8px;
  }

  .nav-text {
    font-size: 12px;
  }
}
</style>

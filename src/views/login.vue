<template>
  <div class="login-container">
    <div class="form-container" :class="{ 'active': !isLogin }">
      <!-- 登录表单面板 -->
      <div class="form-panel left">
        <div class="form-content">
          <h2 class="title">登录</h2>
          <form @submit.prevent="handleLogin">
            <div class="form-item">
              <input
                type="text"
                v-model="loginForm.username"
                :class="{ error: errors.username }"
                placeholder="请输入用户名"
                @blur="validateUsername"
                required
              >
              <span class="error-message" :class="{ visible: errors.username }">
                {{ errors.username }}
              </span>
            </div>
            <div class="form-item">
              <input
                type="password"
                v-model="loginForm.password"
                :class="{ error: errors.password }"
                placeholder="请输入密码"
                @blur="validatePassword"
                required
              >
              <span class="error-message" :class="{ visible: errors.password }">
                {{ errors.password }}
              </span>
            </div>
            <div class="form-item captcha-container">
              <div class="captcha-input-wrapper">
                <input
                  type="text"
                  v-model="loginForm.captcha"
                  placeholder="请输入验证码"
                  maxlength="4"
                  required
                >
              </div>
              <div class="captcha-image-wrapper">
                <canvas
                  ref="captchaCanvas"
                  @click="refreshCaptcha"
                ></canvas>
              </div>
            </div>
            <div class="remember-wrapper">
              <label class="remember-checkbox">
                <input
                  type="checkbox"
                  v-model="loginForm.remember"
                >
                <span class="checkbox-custom">
                  <span class="checkbox-checkmark"></span>
                </span>
                <span class="remember-text">记住密码</span>
              </label>
            </div>
            <button type="submit">登录</button>
          </form>
        </div>
      </div>

      <!-- 注册表单面板 -->
      <div class="form-panel right">
        <div class="form-content">
          <h2 class="title">注册</h2>
          <form @submit.prevent="handleRegister">
            <div class="form-item">
              <input type="text" v-model="registerForm.username" placeholder="请输入用户名" required>
            </div>
            <div class="form-item">
              <input type="password" v-model="registerForm.password" placeholder="请输入密码" required>
            </div>
            <div class="form-item">
              <input type="password" v-model="registerForm.confirmPassword" placeholder="确认密码" required>
            </div>
            <button type="submit">注册</button>
          </form>
        </div>
      </div>

      <!-- 覆盖层 -->
      <div class="overlay-container">
        <div class="overlay" :class="{ 'active': !isLogin }">
          <div class="overlay-panel overlay-left">
            <h2>已有账号？</h2>
            <p>立即登录开启您的旅程！</p>
            <button class="ghost" @click="toggleForm">去登录</button>
          </div>
          <div class="overlay-panel overlay-right">
            <h2>没有账号？</h2>
            <p>立即注册加入我们！</p>
            <button class="ghost" @click="toggleForm">去注册</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'UserLogin'
})

interface LoginForm {
  username: string
  password: string
  remember: boolean
  captcha: string
}

interface RegisterForm {
  username: string
  password: string
  confirmPassword: string
}

interface FormErrors {
  username: string
  password: string
}

const router = useRouter()

const isLogin = ref(true)

const loginForm = reactive<LoginForm>({
  username: '',
  password: '',
  remember: false,
  captcha: ''
})

const registerForm = reactive<RegisterForm>({
  username: '',
  password: '',
  confirmPassword: ''
})

const captchaCanvas = ref<HTMLCanvasElement | null>(null)
const captchaText = ref('')

const errors = reactive<FormErrors>({
  username: '',
  password: ''
})

const toggleForm = () => {
  isLogin.value = !isLogin.value;
  switchToLogin();
  switchToRegister();

}

const generateCaptcha = () => {
  const canvas = captchaCanvas.value!
  const ctx = canvas.getContext('2d')!

  // 确保画布尺寸正确
  canvas.width = 120
  canvas.height = 48

  // 清空画布
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // 生成验证码
  const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  let code = ''
  for (let i = 0; i < 4; i++) {
    code += characters[Math.floor(Math.random() * characters.length)]
  }
  captchaText.value = code

  // 设置文字基本样式
  const fontSize = 28
  ctx.font = `${fontSize}px 'Comic Sans MS'`
  ctx.textBaseline = 'middle'

  // 计算文字总宽度
  const totalWidth = code.split('').reduce((width, char) => {
    return width + ctx.measureText(char).width
  }, 0)

  // 计算起始x坐标，使文字整体居中
  const spacing = 8 // 字符间距
  const totalSpacing = spacing * (code.length - 1)
  const startX = (canvas.width - (totalWidth + totalSpacing)) / 2

  // 绘制文字
  let currentX = startX
  for (let i = 0; i < code.length; i++) {
    ctx.fillStyle = `hsl(${Math.random() * 360}, 70%, 50%)`

    // 随机旋转角度（减小范围使文字更清晰）
    const rotation = (Math.random() - 0.5) * 0.2

    ctx.save()
    ctx.translate(currentX + ctx.measureText(code[i]).width / 2, canvas.height / 2)
    ctx.rotate(rotation)
    ctx.fillText(code[i], 0, 0)
    ctx.restore()

    // 更新下一个字符的x坐标
    currentX += ctx.measureText(code[i]).width + spacing
  }

  // 添加干扰线
  for (let i = 0; i < 3; i++) {
    ctx.beginPath()
    ctx.strokeStyle = `hsla(${Math.random() * 360}, 70%, 70%, 0.5)`
    ctx.lineWidth = 2
    ctx.moveTo(Math.random() * canvas.width * 0.8 + canvas.width * 0.1,
               Math.random() * canvas.height * 0.8 + canvas.height * 0.1)
    ctx.lineTo(Math.random() * canvas.width * 0.8 + canvas.width * 0.1,
               Math.random() * canvas.height * 0.8 + canvas.height * 0.1)
    ctx.stroke()
  }

  // 添加噪点（减少数量并调整分布）
  for (let i = 0; i < 30; i++) {
    ctx.fillStyle = `hsla(${Math.random() * 360}, 70%, 70%, 0.5)`
    ctx.beginPath()
    ctx.arc(
      Math.random() * canvas.width * 0.8 + canvas.width * 0.1,
      Math.random() * canvas.height * 0.8 + canvas.height * 0.1,
      1,
      0,
      Math.PI * 2
    )
    ctx.fill()
  }
}

const refreshCaptcha = () => {
  generateCaptcha()
}

const validateUsername = () => {
  if (!loginForm.username) {
    errors.username = '用户名不能为空'
  } else if (loginForm.username.length < 3) {
    errors.username = '用户名长度不能小于3个字符'
  } else if (loginForm.username.length > 20) {
    errors.username = '用户名长度不能超过20个字符'
  } else {
    errors.username = ''
  }
}

const validatePassword = () => {
  if (!loginForm.password) {
    errors.password = '密码不能为空'
  } else if (loginForm.password.length < 6) {
    errors.password = '密码长度不能小于6个字符'
  } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(loginForm.password)) {
    errors.password = '密码必须包含大小写字母和数字'
  } else {
    errors.password = ''
  }
}

const handleLogin = async () => {
  debugger
  try {
    validateUsername()
    validatePassword()

    if (errors.username || errors.password) {
      return
    }

    if (loginForm.captcha.toLowerCase() !== captchaText.value.toLowerCase()) {
      alert('验证码错误！')
      return
    }

    // await login({
    //   username: loginForm.username,
    //   password: loginForm.password,
    //   remember: loginForm.remember
    // })

    // 登录成功后跳转到首页
    router.push('/home')

  } catch (error) {
    console.log(error)
    // ... 错误处理 ...
  }
}

const handleRegister = () => {
  console.log('注册表单提交', registerForm)
}

// 重置登录表单
const resetLoginForm = () => {
  loginForm.username = ''
  loginForm.password = ''
  loginForm.captcha = ''
  loginForm.remember = false
  // 重置错误信息
  errors.username = ''
  errors.password = ''
  // 刷新验证码
  generateCaptcha()
}

// 重置注册表单
const resetRegisterForm = () => {
  registerForm.username = ''
  registerForm.password = ''
  registerForm.confirmPassword = ''
  // 如果注册表单有错误提示，也需要重置
  // errors.register = {} // 取决于你的注册表单验证实现
}

// 修改切换函数
const switchToRegister = () => {
  resetLoginForm() // 重置登录表单
}

const switchToLogin = () => {
  resetRegisterForm() // 重置注册表单
}

onMounted(() => {
  generateCaptcha()
})
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('../assets/loginbg.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  font-family: "Microsoft YaHei", sans-serif;
}

.login-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(5px);
}

.form-container {
  position: relative;
  width: 768px;
  height: 480px;
  background: rgba(255, 255, 255, 0.98);
  border-radius: 20px;
  border: 3px solid #ff9999;
  overflow: hidden;
  z-index: 1;
}

.form-panel {
  position: absolute;
  top: 0;
  width: 50%;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.form-panel.left {
  left: 0;
  transform: translateX(0);
}

.form-panel.right {
  right: 0;
  transform: translateX(0);
}


.form-content {
  height: 100%;
  padding: 50px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .title {
    font-size: 38px;
  }
}

h2 {
  margin: 0 0 30px;
  font-family: 'Comic Sans MS', cursive;
  color: #ff6666;
  font-size: 28px;
}

.form-item {
  position: relative;
  margin-bottom: 25px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(255, 153, 153, 0.15);
  transition: all 0.3s ease;
}

/* 输入框基础样式 */
input {
  width: 100%;
  padding: 15px 20px;
  background: #fff;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  color: #333;
  transition: all 0.3s ease;
}

/* 输入框占位符样式 */
input::placeholder {
  color: #ffb3b3;
  font-family: 'Comic Sans MS', cursive;
}

/* 输入框容器悬停状态 */
.form-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 153, 153, 0.2);
}

/* 输入框焦点状态 */
.form-item:focus-within {
  background: #fff;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 153, 153, 0.25),
              0 0 0 2px rgba(255, 153, 153, 0.2);
}

/* 输入框错误状态 */
.form-item:has(input.error) {
  background: #fff;
  box-shadow: 0 4px 15px rgba(255, 68, 68, 0.2),
              0 0 0 2px rgba(255, 68, 68, 0.3);
}

/* 错误输入框 */
input.error {
  background: rgba(255, 68, 68, 0.05);
  color: #ff4444;
}

input.error::placeholder {
  color: #ff8888;
}

/* 错误提示文字样式 */
.error-message {
  position: absolute;
  left: 2px;
  bottom: -22px;
  font-size: 12px;
  color: #ff4444;
  font-family: 'Comic Sans MS', cursive;
  padding-left: 5px;
  opacity: 0;
  transform: translateY(-5px);
  transition: all 0.3s ease;
}

/* 显示错误消息时的样式 */
.error-message.visible {
  opacity: 1;
  transform: translateY(0);
}

/* 用户名和密码图标 */
.form-item::before {
  content: '';
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  background-size: contain;
  background-repeat: no-repeat;
  opacity: 0.5;
  transition: opacity 0.3s ease;
}

.form-item:focus-within::before {
  opacity: 0.8;
}

/* 用户名输入框图标 */
.form-item:has(input[type="text"])::before {
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ffb3b3"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>');
}

/* 密码输入框图标 */
.form-item:has(input[type="password"])::before {
  display: none;
}

/* 验证码容器样式 */
.captcha-container {
  display: flex;
  gap: 15px;
  margin-bottom: 25px;
  background: none;
  box-shadow: none;
}

/* 验证码输入框包装器 */
.captcha-input-wrapper {
  flex: 1;
  position: relative;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(255, 153, 153, 0.15);
  transition: all 0.3s ease;
}

/* 验证码输入框 */
.captcha-input-wrapper input {
  width: 100%;
  padding: 15px 20px;
  background: transparent;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  color: #333;
  text-align: center;
  letter-spacing: 2px;
  font-family: 'Arial', sans-serif;
}

.captcha-input-wrapper input::placeholder {
  text-align: left;
  letter-spacing: normal;
  color: #ffb3b3;
  font-family: 'Comic Sans MS', cursive;
}

/* 验证码图片包装器 */
.captcha-image-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 120px;
  /* height: 48px; */
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(255, 153, 153, 0.15);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}

.captcha-image-wrapper canvas {
  display: block;
  width: 100%;
  height: 100%;
}

/* 添加刷新提示 */
.captcha-image-wrapper::after {
  content: '点击刷新';
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  color: #ffb3b3;
  opacity: 0;
  transition: all 0.3s ease;
  font-family: 'Comic Sans MS', cursive;
  white-space: nowrap;
}

.captcha-image-wrapper:hover::after {
  opacity: 1;
  bottom: -25px;
}

/* 错误状态 */
.captcha-input-wrapper.error {
  box-shadow: 0 4px 15px rgba(255, 68, 68, 0.2),
              0 0 0 2px rgba(255, 68, 68, 0.3);
}

.captcha-input-wrapper.error input {
  color: #ff4444;
}

/* 验证码加载动画 */
@keyframes captchaLoading {
  0% { opacity: 0.5; }
  50% { opacity: 1; }
  100% { opacity: 0.5; }
}

.captcha-image-wrapper.loading canvas {
  animation: captchaLoading 1.5s infinite;
}

.remember {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #666;
}

button {
  width: 100%;
  padding: 12px;
  margin-top: 15px;
  border: none;
  border-radius: 25px;
  background: linear-gradient(145deg, #ff9999, #ff6666);
  font-family: 'Comic Sans MS', cursive;
  transform-style: preserve-3d;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(255, 102, 102, 0.3);
  outline: none;
  color: white;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
}

button:hover {
  box-shadow: 0 6px 12px rgba(255, 102, 102, 0.4);
}

button:active {
  transform: translateY(4px);
  box-shadow: 0 2px 4px rgba(255, 102, 102, 0.2);
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.form-container.active .overlay-container {
  transform: translateX(-100%);
}

.overlay {
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  background: linear-gradient(145deg, #ff9999, #ff6666);
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.form-container.active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 40px;
  height: 100%;
  width: 50%;
  text-align: center;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-panel h2 {
  color: white;
}

.overlay-panel p {
  color: white;
  font-size: 14px;
  margin: 20px 0 30px;
}

.overlay-left {
  left: 0;
  transform: translateX(-20%);
}

.form-container.active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.form-container.active .overlay-right {
  transform: translateX(20%);
}

button.ghost {
  background: transparent;
  border: 2px solid white;
}

button.ghost:hover {
  background: rgba(255, 255, 255, 0.1);
}

@media (max-width: 768px) {
  .form-container {
    width: 90%;
    height: auto;
    min-height: 500px;
  }

  .form-panel {
    width: 100%;
    position: relative;
    transform: none !important;
  }

  .overlay-container {
    display: none;
  }
}

.captcha-container {
  display: flex;
  gap: 10px;
}

.captcha-container input {
  width:100%;
}

.captcha-container canvas {
  /* width: 100px; */
  /* height: 40px; */
  border-radius: 8px;
  cursor: pointer;
}

.form-content {
  animation: float 3s ease-in-out infinite;
}

.overlay {
  background: linear-gradient(145deg, #ff9999, #ff6666);
}

.error-message {
  position: absolute;
  left: 0;
  bottom: -20px;
  font-size: 12px;
  color: #ff4444;
  font-family: 'Comic Sans MS', cursive;
  animation: shake 0.5s ease-in-out;
}

input:invalid {
  border-color: #ff4444;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

/* 记住密码容器 */
.remember-wrapper {
  margin: 15px 0;
  user-select: none;
}

/* 复选框标签 */
.remember-checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  padding: 5px;
}

/* 隐藏原生复选框 */
.remember-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* 自定义复选框 */
.checkbox-custom {
  width: 24px;
  height: 24px;
  background: #fff;
  border-radius: 8px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(255, 153, 153, 0.15);
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

/* 复选框悬浮效果 */
.remember-checkbox:hover .checkbox-custom {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 153, 153, 0.2);
  border-color: rgba(255, 153, 153, 0.3);
}

/* 对勾图标 */
.checkbox-checkmark {
  width: 12px;
  height: 6px;
  border: 0 solid #ff6666;
  border-width: 0 0 3px 3px;
  transform: rotate(-45deg) scale(0) translateY(-5px);
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* 选中状态的对勾 */
.remember-checkbox input:checked ~ .checkbox-custom .checkbox-checkmark {
  opacity: 1;
  transform: rotate(-45deg) scale(1) translateY(0);
}

/* 选中状态的容器 */
.remember-checkbox input:checked ~ .checkbox-custom {
  background: #fff5f5;
  border-color: #ff9999;
  box-shadow: 0 2px 8px rgba(255, 102, 102, 0.2);
}

/* 文字样式 */
.remember-text {
  color: #ff9999;
  font-size: 14px;
  font-family: 'Comic Sans MS', cursive;
  transition: all 0.3s ease;
  position: relative;
  padding-left: 2px;
}

/* 文字悬浮效果 */
.remember-checkbox:hover .remember-text {
  color: #ff6666;
  transform: translateX(2px);
}

/* 选中状态的文字 */
.remember-checkbox input:checked ~ .remember-text {
  color: #ff6666;
}

/* 点击效果 */
.remember-checkbox:active .checkbox-custom {
  transform: scale(0.95);
}

/* 添加可访问性焦点样式 */
.remember-checkbox input:focus-visible ~ .checkbox-custom {
  box-shadow: 0 0 0 2px rgba(255, 153, 153, 0.5);
  border-color: #ff9999;
}

/* 禁用状态样式 */
.remember-checkbox input:disabled ~ .checkbox-custom {
  opacity: 0.6;
  cursor: not-allowed;
}

.remember-checkbox input:disabled ~ .remember-text {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 添加卡通效果 */
.checkbox-custom::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 10px;
  background: linear-gradient(45deg, transparent, rgba(255, 153, 153, 0.1));
  z-index: -1;
}

/* 选中状态的额外动画效果 */
@keyframes checkBounce {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.remember-checkbox input:checked ~ .checkbox-custom {
  animation: checkBounce 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
</style>

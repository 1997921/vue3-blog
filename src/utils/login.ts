import axios from 'axios'

// 定义接口类型
interface LoginParams {
  username: string
  password: string
  remember: boolean
}

interface LoginResponse {
  code: number
  data: {
    token: string
    userInfo: UserInfo
  }
  message: string
}

interface UserInfo {
  id: number
  username: string
  avatar?: string
  email?: string
  role?: string
  // ... 其他用户信息字段
}

// 创建 axios 实例
const service = axios.create({
  baseURL: 'http://your-api-base-url', // 替换为你的 API 基础路径
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data

    // 这里可以根据你的后端返回格式调整
    if (res.code === 200) {
      return res
    }

    // 处理其他状态码
    throw new Error(res.message || '请求失败')
  },
  (error) => {
    // 处理网络错误等
    const message = error.response?.data?.message || error.message || '网络错误'
    throw new Error(message)
  }
)

// 登录方法
export const login = async (params: LoginParams): Promise<LoginResponse['data']> => {
  try {
    const response = await service.post<LoginResponse>('/auth/login', params)
    const { token, userInfo } = response.data.data
    localStorage.setItem('token', token)
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
    service.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return { token, userInfo }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`登录失败: ${error.message}`)
    }
    throw new Error('登录失败: 未知错误')
  }
}

// 登出方法
export const logout = (): void => {
  // 清除 token
  localStorage.removeItem('token')
  localStorage.removeItem('userInfo')
  // 清除请求头中的 token
  delete service.defaults.headers.common['Authorization']
}

// 获取存储的 token
export const getToken = (): string | null => {
  return localStorage.getItem('token')
}

// 获取用户信息
export const getUserInfo = (): UserInfo | null => {
  const userInfo = localStorage.getItem('userInfo')
  return userInfo ? JSON.parse(userInfo) : null
}

// 检查是否已登录
export const isAuthenticated = (): boolean => {
  return !!getToken()
}

// 刷新 token 方法
export const refreshToken = async (): Promise<string> => {
  try {
    const response = await service.post<LoginResponse>('/auth/refresh')
    const { token } = response.data.data
    localStorage.setItem('token', token)
    service.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return token
  } catch {
    logout()
    throw new Error('token 刷新失败，请重新登录')
  }
}

export default {
  login,
  logout,
  getToken,
  getUserInfo,
  isAuthenticated,
  refreshToken
}

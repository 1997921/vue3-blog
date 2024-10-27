<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import validateIinput from '../components/validateIinput.vue'

const router = useRouter()
const rulesProp = reactive([
  { name: '用户名', val: '', type: 'username', error: false, message: '' },
  { name: '密码', val: '', type: 'password', error: false, message: '' },
])
interface loginData {
  username: string
  password: string
}
const OpenalertBox = ref(false)
//表单提交验证
const UserLoginFun = () => {
  const userLoginData = {
    username: rulesProp[0].val,
    password: rulesProp[1].val,
  }
  if (rulesProp[0].val.trim() !== '' && rulesProp[1].val.trim() !== '') {
    //请求登录接口处理，跳转页面
    //记住密码
    if (checked.value) {
      lockPssword(userLoginData)
    } else {
      removePssword()
    }
    router.push('/home')
  } else {
    OpenalertBox.value = true
    const timer = setTimeout(() => {
      closealertBox()
      clearTimeout(timer)
    }, 3000)
  }
}
const checked = ref(false)
//监听函数
// watch(checked, () => {
//   console.log(checked)
// })
//记住密码
const lockPssword = (item: loginData) => {
  localStorage.setItem('info', JSON.stringify(item))
}
//移除密码缓存
const removePssword = () => {
  localStorage.removeItem('info')
}
//关闭错误提示框
const closealertBox = () => {
  OpenalertBox.value = false
}
onMounted(() => {
  const userKey = localStorage.getItem('info')
  if (userKey !== null) {
    const loginUserkey = JSON.parse(userKey)
    rulesProp[0].val = loginUserkey.username
    rulesProp[1].val = loginUserkey.password
  }
})
</script>

<template>
  <div class="loginbg h-100">
    <div
      class="alert alert-danger alert-dismissible fade show text-center"
      v-if="OpenalertBox"
    >
      账号或者密码错误，请重新输入
      <button type="button" class="btn-close" @click="closealertBox"></button>
    </div>
    <div class="loginBox">
      <img class="logo" src="../assets/bgbox1.png" />
      <div class="loginBoxInner">
        <form>
          <validateIinput :rules="rulesProp"></validateIinput>
          <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" v-model="checked" />
            <label class="form-check-label" for="exampleCheck1">记住密码</label>
          </div>
          <button
            type="submit"
            class="btn btn-primary btn-lg w-100"
            @click="UserLoginFun()"
          >
            登录
          </button>
          <a href="#" class="form-text">没有账号，去注册</a>
        </form>
      </div>
    </div>
  </div>
</template>
<style scoped>
.logo {
  position: relative;
  width: 30rem;
  margin: 2rem auto;
  display: block;
}
.loginbg {
  position: absolute;
  width: 100%;
  background-image: linear-gradient(to top, #9795f0 0%, #fbc8d4 100%);
}
.loginBox {
  position: relative;
  display: flex;
  flex-direction: row;
  max-width: 64rem;
  /* padding: 8rem; */
  height: auto;
  margin: 0 auto;
  margin-top: 8%;
  border-radius: 2rem;
  background: rgba(253, 253, 253, 0.8);
}
.loginBoxInner {
  width: 46%;
  position: relative;
  height: auto;
  margin: 0 auto;
  padding: 6rem;
}
</style>

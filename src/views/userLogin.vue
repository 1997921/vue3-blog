<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import validateIinput from '../components/validateIinput.vue'
import GlobalHeader from '../components/GlobalHeader/GlobalHeader.vue'

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
const checked = ref(true)
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
  <div>
    <GlobalHeader :headNavIshow="false"></GlobalHeader>
    <div class="containner">
      <!--提示框-->
      <div class="alert alert-danger alert-type" role="alert" v-if="OpenalertBox">
        账号或者密码错误，请重新输入!
      </div>

      <img class="containner-bg" src="../assets/loginbg.jpg" alt="" />
      <div class="loginBox">
        <div class="left">
          <div class="leftCenter">
            <h2 class="mb-4">登录</h2>
            <form class="form">
              <validateIinput :rules="rulesProp"></validateIinput>
              <div class="mb-3 form-check" style="width: 100%">
                <input
                  type="checkbox"
                  class="form-check-input"
                  v-model="checked"
                  style="border: 1px solid #3156eb;"
                />
                <label
                  class="form-check-label login-tips-text"
                  for="exampleCheck1"
                  >记住密码</label
                >
              </div>
              <button
                type="submit"
                class="btn mb-4"
                @click.stop="UserLoginFun()"
              >
                登录
              </button>
              <div
                style="
                  width: 100%;
                  display: flex;
                  flex-direction: row;
                  justify-content: flex-end;
                "
              >
                <a
                  class="login-tips-text unkownPassword"
                  style="color: #252525; display: block"
                  >忘记密码？</a
                >
              </div>
            </form>
          </div>
        </div>
        <div class="right">
          <div data-v-23e59a05="" class="rightCenter">
            <h1 class="mb-4">没有账号？</h1>
            <div class="mb-4">
              <a href="" style="text-decoration: none; color: #fff"
                >立即注册吧！</a
              >
            </div>
            <button type="submit" class="btn" @click.stop="UserLoginFun()">
              注册
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.containner {
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.containner-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  vertical-align: top;
  /* background-image: linear-gradient(to top, #9795f0 0%, #fbc8d4 100%); */
}
.loginBox {
  position: relative;
  opacity: 0.9;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  box-shadow:
    0 15px 30px var(--miniMask),
    0 10px 10px var(--miniMask);
  width: 750px;
  max-width: 100%;
  min-height: 450px;
  margin: 10px;
}
.left {
  width: 50%;
  background: #fff;
}
.form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .btn {
    border-radius: 2rem;
    border: none;
    background: #ff4b2b;
    color: var(--white);
    font-size: 16px;
    font-weight: 700;
    padding: 12px 45px;
    letter-spacing: 2px;
    cursor: pointer;
  }
.leftCenter {
    flex-direction: column;
    background: var(--white);
    padding: 0 20px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .login-tips-text {
    font-size: 0.86rem;
  }
.right {
  width: 50%;
  background: linear-gradient(270deg, #ff4b2b, #ff416c);
}
.rightCenter {
    color: #fff;
    flex-direction: column;
    background: var(--white);
    padding: 0 20px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .right  .btn {
    border-radius: 2rem;
    color: #fff;
    background: none;
    border: 1px solid #fff;
    font-size: 16px;
    font-weight: 700;
    padding: 12px 45px;
    letter-spacing: 2px;
    cursor: pointer;
  }
  .alert-type{
    top: 2%;
    z-index: 999;
    position: absolute;

  }
@media (max-width: 750px) {
  .loginBox {
    width: 450px;
  }
}
.unkownPassword:hover {
  cursor: pointer;
  text-decoration: none;
}

</style>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const emailRef = reactive({
  val: '',
  error: false,
  message: '',
})
const passwordRef = reactive({
  val: '',
  error: false,
  message: '',
})
//表单验证规则
const validataEmail = () => {
  if (emailRef.val.trim() === '') {
    emailRef.error = true
    emailRef.message = '邮箱地址不能为空'
  } else {
    emailRef.error = false
  }
}
const validataPassword = () => {
  if (passwordRef.val.trim() === '') {
    passwordRef.error = true
    passwordRef.message = '密码不能为空'
  } else {
    passwordRef.error = false
  }
}
const OpenalertBox = ref(false)
//表单提交验证
const UserLoginFun = () => {
  debugger
  if (
    emailRef.val.trim() === '3487341669@qq.com' &&
    passwordRef.val.trim() === '123456'
  ) {
    OpenalertBox.value = false
    router.push('/home')
  } else {
    OpenalertBox.value = true
  }
}
const closealertBox = () => {
  OpenalertBox.value = false
}
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
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">用户名</label>
            <input
              :class="{ 'border-danger': emailRef.error }"
              class="form-control"
              id="exampleInputEmail1"
              v-model="emailRef.val"
              @blur="validataEmail"
            />
            <div class="form-text text-danger" v-if="emailRef.error">
              input value can not empty.
            </div>
            <!-- <div class="form-text" v-else>
              Please enter the registered email address.
            </div> -->
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">密码</label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              v-model="passwordRef.val"
              @blur="validataPassword"
              :class="{ 'border-danger': passwordRef.error }"
            />
            <div class="form-text text-danger" v-if="passwordRef.error">
              password value can not empty.
            </div>
          </div>
          <div class="mb-3 form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="exampleCheck1"
            />
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

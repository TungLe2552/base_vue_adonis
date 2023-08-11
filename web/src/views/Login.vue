<template>
  <v-layout class="align-center">
    <v-card class="wrapper">
      <v-img
        style="width: 58px; aspect-ratio: 0.698; margin: 0 auto"
        src="/images/logo.svg"
      ></v-img>
      <p class="title text-center">Đăng nhập hệ thống</p>
      <v-form @submit.prevent="handleSubmit" style="position: relative; padding: 32px 0">
        <v-text-field v-model="user.email" class="my-4" label="Tài khoản" variant="outlined" autofocus/>
        <v-text-field v-model="user.password" class="my-4" label="Mật khẩu" variant="outlined"/>
        
        <v-btn type="submit" color="primary" style="width: 100%; height: 50px"> Đăng nhập </v-btn>
        <span
          v-if="!loginFail"
          style="color: #b00020; position: absolute; bottom: 0; left: 0; font-size: 12px"
          >Tài khoản hoặc mật khẩu không chính xác</span
        >
      </v-form>
      <div class="action">
        <p>
          Chưa có tài khoản?
          <a href="/register">Đăng ký</a>
        </p>
        <a href="/forgot-password">
          Quên mật khẩu?
        </a>
      </div>
    </v-card>
  </v-layout>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'

const loginFail = ref(true)
const user = ref({ email: '', password: '' })
const handleSubmit = async () => {
  try {
    const res = await axios.post('/api/auth/loginWithCredentials', user)
    loginFail.value = true
    window.location.href = '/'
  } catch (error) {
    loginFail.value = false
  }
}
</script>

<style scoped>
.wrapper {
  max-width: 500px;
  width: 100%;
  margin: 24px auto;
}
.title {
  font-size: 24px;
  text-align: center;
  font-weight: 700;
}
.action{
  font-size: 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: space-between;
}
@media (min-width: 750px) {
  .wrapper {
    padding: 50px;
  }
}
@media (max-width: 749px) {
  .wrapper {
    padding: 25px;
  }
}
</style>

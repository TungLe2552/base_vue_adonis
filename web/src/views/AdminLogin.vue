<template>
  <div class="w-100">
    <v-card class="wrapper">
      <v-img
        style="width: 58px; aspect-ratio: 0.698; margin: 0 auto"
        src="/images/logo.png"
      ></v-img>
      <p class="title">Đăng nhập hệ thống</p>
      <form @submit.prevent="handleSubmit" style="position: relative; padding: 32px 0">
        <label for="email" class="field">
          <v-icon class="icon" icon="fa-solid fa-envelope"></v-icon>
          <input
            @input="loginFail = true"
            v-model="user.email"
            type="text"
            name="email"
            style="padding: 5px 16px; width: 100%"
            placeholder="Tài Khoản"
          />
        </label>
        <label for="password" class="field">
          <v-icon class="icon" icon="fa-solid fa-lock"></v-icon>
          <input
            @input="loginFail = true"
            v-model="user.password"
            type="password"
            name="password"
            style="padding: 5px 16px; width: 100%"
            placeholder="Mật khẩu"
          />
        </label>
        <v-btn type="submit" color="primary" style="width: 100%; height: 50px"> Đăng nhập </v-btn>
        <span
          v-if="!loginFail"
          style="color: red; position: absolute; bottom: 0; left: 0; font-size: 12px"
          >Tài khoản hoặc mật khẩu không chính xác</span
        >
      </form>
      <p style="text-align: center; color: #9b9da6; font-size: 12px; margin-top: 12px">
        Quên mật khẩu?
      </p>
    </v-card>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'

const loginFail = ref(true)
const user = { email: '', password: '' }
const handleSubmit = async () => {
  try {
    const rest = await axios.post('/api/auth/loginWithCredentials', user)
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
  margin: 24px auto;
}
.title {
  font-size: 24px;
  text-align: center;
  font-weight: 700;
  margin: 16px 0 24px 0;
}
.field {
  display: flex;
  align-items: center;
  background: #f7f7f7;
  border-radius: 5px;
  margin-bottom: 14px;
}

@media (min-width: 750px) {
  .wrapper {
    padding: 50px;
  }
  .field {
    padding: 16px 25px;
  }
}
@media (max-width: 749px) {
  .wrapper {
    padding: 25px;
  }
  .field {
    padding: 16px;
  }
}
</style>

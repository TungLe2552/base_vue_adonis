<template>
  <v-layout class="w-100 align-center">
    <v-card class="wrapper">
      <v-img
        style="width: 58px; aspect-ratio: 0.698; margin: 0 auto"
        src="/images/logo.svg"
      ></v-img>
      <p class="title text-center">Đăng ký tài khoản</p>
      <v-form @submit.prevent="handleSubmit" style="position: relative; padding: 32px 0">
        <v-text-field v-model="user.email" class="my-4" label="Tài khoản" :rule="[(v)=> v.length<6 && 'Tối thiểu 6 kí tự']" variant="outlined" autofocus/>
        <v-text-field v-model="user.password" class="my-4" label="Mật khẩu" variant="outlined"/>
        <v-text-field v-model="user.confirm_password" class="my-4" label="Nhập lại mật khẩu" variant="outlined"/>
        
        <v-btn type="submit" color="primary" style="width: 100%; height: 50px"> Đăng Ký </v-btn>
        <span
          v-if="!loginFail"
          style="color: #b00020; position: absolute; bottom: 0; left: 0; font-size: 12px"
          >Tài khoản hoặc mật khẩu không chính xác</span
        >
      </v-form>
      <div class="action">
        <p>
          Đã có tài khoản?        
          <a href="/login" variant="text">
            Đăng nhập
          </a>
        </p>
      </div>
    </v-card>
  </v-layout>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter()
const handleSubmit = async () => {
  try {
    const res = await axios.post('/api/auth/loginWithCredentials', user)
    router.push({name:'login'})
  } catch (error) {
    console.log(error);
  }
}
const loginFail = ref(true)
const user = ref({ email: '', password: '', confirm_password:'' })
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
<template>
  <v-layout class="w-100 align-center">
    <v-card class="wrapper">
      <v-img
        style="width: 58px; aspect-ratio: 0.698; margin: 0 auto"
        src="/images/logo.svg"
      ></v-img>
      <p class="title text-center">Quên mật khẩu</p>
      <v-form @submit.prevent="handleSubmit" style="position: relative; padding: 32px 0">
        <v-text-field v-model="user.email" class="my-4" label="Nhập email của bạn" variant="outlined" autofocus/>
        <v-btn type="submit" color="primary" style="width: 100%; height: 50px"> Gửi </v-btn>
      </v-form>
    </v-card>
    <v-dialog
      fullscreen
    >
      <v-sheet>
        <h3>
          Vui lòng kiểm tra email để xác nhận
        </h3>
      </v-sheet>
    </v-dialog>
  </v-layout>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'

const user = ref({ email: '' })
const handleSubmit = async () => {
  try {
    const res = await axios.post('/api/auth/loginWithCredentials', user)
  } catch (error) {
    console.log(error);
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

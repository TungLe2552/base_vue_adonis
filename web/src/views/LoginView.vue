<script>
import axios from 'axios'

export default {
  methods: {
    async login() {
      const result = await axios.get('/api/auth/getMicrosoftLoginUrl', {
        params: {
          origin: window.location.origin + '/microsoftLogin'
        }
      })

      const url = result?.data?.url
      window.location.href = url
    }
  }
}
</script>

<template>
  <div class="d-flex justify-center w-100">
    <div class="login-form">
      <v-card style="height: 100%">
        <div class="d-flex flex-column justify-center align-center fw fh">
          <v-img src="/images/logo.png" style="max-width: 55px; max-height: 83px"></v-img>
          <div class="login-text">
            Đăng nhập bằng <br />
            Microsoft Teams
          </div>
          <v-btn color="primary" style="width: 100%; max-width: 317px; height: 49px" @click="login"
            >Đăng nhập</v-btn
          >
        </div>
      </v-card>
    </div>
  </div>
</template>

<style scoped>
.login-form {
  margin-top: 100px;
  margin-bottom: 100px;
  width: 100%;
  max-width: 436px;
  height: 376px;
  padding-left: 10px;
  padding-right: 10px;
}

.login-text {
  font-weight: bold;
  font-size: 24px;
  margin-top: 20px;
  margin-bottom: 20px;
  line-height: 30px;
}
</style>

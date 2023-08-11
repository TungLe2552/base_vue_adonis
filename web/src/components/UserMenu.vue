<template>
  <div class="text-center">
    <v-menu location="bottom">
      <template v-slot:activator="{ props }">
        <v-btn
          class="red-btn"
          v-bind="props"
          prepend-icon="fa-solid fa-user"
          append-icon="fa-solid fa-angle-down"
          flat
        >
          {{ user.name }}
        </v-btn>
      </template>

      <v-list>
        <v-list-item>
          <v-list-item-title>
            <v-btn
              variant="text"
              prepend-icon="fa-solid fa-right-from-bracket"
              block
              @click="handleLogout"
              >Đăng xuất</v-btn
            >
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script setup>
import axios from 'axios'
import {userStore} from '../stores/user'

const user = userStore()

async function handleLogout() {
  try {
    const res = await axios.post('/api/auth/logout')
    window.location.href = '/'
  } catch (error) {
    console.log(error)
  }
}
</script>

<style scoped>
.red-btn {
  background-color: #cf1627;
  color: #fff;
}
</style>

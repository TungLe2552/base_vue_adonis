<script setup>
import { userStore } from '../stores/user';
import { useRouter } from 'vue-router'

const user = userStore()
const router = useRouter()
// eslint-disable-next-line no-undef
// router.push()
</script>

<template>
  <main>
  </main>
</template>

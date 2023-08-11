<script setup>
import { userStore } from '../stores/user';
import { useRouter } from 'vue-router'

const user = userStore()
const router = useRouter()
// eslint-disable-next-line no-undef
if(user.highestRole == 'As' ){
  router.push({name:'assistant_review'})
}
else if(user.highestRole == 'S'){
  router.push({name:'student_review'})
}
else if(user.highestRole == 'A'){
  router.push({name:'home_admin'})
}
</script>

<template>
  <main>
  </main>
</template>

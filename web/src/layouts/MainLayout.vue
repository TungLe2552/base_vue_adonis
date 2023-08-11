<script setup>
import { RouterView, useRoute } from 'vue-router'
import Footer from '@/components/Footer.vue'
import RedMenu from '@/components/RedMenu.vue'

const router = useRoute()
</script>

<template>
  <div>
    <div class="layout-container">
      <v-layout style="background-color: white">
        <v-layout class="mx-4 my-2">
          <v-layout>
            <div>
              <router-link to="/">
                <v-img :src="'/images/logo.svg'" style="max-width: 45px"></v-img>
              </router-link>
            </div>
          </v-layout>
        </v-layout>
      </v-layout>
      <div v-if="router.meta.bg" class="circle-container">
        <div class="circle1"></div>
        <div class="circle2"></div>
      </div>
      <div :class="{ white: !router.meta.bg }" style="position: relative">
        <RedMenu class="menu" v-if="router.meta.menu" />
        <nav class="menu" v-else style="background: #cf1627; height: 67px"></nav>
        <v-layout class="content-container px-4">
          <RouterView :key="$route.fullPath" />
        </v-layout>
        <Footer></Footer>
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu{
  position: sticky;
  top: 0;
  right: 0;
  left: 0;
  z-index: 999;
}
.layout-container {
  background: #f2f2f2;
}

.circle-container {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
}

.circle1 {
  position: absolute;
  top: 50px;
  width: 800px;
  height: 800px;
  background-color: #f7f7f7;
  border-radius: 50%;
}

.circle2 {
  position: absolute;
  top: 120px;
  width: 660px;
  height: 660px;
  background-color: #fafafa;
  border-radius: 50%;
}

.content-container {
  min-height: calc(100vh - 250px);
}
.white {
  background: white;
}
</style>

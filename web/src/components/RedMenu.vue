<template>
  <div class="red-menu">
    <v-layout class="d-flex justify-space-between align-center mx-4">
      <div class="menu-mobie">
        <v-menu open-on-click>
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" color="primary">
              <v-icon icon="fa-solid fa-bars"></v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-for="menu of menus" :key="menu.name">
              <router-link :to="{name: menu.name}">
                <v-list-item-title>{{ menu.title.toUpperCase() }}</v-list-item-title>
              </router-link>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <nav class="navigation">
        <router-link
          v-for="menu of menus"
          :to="{name: menu.name}"
          background="transparent"
          :key="menu.name"
          :class="{ active: $router.name === menu.name }"
          variant="text"
        >
          {{ menu.title.toUpperCase() }}
        </router-link>
      </nav>
      <UserMenu />
    </v-layout>
  </div>
</template>

<script setup>
import UserMenu from './UserMenu.vue'
import { userStore } from '@/stores/user'
import { ref } from 'vue'

const user = userStore()

const menus = ref([])
const totalMenus = [{ title: 'Home', name: 'home' }]

menus.value = totalMenus
</script>

<style scoped>
.red-menu {
  height: 67px;
  background-color: #cf1627;
  display: flex;
  align-items: center;
  z-index: 999;
  color: white;
  font-weight: bold;
  font-size: 16px;
}
a {
  display: inline-block;
  text-decoration: none;
  color: white;
  padding: 16px 20px;
  font-weight: 500;
}
a:first-child {
  padding-left: 0;
}
.router-link-active {
  color: var(--primary-color);
}
@media (min-width: 1500px) {
  .menu-mobie {
    display: none;
  }
}
@media (max-width: 1499px) {
  .navigation {
    display: none;
  }
  a {
    color: #cf1627;
    font-weight: 700;
    padding: 8px 10px;
  }
}
</style>

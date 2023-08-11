<template>
  <v-layout class="red-menu">
    <v-layout class="d-flex justify-space-between align-center mx-4">
      <div class="menu-mobie">
        <v-menu open-on-click>
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props">
              <v-icon icon="fa-solid fa-bars"></v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-for="menu of menus" :key="menu.title">
              <router-link :to="menu.path">
                <v-list-item-title>{{ menu.title.toUpperCase() }}</v-list-item-title>
              </router-link>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <nav class="navigation">
        <router-link
          :to="menu.path"
          v-for="menu in menus"
          background="transparent"
          :key="menu.title"
          :class="{ active: $router.path === menu.path }"
          variant="text"
        >
          {{ menu.title.toUpperCase() }}
        </router-link>
      </nav>
      <UserMenu />
    </v-layout>
  </v-layout>
</template>

<script setup>
import UserMenu from './UserMenu.vue'
import { userStore } from '@/stores/user'
import { ref } from 'vue'

const user = userStore()

const menus = ref([])
const totalMenus = []
if (user.hasRole('S')) {
  totalMenus.push(
    ...[
      // { title: 'Điểm thi', path: `/bang-diem` },
      { title: 'Phúc khảo', path: `/phuc-khao` }
      // { title: 'Đăng kí thi bù', path: `/dang-ki-thi-bu` }
    ]
  )
}

if (user.hasRole('As')) {
  totalMenus.push(
    ...[
      { title: 'Danh sách phúc khảo', path: `/danh-sach-phuc-khao` }
      // { title: 'Danh sách thi bù', path: `/danh-sach-thi-bu` }
    ]
  )
}

menus.value = totalMenus
</script>
<style scoped>
.red-menu {
  height: 67px;
  background-color: #cf1627;
  display: flex;
  align-items: center;
  /* padding-right: 20px;
  padding-left: 20px; */
  color: white;
  font-weight: bold;
  font-size: 16px;
}
a {
  display: inline-block;
  text-decoration: none;
  color: white;
  padding: 16px 25px;
  font-weight: 500;
}
a:first-child {
  padding-left: 0;
}
.router-link-active {
  color: var(--primary-color);
}
@media (min-width: 750px) {
  .menu-mobie {
    display: none;
  }
}
@media (max-width: 749px) {
  .navigation {
    display: none;
  }
  a {
    color: #cf1627;
    font-weight: 700;
  }
}
</style>

import { defineStore } from 'pinia'

export const userStore = defineStore('user', {
  state: () => ({
    roles: [],
    name: '',
    studentCode: '',
    highestRole:''
  }),
  getters:{
    hasRole: (state) => {
      return (role) => state.roles.includes(role)
    } 
  },
  actions: {
    setUser(data) {
      this.roles = data.roles
      this.name = data.name
      this.studentCode = data.student_code
      this.highestRole = data.highestRole
    }
  }
})
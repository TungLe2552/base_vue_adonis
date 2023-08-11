<script>
import axios from 'axios'

export default {
  async created() {
    const code = this.$route.query.code

    if (code == null) {
      // redirect to error page
      return
    }

    await axios.post('/api/auth/loginWithMicrosoftCode', {
      code,
      origin: window.location.origin + '/microsoftLogin'
    })
    
    window.location.href = '/'
  }
}
</script>

<template>
  <div>
    <v-btn
      flat
      loading
    >

    </v-btn>
  </div>
</template>
<template>
  <div id="login">
    <input type="text" v-model="user.username">
    <input type="password" v-model="user.password">
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    data () {
      return {
        msg: '',
        user: {
          username: '',
          password: ''
        }
      }
    },
    computed: {
      ...mapGetters(['isLogin'])
    },
    methods: {
      ...mapActions(['userLogin']),
      async login () {
        this.msg = ''
        try {
          await this.userLogin(this.user)
        } catch (err) {
          this.msg = err.message
        }
      }
    }
  }
</script>
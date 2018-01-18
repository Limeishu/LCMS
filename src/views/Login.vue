<template>
  <div id="login">
    <div class="msg"><p>{{ msg }}</p></div>
    <input type="text" v-model="user.username">
    <input type="password" v-model="user.password">
    <vue-recaptcha class="recaptcha" @verify="onVerify" sitekey="6LcBXEEUAAAAAOcLdiyJdBitx_nwEc3BxaTwPEZm"></vue-recaptcha>
    <div class="button" @click="login()"><span>Login</span></div>
  </div>
</template>

<script>
  import VueRecaptcha               from 'vue-recaptcha'
  import { mapActions, mapGetters } from 'vuex'
  export default {
    data () {
      return {
        msg: '',
        recaptcha: false,
        user: {
          username: '',
          password: ''
        }
      }
    },
    components: {
      VueRecaptcha
    },
    computed: {
      ...mapGetters(['isLogin'])
    },
    methods: {
      ...mapActions(['userLogin']),
      async login () {
        this.msg = ''
        if (!this.recaptcha) {
          this.msg = `請先進行機器人驗證`
        } else {
          try {
            await this.userLogin(this.user)
          } catch (err) {
            this.msg = `帳號或密碼錯誤，請再試一次。`
          }
        }
      },
      onVerify () {
        this.recaptcha = true
      }
    }
  }
</script>
<template>
  <div id="login">
    <div class="container">
      <div class="msg">
        <p>{{ msg }}</p>
      </div>
      <div class="input-box">
        <input type="text" v-model="user.username" :class="{ 'verified': recaptcha }" autocomplete="off" required>
        <span class="bar"></span>
        <label><span>User Name</span></label>
      </div>
      <div class="input-box">
        <input type="password" v-model="user.password" :class="{ 'verified': recaptcha }" autocomplete="off" required>
        <span class="bar"></span>
        <label><span>Password</span></label>
      </div>
      <vue-recaptcha class="recaptcha" @verify="onVerify" ref="recaptcha" sitekey="6LefXEEUAAAAAPN6fbJMgC6bEOB2n_4b_CxRXIqv"></vue-recaptcha>
      <div class="button" @click="login()"><span>Login</span></div>
    </div>
  </div>
</template>

<script>
  import VueRecaptcha from 'vue-recaptcha'
  import {
    mapActions,
    mapGetters
  } from 'vuex'
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
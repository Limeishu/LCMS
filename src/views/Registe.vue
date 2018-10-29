<template>
  <div id="login">
    <div class="container">
      <h1>註冊</h1>
      <div class="msg">
      </div>
      <div class="input-box">
        <input type="text" v-model="user.username" :class="{ 'verified': recaptcha }" autocomplete="off" required>
        <span class="bar"></span>
        <label><span>使用者名稱</span></label>
      </div>
      <div class="input-box">
        <input type="password" v-model="user.password" :class="{ 'verified': recaptcha }" autocomplete="off" required>
        <span class="bar"></span>
        <label><span>密碼</span></label>
      </div>
      <vue-recaptcha class="recaptcha" @verify="onVerify" ref="recaptcha" sitekey="6LefXEEUAAAAAPN6fbJMgC6bEOB2n_4b_CxRXIqv"></vue-recaptcha>
      <div class="button" @click="reg()"><span>註冊</span></div>
      <div class="button" @click="$router.push('/login')"><span>回登入頁</span></div>    
    </div>
  </div>
</template>

<script>
  import VueRecaptcha from 'vue-recaptcha'
  import { mapActions } from 'vuex'
  export default {
    data () {
      return {
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
    methods: {
      ...mapActions(['addUser', 'setMessage']),
      async reg () {
        if (!this.recaptcha) {
          this.setMessage({ title: '請先進行機器人驗證', status: 'warning' })
        } else {
          try {
            await this.addUser(this.user)
            this.setMessage({ title: `${this.user.username} 已成功註冊，待管理員審核後方可登入`, status: 'ok' })
          } catch (err) {
            this.setMessage({ title: '使用者名稱已被註冊', status: 'error' })
            this.$refs.recaptcha.reset()
          }
        }
      },
      onVerify () {
        this.recaptcha = true
      }
    }
  }
</script>
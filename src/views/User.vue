<template>
  <div>
    <div class="editor-container user">
      <header>
        <h1>{{ userInfo.meta.nickname ? userInfo.meta.nickname : userInfo.username }}</h1>
        <p>{{ userInfo.username }}</p>
      </header>
      <div class="user-config">
        <div class="input-box">
          <input type="password" v-model="user.old_password" :class="{ 'verified': recaptcha }" placeholder="" autocomplete="off" required>
          <span class="bar"></span>
          <label>
            <span>舊密碼</span>
          </label>
        </div>
        <div class="input-box">
          <input type="password" v-model="user.password" autocomplete="off" required>
          <span class="bar"></span>
          <label>
            <span>新密碼</span>
          </label>
        </div>
        <div class="input-box">
          <input type="text" v-model="user.meta.nickname" autocomplete="off" required>
          <span class="bar"></span>
          <label>
            <span>新暱稱</span>
          </label>
        </div>
        <div class="msg">
          <p>{{ msg }}</p>
        </div>
        <vue-recaptcha class="recaptcha" @verify="onVerify" ref="recaptcha" sitekey="6LefXEEUAAAAAPN6fbJMgC6bEOB2n_4b_CxRXIqv"></vue-recaptcha>
        <div class="button" @click="send()"><span>更新使用者資訊</span></div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import VueRecaptcha from 'vue-recaptcha'
  export default {
    data () {
      return {
        recaptcha: false,
        msg: '',
        user: {
          meta: {}
        }
      }
    },
    components: {
      VueRecaptcha
    },
    computed: {
      ...mapGetters(['userInfo'])
    },
    methods: {
      ...mapActions(['updateUser']),
      onVerify () {
        this.recaptcha = true
      },
      async send () {
        this.msg = ''
        if (!this.recaptcha) {
          this.msg = `請先進行機器人驗證`
        } else {
          try {
            await this.updateUser({user: this.user, uid: this.userInfo.uid})
          } catch (err) {
            this.msg = `舊密碼錯誤，請再試一次。`
          }
        }
      }
    }
  }
</script>
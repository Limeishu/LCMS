<template>
  <div>
    <div class="editor-container user">
      <header>
        <h1>{{ userInfo.meta.nickname ? userInfo.meta.nickname : userInfo.username }}</h1>
        <p>{{ userInfo.username }}</p>
      </header>
      <div class="user-config">
        <div class="input-box">
          <input type="password" v-model="user.old_password" placeholder="" autocomplete="off" required>
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
        <h2>主題</h2>
        <div class="theme-picker">
          <div class="theme" v-for="theme in themeList" :key="theme.className" @click="changeTheme(theme.className)">
            <div class="box tone" :style="{ 'background-color': theme.colorSets.tone }">
              <div class="back" :style="{ 'background-color': theme.colorSets.background }"></div>
            </div>
            <p>{{ theme.name }}</p>
            <p class="icon">
              <font-awesome-icon v-if="nowTheme === theme.className" icon="check" />
              <font-awesome-icon v-else-if="!nowTheme && (theme.className === 'meibo-default')" icon="check" />
            </p>
          </div>
        </div>
        <div class="button" @click="send()"><span>更新使用者資訊</span></div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    data () {
      return {
        user: {
          meta: {}
        }
      }
    },
    computed: {
      ...mapGetters(['userInfo', 'themeList']),
      ...mapGetters({nowTheme: 'theme'})
    },
    mounted () {
      this.user.meta = {
        ...this.userInfo.meta
      }
    },
    methods: {
      ...mapActions(['updateUser', 'setMessage', 'setTheme']),
      async send () {
        try {
          await this.updateUser({user: this.user, uid: this.userInfo.uid})
          this.setMessage({ title: '修改成功，請重新登入', status: 'ok' })
        } catch (err) {
          this.setMessage({ title: '舊密碼錯誤，請再試一次', status: 'error' })
        }
      },
      changeTheme (themeName) {
        this.setTheme(themeName)
        this.user.meta.theme = themeName
        this.$cookies.set('theme', themeName, Infinity)
      }
    }
  }
</script>
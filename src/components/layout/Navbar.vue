<template>
  <div class="navbar">
    <h1 class="logo"><span>李梅樹中央管理系統</span><div class="version">v{{ version }}</div></h1>
    <div class="user" v-if="isLogin"><p @click="$router.push('/user')"><font-awesome-icon icon="user" /><span>{{ user.meta ? user.meta.nickname : user.username }}</span></p><p @click="logout(), $router.push('/login')">登出</p></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import config from '../../../package.json'
export default {
  data () {
    return {
      version: config.version
    }
  },
  computed: {
    ...mapGetters(['isLogin']),
    ...mapGetters({ user: 'userInfo' })
  },
  methods: {
    ...mapActions({ logout: 'userLogout' })
  }
}
</script>

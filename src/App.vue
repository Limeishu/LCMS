<template>
  <div id="app" :class="theme">
    <Navbar></Navbar>
    <div class="main">
      <Message />
      <Sidebar v-show="isLogin" class="side" />
      <mainFooter class="side" />
      <router-view class="main-container" />
    </div>
  </div>
</template>

<style lang="scss">
@import './assets/scss/main.scss';
</style>


<script>
  import { mapGetters, mapActions } from 'vuex'
  import * as layout from '@/components/layout'
  export default {
    components: {
      ...layout
    },
    computed: {
      ...mapGetters(['isLogin', 'theme'])
    },
    created () {
      this.checkLogin()
    },
    mounted () {
      const themeFromCookie = this.$cookies.get('theme')
      if (themeFromCookie) {
        this.setTheme(themeFromCookie)
      }
    },
    methods: {
      ...mapActions(['setTheme']),
      checkLogin () {
        if (!this.isLogin && this.$route.name !== 'Registe') this.$router.push('/login')
      }
    },
    watch: {
      $route (route) {
        this.checkLogin()
      },
      isLogin () {
        this.$router.push('/')
      }
    }
  }
</script>

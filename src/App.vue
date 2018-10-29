<template>
  <div id="app">
    <Navbar></Navbar>
    <div class="main">
      <Message />
      <Sidebar class="side" />
      <mainFooter class="side" />
      <router-view class="main-container" />
    </div>
  </div>
</template>

<style lang="scss">
@import './assets/scss/main.scss';
</style>


<script>
  import { mapGetters } from 'vuex'
  import * as layout from '@/components/layout'
  export default {
    components: {
      ...layout
    },
    computed: {
      ...mapGetters(['isLogin'])
    },
    created () {
      this.checkLogin()
    },
    methods: {
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

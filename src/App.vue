<template>
  <div id="app">
    <Navbar></Navbar>
    <div class="main">
      <Sidebar class="side"></Sidebar>
      <mainFooter class="side"></mainFooter>
      <router-view class="main-container"></router-view>
    </div>
  </div>
</template>

<style lang="scss">
@import './assets/scss/main.scss';
</style>


<script>
  import { mapGetters } from 'vuex'
  import { Navbar, mainFooter, Sidebar } from '@/components/layout'
  export default {
    components: {
      Navbar: Navbar,
      mainFooter: mainFooter,
      Sidebar: Sidebar
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

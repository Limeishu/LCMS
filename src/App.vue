<template>
  <div id="app">
    <Navbar></Navbar>
    <div class="main">
      <Sidebar></Sidebar>
      <mainFooter></mainFooter>
      <router-view></router-view>
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
        this.isLogin ? null : this.$router.push('/login')
      }
    },
    watch: {
      $route (route) {
        this.checkLogin()
      }
    }
  }
</script>

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
@import './assets/scss/main.scss'
</style>


<script>
import { Navbar, mainFooter, Sidebar } from '@/components/layout'
export default {
  components: {
    Navbar: Navbar,
    mainFooter: mainFooter,
    Sidebar: Sidebar
  }
}
</script>

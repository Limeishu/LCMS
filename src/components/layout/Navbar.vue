<template>
  <div class="navbar">
    <h1 class="logo">李梅樹網站管理系統<div class="version">v{{ version }}</div></h1>
    <div class="user"><p>{{ user.name }}</p><p>登出</p></div>
  </div>
</template>

<script>
import config from '../../../package.json'
export default {
  data () {
    return {
      version: config.version,
      user: {
        name: 'Limeishu'
      }
    }
  }
}
</script>

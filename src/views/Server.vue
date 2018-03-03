<template>
  <div>
    <div class="server-list">
      <div class="container" v-for="(item, i) in serverState" :key="i">
        <h1>{{ serverList[i].name }}</h1>
        <p :class="{ 'active': item.check.ping }"><font-awesome-icon :icon="['fas', 'circle']" /><span>{{ serverList[i].ip }}</span></p>
      </div>
    </div>
  </div>
</template>

<script>
  import config from '../../server/config.json'
  export default {
    data () {
      return {
        serverList: config.serverList,
        serverState: []
      }
    },
    mounted () {
      this.serverList.forEach(async ele => {
        let data = await this.getServerState(ele.api)
        this.serverState.push(data)
      })
    },
    methods: {
      async getServerState (api) {
        let res = await this.$http.get(api)
        return res.data
      }
    }
  }
</script>
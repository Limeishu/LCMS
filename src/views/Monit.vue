<template>
  <div>
    <div class="monit-container">
      <div class="monit" v-for="i in 16" :key="`cam-${i}`">
        <img :src="`${monitorCfg.server}/mjpeg?cam=${i}&IDKey=${monitServerKey}`" alt="">
        <p><font-awesome-icon icon="circle" /> CAM {{ i }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import config from '../../server/config.json'
  export default {
    data () {
      return {
        nowFouceCamNum: 1,
        monitorCfg: config.monitor,
        monitServerKey: ''
      }
    },
    mounted () {
      this.getKey()
    },
    methods: {
      async getKey () {
        let res = await axios.get(`${this.monitorCfg.server}/getKey`)
        this.monitServerKey = res.data
      }
    }
  }
</script>

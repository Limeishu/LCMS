<template>
  <div>
    <div class="monit-container">
      <div class="monit" v-for="i in 16" :key="`cam-${i}`">
        <img :src="`${monitorCfg.server}/mjpeg?cam=${i}&IDKey=${monitorCfg.key}`" alt="">
        <p><font-awesome-icon icon="circle" /> CAM {{ i }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import config from '../../server/config.json'
  export default {
    data () {
      return {
        nowFouceCamNum: 1,
        monitorCfg: config.monitor
      }
    }
  }
</script>

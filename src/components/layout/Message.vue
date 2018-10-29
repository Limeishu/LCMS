<template>
  <div class="message-container">
    <div v-show="nowTime - item.time < 3000" class="message" v-for="(item, i) in message" :key="`msg-${i}`" :class="item.msg.status">
      <p>
        <span class="icon">
          <font-awesome-icon v-if="item.msg.status === 'error'" icon="times" />
          <font-awesome-icon v-if="item.msg.status === 'warning'" icon="exclamation" />
          <font-awesome-icon v-if="item.msg.status === 'ok'" icon="check" />
        </span>
        <span>{{ item.msg.title }}</span>
      </p>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        nowTime: ''
      }
    },
    computed: {
      ...mapGetters(['message'])
    },
    mounted () {
      setInterval(() => {
        this.nowTime = new Date().getTime()
      }, 1000)
    }
  }
</script>

<template>
  <div class="sidebar" :class="{'active' : toggle}">
    <ul>
      <li class="toggle-btn" @click="toggle = !toggle">
        <a>
          <font-awesome-icon v-if="!toggle" :icon="['fas', 'bars']" />
          <font-awesome-icon v-if="toggle" :icon="['fas', 'arrow-left']" />
        </a>
      </li>
      <li v-for="(item, i) in menu" :key="i" v-if="item.meta.permission >= user.permission">
        <router-link :to="item.path" v-if="item.path" :class="{ 'active': $route.path === item.path }">
          <font-awesome-icon v-if="item.meta.icon" :icon="item.meta.icon" />
          <span class="uppercase">{{ item.meta.label[0] || item.name }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      toggle: false
    }
  },
  computed: {
    ...mapGetters({ menu: 'menuitems', user: 'userInfo' })
  },
  watch: {
    $route (route) {
      this.toggle = false
    }
  }
}
</script>

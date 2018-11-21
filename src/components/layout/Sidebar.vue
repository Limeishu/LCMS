<template>
  <div class="sidebar">
    <ul>
      <li v-for="(item, i) in menu" :key="i" v-if="item.meta.permission >= user.permission">
        <router-link :to="item.path" v-if="item.path" :class="{ 'active': $route.path === item.path }">
          <font-awesome-icon v-if="item.meta.icon" :icon="item.meta.icon" />
          <span class="uppercase">{{ item.meta.label[0] || item.name }}</span>
        </router-link>
        <ul v-if="item.children">
          <li v-for="(item, j) in item.children" :key="j">
            <router-link :to="item.path" v-if="item.path">
              <span class="uppercase">{{ item.meta.label[0] || item.name }}</span>
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({ menu: 'menuitems', user: 'userInfo' })
  }
}
</script>

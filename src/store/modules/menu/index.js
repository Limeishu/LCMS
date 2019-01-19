import * as types from '../../mutation-types'
import lazyLoader from './lazyLoader'

const state = {
  items: [
    {
      name: 'Home',
      path: '/',
      meta: {
        label: ['主頁面'],
        link: 'Home.vue',
        icon: ['fas', 'home'],
        permission: 99
      },
      components: lazyLoader('Home')
    },
    {
      name: 'Server Status',
      path: '/status',
      meta: {
        label: ['伺服器'],
        link: 'Server.vue',
        icon: ['fas', 'server'],
        permission: 99
      },
      components: lazyLoader('Server')
    },
    {
      name: 'Files',
      path: '/files',
      meta: {
        label: ['檔案庫'],
        link: 'File.vue',
        icon: ['fas', 'database'],
        permission: 0
      },
      components: lazyLoader('File')
    },
    {
      name: 'Monit',
      path: '/monit',
      meta: {
        label: ['監視器'],
        link: 'Monit.vue',
        icon: ['fas', 'video'],
        permission: 1
      },
      components: lazyLoader('Monit')
    },
    {
      name: 'Todo List',
      path: '/todos',
      meta: {
        label: ['待辦事項'],
        link: 'Todos.vue',
        icon: ['fas', 'calendar-check'],
        permission: 2
      },
      components: lazyLoader('Todos')
    },
    {
      name: 'Post',
      path: '/post',
      meta: {
        label: ['新增文章'],
        link: 'Post.vue',
        icon: ['fas', 'file'],
        permission: 3
      },
      components: lazyLoader('Post/Add')
    },
    {
      name: 'Post List',
      path: '/post-list',
      meta: {
        label: ['文章列表'],
        link: 'Post.vue',
        icon: ['fas', 'list-alt'],
        permission: 3
      },
      components: lazyLoader('Post/List')
    },
    {
      name: 'News',
      path: '/news',
      meta: {
        label: ['新增新聞'],
        link: 'News.vue',
        icon: ['fas', 'plus'],
        permission: 2
      },
      components: lazyLoader('News/Add')
    },
    {
      name: 'News List',
      path: '/news-list',
      meta: {
        label: ['新聞列表'],
        link: 'News.vue',
        icon: ['fas', 'newspaper'],
        permission: 2
      },
      components: lazyLoader('News/List')
    }
  ]
}

const mutations = {
  [types.EXPAND_MENU] (state, menuItem) {
    if (menuItem.index > -1) {
      if (state.items[menuItem.index] && state.items[menuItem.index].meta) {
        state.items[menuItem.index].meta.expanded = menuItem.expanded
      }
    } else if (menuItem.item && 'expanded' in menuItem.item.meta) {
      menuItem.item.meta.expanded = menuItem.expanded
    }
  }
}

export default {
  state,
  mutations
}

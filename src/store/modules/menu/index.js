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
        icon: ['fas', 'home']
      },
      components: lazyLoader('Home')
    },
    {
      name: 'Control Panel',
      path: '/panel',
      meta: {
        label: ['控制面板'],
        link: 'Panel.vue',
        icon: ['fas', 'columns']
      },
      components: lazyLoader('Panel')
    },
    {
      name: 'Post',
      path: '/post',
      meta: {
        label: ['文章管理'],
        link: 'Post.vue',
        icon: ['fas', 'file']
      },
      components: lazyLoader('Post')
    },
    {
      name: 'News',
      path: '/news',
      meta: {
        label: ['新聞管理'],
        link: 'News.vue',
        icon: ['fas', 'newspaper']
      },
      components: lazyLoader('News')
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

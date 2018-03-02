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
    // {
    //   name: 'Control Panel',
    //   path: '/panel',
    //   meta: {
    //     label: ['控制面板'],
    //     link: 'Panel.vue',
    //     icon: ['fas', 'columns']
    //   },
    //   components: lazyLoader('Panel')
    // },
    // {
    //   name: 'Post',
    //   path: '/post',
    //   meta: {
    //     label: ['新增文章'],
    //     link: 'Post.vue',
    //     icon: ['fas', 'file']
    //   },
    //   components: lazyLoader('Post/Add')
    // },
    // {
    //   name: 'Post List',
    //   path: '/post-list',
    //   meta: {
    //     label: ['文章列表'],
    //     link: 'Post.vue',
    //     icon: ['fas', 'list-alt']
    //   },
    //   components: lazyLoader('Post/List')
    // },
    {
      name: 'News',
      path: '/news',
      meta: {
        label: ['新增新聞'],
        link: 'News.vue',
        icon: ['fas', 'plus']
      },
      components: lazyLoader('News/Add')
    },
    {
      name: 'News List',
      path: '/news-list',
      meta: {
        label: ['新聞列表'],
        link: 'News.vue',
        icon: ['fas', 'newspaper']
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

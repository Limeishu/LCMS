import Vue        from 'vue'
import Router     from 'vue-router'
import menuModule from '../store/modules/menu'
import lazyLoader from '../store/modules/menu/lazyLoader'

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  routes: [
    ...generateRoutesFromMenu(menuModule.state.items),
    {
      name: 'News Edit',
      path: '/news/edit/:nid',
      components: lazyLoader('News/Edit')
    },
    {
      name: 'Post Edit',
      path: '/post/edit/:pid',
      components: lazyLoader('Post/Edit')
    },
    {
      name: 'Login',
      path: '/login',
      components: lazyLoader('Login')
    },
    {
      name: 'Registe',
      path: '/registe',
      components: lazyLoader('Registe')
    },
    {
      name: 'User',
      path: '/user',
      components: lazyLoader('User')
    }
  ],
  scrollBehavior (to) {
    if (to.hash) {
      return {
        selector: to.hash
      }
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})

function generateRoutesFromMenu (menu = [], routes = []) {
  for (let i = 0, l = menu.length; i < l; i++) {
    let item = menu[i]
    if (item.path) {
      routes.push(item)
    }
  }
  return routes
}

export default router

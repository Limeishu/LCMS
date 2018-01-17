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
      name: 'Login',
      path: '/login',
      components: lazyLoader('Login')
    }
  ]
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

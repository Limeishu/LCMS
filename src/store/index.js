import Vue          from 'vue'
import Vuex         from 'vuex'

import * as actions from './actions'
import * as getters from './getters'
import mutations    from './mutation-types'

import app          from './modules/app'
import user         from './modules/user'
import menu         from './modules/menu'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,
  modules: {
    app,
    user,
    menu
  },
  state: {
    toggle: false
  },
  mutations,
  actions,
  getters
})

export default store

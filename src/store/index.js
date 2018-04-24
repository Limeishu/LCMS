import Vue          from 'vue'
import Vuex         from 'vuex'

import * as actions from './actions'
import * as getters from './getters'
import mutations    from './mutation-types'

import app          from './modules/app'
import user         from './modules/user'
import menu         from './modules/menu'
import upload       from './modules/upload'
import news         from './modules/news'
import file         from './modules/file'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,
  modules: {
    app,
    user,
    menu,
    upload,
    news,
    file
  },
  state: {
    toggle: false
  },
  mutations,
  actions,
  getters
})

export default store

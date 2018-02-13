import md5          from 'js-md5'
import axios        from 'axios'
import * as types   from '../mutation-types'

const state = {
  user: {}
}

const getters = {
  isLogin: state => state.user.uid !== null && state.user.uid !== undefined,
  userInfo: state => state.user
}

const actions = {
  async userLogin ({ commit }, user) {
    try {
      const res = await axios.post('https://api.limeishu.org.tw/user', {
        username: user.username,
        password: md5(user.password)
      })
      if (res.data.result !== 0) throw new Error(res.data.err)
      let userInfo = {
        uid: res.data.uid,
        username: user.username,
        permission: res.data.permission,
        meta: res.data.meta
      }
      commit(types.SET_USER, userInfo)
      return res.data
    } catch (err) {
      throw err
    }
  },
  async userLogout ({ commit }) {
    commit(types.SET_USER, {})
  }
}

const mutations = {
  [types.SET_USER] (state, user) {
    state.user = user
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}

import md5          from 'js-md5'
import axios        from 'axios'
import * as types   from '../mutation-types'

const state = {
  user: {}
}

const getters = {
  isLogin: state => state.user._id !== null || state.user._id !== undefined
}

const actions = {
  async userLogin ({ commit }, user) {
    try {
      const res = await axios.post('https://api.limeishu.org.tw/user', {
        username: user.username,
        password: md5(user.password)
      })
      if (res.data.result !== 0) throw new Error(res.data.err)
      commit(types.SET_USER, res.data)
      return res.data
    } catch (err) {
      throw err
    }
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

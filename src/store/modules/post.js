import * as types from '../mutation-types'
import axios      from 'axios'

const state = {
  post: {}
}

const getters = {
  post: state => state.post
}

const mutations = {

  [types.POST] (state, post) {
    state.post = post
  }
}

const actions = {

  async getAllPost ({ commit }) {
    if (state.post.length > 0) {
      return state.post
    }
    let res = await axios.get('https://api.limeishu.org.tw/post')
    res.data.data.sort((a, b) => { return new Date(a.date).getTime() - new Date(b.date).getTime() }).reverse()
    commit(types.POST, res.data)
    return res.data.data
  },

  async getPostByID ({ commit }, pid) {
    const res = await axios.get(`https://api.limeishu.org.tw/post/${pid}`)
    return res.data
  },

  async sendPost ({ commit }, post) {
    try {
      const res = await axios.post('https://api.limeishu.org.tw/post', post)
      if (res.data.result !== 0) throw new Error(res.data.err)
      return res.data
    } catch (err) {
      throw err
    }
  },

  async updatePost ({ commit }, {post, pid}) {
    try {
      const res = await axios.put(`https://api.limeishu.org.tw/post/${pid}`, post)
      if (res.data.result !== 0) throw new Error(res.data.err)
      return res.data
    } catch (err) {
      throw err
    }
  },

  async deletePost ({ commit }, {uid, pid}) {
    try {
      const res = await axios.delete(`https://api.limeishu.org.tw/post/${pid}?uid=${uid}`)
      return res.data.result === 0
    } catch (err) {
      throw err
    }
  }

}

export default {
  state,
  getters,
  actions,
  mutations
}

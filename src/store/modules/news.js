import * as types from '../mutation-types'
import axios      from 'axios'

const state = {
  news: {}
}

const getters = {
  news: state => state.news
}

const mutations = {

  [types.NEWS] (state, news) {
    state.news = news
  }
}

const actions = {

  async getAllNews ({ commit }) {
    if (state.news.length > 0) {
      return state.news
    }
    let res = await axios.get('https://api.limeishu.org.tw/news')
    res.data.data.sort((a, b) => { return new Date(a.date).getTime() - new Date(b.date).getTime() }).reverse()
    commit(types.NEWS, res.data)
    return res.data.data
  },

  async getNewsByID ({ commit }, nid) {
    const res = await axios.get(`https://api.limeishu.org.tw/news/${nid}`)
    return res.data
  },

  async sendNews ({ commit }, news) {
    try {
      const res = await axios.post('https://api.limeishu.org.tw/news', news)
      if (res.data.result !== 0) throw new Error(res.data.err)
      return res.data
    } catch (err) {
      throw err
    }
  },

  async updateNews ({ commit }, {news, nid}) {
    try {
      const res = await axios.put(`https://api.limeishu.org.tw/news/${nid}`, news)
      if (res.data.result !== 0) throw new Error(res.data.err)
      return res.data
    } catch (err) {
      throw err
    }
  },

  async deleteNews ({ commit }, {uid, nid}) {
    try {
      const res = await axios.delete(`https://api.limeishu.org.tw/news/${nid}?uid=${uid}`)
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

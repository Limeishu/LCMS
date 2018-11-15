import * as types from '../mutation-types'
import axios from 'axios'

const state = {
  storageUsage: {}
}

const getters = {
  storageUsage: state => state.storageUsage
}

const actions = {
  async getStorageUsage ({ commit }) {
    let res = await axios.get('https://api.limeishu.org.tw/diskUsage')
    commit(types.STORAGE_USAGE, res.data.data)
  }
}

const mutations = {
  [types.STORAGE_USAGE] (state, usage) {
    state.storageUsage = usage
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

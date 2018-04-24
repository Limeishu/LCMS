import * as types from '../mutation-types'
import axios from 'axios'
import config from '../../../server/config.json'

const state = {
  files: []
}

const getters = {
  files: state => state.files
}

const mutations = {

  [types.FILES] (state, files) {
    state.files = files
  }

}

const actions = {

  async getFiles ({ commit }) {
    if (state.files.length > 0) return state.files
    let res = await axios.get(config.fileServer.uri)
    commit(types.FILES, res.data[0].contents)
    return res.data[0].contents
  }

}

export default {
  state,
  getters,
  actions,
  mutations
}

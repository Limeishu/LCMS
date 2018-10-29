import * as types from '../mutation-types'

const state = {
  device: {
    isMobile: false,
    isTablet: false
  },
  navbar: {
    opened: false,
    hidden: false
  },
  effect: {
    translate3d: true
  },
  message: []
}

const getters = {
  message: state => state.message
}

const actions = {
  setMessage ({ commit }, msg) {
    commit(types.MESSAGE, { msg: msg, time: new Date().getTime() })
  }
}

const mutations = {
  [types.TOGGLE_DEVICE] (state, device) {
    state.device.isMobile = device === 'mobile'
    state.device.isTablet = device === 'tablet'
  },

  [types.TOGGLE_NAVBAR] (state, opened) {
    if (state.device.isMobile) {
      state.navbar.opened = opened
    } else {
      state.navbar.opened = true
    }
  },

  [types.MESSAGE] (state, message) {
    state.message.push(message)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

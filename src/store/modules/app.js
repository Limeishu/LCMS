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
  message: [],
  themeList: [
    {
      colorSets: { tone: '#009999', background: '#F8F8F8', font: '#282828' },
      className: 'meibo-default',
      name: '原初梅寶'
    },
    {
      colorSets: { tone: '#009999', background: '#282828', font: '#FFFFFF' },
      className: 'meibo-dark-green',
      name: '暗黑梅寶'
    },
    {
      colorSets: { tone: '#398FEF', background: '#282828', font: '#FFFFFF' },
      className: 'meibo-dark-blue',
      name: '午夜梅寶'
    },
    {
      colorSets: { tone: '#F7615C', background: '#282828', font: '#FFFFFF' },
      className: 'meibo-dark-red',
      name: '魅惑梅寶'
    },
    {
      colorSets: { tone: '#FABD40', background: '#282828', font: '#FFFFFF' },
      className: 'meibo-dark-yellow',
      name: '黃蜂梅寶'
    },
    {
      colorSets: { tone: '#F7615C', background: '#F8F8F8', font: '#282828' },
      className: 'meibo-light-red',
      name: '瑰麗梅寶'
    },
    {
      colorSets: { tone: '#F7615C', background: '#6638F0', font: '#282828' },
      className: 'meibo-lsd',
      name: '大麻梅寶'
    }
  ],
  theme: 'meibo-default'
}

const getters = {
  message: state => state.message,
  themeList: state => state.themeList,
  theme: state => state.theme
}

const actions = {
  setMessage ({ commit }, msg) {
    commit(types.MESSAGE, { msg: msg, time: new Date().getTime() })
  },

  setTheme ({ commit }, themeName) {
    commit(types.THEME, themeName)
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
  },

  [types.THEME] (state, theme) {
    state.theme = theme
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

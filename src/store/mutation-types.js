export const TOGGLE_DEVICE  = 'TOGGLE_DEVICE'

export const TOGGLE_NAVBAR  = 'TOGGLE_NAVBAR'

export const EXPAND_MENU    = 'EXPAND_MENU'

export const SET_USER       = 'SET_USER'

export const NEWS           = 'NEWS'

export const POST           = 'POST'

export const FILES          = 'FILES'

export default {
  UPDATE_TYPE: (state, type) => {
    state.type = type
  },
  UPDATE_DATA: (state, data) => {
    state.data = data
  }
}

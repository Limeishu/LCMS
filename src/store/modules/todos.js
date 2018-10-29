import * as types             from '../mutation-types'
import axios                  from 'axios'
import { todoCfg as config }  from '../../../server/config.json'

const state = {
  todos: {}
}

const getters = {
  todos: state => state.todos
}

const actions = {
  async getTodos ({ commit }) {
    let res = await axios.get('https://beta.todoist.com/API/v8/tasks', {
      headers: {
        'Authorization': `Bearer ${config.token}`
      }}
    )
    const todos = res.data.filter(e => (e.project_id === config.project_id))
    commit(types.TODOS, todos)
    return todos
  },

  async toggleTodos ({commit}, task) {
    let res = await axios({
      method: 'POST',
      url: `https://beta.todoist.com/API/v8/tasks/${task.id}/${task.completed ? 'reopen' : 'close'}`,
      headers: {
        'Authorization': `Bearer ${config.token}`
      }}
    )
    if (res.status === 204) {
      return true
    }
  }
}

const mutations = {
  [types.TODOS] (state, todos) {
    state.todos = todos
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

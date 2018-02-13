import axios        from 'axios'

const actions = {
  async uploadFile ({ commit }, data) {
    try {
      let res = await axios.post('https://api.limeishu.org.tw/upload', data)
      return `https://api.limeishu.org.tw${res.data[Object.keys(res.data)]}`
    } catch (err) {
      throw err
    }
  }
}

export default {
  actions
}

import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    token: null,
  },
  getters: {
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    }
  },
  actions: {
    async auth({ commit }) {
      if(localStorage.getItem('token') == 'null')
      return false

      try {
        const data = localStorage.getItem('token')
        const response = await axios.get('/api/auth', {
          headers: {
            Authorization: `Bearer ${data}`
          }
        })
        const responseData = response.data
        commit('setToken', responseData.accessToken)
        return true;
      } catch (error) {
        console.log(error)
        localStorage.removeItem('token')
        commit('setToken', null)
        return false;
      }
    }
  },
  modules: {
  }
})

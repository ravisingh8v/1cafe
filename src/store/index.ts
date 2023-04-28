import { createStore } from 'vuex'

// Importing External Modules 
import auth from './auth'
import products from './products'

export default createStore({
  state: {
    isLoading: null
  },
  getters: {
    isLoading(state: any) {
      return state.isLoading
    }
  },
  mutations: {
    isLoading(state: any, payload: any) {
      state.isLoading = payload
    },
  },
  actions: {
  },
  modules: {
    auth: auth,
    products: products
  }
})

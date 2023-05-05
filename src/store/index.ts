import { createStore } from 'vuex'

// Importing External Modules 
import auth from './auth'
import products from './products'
import contact from './contact'

export default createStore({
  state: {
  },
  getters: {
    isLoading(_: any, rootState: any) {
      return rootState['products/isLoading'] || rootState['auth/isLoading']

    }
  },
  mutations: {
    // isLoading(state: any, payload: any) {
    //   state.isLoading = payload
    // },
  },
  actions: {
  },
  modules: {
    auth: auth,
    products: products,
    contact: contact
  }
})

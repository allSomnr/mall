import { ADD_COUNTER, ADD_TO_CART } from './mutation-types.js'

export const mutations = {
  [ADD_COUNTER](state, payload) {
    payload.count += 1;
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  }
}
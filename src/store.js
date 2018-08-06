import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

/* ............. HELPERS ............. */
const isObject = (obj) => obj !== null && typeof obj === 'object'

export default new Vuex.Store({
  state: {
    keywords: [],
    products: {
      views: [
        { name: 'card', active: true, item: {} },
        { name: 'full', active: false, item: {} }
      ]
    },
    results: [],
    actions: [
      { name: 'add', payload: '', status: false },
      { name: 'remove', payload: '', status: false },
      { name: 'edit', payload: '', status: false },
      { name: 'search', payload: '', status: false }
    ],
    db: {
      message: '',
      error: false
    },
    activeAction: {}
  },
  getters: {
    getActiveAction: (state) => {
      return state.actions.filter(el => el.status)[0]
    }
  },
  mutations: {
    SET_RESULTS_DATA (state, data) {
      state.results = data
    },
    SET_QUERY_RESULTS (state, data) {
      state.results = data
    },
    CLEAR_RESULTS_DATA (state) {
      state.results = []
    },
    SET_DB_MESSAGE (state, msg) {
      state.db.message = msg
    },
    SET_DB_STATUS (state, error) {
      state.db.error = error
    },
    TOGGLE_ACTION_STATUS (state, { name, payload }) {
      state.actions
        .filter(action => action.name === name)
        .forEach(action => {
          action.payload = payload
          action.status = !action.status
        })
    },
    SET_ACTIVE_ACTION (state, payload) {
      state.activeAction = Object.assign({}, payload)
    },
    TOGGLE_PRODUCT_VIEW ({ products }, payload) {
      products.views.forEach((view) => {
        view.active = !view.active
        if (isObject(payload)) {
          view.item = Object.assign({}, payload)
        } else {
          view.item = {}
        }
      })
    }
  },
  actions: {

    requestApi (state, { service, payload, table }) {
      switch (service) {
        case 'getAll':
          return axios.create()
            .get(`/products`)

        case 'query':
          return axios.create()
            .post('/products/query', {
              query: payload
            })

        case 'keywords':
          return axios.create()
            .get('/api/parse/count')

        case 'add':
          return axios.create()
            .post('/products/add', payload.product)

        case 'update':
          return axios.create()
            .put(`/products/update/${payload.id}`, {
              prop: {
                description: payload.description,
                value: payload.value
              },
              table
            })

        case 'remove':
          return axios.create()
            .delete(`/products/delete/${payload}`)
      }
    },

    getProductsFromDatabase ({ dispatch, commit }) {
      let config = { service: 'getAll', payload: null }
      dispatch('requestApi', config)
        .then((res) => {
          commit('SET_RESULTS_DATA', res.data)
        })
    },

    queryDatabase ({ dispatch, commit }, payload) {
      commit('CLEAR_RESULTS_DATA')

      let config = { service: 'query', payload }
      dispatch('requestApi', config)
        .then((res) => {
          commit('SET_QUERY_RESULTS', res.data)
          commit('SET_DB_MESSAGE', 'Resultados de la búsqueda')
          commit('SET_DB_STATUS', false)
        })
        .catch(err => {
          commit('SET_DB_MESSAGE', 'No hay resultados.')
          commit('SET_DB_STATUS', true)
        })
    },

    getKeywordsFromDatabase ({ dispatch, commit }) {
      commit('CLEAR_RESULTS_DATA')

      let config = { service: 'keywords' }
      dispatch('requestApi', config)
        .then((res) => {
          commit('SET_QUERY_RESULTS', res.body)
          commit('SET_DB_MESSAGE', 'Resultados de la búsqueda')
          commit('SET_DB_STATUS', false)
        })
        .catch(err => {
          commit('SET_DB_MESSAGE', 'No hay resultados.')
          commit('SET_DB_STATUS', true)
        })
    },

    addProductToDatabase ({ dispatch, commit }, product) {
      let table = 'products'
      let config = {
        service: 'add',
        payload: { product, table }
      }

      dispatch('requestApi', config)
        .then((res) => {
          commit('SET_DB_MESSAGE', 'Item añadido')
          commit('SET_DB_STATUS', false)
        })
        .catch(err => {
          commit('SET_DB_MESSAGE', 'Error al añadir.')
          commit('SET_DB_STATUS', true)
        })
    },

    removeProductsFromDatabase ({ state, dispatch, commit }) {
      let config = { service: 'remove', payload: state.activeAction.payload }
      dispatch('requestApi', config)
        .then((res) => {
          commit('SET_DB_MESSAGE', 'Item borrado')
          commit('SET_DB_STATUS', false)
          commit('TOGGLE_ACTION_STATUS', {
            name: 'remove',
            payload: null
          })
          commit('CLEAR_RESULTS_DATA')
        })
        .catch(err => {
          commit('SET_DB_MESSAGE', 'Error al borrar.')
          commit('SET_DB_STATUS', true)
        })
    },

    editProductFromDatabase ({ dispatch, commit, state }, product) {
      let config = {
        service: 'update',
        payload: product,
        table: 'products'
      }

      dispatch('requestApi', config)
        .then((res) => {
          commit('SET_DB_MESSAGE', 'Item editado')
          commit('SET_DB_STATUS', false)
          commit('TOGGLE_ACTION_STATUS', {
            name: 'edit',
            payload: null
          })
          commit('CLEAR_RESULTS_DATA')
        })
        .catch(err => {
          commit('SET_DB_MESSAGE', 'Error al editar el objeto.')
          commit('SET_DB_STATUS', true)
        })
    },

    changeActionStatus ({ getters, commit }, payload) {
      commit('TOGGLE_ACTION_STATUS', payload)

      let action = getters.getActiveAction
      commit('SET_ACTIVE_ACTION', action)
    },

    toggleProductView ({ commit }, payload) {
      commit('TOGGLE_PRODUCT_VIEW', payload)
    }
  }
})

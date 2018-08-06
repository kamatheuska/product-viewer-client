import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import Home from '@/views/Home.vue'
import Search from '@/views/Search.vue'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Home.vue', () => {
  it('renders one button for each action', () => {
    const wrapper = shallowMount(Home)
    const vm = wrapper.vm

    let actions = vm.actions
    let buttons = wrapper.findAll('button')
    // initial state
    expect(actions.length).toBe(4)
    expect(buttons.length).toBe(4)

    // push one dummy button
    actions.push('OneTestAction')
    expect(actions.length).toBe(5)
  })
})

describe('Search.vue', () => {
  let actions
  let store

  beforeEach(() => {
    actions = {
      getProductsFromDatabase: jest.fn()
    }
    store = new Vuex.Store({
      state: {},
      actions
    })
  })

  it('dispatches "getProductsFromDatabase" when created() lifehook is fired', () => {
    const wrapper = shallowMount(Search, { store, localVue })
  })
  // Create a function that can search inside a collection and retrieves
  // all objects that match the given query
  it('returns an object that matches the given query', () => {
    let query = 'lamparas'
    let wrapper = shallowMount(Search)
    let vm = wrapper.vm
    expect(vm.results.length).toBe(0)
    wrapper.find('button').trigger('click')

    expect(vm.results.length).not.toBe(0)
  })
})

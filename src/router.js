import Vue from 'vue'
import Router from 'vue-router'

// import Home from './views/Home.vue'
import Search from './views/Search.vue'
import Add from './views/Add.vue'
import Edit from './views/Edit.vue'
import Remove from './views/Remove.vue'
import Products from './views/Products.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'app-products',
      component: Products
    },
    {
      path: '/search',
      name: 'app-search',
      component: Search
    },
    {
      path: '/add',
      name: 'app-add',
      component: Add
    },
    {
      path: '/edit',
      name: 'app-edit',
      component: Edit
    },
    {
      path: '/remove',
      name: 'app-remove',
      component: Remove
    }
  ]
})

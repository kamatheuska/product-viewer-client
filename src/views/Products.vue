<template>
  <div class="Products container__component">
    <div class="Products__header">
      <h1>Productos</h1>
    </div>
    <app-search></app-search>
    <div class="Search__results" v-if="results.length !== 0">
      <product-card
         v-for="(product, index) in results"
          :key="`productCard#${index}`"
          :info="{ product, index }">
      </product-card>
    </div>
    <transition name="fade">
      <product-full></product-full>
    </transition>
    <app-confirm v-if="actions[1].status"></app-confirm>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import Search from '@/components/Search'
import Confirmation from '@/components/Confirmation'
import ProductCard from '@/components/ProductCard'
import ProductFull from '@/components/ProductFull'

export default {
  name: 'app-products',
  data () {
    return {
    }
  },
  computed: {
    ...mapState([
      'products',
      'results',
      'db',
      'actions'
    ])
  },
  methods: {
    ...mapActions([
      'queryDatabase',
      'getKeywordsFromDatabase',
      'getProductsFromDatabase'
    ])
  },
  components: {
    'app-confirm': Confirmation,
    'product-card': ProductCard,
    'product-full': ProductFull,
    'app-search': Search
  }
}
</script>

<style scoped>

/*
  #F9AA33; /* Amarillo
  #4A6572; /* azul
  #344955; /* azul+
  #232F34; /* azul++
  #17262A; /* azulverde
*/

.Products {
  display: flex;
  width: 100%;
  height: 100%;
  padding: 7.3rem 0;
  flex-direction: column;
  justify-content: center;
}
.Products__header {
  padding: 3rem
}
.Search__results {
  padding: 1rem;
  border-radius: 5px;
  height: max-content;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
/*=========================*\
  #MEDIA-QUERIES
\*=========================*/
@media only screen
  and (max-width: 750px)
  and (orientation: portrait) {
    .Products {
      display: block;
    }
    .Search__results {
      grid-template-columns: 1fr 1fr;
      height: max-content;
    }
  }
@media only screen
  and (max-width: 750px)
  and (orientation: landscape) {
    .Products {
      display: block;
    }
    .Search__results {
      grid-template-columns: 1fr 1fr;
      height: max-content;
    }
  }
/*
@media only screen
  and (min-width: 540px)
  and (max-width: 820px)
  and (orientation: landscape) {
    .Root {
      display: grid;
      grid-template-columns: auto;
      grid-template-rows: auto;
    }
  }*/
</style>

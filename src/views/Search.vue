<template>
  <div class="Search">
    <div class="Search__selection" v-if="!search.selected" >
      <button class="button Search__button" @click="changeSearchType('keywords')">Palabras Clave</button>
      <button class="button Search__button" @click="changeSearchType('text')">Descripción</button>
    </div>

    <div class="Search__header">
      <div class="Search__input" v-if="search.type[0].active">
        <label for="query">Escribe palabras clave</label><br>
        <input type="text" id="query" autofocus
            v-model="query"
            @keyup.enter="searchKeyword(query)">
        <button class="Search__button button__small"
                @click="searchKeyword()">Buscar</button>
      </div>

      <div class="Search__input" v-if="search.type[1].active">
        <h1>text</h1>
      </div>

      <div class="Search__preview">
        <h6>{{ db.message }}</h6>
        <p>{{ query }}</p>
      </div>
    </div>

    <div class="Search__results">
      <product-card
         v-for="(product, index) in results"
          :key="`product${index}`"
          :info="{ product, index }">
      </product-card>
    </div>
    <app-confirm v-if="actions[1].status"></app-confirm>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Confirmation from '@/components/Confirmation'
import ProductCard from '@/components/ProductCard'

export default {
  name: 'app-search',
  components: {
    'app-confirm': Confirmation,
    'product-card': ProductCard
  },
  data () {
    return {
      search: {
        type: [
          { name: 'text', active: false },
          { name: 'keywords', active: false }
        ],
        selected: false
      },
      query: ''
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
      'getKeywordsFromDatabase'
    ]),

    toogleButtons (name, cb) {
      this.search.type.forEach(option => { option.active = false })
      this.search.type
        .filter(option => option.name === name)
        .map(option => { option.active = !option.active })
      this.search.selected = true
      cb()
    },

    changeSearchType (name) {
      this.toogleButtons(name, () => {
        if (name === 'keywords') {
          this.getKeywordsFromDatabase()
        }
      })
    },

    searchKeyword () {
      this.queryDatabase(this.query)
    }
  }
}
</script>

<style scoped>
.Search {
  position: relative;
  overflow-x: hidden;
  overflow-y: hidden;
  font-size: 3vh;
  height: 100%;
  background-color: white;
  display: grid;
  grid-template-rows: 18rem 50rem;
  padding: 2rem;
}
.Search__selection {
  display: flex;
  width: 100%;
  margin-top: 1rem;
  height: 40vh;
  justify-content: space-around;
  align-items: center;
}
.Search__input {
  padding: 0 3rem;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.Search__input input {
  width: 50%;
}
.Search__header .Search__button {
  width: auto;
  padding: .7rem 1rem;
}
.Search__button {
  width: 80%;
  margin: 1.3rem;
  font-size: 2rem;
  font-weight: 900;
}
.Search__header {
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  width: 100%;
  position: fixed;
}
.Search__results {
  grid-row: 2;
  margin-top: 2rem;
  overflow-y: auto;
  font-size: 2.4vh;
  height: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
/*.Search__preview { min-height: 10vh }*/

@media only screen
  and (min-width: 1000px) {
    .Search__button { width: 30% }
    .Search__header { width: 80% }
  }
</style>

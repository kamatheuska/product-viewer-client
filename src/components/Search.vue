<template>
  <div class="Search">
    <div class="Search__input">
      <input type="text" id="query" autofocus
          v-model="query"
          placeholder="Palabras clave"
          @keyup.enter="searchKeyword(query)">
      <span @click="searchKeyword(query)">
        <i class="fas fa-search"></i>
      </span>
    </div>
    <div class="Search__type">
      <select name="searchType">
        <option v-for="(option, index) in search.type"
                :key="`option#${index}`"
                value="">{{ option.title }}</option>
      </select>
    </div>
    <div class="Search__button">
      <button class="Search__button-add">Añadir producto</button>
    </div>
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
          { title: 'Descripción', name: 'description', active: false },
          { title: 'Modelo', name: 'model', active: false },
          { title: 'Diseño', name: 'designer', active: false },
          { title: 'Fabricante', name: 'manufacturer', active: false },
          { title: 'Color', name: 'color', active: false },
          { title: 'Material', name: 'material', active: false }
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
  grid-row: 2;
  grid-column: 2 / 3;
  font-size: 1.8rem;
  padding: 1.6rem;
  justify-content: space-evenly;
  align-items: center;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}
.Search__input {
  font-family: 'Montserrat', sans-serif;
  background-color: #fff;
  padding-right: 1.3rem;
  border: 2px solid #fff;
  width: 24rem;
}
.Search > div        { margin: 0 1.5rem }
.Search__input input { border: none }
.Search__input input:focus {
  outline-color: #fff;
  outline-width: 1px;
}
.Search__input svg   { color: #2E4A4F }
.Search__input span {
  height: 100%;
  display: inline-block;
  font-size: 2rem;
}
.Search__button-add {
  font-size: 1.6rem;
  margin-bottom: 1rem;
  padding: 1rem 2rem;
  width: 24rem;
  color: inherit;
  height: 4.6rem;
  border: 2px solid #fff
}
.Search__type select { width: 24rem }

/*.Search__preview { min-height: 10vh }*/
/*=========================*\
  #MEDIA-QUERIES
\*=========================*/
@media only screen
  and (max-width: 750px)
  and (orientation: portrait) {
    .Search {
      display: flex;
      justify-content: center;
      padding: 2rem 0 ;
    }
    .Search > div { margin: 1rem }
    .Search__input svg {
      font-size: 2.5rem;
    }
    .Search__input {
      background-color: #fff;
      padding-right: 2rem;
      display: flex;
      padding-right: 2rem;
      align-items: center;
    }
  }
@media only screen
  and (max-width: 750px)
  and (orientation: landscape) {
    .Search__button,
    .Search__type select,
    .Search__input input   { width: 15rem }
    .Search__button button { font-size: 1.4rem }
  }
</style>

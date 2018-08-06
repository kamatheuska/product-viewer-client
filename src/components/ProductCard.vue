<template>
  <div class="ProductCard">
    <div class="ProductCard__preview"
          @click="toggleProductView(info.product)">
      <div class="ProductCard__image">
<!--           <img :src="`../assets/${image.file}`"
      src="'../assets/10238.jpg'"
      :alt="image.caption"> -->
        <img src="../assets/6.jpg"
              alt="image.caption">
      </div>
      <h5>{{ info.product.title }}</h5>
      <h6><strong>VALOR:</strong> {{ info.product.rates.pvp.unit | convertToCurrency }}</h6>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'product-card',
  data () {
    return {
      clicked: false
    }
  },
  computed: {
    ...mapState([ 'products' ])
  },
  methods: {
    ...mapActions([
      'changeActionStatus',
      'toggleProductView'
    ]),

    removeProduct (id) {
      this.changeActionStatus({
        name: 'remove',
        payload: id
      })
    },

    editProduct (id) {
      console.log('edit', this.info.product)
      this.changeActionStatus({
        name: 'edit',
        payload: this.info.product
      })
      this.$router.push('edit')
    }
  },
  props: [ 'info' ],
  filters: {
    sliceSnippet (str) {
      return str.slice(0, 50)
    },
    convertToCurrency (num) {
      let parts = num.toString().split('.')
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      return `€ ${parts.join('.')}`
    }
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
.ProductCard {
  margin: 1rem;
  margin-top: 1rem;
  font-family: 'Roboto', sans-serif;
}
.ProductCard__preview {
  width: 30vh;
  border-radius: 5px;
  box-shadow: 5px 5px 10px -1px #010101;
  background-color: #344955; /* azul+ */
  color: #fff;
  padding: 2rem;
  height: 45vmin;
  display: grid;
  grid-template-rows: auto;
  transition: all ease .5s;
}
.ProductCard__preview:hover {
  background-color: #4A6572; /* azul */
  border: 1px solid #ccc;
  box-shadow: none;
  color: #F9AA33;
  transform: scale(1.04);
}
.ProductCard__image {
  position: relative;
  justify-self: center;
  background-color: #344955/*rgba(255, 255, 255, 0.1)*/;
  border: 3px outset #F9AA33; /* Amarillo */
  border-radius: 4px;
  height: 140px;
  width: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ProductCard__full-image img,
.ProductCard__image img {
  border: 5px solid rgba(0,0,0,0.1);
  max-width: 100%;
  max-height: 80%;
}

/*=========================*\
  #MEDIA-QUERIES
\*=========================*/
@media only screen
  and (max-width: 750px) {
    .ProductCard__preview {
      width: 42vw;
      height: 100%;
    }
    .ProductCard__image {
      height: 100px;
      width: 100px;
    }
    .ProductCard__full-image img,
    .ProductCard__image img {
      border: 5px solid rgba(0,0,0,0.1);
      max-width: 100%;
      max-height: 80%;
    }
  }
</style>

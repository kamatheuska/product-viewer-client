<template>
  <div class="container__absolute" v-if="products.views[1].active">
    <div class="ProductFull">
      <section class="ProductFull__header">
        <button class="button__small" @click="toggleProductView()">atrás</button>
        <hr>
        <h1>{{ products.views[1].item.title }}</h1>
      </section>
      <section class="ProductFull__specs">
          <span>MODELO:</span>
          <h3> {{ products.views[1].item.model }}</h3>
          <span>DESCRIPCION:</span>
          <h3> {{ products.views[1].item.description }}</h3>
          <span>PVP-UNIDAD:</span>
          <h3> {{ products.views[1].item.rates.pvp.unit | convertToCurrency }}</h3>
          <span>CANTIDAD:</span>
          <h3> {{ products.views[1].item.specs.amount.units }}</h3>
          <span>COLOR:</span>
          <h3> {{ products.views[1].item.specs.color }}</h3>
          <span>DISEÑADOR:</span>
          <h3> {{ products.views[1].item.specs.designer || '' }}</h3>
          <span>AÑO:</span>
          <h3> {{ products.views[1].item.specs.year || '' }}</h3>
          <span>EN LA TIENDA DESDE:</span>
          <h3> {{ products.views[1].item.specs.year || '' }}</h3>
      </section>
      <section class="ProductFull__image">
        <img src="../assets/6.jpg"
              alt="image.caption">
      </section>
      <section class="ProductFull__button-container">
        <button @click="removeProduct(info.product._id)"
                 class="button__small button-danger">Eliminar</button>
        <button @click="editProduct(info.product._id)"
                 class="button__small button-info">Editar</button>
      </section>
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
    ...mapState([
      'products'
    ])
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
.ProductFull {
  height: 90%;
  margin-top: 1rem;
  font-family: 'Roboto', sans-serif;
}
.ProductFull__image {
  position: relative;
  justify-self: center;
  background-color: #344955/*rgba(255, 255, 255, 0.1)*/;
  border: 3px outset #F9AA33; /* Amarillo */
  border-radius: 4px;
  height: 30rem;
  width: 30rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ProductFull__image img {
  border: 5px solid rgba(0,0,0,0.1);
  max-width: 100%;
  max-height: 80%;
}
.ProductFull {
  display: grid;
  grid-template-columns: minmax(10rem, 2fr) 1fr;
  flex-direction: column;
  box-shadow: 5px 5px 25px 3px #111;
  background-color: #E8DDCA;
  color: #232F34;
  padding: 1rem;
  font-size: 1.3em;
  width: 90%;
  position: absolute;
}
.ProductFull__specs {
  display: grid;
  grid-column-gap: 2.6rem;
  grid-row-gap: 1.3rem;
  grid-template-columns: 1fr 4fr;
  font-family: monospace;
  padding: 1em;
}
.ProductFull__header {
  grid-column: 1 / -1;
}
.ProductFull__image {
  position: relative;
}

.ProductFull__header h1 {
  font-family: 'Playfair Display', serif
}
.ProductFull__specs h3 {
  text-align: left;
  font-size: 2rem;
  font-weight: 100;
  font-family: 'Roboto', sans-serif;
}
.ProductFull__specs span {
  font-size: 1.3em;
  text-align: right;
  align-items: center;
  font-weight: 900;
}
.ProductFull__button-container { grid-column: 1 / -1 }
.ProductFull__button-container button { font-size: 2rem }
/*=========================*\
  #MEDIA-QUERIES
\*=========================*/
@media only screen
  and (max-width: 750px) {
    .ProductFull__preview {
      width: 42vw;
      height: 100%;
    }
    .ProductFull__image {
      height: 100px;
      width: 100px;
    }
    .ProductFull__image img,
    .ProductFull__image img {
      border: 5px solid rgba(0,0,0,0.1);
      max-width: 100%;
      max-height: 80%;
    }
  }
</style>

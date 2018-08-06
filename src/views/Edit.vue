<template>
  <div class="Edit">
    <div class="Edit__active" v-if="isActiveAction">
      <form @submit.prevent>
        <h3>Editar un producto</h3>
        <h5>{{ db.message }}</h5>

        <h3>ID: {{ product.id }}</h3>
        <fieldset class="Edit__input">
          <legend>Valor: </legend>
          <input v-model="product.value"
                    type="numer"
                    name="value" required>
        </fieldset>

        <fieldset class="Edit__input">
          <legend>Imagen: </legend>
          <input v-model="product['img_name']"
                    type="text"
                    name="img_name">
        </fieldset>

        <fieldset class="Edit__input">
          <legend>Descripción: </legend>
          <textarea v-model="product.description"
                      cols="22" rows="6"
                       name="description">
          </textarea>
        </fieldset>

        <button class="button__small Edit__submit" @click="submitItem()">Editar producto</button>
      </form>
    </div>
    <div class="Edit__inactive" v-if="!isActiveAction">
      <h1>Busca un producto que editar:</h1>
      <hr>
      <br><br>
      <button class="button Edit__submit" @click="goToSearch()">Buscar</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'app-edit',
  data () {
    return {
      isActiveAction: false,
      product: {}
    }
  },
  computed: {
    ...mapState([ 'db', 'activeAction' ])
  },
  methods: {
    ...mapActions([ 'editProductFromDatabase' ]),

    isEmpty () {
      let obj = this.activeAction
      let bool = Object.keys(obj).length === 0 && obj.constructor === Object
      if (!bool) {
        this.isActiveAction = true
      }
    },

    setProductData () {
      this.product = Object.assign({}, this.activeAction.payload)
    },

    goToSearch () {
      this.$router.push('search')
    },

    submitItem () {
      console.log('COMPONENT: ', this.product)
      this.editProductFromDatabase(this.product)
    }
  },
  created () {
    this.isEmpty()
    this.setProductData()
  }
}
</script>

<style>
.Edit {
  font-size: 3.6vh;
  background-color: #f8f7f2;
  border-radius: 10px;
  grid-row: 2 / 3;
  height: 100%;
  padding: 2rem;
  overflow-y: scroll;
  overflow-x: hidden;
}
.Edit__input {
  display: flex;
  text-align: left;
}
.Edit__input input { width: 70% }
.Edit__submit {
  font-size: 1em;
  margin-top: 1rem;
  padding: .4rem 1.4rem
}
</style>

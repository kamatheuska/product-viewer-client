<template>
  <div class="Confirmation container__absolute">
    <div class="Confirmation__container">
      <h3 class="Confirmation__heading">¿Continuar?</h3>
      <button class="button__small button-danger" @click="executeAction()">Si</button>
      <button class="button__small button-primary"
             @click="cancelAction()">No</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'app-confirm',
  data () {
    return {
    }
  },
  computed: {
    ...mapState([ 'db', 'actions', 'activeAction' ])
  },
  methods: {
    ...mapActions([
      'addProductToDatabase',
      'removeProductsFromDatabase',
      'changeActionStatus'
    ]),

    executeAction () {
      switch (this.activeAction.name) {
        case 'add':
          this.addProductToDatabase(this.payload)
          break
        case 'update':
          break
        case 'remove':
          this.removeProductsFromDatabase()
          break
      }
    },

    cancelAction () {
      this.changeActionStatus({
        name: 'remove',
        payload: null
      })
    }
  },
  created () {
  },
  props: ['appAction', 'payload']
}
</script>

<style scoped>
.Confirmation {
}
.Confirmation__button {
  margin-top: 1rem;
  padding: 1rem;
  width: 50%;
}
.Confirmation__container {
  padding: 1rem;
  background-color: #fff;
  height: 30vh;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>

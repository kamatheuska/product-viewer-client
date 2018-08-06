<template>
  <div class="Home">
    <h3>¡Bienvenido!</h3>
    <div class="Home__container">
      <h1>Productos</h1>
      <button @click="goToAction('add')" class="Home__box">
         <span><i class="fas fa-plus"></i></span>
      </button>
      <button  @click="goToAction('search')" class="Home__box">
         <span><i class="fas fa-search"></i></span>
      </button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'home',
  data () {
    return {
      actions: [
        'search',
        'add',
        'edit',
        'remove'
      ]
    }
  },
  computed: {
  },
  methods: {
    goToAction (action) {
      console.log(action)
      this.$router.push(action)
    }
  },
  filters: {
    toUpperCase (str) {
      return str.toUpperCase()
    },
    translateToSpanish (str) {
      return str === 'search' ? 'buscar'
        : str === 'add' ? 'añadir'
          : str === 'edit' ? 'editar'
            : str === 'remove' ? 'borrar'
              : undefined
    }
  }
}
</script>

<style>
.Home {
  background-color: #f8f7f2;
  border-radius: 10px;
  grid-row: 2 / 3;
  height: 100%;
  padding: 1rem;
}
.Home__container {
  margin-top: .7rem;
  height: 50%;
  width: 100%;
  color: #555;
  grid-column: 1 / 2 ;
  grid-row: 2 / 3 ;
  border: 2px solid #ddd;
  display: grid;
  padding: 2.7rem;
  grid-gap: 1rem;
  align-items: center;
  justify-items: center;
  grid-template-columns: repeat(2, 2fr);
  grid-template-rows: 1fr 4fr;
}
.Home__container h1 { grid-column: 1 / -1 }

.Home__box {
  color: #555;
  grid-row: 2;
  width: 100%;
  height: 100%;
  font-size: 4rem;
  box-shadow: 5px 5px 10px -2px #999;
  border: none;
  border-radius: 10px;
  background-color: rgba(221, 221, 221, 0.8);
}

@media only screen
  and (min-width: 1000px) {
    .Home {
      padding: 1rem 2rem;
      display: grid;
      grid-gap: .7rem;
      height: 100%;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: max-content repeat(2, 2fr);
    }
    .Home h3 {
      grid-column: 1 / -1;
    }
    .Home__container {
      margin-top: .7rem;
      height: 100%;
      color: #555;
      grid-column: 1 / 2 ;
      grid-row: 2 / 3 ;
      grid-template-columns: repeat(2, 2fr);
      grid-template-rows: 1fr 4fr;
      grid-gap: 2rem;
    }
    .Home__box {
      height: 75%;
      width: 75%;
      font-size: 7rem;
    }
}
</style>

<template>
  <div id="app" class="Root">
    <nav class="Navigation__list">
      <ul>
        <li @click="goToAction('app-products')"><i class="fas fa-home"></i></li>
        <li @click="goToAction('app-add')"><i class="fas fa-plus"></i></li>
        <li @click="goToAction('app-search')"><i class="fas fa-search"></i></li>
        <li @click="goToAction('app-edit')"><i class="fas fa-edit"></i></li>
      </ul>
    </nav>
    <header class="Root__header">
      <h5>{{ title | toUpperCase }}</h5>
    </header>
    <main class="Root__body">
      <router-view/>
    </main>
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'

export default {
  data () {
    return {
      title: 'Visualizador de Base de Datos'
    }
  },
  computed: {
    // getInnerMeasures () {
    //   let width = window.innerWidth
    //   let height =  window.innerHeight
    // }
  },
  methods: {
    goToAction (action) {
      this.$router.push({ name: action })
      this.$store.commit('CLEAR_RESULTS_DATA')
    }
  },
  components: {
    'app-footer': Footer
  },
  filters: {
    toUpperCase (str) {
      return str.toUpperCase()
    }
  }
}
</script>

<style>

/*=========================*\
  #FONTS

  font-family: 'Montserrat', sans-serif;
  font-family: 'Roboto', sans-serif;

\*=========================*/
/*=========================*\
  #RESET
\*=========================*/
body {
  /*overflow: hidden;*/
}
body, html {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  color: #fff;
  font-size: 10px;
  font-family: 'Montserrat', sans-serif;
}
ul, menu, dir {
  margin: 0;
  padding: 0;
}
html * {
  box-sizing: border-box;
}
a {
  display: block;
  text-decoration: none;
  color: inherit;
}
select,
input {
  font-family: monospace;
  border: 1px #ccc solid;
  padding: 1.2rem 1.6rem;
  background-color: #fff;
  width: 20rem;
}
h1, h2, h3, h4, h5, h6 {
  -webkit-margin-before: 0.1em;
  -webkit-margin-after: 0.1em;
}
li { list-style-type: none }

h1 { font-size: 3.5rem }
h2 { font-size: 2.8rem }
h3 { font-size: 2.3rem }
h4 { font-size: 1.9rem }
h5 { font-size: 1.6rem }
h6 { font-size: 1.3rem }

input[type="color"],
input[type="date"],
input[type="datetime"],
input[type="datetime-local"],
input[type="email"],
input[type="month"],
input[type="number"],
input[type="password"],
input[type="search"],
input[type="tel"],
input[type="text"],
input[type="time"],
input[type="url"],
input[type="week"],
select:focus,
textarea {
  font-size: 16px;
}
fieldset {
  border-radius: 5px;
  margin-top: 5px;
}
/*select {
  background-color: #fff;
  padding: .3rem .6rem;
  font-family: monospace;
}*/
.input__number {
  width: 6rem;
}

/*=========================*\
  #BUTTON
\*=========================*/
button {
  font-family: 'Montserrat', sans-serif;
  position: relative;
  background: none;
  cursor: pointer;
  color: #555;
}
.button {
  border: 1px solid #ddd;
  min-height: 4rem;
  height: 10rem;
  width: 100%;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 5px 5px 10px -1px #ccc;
  border-radius: 10px;
}
.button__small {
  border: 1px solid #ddd;
  margin-left: 1rem;
  border-radius: 4px;
  width: 25vmin;
}
.button-primary {
  background-color: #2c90cd;
  color: #fff;
  padding: .6rem 1rem;
}
.button-danger {
  background-color: #db7373;
  color: #fff;
  padding: .6rem 1rem;
}
.button-info {
  background-color: #7973db;
  color: #fff;
  padding: .6rem 1rem;
}
/*=========================*\
  #CONTAINER
\*=========================*/

/*
  #F9AA33; /* Amarillo
  #4A6572; /* azul
  #344955; /* azul+
  #232F34; /* azul++
  #17262A; /* azulverde
*/

#app {
  overflow-x: hidden;
  background-color: #232F34; /* azul++ */
  height: 100%;
  width: 100vw;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.Root {
  grid-template-columns: 100vw;
  grid-gap: 10px;
  text-align: center;
}
.Root__header {
  top: 3.3rem;
  width: 100%;
  padding: 0.5rem;
  background-color: #4A6572; /* azul */
  justify-content: center;
  align-self: center;
  display: flex;
  position: fixed;
  z-index: 100;
  box-shadow: 5px 5px 15px -1px #010101;
}
.Root__body {
  top: 8rem;
  height: 100%;
  padding: 0.5rem 3rem;
}
.container__absolute {
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #44444499;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100001;
}

.container__component {
  height: 100%;
}

.Navigation__list {
  padding: 3px;
  position: fixed;
  height: 4rem;
  width: 100%;
  z-index: 100;
  background-color: #232F34; /* azul++ */
}
.Navigation__list ul {
  width: 100%;
  height: 100%;
  display: flex;
  font-size: 2rem;
  justify-content: space-around;
}
/*=========================*\
  #VUE #TRANSITIONS
\*=========================*/

.fade-enter-active{
  transition: opacity 0.8s;
}
.fade-leave-active {  transition: opacity 0.3s }
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(5rem);
  opacity: 0;
}

/*=========================*\
  #PSEUDO ELEMENTS
\*=========================*/

/*input:invalid + span:after,
select:invalid + span:after {
  content: '✖';
  color: #ff8b8b;
  padding: 0 0.5rem;
  font-size: 2rem;
  vertical-align: middle;
}
input:valid + span:after,
select:valid + span:after {
  content: '✓';
  color: #11950d;
  padding: 0 0.5rem;
  font-size: 2rem;
  vertical-align: middle;
}*/

/*=========================*\
  #MEDIA-QUERIES
\*=========================*/
@media only screen
  and (max-width: 750px) {
/*   .Root {
      padding: 10px 10rem;
      display: grid;
      grid-template-columns: auto;
      grid-template-rows: 3rem 90% 3rem;
    }
    .Root__header { grid-column: 1 / -1 }*/
    .Root__body {
      padding: 0.5rem;
      height: 100%;
    }
    .Root__footer { grid-column: 1 / -1 }
  }

/*@media only screen
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

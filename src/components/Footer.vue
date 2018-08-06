<template>
  <footer class="Root__footer">
    <nav class="Navigation__list">
     <ul>
       <li @click="goToAction('app-home')"><i class="fas fa-home"></i></li>
       <li @click="goToAction('app-add')"><i class="fas fa-plus"></i></li>
       <li @click="goToAction('app-search')"><i class="fas fa-search"></i></li>
       <li @click="goToAction('app-edit')"><i class="fas fa-edit"></i></li>
     </ul>
    </nav>
  </footer>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'app-footer',
  data () {
    return {
    }
  },
  computed: {
    ...mapState([ 'actions', 'results' ])
  },
  methods: {
    goToAction (action) {
      console.log(action)
      this.$router.push({ name: action })
      this.$store.commit('CLEAR_RESULTS_DATA')
    }
  }
}
</script>
<style scoped>
.Root__footer {
}
.Navigation__list {
  width: 100%
}
.Navigation__list ul {
  width: 100%;
  display: flex;
  font-size: 2rem;
  justify-content: space-around;
}

</style>

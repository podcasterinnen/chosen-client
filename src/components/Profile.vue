<template>
  <div>
    Dein Profil
    <podcasterin :id="1"></podcasterin>
  </div>
</template>

<script>
import podcasterin from './Podcasterin.vue'

export default {
  name: 'Profile',
  components: {
    podcasterin
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

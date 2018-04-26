<template>
  <div>
    <div v-if="loading">
      Loading...
    </div>
    <div v-if="error">
      {{ error }}
    </div>
    <div v-if="profiles">
      Profiles
      <ul>
        <li v-for="profile in this.profiles.data" :key="profile.id">
          {{ profile.forename }} {{ profile.surname}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profiles',
  data () {
    return {
      loading: false,
      profiles: null,
      error: null
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      let targetUrl = 'https://chosen-cors-proxy.herokuapp.com/podcasters'
      this.error = this.profiles = null
      this.loading = true
      fetch(targetUrl)
        .then((response) => {
          this.loading = false
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' + response.status, response)
            return
          }
          response.json().then((data) => {
            console.log('Data', data)
            this.profiles = data
          })
        })
        .catch((err) => {
          console.log('Fetch Error :-S', err)
          this.error = err
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

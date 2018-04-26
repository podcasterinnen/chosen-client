<template>
  <div>
    <div v-if="loading">
      Loading...
    </div>
    <div v-if="error">
      {{ error }}
    </div>
    <div v-if="profile">
      Podcasterin {{ $route.params.id }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Podcasterin',
  data () {
    return {
      loading: false,
      profile: null,
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
      let id = this.$route.params.id
      let targetUrl = 'https://chosen-cors-proxy.herokuapp.com/podcasters/' + id
      this.error = this.profile = null
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
            this.profile = data
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

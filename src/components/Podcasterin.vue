<template>
  <div>
    <div v-if="loading">
      Loading...
    </div>
    <div v-if="error">
      {{ error }}
    </div>
    <div v-if="profile">
      <h1>{{ profile.forename }} {{ profile.surname }}</h1>
      <p>{{ profile.bio_long }}</p>
      <p>{{ profile.city }}, {{ profile.country }}</p>
      <a :href="profile.twitter_url" target="_blank">{{ profile.forename }} auf Twitter</a><br>
      <a :href="profile.website_url" target="_blank">{{ profile.forename }}'s Webseite</a>
      <h2>Podcasts</h2>
      <ul>
        <li v-for="podcast in profile.podcasts" :key="podcast.id">
          <a :href="podcast.url" target="_blank">{{ podcast.name }}</a>
        </li>
      </ul>
      <h2>Referenzen</h2>
      <ul>
        <li v-for="reference in profile.references" :key="reference.id">
          <a :href="reference.url" target="_blank">{{ reference.title }}</a>
        </li>
      </ul>
      <h2>Sprachen</h2>
      <ul>
        <li v-for="language in profile.languages" :key="language.id">{{ language.name }}</li>
      </ul>
      <h2>Themen</h2>
      <ul>
        <li v-for="tag in profile.tags" :key="tag.id">{{ tag.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Podcasterin',
  props: ['id'],
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
      let id = this.id || this.$route.params.id
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
            this.profile = data.data
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

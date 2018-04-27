<template>
  <div>
    <h1>Dein Profil</h1>
    <podcasterin :id="$session.get('podcaster_id')"></podcasterin>
    <h2>Profil bearbeiten</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="forename">Vorname:</label>
        <input id="forename" placeholder="">
      </div>
      <div>
        <label for="surname">Nachname:</label>
        <input id="surname" placeholder="">
      </div>
      <div>
        <label for="twitter">Twitter-URL:</label>
        <input id="twitter" placeholder="">
      </div>
      <div>
        <label for="website">Webseite:</label>
        <input id="website" placeholder="">
      </div>
      <div>
        <label for="city">Stadt:</label>
        <input id="city" placeholder="">
      </div>
      <div>
        <label for="country">Land:</label>
        <input id="country" placeholder="">
      </div>
      <div>
        <label for="bioshort">Kurz-Biographie:</label>
        <textarea id="bioshort" placeholder=""></textarea>
      </div>
      <div>
        <label for="biolong">Über mich:</label>
        <textarea id="biolong" placeholder=""></textarea>
      </div>
      <div>
        <label for="podcasts">Podcasts:</label>
      </div>
      <div>
        <label for="languages">Sprachen:</label>
      </div>
      <div>
        <label for="tags">Themen:</label>
      </div>
      <div>
        <label for="remote">Remote?</label>
        <input type="checkbox" id="remote">
      </div>
      <button type="submit">Login</button>
    </form>
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

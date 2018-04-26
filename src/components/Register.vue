<template>
  <div>
    <div>
      Register
    </div>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="email">E-Mail-Adresse:</label>
        <input id="email" v-model="user.email" placeholder="deine-email-adresse@mail.com">
      </div>
      <div>
        <label for="forename">Vorname:</label>
        <input id="forename" v-model="user.forename" placeholder="Dein Vorname">
      </div>
      <div>
        <label for="password">Passwort:</label>
        <input id="password" v-model="user.password" placeholder="dein-sicheres-passwort" type="password">
      </div>
      <button type="submit">Registrieren</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      user: {
        email: '',
        forename: '',
        password: ''
      }
    }
  },
  methods: {
    handleSubmit () {
      this.postData('https://chosen-cors-proxy.herokuapp.com/account/user/', {
        email: this.user.email,
        podcasters: {
          forename: this.user.forename
        },
        password: this.user.password
      })
        .then(data => console.log(data))
        .catch(error => console.error(error))
    },
    postData (url, data) {
      return fetch(url, {
        body: JSON.stringify(data),
        cache: 'no-cache',
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST',
        mode: 'cors'
      })
        .then(response => response.json())
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

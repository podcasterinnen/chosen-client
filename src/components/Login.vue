<template>
  <div>
    <div>
      Login
    </div>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="email">E-Mail-Adresse:</label>
        <input id="email" v-model="user.email" placeholder="deine-email-adresse@mail.com">
      </div>
      <div>
        <label for="password">Passwort:</label>
        <input id="password" v-model="user.password" placeholder="dein-sicheres-passwort" type="password">
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    handleSubmit () {
      this.postData('https://chosen-cors-proxy.herokuapp.com/account/sign_in', {
        email: this.user.email,
        password: this.user.password
      })
        .then((data) => {
          console.log(data)
          this.$session.start()
          this.$session.set('jwt', data.data.token)
          this.$http.headers.common['Authorization'] = 'Bearer ' + data.data.token
          this.$router.push('/podcasterinnen')
        })
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

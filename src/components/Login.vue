<template>
  <div>
    <div>
      Login
    </div>
    <div>
      <div>
        <label for="email">E-Mail-Adresse:</label>
        <input id="email" v-model="email" placeholder="deine-email-adresse@mail.com">
      </div>
      <div>
        <label for="password">Passwort:</label>
        <input id="password" v-model="password" placeholder="dein-sicheres-passwort" type="password">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

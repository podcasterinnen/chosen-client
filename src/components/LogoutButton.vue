<template>
  <div>
    <button @click="handleLogout()">Logout</button>
  </div>
</template>

<script>
export default {
  name: 'logout-button',
  methods: {
    handleLogout () {
      this.postData('https://chosen-cors-proxy.herokuapp.com/account/sign_out')
        .then((data) => {
          console.log('Data', data) // Fixme: Sometimes API returns 500
          this.$session.destroy()
        })
        .catch((error) => {
          console.error('Error', error)
          this.$session.destroy()
        }) // API returns a 204: No Content when user is logged out
    },
    postData (url) {
      let token = window.localStorage.getItem('token')
      return fetch(url, {
        cache: 'no-cache',
        headers: {
          'content-type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        method: 'DELETE',
        mode: 'cors'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

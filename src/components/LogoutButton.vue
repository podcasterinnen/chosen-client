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
      console.log('HAndle Logout')
      this.postData('https://chosen-cors-proxy.herokuapp.com/account/sign_out')
        .then(data => console.log(data))
        .catch(error => console.error(error))
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

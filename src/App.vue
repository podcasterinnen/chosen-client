<template>
  <div id="app">
    <navigation></navigation>
    <router-view class="main"/>
    <footerComponent></footerComponent>
  </div>
</template>

<script>
import footerComponent from './components/Footer.vue'
import navigation from './components/Navigation.vue'

export default {
  name: 'App',
  components: {
    footerComponent,
    navigation
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}
body {
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.main {
  min-height: calc(100vh - 60px);
  padding: 80px 0 0 0;
}
</style>

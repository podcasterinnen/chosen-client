<template>
  <header class="header">
    <nav role="navigation">
      <ul class="nav">
        <li class="nav__item"><a href="/" class="nav__item__link">podcasterinnen.org</a></li>
        <li class="nav__item"><a href="/#/podcasterinnen" class="nav__item__link">Podcasterinnen</a></li>
        <li class="nav__item"><a href="/#/about" class="nav__item__link">Über uns</a></li>
        <li class="nav__item nav__item--right"><logout-button></logout-button></li>
      </ul>
    </nav>
  </header>
</template>

<script>
import logoutButton from './LogoutButton.vue'

export default {
  name: 'navigation',
  components: {
    logoutButton
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  position: fixed;
  width: 100%;
}
.nav {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}
.nav__item {}
.nav__item--right {
  margin-left: auto;
}
.nav__item__link {
  color: inherit;
  text-decoration: none;

  display: inline-block;
  padding: 1rem;
}
.nav__item__link:active,
.nav__item__link:hover {}
</style>

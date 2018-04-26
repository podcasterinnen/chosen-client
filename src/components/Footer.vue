<template>
  <footer class="footer">
    <nav role="navigation">
      <ul class="nav">
        <li class="nav__item"><a href="/#/contact" class="nav__item__link">Kontakt</a></li>
        <li class="nav__item"><a href="/#/faq" class="nav__item__link">FAQ</a></li>
        <li class="nav__item"><a href="/#/privacy" class="nav__item__link">Datenschutz</a></li>
      </ul>
    </nav>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footer {
  min-height: 60px;
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

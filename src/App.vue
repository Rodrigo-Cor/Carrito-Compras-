<template>
  <nav v-if="showNavbar">
    <router-link
      to="/captura"
      class="btn btn-primary m-3"
      tabindex="-1"
      role="button"
      >Captura Artículo</router-link
    >
    <router-link
      to="/compra"
      class="btn btn-primary"
      tabindex="-1"
      role="button"
      >Compra de artículos</router-link
    >
  </nav>
  <router-view />
</template>

<script>
export default {
  computed: {
    showNavbar() {
      // Verificar si la ruta actual tiene la propiedad meta y si hideNavbar es falso
      return this.$route.meta && !this.$route.meta.hideNavbar;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}
</style>

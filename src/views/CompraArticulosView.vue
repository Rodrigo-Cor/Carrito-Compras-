<template>
  <div class="about">
    <h1>Hola compras</h1>
    <SearchSection />
  </div>
</template>

<script>
import SearchSection from "@/components/SearchSection.vue";
// @ is an alias to /src

export default {
  name: "CompraArticulosView",
  components: {
    SearchSection,
  },
};
</script>

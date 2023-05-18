<template>
  <div>
    <router-link
      to="/carrito"
      class="btn btn-success"
      tabindex="-1"
      role="button"
    >
      <i class="bi bi-cart-check">Carrito de Compras</i>
    </router-link>
  </div>
  <div class="container">
    <div class="input-group mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="Busqueda de artículos"
        v-model="inputValue"
      />
      <button type="button" class="btn btn-primary" @click="updateData">
        <i class="bi bi-search"></i>
      </button>
    </div>
  </div>
  <CardArticle :input-value="inputValue" ref="childComponent" />
</template>

<script>
import CardArticle from "./CardArticle.vue";

export default {
  name: "SearchSection",
  components: {
    CardArticle,
  },
  data() {
    return {
      inputValue: "",
    };
  },
  methods: {
    updateData() {
      this.$refs.childComponent.getArticles();
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="row">
      <div
        class="col-lg-4 col-md-6 col-sm-12"
        v-for="article in articles"
        :key="article.id"
      >
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${{ article.precio }}</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">
              {{ article.nombre }}
            </h6>
            <div class="row justify-content-between">
              <button
                @click="visualizarOcultarDescripcion(false)"
                :class="{
                  'btn btn-info': mostrarDescripcion,
                  'btn btn-info col-8 m-1': !mostrarDescripcion,
                }"
              >
                Descripción
              </button>
              <button
                @click="visualizarOcultarDescripcion(true)"
                v-if="!mostrarDescripcion"
                class="btn btn-danger col-2"
              >
                <i class="bi bi-x-lg"></i>
              </button>
            </div>
            <p class="card-text" v-if="!mostrarDescripcion">
              {{ article.descripcion }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "CardArticle",
  props: {
    inputValue: String,
  },
  data() {
    return {
      articles: [
        { nombre: "Hola", precio: "100", descripcion: "Hola" },
      ],
      mostrarDescripcion: true,
    };
  },
  methods: {
    visualizarOcultarDescripcion(parametro) {
      this.mostrarDescripcion = parametro;
      console.log(this.inputValue)
    },
  },
};
</script>

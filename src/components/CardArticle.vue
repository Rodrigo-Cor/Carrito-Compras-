<template>
  <div class="container">
    <div class="row">
      <div
        class="col-lg-4 col-md-6 col-sm-12"
        v-for="article in articles"
        :key="article.id"
      >
        <div class="card">
          <img
            :src="'data:image/jpeg;base64,' + article.foto"
            class="card-img-top img-fluid"
          />
          <div class="card-body">
            <h5 class="card-title">${{ article.precio }}</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">
              {{ article.nombre }}
            </h6>
            <div class="row justify-content-between">
              <button
                @click="visualizarOcultarDescripcion(article)"
                :class="{
                  'btn btn-info': article.mostrarDescripcion,
                  'btn btn-info col-8 m-1': !article.mostrarDescripcion,
                }"
              >
                Descripción
              </button>
              <button
                @click="visualizarOcultarDescripcion(article)"
                v-if="!article.mostrarDescripcion"
                class="btn btn-danger col-2"
              >
                <i class="bi bi-x-lg"></i>
              </button>
            </div>
            <p class="card-text" v-if="!article.mostrarDescripcion">
              {{ article.descripcion }}
            </p>
            <div class="row justify-content-around my-2">
              <div class="col-6">
                <button class="btn btn-success" @click="hacerCompra(article)">
                  Comprar
                </button>
              </div>
              <div class="col-6">
                <input
                  type="number"
                  class="form-control"
                  v-model="article.cantidad"
                  :class="{ 'is-invalid': !cantidadValida }"
                  placeholder="Cantidad a comprar"
                  min="1"
                />
                <div v-if="!cantidadValida" class="invalid-feedback">
                  La cantidad solo se permiten números enteros mayores a 0.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "CardArticle",
  props: {
    inputValue: String,
  },
  data() {
    return {
      articles: [],
      cantidadValida: true,
    };
  },
  methods: {
    visualizarOcultarDescripcion(article) {
      article.mostrarDescripcion = !article.mostrarDescripcion;
    },
    async getArticles() {
      const busqueda = {
        busqueda: this.inputValue,
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        "http://20.106.96.131:8080/Servicio/rest/ws/consulta_articulo",
        busqueda,
        config
      );
      const articlesData = await response.data;
      // Agregar la nueva propiedad 'mostrarDescripcion' a cada objeto 'article'
      const articlesWithProperties = articlesData.map((article) => {
        article.cantidad = 1;
        return {
          ...article,
          mostrarDescripcion: true, // Valor inicial para la nueva propiedad
        };
      });

      this.articles = articlesWithProperties;
      //console.log(this.articles[0].foto);
    },
    async hacerCompra(article) {
      const displayMessage = (message, icon) => {
        Swal.fire({
          title: message,
          icon: icon,
          toast: true,
          timerProgressBar: true,
          timer: 3000,
          showConfirmButton: false,
        });
      };
      const compra = {
        nombre: article.nombre,
        descripcion: article.descripcion,
        cantidad: article.cantidad,
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        const response = await axios.post(
          "http://20.106.96.131:8080/Servicio/rest/ws/comprar_articulo",
          compra,
          config
        );
        if (response.status === 200) {
          displayMessage(response.data, "success");
        } else {
          throw new Error("Ocurrió un error al capturar el artículo");
        }
      } catch (error) {
        displayMessage("No hay suficiente stock para el artículo solicitado", "error");
      }

    },
  },
};
</script>

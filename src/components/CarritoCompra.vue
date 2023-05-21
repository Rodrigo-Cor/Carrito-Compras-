<template>
  <div>
    <div class="d-flex justify-content-around align-items-center my-2">
      <button class="btn btn-danger" @click="eliminarCarritoConfirmado">
        <i class="bi bi-trash"></i> Eliminar carrito de compras
      </button>
      <router-link
        to="/compra"
        class="btn btn-success ml-2"
        tabindex="-1"
        role="button"
        >Seguir comprando
      </router-link>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Cantidad</th>
          <th scope="col">Precio</th>
          <th scope="col">Costo</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(article, index) in articlesCarrito" :key="index">
          <th scope="row">{{ index + 1 }}</th>
          <td>
            <p>{{ article.nombre }}</p>
            <img
              :src="'data:image/jpeg;base64,' + article.foto"
              class="img-thumbnail"
              style="width: 50%; height: auto"
            />
          </td>
          <div class="d-flex justify-content-between align-items-center">
            <button
              class="btn btn-primary btn-sm"
              @click="disminuirCantidadCarrito(article)"
            >
              -1
            </button>
            <span class="mx-2">{{ article.cantidad }}</span>
            <button
              class="btn btn-danger btn-sm"
              @click="aumentarCantidadCarrito(article)"
            >
              +1
            </button>
          </div>
          <td>{{ article.precio }}</td>
          <td>{{ article.precio * article.cantidad }}</td>
          <td>
            <button
              class="btn btn-danger btn-sm"
              @click="eliminarArticulo(article)"
            >
              <i class="bi bi-x-lg"></i>
            </button>
          </td>
        </tr>
        <tr>
          <td colspan="4" class="text-end">Total</td>
          <td>{{ calcularTotal() }}</td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {
  getArticlesCarrito,
  obtenerCarrito,
  eliminarArticuloCarrito,
  aumentarCantidad,
  disminuirCantidad,
  eliminarCarrito,
} from "@/store";
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "CarritoCompra",
  mounted() {
    this.obtenerCarrito();
  },
  computed: {
    ...mapGetters({
      articlesCarrito: "getArticlesCarrito", // Utiliza el getter importado correctamente
    }),
  },
  methods: {
    ...mapActions({
      obtenerCarrito: "obtenerCarrito",
      eliminarArticuloCarrito: "eliminarArticuloCarrito",
      aumentarCantidad: "aumentarCantidad",
      disminuirCantidad: "disminuirCantidad",
      eliminarCarrito: "eliminarCarrito", // Utiliza la acción importada correctamente
    }),

    calcularTotal() {
      return this.articlesCarrito.reduce((total, article) => {
        return total + article.precio * article.cantidad;
      }, 0);
    },
    eliminarArticulo(article) {
      Swal.fire({
        title: "¿Estás seguro de que deseas eliminar este artículo?",
        showCancelButton: true,
        confirmButtonText: "Si",
        cancelButtonText: "No",
        icon: "warning",
      }).then((result) => {
        if (result.isConfirmed) {
          this.eliminarArticuloConfirmado(article);
        }
      });
    },
    eliminarArticuloConfirmado(article) {
      return new Promise((resolve, reject) => {
        this.eliminarArticuloCarrito(article)
          .then(() => {
            Swal.fire({
              title: "Eliminación exitosa del artículo",
              icon: "success",
              timer: 3000,
              showConfirmButton: false,
            });
            resolve(); // Resolvemos la promesa
          })
          .catch((error) => {
            Swal.fire({
              title: "Error al eliminar el artículo",
              text: error.message,
              icon: "error",
            });
            reject(error); // Rechazamos la promesa con el error
          });
      });
    },
    aumentarCantidadCarrito(article) {
      this.aumentarCantidad(article).catch((error) => {
        console.error("Error al aumentar la cantidad del artículo:", error);
        // No es necesario mostrar una alerta aquí, ya que se muestra en el index.js del store
      });
    },
    disminuirCantidadCarrito(article) {
      if (article.cantidad <= 1) {
        Swal.fire({
          title: "No se puede disminuir la cantidad",
          text: "La cantidad mínima permitida es 1",
          icon: "error",
        });
      } else {
        this.disminuirCantidad(article).catch((error) => {
          console.error("Error al disminuir la cantidad del artículo:", error);
          // No es necesario mostrar una alerta aquí, ya que se muestra en el index.js del store
        });
      }
    },
    eliminarCarritoConfirmado() {
      Swal.fire({
        title: "¿Estás seguro de que deseas eliminar el carrito de compras?",
        showCancelButton: true,
        confirmButtonText: "Si",
        cancelButtonText: "No",
        icon: "warning",
      }).then((result) => {
        if (result.isConfirmed) {
          this.eliminarCarrito()
            .then(() => {
              Swal.fire({
                title: "Carrito de compras eliminado exitosamente",
                icon: "success",
                timer: 3000,
                showConfirmButton: false,
              });
            })
            .catch((error) => {
              Swal.fire({
                title: "Error al eliminar el carrito de compras",
                text: error.message,
                icon: "error",
              });
            });
        }
      });
    },
  },
};
</script>

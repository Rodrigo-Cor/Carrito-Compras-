<template>
  <div>
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
            />
          </td>
          <td>{{ article.cantidad }}</td>
          <td>{{ article.precio }}</td>
          <td>{{ article.precio * article.cantidad }}</td>
          <td>
            <button class="btn btn-danger" @click="eliminarArticulo(article)">
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
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "CarritoCompra",
  mounted() {
    this.mostrarCarrito();
  },
  data() {
    return {
      articlesCarrito: [],
    };
  },
  methods: {
    calcularTotal() {
      return this.articlesCarrito.reduce((total, article) => {
        return total + article.precio * article.cantidad;
      }, 0);
    },
    async mostrarCarrito() {
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

      try {
        const response = await axios.get(
          "http://20.106.96.131:8080/Servicio/rest/ws/mostrar_carrito_compras"
        );
        this.articlesCarrito = await response.data;
      } catch (error) {
        displayMessage(
          "Ocurrio un error al obtener el carrito. Intentelo más tarde",
          "error"
        );
      }
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="row g-3 align-items-center m-2">
      <div class="col-lg-1 col-md-2">
        <label for="inputPassword6" class="col-form-label">Nombre</label>
      </div>
      <div class="col-lg-3 col-md-4">
        <input
          type="text"
          class="form-control"
          v-model="this.formData.nombre"
          :class="{ 'is-invalid': !nombreValido }"
          placeholder="Nombre"
        />
        <div v-if="!nombreValido" class="invalid-feedback">
          El nombre es obligatorio y no se permite signos especiales.
        </div>
      </div>
      <div class="col-lg-1 col-md-2">
        <label for="inputPassword6" class="col-form-label">Descripción</label>
      </div>
      <div class="col-lg-6 col-md-4">
        <input
          type="text"
          class="form-control"
          v-model="this.formData.descripcion"
          :class="{ 'is-invalid': !descripcionValida }"
          placeholder="Descripción"
        />
        <div v-if="!descripcionValida" class="invalid-feedback">
          La descripción es obligatoria y no se permite signos especiales.
        </div>
      </div>
    </div>
    <div class="row g-3 align-items-center m-2">
      <div class="col-lg-1 col-md-2">
        <label for="inputPassword6" class="col-form-label">Precio</label>
      </div>
      <div class="col-lg-3 col-md-4">
        <input
          type="number"
          class="form-control"
          v-model="this.formData.precio"
          step="0.01"
          :class="{ 'is-invalid': !precioValido }"
          placeholder="Precio"
        />
        <div v-if="!precioValido" class="invalid-feedback">
          El precio es obligatorio y solo se permite números con dos decimales.
        </div>
      </div>
      <div class="col-lg-1 col-md-2">
        <label for="inputPassword6" class="col-form-label">Cantidad</label>
      </div>
      <div class="col-lg-6 col-md-4">
        <input
          type="number"
          class="form-control"
          v-model="this.formData.cantidad"
          :class="{ 'is-invalid': !cantidadValida }"
          placeholder="Cantidad"
        />
        <div v-if="!cantidadValida" class="invalid-feedback">
          La cantidad es obligatoria y solo se permite números enteros mayores a
          0.
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row justify-content-start">
        <div class="col-lg-2">
          <img
            v-if="imagenURL"
            :src="imagenURL"
            class="img-fluid"
            alt="Imagen del artículo"
          />
        </div>
      </div>
      <div class="row justify-content-start">
        <div class="col-lg-2">
          <label for="formFile" class="form-label">Foto del artículo</label>
        </div>
        <div class="col-lg-9">
          <input
            class="form-control"
            type="file"
            accept="image/*"
            multiple="false"
            id="formFile"
            :class="{ 'is-invalid': !archivoValido }"
            @change="handleArchivoChange"
            ref="archivoInput"
          />
          <div v-if="!archivoValido" class="invalid-feedback">
            El archivo debe ser una imagen. Formatos válidos png, jpg y gif.
          </div>
        </div>
      </div>
    </div>
    <button type="submit" @click="submitForm" class="btn btn-success mt-3">
      Capturar
    </button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Form",
  data() {
    return {
      formData: {
        nombre: "",
        descripcion: "",
        precio: "",
        cantidad: "",
        foto: "",
      },
      nombreValido: true,
      descripcionValida: true,
      precioValido: true,
      cantidadValida: true,
      archivo: null,
      archivoValido: true,
      imagenURL: "",
    };
  },
  methods: {
    handleArchivoChange(event) {
      this.archivo = event.target.files[0];
      const allowedFormats = ["image/jpeg", "image/png", "image/gif"];

      if (!allowedFormats.includes(this.archivo.type)) {
        this.archivoValido = false;
        event.target.value = "";
        this.imagenURL = "";
        return;
      }

      this.archivoValido = true;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagenURL = reader.result;
        this.formData.foto = reader.result.split(',')[1];
      };
      reader.readAsDataURL(this.archivo);
    },
    async submitForm() {
      const nombrePattern = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/;
      const descripcionPattern = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/;
      const precioPattern = /^\d+(\.\d{1,2})?$/;
      const cantidadPattern = /^[1-9]\d*$/;

      const validarCampo = (valor, expresionRegular) =>
        valor !== "" && expresionRegular.test(valor);

      this.nombreValido = validarCampo(this.formData.nombre, nombrePattern);
      this.descripcionValida = validarCampo(
        this.formData.descripcion,
        descripcionPattern
      );
      this.precioValido = validarCampo(this.formData.precio, precioPattern);
      this.cantidadValida = validarCampo(
        this.formData.cantidad,
        cantidadPattern
      );
      this.archivoValido =
        this.archivo !== null && this.archivo.type.includes("image");
      if (
        this.nombreValido &&
        this.descripcionValida &&
        this.precioValido &&
        this.cantidadValida
      ) {
        console.log(JSON.stringify({ articulo: this.formData }))
        //console.log(this.formData);
        //console.log(JSON.stringify({ articulo: this.formData }));
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const response = await axios.post(
          "http://20.106.96.131:8080/Servicio/rest/ws/alta_articulo",
          JSON.stringify({ articulo: this.formData }),
          config
        );
        const dataRegresado = await response.data;
        console.log(dataRegresado);

        this.formData.nombre = "";
        this.formData.descripcion = "";
        this.formData.precio = "";
        this.formData.cantidad = "";
        this.archivo = null;
        this.imagenURL = "";
        this.$refs.archivoInput.value = "";
      }
    },
  },
};
</script>

<template>
  <div class="container">
    <CarritoCompra />
  </div>
</template>

<script>
import CarritoCompra from "@/components/CarritoCompra.vue";
// @ is an alias to /src

export default {
  name: "CarritoComprasView",
  components: {
    CarritoCompra,
  },
};
</script>

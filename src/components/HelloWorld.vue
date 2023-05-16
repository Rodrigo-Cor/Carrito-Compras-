<template>
  <div class="home">
    <p>Holaaa Mundo</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HelloWorld",
  methods: {
    async getData() {
      const data = {
        busqueda: "mayonesa no rica",
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        "http://20.106.96.131:8080/Servicio/rest/ws/consulta_articulo",
        data,
        config
      );
      const dataRegresado = await response.data;
      console.log(dataRegresado);
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

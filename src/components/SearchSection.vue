<template>
  <div class="container">
    <div class="input-group mb-3">
      <input
        type="text"
        class="form-control"
        placeholder="Busqueda de artículos"
        v-model="inputValue"
        @input="updateData"
      />
      <button type="button" class="btn btn-primary">
        <i class="bi bi-search"></i>
      </button>
    </div>
    <p>{{ dataValue }}</p>
  </div>
  <CardArticle :input-value="dataValue" ref="childComponent"/>
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
      dataValue: "",
    };
  },
  methods: {
    updateData() {
      this.dataValue = this.inputValue;
      /*
      this.$nextTick(() => {
                this.$refs.childComponent.prueba();
                //this.$refs.childComponent.getData();
            });
      */
    },
  },
};
</script>

import { createStore } from 'vuex'
import axios from "axios";
import Swal from "sweetalert2";


export default createStore({
    modules: {
        carrito: {
            state() {
                return {
                    articlesCarrito: []
                };
            },
            getters: {
                getArticlesCarrito(state) {
                    return state.articlesCarrito;
                }
            },
            mutations: {
                actualizarCarrito(state, carrito) {
                    state.articlesCarrito = carrito;
                },
                eliminar(state, article) {
                    const index = state.articlesCarrito.findIndex(a => a.id === article.id);
                    if (index !== -1) {
                        state.articlesCarrito.splice(index, 1);
                    }
                },
                aumentarCantidad(state, article) {
                    const index = state.articlesCarrito.findIndex(a => a.id === article.id);
                    if (index !== -1) {
                        state.articlesCarrito[index].cantidad++;
                    }
                },
                disminuirCantidad(state, article) {
                    const index = state.articlesCarrito.findIndex(a => a.id === article.id);
                    if (index !== -1) {
                        state.articlesCarrito[index].cantidad--;
                    }
                }
            },
            actions: {
                async obtenerCarrito({ commit }) {
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
                        const carritoData = await response.data;
                        commit("actualizarCarrito", carritoData);
                    } catch (error) {
                        displayMessage(
                            "Ocurrio un error al obtener el carrito. Intentelo más tarde",
                            "error"
                        );
                    }
                },
                async eliminarArticuloCarrito({ commit }, article) {
                    const config = {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    };
                    const idArticulo = {
                        id: article.id,
                    }
                    try {
                        await axios.post(
                            "http://20.106.96.131:8080/Servicio/rest/ws/eliminar_articulo"
                            , idArticulo, config);
                        commit("eliminar", article);
                    } catch (error) {
                    }
                },
                async aumentarCantidad({ commit }, article) {
                    try {
                        const config = {
                            headers: {
                                "Content-Type": "application/json",
                            },
                        };
                        const nuevaCantidad = {
                            id: article.id,
                            cantidad: article.cantidad + 1
                        }
                        try {
                            const response = await axios.post(
                                "http://20.106.96.131:8080/Servicio/rest/ws/comprar_articulo"
                                , nuevaCantidad, config);
                            const carritoData = await response.data;
                            commit('aumentarCantidad', article);
                        } catch (error) {
                            //Falta cuando truene la cantidad
                        }
                    } catch (error) {
                        console.error('Error al actualizar la cantidad en el servidor', error);
                    }
                },
                async disminuirCantidad({ commit }, article) {
                    try {
                        const config = {
                            headers: {
                                "Content-Type": "application/json",
                            },
                        };
                        const nuevaCantidad = {
                            id: article.id,
                            cantidad: article.cantidad - 1
                        }
                        try {
                            const response = await axios.post(
                                "http://20.106.96.131:8080/Servicio/rest/ws/comprar_articulo"
                                , nuevaCantidad, config);
                            const carritoData = await response.data;
                            commit('disminuirCantidad', article);
                        } catch (error) {
                            //Falta cuando truene la cantidad
                        }
                    } catch (error) {
                        console.error('Error al actualizar la cantidad en el servidor', error);
                    }
                }
            }
        }
    }
});




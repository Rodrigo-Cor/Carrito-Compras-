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
                eliminarArticuloCarrito(state, article) {
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
                },
                eliminarCarrito(state) {
                    state.articlesCarrito = [];
                },
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
                        commit("eliminarArticuloCarrito", article);
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
                            await axios.post(
                                "http://20.106.96.131:8080/Servicio/rest/ws/comprar_articulo"
                                , nuevaCantidad, config);
                            commit('aumentarCantidad', article);
                        } catch (error) {
                            if (error.response && error.response.status === 404) {
                                Swal.fire({
                                    title: 'Error',
                                    text: 'No hay suficiente stock para el artículo solicitado',
                                    icon: 'error',
                                });
                            } else {
                                Swal.fire({
                                    title: 'Error',
                                    text: 'Error al aumentar la cantidad del artículo',
                                    icon: 'error',
                                });
                            }
                            throw error; // Lanza el error para manejarlo en el componente  
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
                            cantidad: article.cantidad - 1,
                        };

                        if (nuevaCantidad.cantidad < 1) {
                            // Evitar cantidades menores a 1
                            return;
                        }

                        await axios.post(
                            "http://20.106.96.131:8080/Servicio/rest/ws/comprar_articulo",
                            nuevaCantidad,
                            config
                        );
                        commit("disminuirCantidad", article);
                    } catch (error) {
                        console.error("Error al actualizar la cantidad en el servidor", error);
                    }
                },
                async eliminarCarrito({ commit }) {
                    try {
                        await axios.delete("http://20.106.96.131:8080/Servicio/rest/ws/vaciar_carrito");
                        commit('eliminarCarrito');

                    } catch (error) {
                        throw new Error('Error al eliminar el carrito de compras');
                    }
                },
            }
        }
    }
});




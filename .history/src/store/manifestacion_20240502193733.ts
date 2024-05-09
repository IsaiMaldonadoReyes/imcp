import { defineStore } from 'pinia';
import axios from "axios";
import { Storage } from '@ionic/storage';

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;


export const useManifestacionStore = defineStore({
    id: 'manifestacion',
    state: () => ({
        object: {
            listado: {},
            listadoPermisos: {},
            catalogoDisciplina: {}
        },
        responseMessage: "",
        type: "",
        test: "",
        manifestacionesSeleccionadas: {}

    }),
    actions: {

        async registrarManifestacion(informacion: any) {
            const storage = new Storage();
            await storage.create();

            const configAuthToken = await storage.get("configToken");
            try {
                const response = await axios.post("/manifestacion/solicitudes", informacion, configAuthToken);
                this.responseMessage = response.data.sys.mensaje_operacion;
                this.type = response.data.type;
            } catch (error) {
                //throw new Error("Solicitud incorrecta");
            }
        },

        async cargarListado() {
            this.object.listado = {};

            const storage = new Storage();
            await storage.create();

            const configAuthToken = await storage.get("configToken");
            const rfcParam = await storage.get("rfc");

            try {
                const params = {
                    datos: {
                        cuenta_rfc: rfcParam,
                    }
                };

                const response = await axios.get("/manifestacion/solicitudes", {
                    params,
                    headers: configAuthToken.headers,
                });

                if (response.data.type === "success") {
                    this.object.listado = response.data.result.search;
                }
            } catch (error) {
                //throw new Error("Solicitud incorrecta");
            }
        },

        async cargarListadoCapacitacionExterna() {
            this.object.listado = {};

            const storage = new Storage();
            await storage.create();

            const configAuthToken = await storage.get("configToken");
            const rfcParam = await storage.get("rfc");

            try {
                const params = {
                    datos: {
                        cuenta_rfc: rfcParam,
                        //origen: "Externo"
                    }
                };

                const response = await axios.get("/users/eventos_externos", {
                    params,
                    headers: configAuthToken.headers,
                });

                if (response.data.type === "success") {
                    this.object.listado = response.data.result.search;
                }
            } catch (error) {
                //throw new Error("Solicitud incorrecta");
            }
        },

        async cargarListadoPermisos() {
            this.object.listadoPermisos = {};

            const storage = new Storage();
            await storage.create();

            const configAuthToken = await storage.get("configToken");
            const rfcParam = await storage.get("rfc");

            try {
                const params = {
                    datos: {
                        cuenta_rfc: rfcParam,
                    }
                };

                const response = await axios.get("/manifestacion/permitidos", {
                    params,
                    headers: configAuthToken.headers,
                });

                if (response.data.type === "success") {
                    this.object.listadoPermisos = response.data.result.search;
                }
            } catch (error) {
                //throw new Error("Solicitud incorrecta");
            }
        },
    }
});
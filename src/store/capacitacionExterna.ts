import { defineStore } from 'pinia';
import axios from "axios";
import { Storage } from '@ionic/storage';

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;


export const useCapacitacionStore = defineStore({
    id: 'capacitacionExterna',
    state: () => ({
        object: {
            listado: {dataset: [], totalSize : 0},
            catalogoDisciplina: {result: []},
            catalogoModalidad: {result: []},
            catalogoColegio: {result: []},
            catalogoImss: {result: []},
        },
        responseMessage: "",
        type: ""
    }),
    actions: {

        async registrarCapacitacion(informacion: any) {
            const storage = new Storage();
            await storage.create();

            const configAuthToken = await storage.get("configToken");
            try {
                const response = await axios.post("/users/eventos_externos", informacion, configAuthToken);
                this.responseMessage = response.data.sys.mensaje_operacion;
                this.type = response.data.type;
            } catch (error) {
                //throw new Error("Solicitud incorrecta");
            }
        },

        async cargarCatalogoDisciplina() {
            this.object.catalogoDisciplina = { result: [] };

            const storage = new Storage();
            await storage.create();

            const configAuthToken = await storage.get("configToken");

            try {

                const response = await axios.get("/users/catalogos/catalogoEspecialidad", {
                    headers: configAuthToken.headers,
                });

                if (response.data.type === "success") {
                    this.object.catalogoDisciplina = response.data;
                }
            } catch (error) {
                //throw new Error("Solicitud incorrecta");
            }
        },

        async cargarCatalogoImss() {
            this.object.catalogoImss = { result: [] };
            const storage = new Storage();
            await storage.create();

            const configAuthToken = await storage.get("configToken");

            try {

                const response = await axios.get("/users/catalogos/temasImss", {
                    headers: configAuthToken.headers,
                });

                if (response.data.type === "success") {
                    this.object.catalogoImss = response.data;
                }
            } catch (error) {
                //throw new Error("Solicitud incorrecta");
            }
        },

        async cargarCatalogoColegios() {

            this.object.catalogoColegio = { result: [] };

            const storage = new Storage();
            await storage.create();

            const configAuthToken = await storage.get("configToken");

            try {

                const response = await axios.get("/users/catalogos/colegios", {
                    headers: configAuthToken.headers,
                });

                if (response.data.type === "success") {
                    this.object.catalogoColegio = response.data;
                }
            } catch (error) {
                //throw new Error("Solicitud incorrecta");
            }
        },

        async cargarCatalogoModalidad() {
            this.object.catalogoModalidad = { result: [] };

            const storage = new Storage();
            await storage.create();

            const configAuthToken = await storage.get("configToken");

            try {

                const response = await axios.get("/users/catalogos/eventoModalidad", {
                    headers: configAuthToken.headers,
                });

                if (response.data.type === "success") {
                    this.object.catalogoModalidad = response.data;
                }
            } catch (error) {
                //throw new Error("Solicitud incorrecta");
            }
        },

        async cargarListado() {

            this.object.listado = {dataset: [], totalSize: 0};

            const storage = new Storage();
            await storage.create();

            const configAuthToken = await storage.get("configToken");
            const rfcParam = await storage.get("rfc");

            try {
                const params = {
                    datos: {
                        cuenta_rfc: rfcParam,
                        //origen: "Externo",
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
    }
});
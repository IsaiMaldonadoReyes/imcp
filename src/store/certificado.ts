import { defineStore } from 'pinia';
import axios from "axios";
import { Storage } from '@ionic/storage';

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;


export const useCertificadoStore = defineStore({
    id: 'certificado',
    state: () => ({
        object: {
            certificadosPendientes: {}
        },
        responseMessage: null,
    }),
    actions: {

        async cargarCertificadosPendientes() {
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

                const response = await axios.get("/users/certificados", {
                    params,
                    headers: configAuthToken.headers,
                });

                if (response.data.type === "success") {
                    this.object.certificadosPendientes = response.data.result.search;
                }
            } catch (error) {
                throw new Error("Solicitud incorrecta");
            }
        },


    }
});
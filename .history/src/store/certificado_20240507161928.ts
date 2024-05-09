import { defineStore } from 'pinia';
import axios from "axios";
import { Storage } from '@ionic/storage';

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;


export const useCertificadoStore = defineStore({
    id: 'certificado',
    state: () => ({
        object: {
            certificadosPendientes: {dataset: [], totalSize: 0},
            certificadosEmitidos: { dataset: [], totalSize: 0 },
            puntosPorCertificado: {},
            desglosePuntos: {},
            rutaPdf: '',
        },
        responseMessage: "",
        type: ""
    }),
    actions: {

        async actualizarDatos(informacion: any) {
            const storage = new Storage();
            await storage.create();

            const configAuthToken = await storage.get("configToken");
            try {
                const response = await axios.put("/users/editar", informacion, configAuthToken);
                this.responseMessage = response.data.sys.mensaje_operacion;
                this.type = response.data.type;
            } catch (error) {
                //throw new Error("Solicitud incorrecta");
            }
        },

        async cargarCertificadosPendientes() {

            this.object.certificadosPendientes = {};

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
                //throw new Error("Solicitud incorrecta");
            }
        },

        async cargarCertificadosEmitidos() {

            this.object.certificadosEmitidos = { dataset: [], totalSize: 0 };

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

                const response = await axios.get("/users/certificados_listado", {
                    params,
                    headers: configAuthToken.headers,
                });

                if (response.data.type === "success") {
                    this.object.certificadosEmitidos = response.data.result.search;
                }
            } catch (error) {
                //throw new Error("Solicitud incorrecta");
            }
        },

        async cargarPuntosPorCertificado(idCertificado: any, anhioInicio: any, anhioFin: any) {
            const storage = new Storage();
            await storage.create();

            const configAuthToken = await storage.get("configToken");
            const rfcParam = await storage.get("rfc");

            try {
                const params = {
                    datos: {
                        cuenta_rfc: rfcParam,
                        id_certificado_dis: idCertificado,
                        anhio_inicio_vigencia: anhioInicio,
                        anhio_fin_vigencia: anhioFin
                    }
                };

                const response = await axios.get("/users/revison_puntos", {
                    params,
                    headers: configAuthToken.headers,
                });

                if (response.data.type === "success") {
                    this.object.puntosPorCertificado = response.data.result.search;
                }
            } catch (error) {
                //throw new Error("Solicitud incorrecta");
            }
        },

        async desglosePuntosPorCertificado(id_certificado: any, ejercicio: any) {
            const storage = new Storage();
            await storage.create();

            const configAuthToken = await storage.get("configToken");
            const rfcParam = await storage.get("rfc");

            try {
                const params = {
                    datos: {
                        cuenta_rfc: rfcParam,
                        anhio: ejercicio,
                        id_certificado_dis: id_certificado
                    }
                };

                const response = await axios.get("/users/puntos_desglose", {
                    params,
                    headers: configAuthToken.headers,
                });

                if (response.data.type === "success") {
                    this.object.desglosePuntos = response.data.result;
                }
            } catch (error) {
                //throw new Error("Solicitud incorrecta");
            }
        },

        async desglosePuntosPorEjercicioPdf(id_certificado: any, ejercicio: any) {
            const storage = new Storage();
            await storage.create();

            const configAuthToken = await storage.get("configToken");
            const rfcParam = await storage.get("rfc");

            try {
                const params = {
                    datos: {
                        cuenta_rfc: rfcParam,
                        anhio: ejercicio,
                        id_certificado_dis: id_certificado
                    }
                };

                const response = await axios.get("/users/puntos_desglose/pdfDesglose", {
                    params,
                    headers: configAuthToken.headers,
                });

                if (response.data.type === "success") {
                    this.object.rutaPdf = response.data.result.dir;
                }
            } catch (error) {
                //throw new Error("Solicitud incorrecta");
            }
        },
    }
});
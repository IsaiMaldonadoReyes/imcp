import { defineStore } from 'pinia';
import axios from "axios";
import { Storage } from '@ionic/storage';

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;


export const usePagoStore = defineStore({
    id: 'pago',
    state: () => ({
        object: {
            catalogoGenero: {},
            catalogoEstadoCivil: {},
            catalogoColegio: {},
            catalogoSector: {},
            catalogoEspecialidad: {},
            catalogoAnioTitulacion: {},
            catalogoAnioNacimiento: {},
            catalogoTipoPersona: {},
            catalogoFisico: { result: [], type: "" },
            catalogoMoral: { result: [], type: "" },
            catalogoGradoAcademico: {},
            puntosPorCertificado: {},
            contacto: {},
            informacion: {},
            codigoPostal: {},
            pago: {},
        },
        responseMessage: null,
    }),
    actions: {

        async cargarPago(token: any, fecha: any) {
            const storage = new Storage();
            await storage.create();

            const configAuthToken = await storage.get("configToken");
            const rfcParam = await storage.get("rfc");

            try {

                const params = {
                    datos: {
                        cuenta_rfc: rfcParam,
                        token: token,
                        date: fecha
                    }
                };

                const response = await axios.get("/users/cron", {
                    headers: configAuthToken.headers,
                    params
                });

                if (response.data.type === "success") {
                    this.object.pago = response.data.result;
                }
            } catch (error) {
                //throw new Error("Solicitud incorrecta");
            }
        },

        async cargarContacto() {
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

                const response = await axios.get("/users/contacto", {
                    headers: configAuthToken.headers,
                    params
                });

                if (response.data.type === "success") {
                    this.object.contacto = response.data.result;
                }
            } catch (error) {
                //throw new Error("Solicitud incorrecta");
            }
        },

        async cargarContactoInformacion() {
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

                const response = await axios.get("/users/informacion", {
                    headers: configAuthToken.headers,
                    params
                });

                if (response.data.type === "success") {
                    this.object.informacion = response.data.result;
                }
            } catch (error) {
                //throw new Error("Solicitud incorrecta");
            }
        },


        async cargarCatalogoTipoPersona() {
            const storage = new Storage();
            await storage.create();

            const configAuthToken = await storage.get("configToken");

            try {

                const response = await axios.get("/users/catalogos/tipoPersona", {
                    headers: configAuthToken.headers,
                });

                if (response.data.type === "success") {
                    this.object.catalogoTipoPersona = response.data;
                }
            } catch (error) {
                //throw new Error("Solicitud incorrecta");
            }
        },

        async cargarCatalogoTipoPersonaFisica() {
            const storage = new Storage();
            await storage.create();

            const configAuthToken = await storage.get("configToken");

            try {

                const response = await axios.get("/users/catalogos/fisica", {
                    headers: configAuthToken.headers,
                });

                if (response.data.type === "success") {
                    this.object.catalogoFisico = response.data;
                }
            } catch (error) {
                //throw new Error("Solicitud incorrecta");
            }
        },
        async cargarCatalogoTipoPersonaMoral() {
            const storage = new Storage();
            await storage.create();

            const configAuthToken = await storage.get("configToken");

            try {

                const response = await axios.get("/users/catalogos/moral", {
                    headers: configAuthToken.headers,
                });

                if (response.data.type === "success") {
                    this.object.catalogoMoral = response.data;
                }
            } catch (error) {
                //throw new Error("Solicitud incorrecta");
            }
        },

        async cargarCatalogoAnioNacimiento() {
            const storage = new Storage();
            await storage.create();

            const configAuthToken = await storage.get("configToken");

            try {

                const response = await axios.get("/users/catalogos/anhiosListado1", {
                    headers: configAuthToken.headers,
                });

                if (response.data.type === "success") {
                    this.object.catalogoAnioNacimiento = response.data;
                }
            } catch (error) {
                //throw new Error("Solicitud incorrecta");
            }
        },

        async cargarCatalogoGradoAcademico() {
            const storage = new Storage();
            await storage.create();

            const configAuthToken = await storage.get("configToken");

            try {

                const response = await axios.get("/users/catalogos/gradoAcademico", {
                    headers: configAuthToken.headers,
                });

                if (response.data.type === "success") {
                    this.object.catalogoGradoAcademico = response.data;
                }
            } catch (error) {
                //throw new Error("Solicitud incorrecta");
            }
        },

        async cargarCatalogoAnioTitulacion() {
            const storage = new Storage();
            await storage.create();

            const configAuthToken = await storage.get("configToken");

            try {

                const response = await axios.get("/users/catalogos/anhiosListado", {
                    headers: configAuthToken.headers,
                });

                if (response.data.type === "success") {
                    this.object.catalogoAnioTitulacion = response.data;
                }
            } catch (error) {
                //throw new Error("Solicitud incorrecta");
            }
        },

        async cargarCatalogoGenero() {
            const storage = new Storage();
            await storage.create();

            const configAuthToken = await storage.get("configToken");

            try {

                const response = await axios.get("/users/catalogos/sexo", {
                    headers: configAuthToken.headers,
                });

                if (response.data.type === "success") {
                    this.object.catalogoGenero = response.data;
                }
            } catch (error) {
                //throw new Error("Solicitud incorrecta");
            }
        },

        async cargarCatalogoEstadoCivil() {
            const storage = new Storage();
            await storage.create();

            const configAuthToken = await storage.get("configToken");

            try {

                const response = await axios.get("/users/catalogos/estadoCivil", {
                    headers: configAuthToken.headers,
                });

                if (response.data.type === "success") {
                    this.object.catalogoEstadoCivil = response.data;
                }
            } catch (error) {
                //throw new Error("Solicitud incorrecta");
            }
        },

        async cargarCatalogoColegio() {
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

        async cargarCatalogoSector() {
            const storage = new Storage();
            await storage.create();

            const configAuthToken = await storage.get("configToken");

            try {

                const response = await axios.get("/users/catalogos/sectores", {
                    headers: configAuthToken.headers,
                });

                if (response.data.type === "success") {
                    this.object.catalogoSector = response.data;
                }
            } catch (error) {
                //throw new Error("Solicitud incorrecta");
            }
        },

        async cargarCatalogoSectorEspecial() {
            const storage = new Storage();
            await storage.create();

            const configAuthToken = await storage.get("configToken");

            try {

                const response = await axios.get("/users/catalogos/sectoresEspecial", {
                    headers: configAuthToken.headers,
                });

                if (response.data.type === "success") {
                    this.object.catalogoSector = response.data;
                }
            } catch (error) {
                //throw new Error("Solicitud incorrecta");
            }
        },

        async cargarCatalogoEspecialidad() {
            const storage = new Storage();
            await storage.create();

            const configAuthToken = await storage.get("configToken");

            try {

                const response = await axios.get("/users/catalogos/especialidades", {
                    headers: configAuthToken.headers,
                });

                if (response.data.type === "success") {
                    this.object.catalogoEspecialidad = response.data;
                }
            } catch (error) {
                //throw new Error("Solicitud incorrecta");
            }
        },
        async cargarCatalogoCodigoPostal(codigo: string) {
            const storage = new Storage();
            await storage.create();

            const configAuthToken = await storage.get("configToken");

            try {
                const params = {
                    code: codigo,
                };

                const response = await axios.get("/users/catalogos/cpostal", {
                    headers: configAuthToken.headers,
                    params: params
                });

                if (response.data.type === "success") {
                    this.object.codigoPostal = response.data;
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
    }
});
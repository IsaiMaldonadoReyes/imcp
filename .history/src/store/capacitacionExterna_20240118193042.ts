import { defineStore } from 'pinia';
import axios from "axios";
import { Storage } from '@ionic/storage';

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;


export const useCapacitacionStore = defineStore({
    id: 'capacitacionExterna',
    state: () => ({
        object: {
            certificadosPendientes: {},
            certificadosEmitidos: {},
            puntosPorCertificado: {},
            desglosePuntos: {},
            listado: {}

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

                const response = await axios.get("/users/eventos_externos", {
                    params,
                    headers: configAuthToken.headers,
                });

                if (response.data.type === "success") {
                    //this.object.listado = response.data.result.search;

                    this.object.listado = {
                        "dataset": [
                            {
                                "externo_evento_id": 1,
                                "usuario_id": null,
                                "cuentas_usuarios_id": 16084,
                                "id_colegio": 4,
                                "nombre_evento": "Tres comisiones: CROSS, CONAA y Comisión fiscal 2024",
                                "eventos_sede": "CCP Culiacán",
                                "expositor": "Colegioados",
                                "eventos_fecha_inicio": "2023-12-21 16:54:04",
                                "eventos_fecha_fin": "2023-12-21 16:54:04",
                                "comentarios_autorizacion": "",
                                "comentarios_rechazo": "",
                                "telefono": "134678999",
                                "email": "prueba@corre.com",
                                "status": "Solicitud",
                                "datecreation": "2023-12-21 16:54:04",
                                "externo_archivos_id": "1",
                                "externo_puntos_id": "1",
                                "archivo": null,
                                "status_archivo": "Activo",
                                "disiplinas_id": 7,
                                "puntos": 1,
                                "horas": 1,
                                "modalidad": "Presencial",
                                "status_puntos": "Activo",
                                "cuenta_rfc": "AUGA700511779",
                                "cuenta_nombre": "Alejandro",
                                "cuenta_apaterno": "...",
                                "cuenta_amatarno": "Garcia",
                                "expositor_status": "No",
                                "externo_archivos": [
                                    {
                                        "externoArchivosId": 1,
                                        "externoEventoId": 1,
                                        "status": "Activo"
                                    }
                                ],
                                "externo_puntos": [
                                    {
                                        "externoPuntosId": 1,
                                        "externoEventoId": 1,
                                        "disiplinasId": 7,
                                        "disiplinas": "Economía",
                                        "puntos": 1,
                                        "horas": 1,
                                        "modalidad": "Presencial",
                                        "status": "Activo"
                                    }
                                ]
                            },
                            {
                                "externo_evento_id": 1,
                                "usuario_id": null,
                                "cuentas_usuarios_id": 16084,
                                "id_colegio": 4,
                                "nombre_evento": "Tres comisiones: CROSS, CONAA y Comisión fiscal 2024",
                                "eventos_sede": "CCP Culiacán",
                                "expositor": "Colegioados",
                                "eventos_fecha_inicio": "2023-12-21 16:54:04",
                                "eventos_fecha_fin": "2023-12-21 16:54:04",
                                "comentarios_autorizacion": "",
                                "comentarios_rechazo": "",
                                "telefono": "134678999",
                                "email": "prueba@corre.com",
                                "status": "Solicitud",
                                "datecreation": "2023-12-21 16:54:04",
                                "externo_archivos_id": "1",
                                "externo_puntos_id": "1",
                                "archivo": null,
                                "status_archivo": "Activo",
                                "disiplinas_id": 7,
                                "puntos": 1,
                                "horas": 1,
                                "modalidad": "Presencial",
                                "status_puntos": "Activo",
                                "cuenta_rfc": "AUGA700511779",
                                "cuenta_nombre": "Alejandro",
                                "cuenta_apaterno": "...",
                                "cuenta_amatarno": "Garcia",
                                "expositor_status": "No",
                                "externo_archivos": [
                                    {
                                        "externoArchivosId": 1,
                                        "externoEventoId": 1,
                                        "status": "Activo"
                                    }
                                ],
                                "externo_puntos": [
                                    {
                                        "externoPuntosId": 1,
                                        "externoEventoId": 1,
                                        "disiplinasId": 7,
                                        "disiplinas": "Economía",
                                        "puntos": 1,
                                        "horas": 1,
                                        "modalidad": "Presencial",
                                        "status": "Activo"
                                    }
                                ]
                            },
                            {
                                "externo_evento_id": 1,
                                "usuario_id": null,
                                "cuentas_usuarios_id": 16084,
                                "id_colegio": 4,
                                "nombre_evento": "Tres comisiones: CROSS, CONAA y Comisión fiscal 2024",
                                "eventos_sede": "CCP Culiacán",
                                "expositor": "Colegioados",
                                "eventos_fecha_inicio": "2023-12-21 16:54:04",
                                "eventos_fecha_fin": "2023-12-21 16:54:04",
                                "comentarios_autorizacion": "",
                                "comentarios_rechazo": "",
                                "telefono": "134678999",
                                "email": "prueba@corre.com",
                                "status": "Solicitud",
                                "datecreation": "2023-12-21 16:54:04",
                                "externo_archivos_id": "1",
                                "externo_puntos_id": "1",
                                "archivo": null,
                                "status_archivo": "Activo",
                                "disiplinas_id": 7,
                                "puntos": 1,
                                "horas": 1,
                                "modalidad": "Presencial",
                                "status_puntos": "Activo",
                                "cuenta_rfc": "AUGA700511779",
                                "cuenta_nombre": "Alejandro",
                                "cuenta_apaterno": "...",
                                "cuenta_amatarno": "Garcia",
                                "expositor_status": "No",
                                "externo_archivos": [
                                    {
                                        "externoArchivosId": 1,
                                        "externoEventoId": 1,
                                        "status": "Activo"
                                    }
                                ],
                                "externo_puntos": [
                                    {
                                        "externoPuntosId": 1,
                                        "externoEventoId": 1,
                                        "disiplinasId": 7,
                                        "disiplinas": "Economía",
                                        "puntos": 1,
                                        "horas": 1,
                                        "modalidad": "Presencial",
                                        "status": "Activo"
                                    }
                                ]
                            }

                        ],
                        "totalSize": 1,
                        "pageSize": 20,
                        "intervaloSeccion": 10,
                        "nombreListado": "VIEW"
                    };
                }
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

            this.object.certificadosEmitidos = {};

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
    }
});
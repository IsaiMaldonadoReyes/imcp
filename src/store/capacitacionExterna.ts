import { defineStore } from 'pinia';
import axios from "axios";
import { Storage } from '@ionic/storage';

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;


export const useCapacitacionStore = defineStore({
    id: 'capacitacionExterna',
    state: () => ({
        object: {
            listado: {},
            catalogoDisciplina: {},
            catalogoModalidad: {},
            catalogoColegio: {},
            catalogoImss: {},
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
            const storage = new Storage();
            await storage.create();

            const configAuthToken = await storage.get("configToken");

            try {

                const response = await axios.get("/users/catalogos/especialidades", {
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
                    this.object.listado = response.data.result.search;

                    /*
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
                                "status": "Revisión",
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
                                "status": "Rechazado",
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
                                "status": "Autorizado",
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
                    */
                }
            } catch (error) {
                //throw new Error("Solicitud incorrecta");
            }
        },
    }
});
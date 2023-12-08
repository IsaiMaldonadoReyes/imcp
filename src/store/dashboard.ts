import { defineStore } from 'pinia';
import axios from "axios";
import { Storage } from '@ionic/storage';

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

interface Ejercicios {
    titulo_periodo_anual: string;
    titulo_periodo_4_anios: string;
    dataset: any[]; // Puedes ajustar esto según la estructura real de tus datos
}

interface DashboardStore {
    notificaciones: any[]; // Puedes ajustar esto según la estructura real de tus datos
    ejercicios: Ejercicios;
}


export const useDashboardStore = defineStore({
    id: 'dashboard',
    state: () => ({
        auth: false,
        object: {
            notificaciones: {},
            ejercicios: {
                titulo_periodo_anual: '',
                titulo_periodo_4_anios: '',
                dataset: [],
            } as Ejercicios,
            desglosePuntos: {}
        },
        responseMessage: null
    }),
    actions: {
        async loadNotifications(rfc: string) {

            this.object.notificaciones = [
                {
                    title: "Tu certificación EUC",
                    subtitle: "Debes tener",
                    pointsRequired: "50",
                    pointsOwned: "40"
                },
                {
                    title: "Tu certificación X",
                    subtitle: "Debes tener",
                    pointsRequired: "50",
                    pointsOwned: "40"
                },
                {
                    title: "Tu certificación Y",
                    subtitle: "Debes tener:",
                    pointsRequired: "50",
                    pointsOwned: "40"
                },
            ];
            /*
            try {
                const response = await axios.post("/api/notificaciones", rfc);
                this.object.notificaciones = response.data;
            } catch (error) {
                throw new Error("Error al solicitar las notificaciones");
            }*/
        },

        async loadEjercicios(rfc: string) {
            const storage = new Storage();
            await storage.create();

            const configAuthToken = await storage.get("configToken");
            const rfcParam = await storage.get("rfc");
            /*
            this.object.ejercicios =
            {
                "titulo_periodo_anual": "Sector Gubernamental",
                "titulo_periodo_4_anios": "Sec tor Gubernamental 4 años",
                "dataset": [
                    {
                        "revisionPuntosAnualId": 211822,
                        "url": "dummi_datos\/forma\/211822",
                        "revision_puntos_anual_id": 211822,
                        "id_especialidad_general": 13,
                        "id_sector": 14,
                        "sector_nombre": "Independiente",
                        "cuentas_usuarios_id": 31585,
                        "cuenta_rfc": "SOTJ841111Q39",
                        "nombre_contacto": "Jessica Nadxieli Sol\u00eds Torres",
                        "nombre_especialidad": "General",
                        "control_puntos_principales": 40,
                        "control_puntos_imss": 0,
                        "control_puntos_otros_cursos": 20,
                        "control_puntos_etica": 5,
                        "control_puntos_totales": 65,
                        "puntos_principales": 5,
                        "puntos_principales_sobrantes": 0,
                        "puntos_otros_cursos": 2,
                        "puntos_otros_cursos_sobrantes": 0,
                        "puntos_etica": 1,
                        "puntos_etica_sobrantes": 0,
                        "sumatoria_puntos_totales": 0,
                        "puntos_imss": 0,
                        "anhio_aplica": "2023",
                        "tiene_imss": "No",
                        "validado_admin": "No Cubierto",
                        "status": "Activo",
                        "datecreation": "2023-06-27 19:34:27",
                        "dateupdate": "2023-06-27 19:34:27",
                    },
                    {
                        "revisionPuntosAnualId": 211823,
                        "url": "dummi_datos\/forma\/211823",
                        "revision_puntos_anual_id": 211823,
                        "id_especialidad_general": 13,
                        "id_sector": 14,
                        "sector_nombre": "Independiente",
                        "cuentas_usuarios_id": 31585,
                        "cuenta_rfc": "SOTJ841111Q39",
                        "nombre_contacto": "Jessica Nadxieli Sol\u00eds Torres",
                        "nombre_especialidad": "General",
                        "control_puntos_principales": 50,
                        "control_puntos_imss": 0,
                        "control_puntos_otros_cursos": 20,
                        "control_puntos_etica": 5,
                        "control_puntos_totales": 65,
                        "puntos_principales": 10,
                        "puntos_principales_sobrantes": 0,
                        "puntos_otros_cursos": 5,
                        "puntos_otros_cursos_sobrantes": 0,
                        "puntos_etica": 1,
                        "puntos_etica_sobrantes": 0,
                        "sumatoria_puntos_totales": 0,
                        "puntos_imss": 0,
                        "anhio_aplica": "2022",
                        "tiene_imss": "No",
                        "validado_admin": "No Cubierto",
                        "status": "Activo",
                        "datecreation": "2023-06-27 19:34:27",
                        "dateupdate": "2023-06-27 19:34:27",
                    },
                    {
                        "revisionPuntosAnualId": 211824,
                        "url": "dummi_datos\/forma\/211824",
                        "revision_puntos_anual_id": 211824,
                        "id_especialidad_general": 13,
                        "id_sector": 14,
                        "sector_nombre": "Independiente",
                        "cuentas_usuarios_id": 31585,
                        "cuenta_rfc": "SOTJ841111Q39",
                        "nombre_contacto": "Jessica Nadxieli Sol\u00eds Torres",
                        "nombre_especialidad": "General",
                        "control_puntos_principales": 30,
                        "control_puntos_imss": 0,
                        "control_puntos_otros_cursos": 20,
                        "control_puntos_etica": 5,
                        "control_puntos_totales": 65,
                        "puntos_principales": 0,
                        "puntos_principales_sobrantes": 0,
                        "puntos_otros_cursos": 0,
                        "puntos_otros_cursos_sobrantes": 0,
                        "puntos_etica": 2,
                        "puntos_etica_sobrantes": 0,
                        "sumatoria_puntos_totales": 0,
                        "puntos_imss": 0,
                        "anhio_aplica": "2021",
                        "tiene_imss": "No",
                        "validado_admin": "No Cubierto",
                        "status": "Activo",
                        "datecreation": "2023-06-27 19:34:27",
                        "dateupdate": "2023-06-27 19:34:27",
                    },
                    {
                        "revisionPuntosAnualId": 211825,
                        "url": "dummi_datos\/forma\/211825",
                        "revision_puntos_anual_id": 211825,
                        "id_especialidad_general": 13,
                        "id_sector": 14,
                        "sector_nombre": "Independiente",
                        "cuentas_usuarios_id": 31585,
                        "cuenta_rfc": "SOTJ841111Q39",
                        "nombre_contacto": "Jessica Nadxieli Sol\u00eds Torres",
                        "nombre_especialidad": "General",
                        "control_puntos_principales": 25,
                        "control_puntos_imss": 0,
                        "control_puntos_otros_cursos": 20,
                        "control_puntos_etica": 5,
                        "control_puntos_totales": 65,
                        "puntos_principales": 20,
                        "puntos_principales_sobrantes": 10,
                        "puntos_otros_cursos": 0,
                        "puntos_otros_cursos_sobrantes": 10,
                        "puntos_etica": 3,
                        "puntos_etica_sobrantes": 0,
                        "sumatoria_puntos_totales": 65,
                        "puntos_imss": 0,
                        "anhio_aplica": "2020",
                        "tiene_imss": "No",
                        "validado_admin": "Cumplido",
                        "status": "Activo",
                        "datecreation": "2023-06-27 19:34:27",
                        "dateupdate": "2023-08-18 01:52:03",
                    },
                    {
                        "revisionPuntosAnualId": 211826,
                        "url": "dummi_datos\/forma\/211826",
                        "revision_puntos_anual_id": 211826,
                        "id_especialidad_general": 13,
                        "id_sector": 14,
                        "sector_nombre": "Independiente",
                        "cuentas_usuarios_id": 31585,
                        "cuenta_rfc": "SOTJ841111Q39",
                        "nombre_contacto": "Jessica Nadxieli Sol\u00eds Torres",
                        "nombre_especialidad": "General",
                        "control_puntos_principales": 35,
                        "control_puntos_imss": 0,
                        "control_puntos_otros_cursos": 20,
                        "control_puntos_etica": 5,
                        "control_puntos_totales": 65,
                        "puntos_principales": 20,
                        "puntos_principales_sobrantes": 10,
                        "puntos_otros_cursos": 0,
                        "puntos_otros_cursos_sobrantes": 10,
                        "puntos_etica": 5,
                        "puntos_etica_sobrantes": 0,
                        "sumatoria_puntos_totales": 65,
                        "puntos_imss": 0,
                        "anhio_aplica": "2019",
                        "tiene_imss": "No",
                        "validado_admin": "Cumplido",
                        "status": "Activo",
                        "datecreation": "2023-06-27 19:34:27",
                        "dateupdate": "2023-08-18 02:01:22",
                    }
                ]
            };*/

            try {

                const params = {
                    datos: {
                        cuenta_rfc: rfcParam
                    }
                };

                const response = await axios.get("/users/dashboard", {
                    params,
                    headers: configAuthToken.headers, // Incluir los headers directamente en la solicitud
                });

                //console.log(response);

                //console.log(response);
                if (response.data.type === "success") {
                    this.object.ejercicios = response.data.result.search;
                }
            } catch (error) {
                throw new Error("Usuario y/o contraseñas incorrectas");
            }
        },

        async desglosePuntosPorEjercicio(ejercicio: any) {
            const storage = new Storage();
            await storage.create();

            const configAuthToken = await storage.get("configToken");
            const rfcParam = await storage.get("rfc");

            try {
                const params = {
                    datos: {
                        cuenta_rfc: rfcParam,
                        anhio: ejercicio,
                    }
                };

                const response = await axios.get("/users/puntos", {
                    params,
                    headers: configAuthToken.headers,
                });

                if (response.data.type === "success") {
                    //this.object.desglosePuntos = response.data.result;

                    this.object.desglosePuntos = {
                        "result": {
                            "anhio": "2021",
                            "CuentasUsuarios": {
                                "cuentasUsuariosId": 2691,
                                "idColegio": 15,
                                "idSector": 14,
                                "cuentaRfc": "CACX610315BD1",
                                "cuentaNombre": "Abel",
                                "cuentaApaterno": "Castro",
                                "cuentaAmatarno": "Castro",
                                "cuentaSocio": "Si",
                                "cuentaSexo": "Masculino",
                                "cuentaEmail": "abel_asociados@hotmail.com",
                                "registroAgaff": "07853",
                                "registroImss": "2425-26-00",
                                "tipoUsusario": "Socio",
                                "puntos": "Asociado Vitalicio",
                                "articulo": "Inactivo",
                                "anhioNacimiento": 1961,
                                "status": "Activo",
                                "colegio": "CCP Culiacán"
                            },
                            "total": 109,
                            "PuntosEvento": [
                                {
                                    "areaEspecialidad": "Auditoría",
                                    "dataset": [
                                        {
                                            "NombreEspecialidad": "Auditoría",
                                            "EventosNombreEvento": "Tres comisiones: CROSS, CONAA y Comisión fiscal",
                                            "NombreColegio": "CCP Culiacán",
                                            "NumeroRegistro": "",
                                            "EventosFechaFin": "18/03/2021",
                                            "AsistenciaHora": 1,
                                            "AsistenciaPuntos": 1
                                        }
                                    ],
                                    "total": {
                                        "TotalEspecialidad": "Auditoría",
                                        "SumEspecialidad": 1,
                                        "SumHora": 1
                                    }
                                },
                                {
                                    "areaEspecialidad": "Fiscal",
                                    "dataset": [
                                        {
                                            "NombreEspecialidad": "Auditoría",
                                            "EventosNombreEvento": "Tres comisiones: CROSS, CONAA y Comisión fiscal",
                                            "NombreColegio": "CCP Culiacán",
                                            "NumeroRegistro": "",
                                            "EventosFechaFin": "18/03/2021",
                                            "AsistenciaHora": 1,
                                            "AsistenciaPuntos": 1
                                        }
                                    ],
                                    "total": {
                                        "TotalEspecialidad": "Auditoría",
                                        "SumEspecialidad": 1,
                                        "SumHora": 1
                                    }
                                },
                                {
                                    "areaEspecialidad": "Derecho",
                                    "dataset": [
                                        {
                                            "NombreEspecialidad": "Auditoría",
                                            "EventosNombreEvento": "Tres comisiones: CROSS, CONAA y Comisión fiscal",
                                            "NombreColegio": "CCP Culiacán",
                                            "NumeroRegistro": "",
                                            "EventosFechaFin": "18/03/2021",
                                            "AsistenciaHora": 1,
                                            "AsistenciaPuntos": 1
                                        }
                                    ],
                                    "total": {
                                        "TotalEspecialidad": "Auditoría",
                                        "SumEspecialidad": 1,
                                        "SumHora": 1
                                    }
                                },
                                {
                                    "areaEspecialidad": "Ética y Responsabilidades profesionales",
                                    "dataset": [
                                        {
                                            "NombreEspecialidad": "Ética y Responsabilidades profesionales",
                                            "EventosNombreEvento": "Temas institucionales: Estatutos y legislación",
                                            "NombreColegio": "CCP Culiacán",
                                            "NumeroRegistro": "",
                                            "EventosFechaFin": "09/01/2021",
                                            "AsistenciaHora": 1,
                                            "AsistenciaPuntos": 1
                                        },
                                        {
                                            "NombreEspecialidad": "Ética y Responsabilidades profesionales",
                                            "EventosNombreEvento": "Propuesta de modificación de estatutos",
                                            "NombreColegio": "CCP Culiacán",
                                            "NumeroRegistro": "",
                                            "EventosFechaFin": "13/03/2021",
                                            "AsistenciaHora": 1,
                                            "AsistenciaPuntos": 1
                                        },
                                        {
                                            "NombreEspecialidad": "Ética y Responsabilidades profesionales",
                                            "EventosNombreEvento": "RESUMEN INFORMATIVO SOBRE LOS AVANCES Y RETOS DE LA NRCC",
                                            "NombreColegio": "CCP Culiacán",
                                            "NumeroRegistro": "CCPC-FEME-01-01-2021",
                                            "EventosFechaFin": "03/07/2021",
                                            "AsistenciaHora": 1,
                                            "AsistenciaPuntos": 1
                                        },
                                        {
                                            "NombreEspecialidad": "Ética y Responsabilidades profesionales",
                                            "EventosNombreEvento": "DESAYUNO CONFERENCIA.- ESTATUTOS LOCALES y DEL IMCP",
                                            "NombreColegio": "CCP Culiacán",
                                            "NumeroRegistro": "CCPC-FEME-01-01-2021",
                                            "EventosFechaFin": "09/10/2021",
                                            "AsistenciaHora": 1,
                                            "AsistenciaPuntos": 1
                                        },
                                        {
                                            "NombreEspecialidad": "Ética y Responsabilidades profesionales",
                                            "EventosNombreEvento": "DESAYUNO CONFERENCIA.- ÚNTOS RELEVANTES DE LOS ESTATUTOS LOCALES",
                                            "NombreColegio": "CCP Culiacán",
                                            "NumeroRegistro": "CCPC-FEME-01-01-2021",
                                            "EventosFechaFin": "20/11/2021",
                                            "AsistenciaHora": 1,
                                            "AsistenciaPuntos": 1
                                        },
                                        {
                                            "NombreEspecialidad": "Ética y Responsabilidades profesionales",
                                            "EventosNombreEvento": "MODIFICACIONES A LA NDPC",
                                            "NombreColegio": "CCP Culiacán",
                                            "NumeroRegistro": "CCPC-FEME-01-01-2021",
                                            "EventosFechaFin": "08/12/2021",
                                            "AsistenciaHora": 2,
                                            "AsistenciaPuntos": 2
                                        },
                                        {
                                            "NombreEspecialidad": "Ética y Responsabilidades profesionales",
                                            "EventosNombreEvento": "INTEGRANTES DE COMISIÓN DE ESTATUTOS ENERO A DICIEMBRE 2021",
                                            "NombreColegio": "CCP Culiacán",
                                            "NumeroRegistro": "CCPC-FEME-01-01-2021",
                                            "EventosFechaFin": "31/12/2021",
                                            "AsistenciaHora": 1,
                                            "AsistenciaPuntos": 1
                                        }
                                    ],
                                    "total": {
                                        "TotalEspecialidad": "Auditoría",
                                        "SumEspecialidad": 1,
                                        "SumHora": 1
                                    }
                                }
                            ],
                            "totales_general": {
                                "TotalPuntos": "Total Puntos",
                                "SumEspecialidadTotal": 109,
                                "sumEspecialidadTotalHora": 109
                            }
                        },
                        "type": "success"
                    };

                    console.log(response.data.result);
                }
            } catch (error) {
                throw new Error("Usuario y/o contraseñas incorrectas");
            }
        },

        async desglosePuntosPdf(data: any) {
            const storage = new Storage();
            await storage.create();

            const configAuthToken = await storage.get("configToken");
            const rfcParam = await storage.get("rfc");

            try {
                const params = {
                    datos: {
                        cuenta_rfc: rfcParam,
                        //anhio: ejercicio,
                    }
                };

                const response = await axios.get("/users/puntos", {
                    params,
                    headers: configAuthToken.headers,
                });

                if (response.data.type === "success") {
                    this.object.desglosePuntos = response.data.result;
                    console.log(response.data.result);
                }
            } catch (error) {
                throw new Error("Usuario y/o contraseñas incorrectas");
            }
        }
    }
});
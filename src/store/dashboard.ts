import { defineStore } from 'pinia';
import axios from "axios";
import { Storage } from '@ionic/storage';

interface Ejercicios {
    titulo_periodo_anual: string;
    titulo_periodo_4_anios: string;
    datasets: any[]; // Puedes ajustar esto según la estructura real de tus datos
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
                datasets: [],
            } as Ejercicios,
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
            this.object.ejercicios =
            {
                "titulo_periodo_anual": "Sector Gubernamental",
                "titulo_periodo_4_anios": "Sector Gubernamental 4 años",
                "datasets": [
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
            };


            /*try {
                const response = await axios.post("/api/puntosPorEjercicio", rfc);
                this.object.ejercicios = response.data;

            } catch (error) {
                throw new Error("Error al enviar la petición de puntosPorEjercicio");
            }
            */
        }
    }
});
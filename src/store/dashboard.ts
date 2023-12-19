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
            desglosePuntos: {},
            rutaPdf: '',
        },
        responseMessage: null,
    }),
    actions: {

        async loadNotifications() {

            /*
            this.object.notificaciones = [
                {
                    titulo: "Tu certificación EUC",
                    mensaje: "Debes tener",
                    pointsRequired: "50",
                    pointsOwned: "40",
                    url: ""
                },
                {
                    titulo: "Tu certificación X",
                    mensaje: "Debes tener",
                    pointsRequired: "50",
                    pointsOwned: "40",
                    url: ""
                },
                {
                    titulo: "Tu certificación Y",
                    mensaje: "Debes tener:",
                    pointsRequired: "50",
                    pointsOwned: "40",
                    url: ""
                },
            ];*/

            const storage = new Storage();
            await storage.create();

            const configAuthToken = await storage.get("configToken");
            const rfcParam = await storage.get("rfc");

            try {
                const params = {
                    datos: {
                        cuenta_rfc: rfcParam
                    }
                };

                const response = await axios.get("/users/notificaciones", {
                    params,
                    headers: configAuthToken.headers,
                });

                if (response.data.type === "success") {
                    this.object.notificaciones = response.data.result.search.dataset;
                }
            } catch (error) {
                throw new Error("Error al cargar las notificaciones");
            }
        },

        async loadEjercicios(rfc: string) {
            const storage = new Storage();
            await storage.create();

            const configAuthToken = await storage.get("configToken");
            const rfcParam = await storage.get("rfc");

            try {
                const params = {
                    datos: {
                        cuenta_rfc: rfcParam
                    }
                };

                const response = await axios.get("/users/dashboard", {
                    params,
                    headers: configAuthToken.headers,
                });

                if (response.data.type === "success") {
                    this.object.ejercicios = response.data.result.search;
                }
            } catch (error) {
                throw new Error("Error al cargar los ejercicios Dashboard");
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
                    this.object.desglosePuntos = response.data.result;
                }
            } catch (error) {
                throw new Error("Solicitud incorrecta");
            }
        },

        async desglosePuntosPorEjercicioPdf(ejercicio: any) {
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

                const response = await axios.get("/users/puntos/pdfDesglose", {
                    params,
                    headers: configAuthToken.headers,
                });

                if (response.data.type === "success") {
                    this.object.rutaPdf = response.data.result.dir;
                }
            } catch (error) {
                throw new Error("Solicitud incorrecta");
            }
        },

    }
});
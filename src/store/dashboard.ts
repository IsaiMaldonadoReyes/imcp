import { defineStore } from 'pinia';
import axios from "axios";
import { Storage } from '@ionic/storage';

export const useDashboardStore = defineStore({
    id: 'dashboard',
    state: () => ({
        auth: false,
        object: {},
        responseMessage: null
    }),
    actions: {
        async loadNotifications(rfc: string) {

            this.object = [
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

            try {
                const response = await axios.post("/api/notificaciones", rfc);
                this.object = response.data;
            } catch (error) {
                throw new Error("Error al solicitar las notificaciones");
            }
        },




    }
});
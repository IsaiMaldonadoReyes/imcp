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

            /*
            await axios.post("/api/resetPassword/" + rfc)
                .then((response) => {
                    this.responseMessage = response.data.message;
                })
                .catch((error) => {

                })
                .finally(() => { });
                */
        },
        async logout() {
            let storage = new Storage();
            await storage.create();

            this.auth = false;
            this.object = {};

            await storage.remove('token');
            await storage.remove('logged');
            await storage.remove('rfc');
            await storage.remove('nombreUsuario');
        },
        async userInformation(rfc: string) {
            // desarrollo
            let storage = new Storage();
            await storage.create();

            await storage.set('nombreUsuario', 'Rogerio Juan Bosco Casas');

            this.object = {
                nombre: 'Rogerio Juan Bosco Casas', rfc: 'RJCA781002-HR7'
            };

            // production
            /*
            await axios.post("/api/userInformation/" + rfc)
                .then((response) => {
                    this.object = response.data;
                })
                .catch((error) => {

                })
                .finally(() => { });
                */
        },

    }
});
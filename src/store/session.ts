import { defineStore } from 'pinia';
import axios from "axios";
import { Storage } from '@ionic/storage';

export const useSessionStore = defineStore({
    id: 'session',
    state: () => ({
        auth: false,
        object: {},
        responseMessage: null
    }),
    actions: {
        async login(credentials: any) {

            let storage = new Storage();
            await storage.create();

            // desarrollo

            if (credentials.rfc == "SOTJ841111Q39" && credentials.password == "temporal") {
                this.auth = true;

                await storage.set('token', '1234567890');
                await storage.set('logged', true);
            }

            this.userInformation(credentials.rfc);

            // production
            /* 
            await axios.post("/login", credentials)
                .then((response) => {
                    if (response.data.type === "success") {
                        this.auth = true;

                        this.userInformation(credentials.email);
                    }
                    else if (response.data.type === "fail") {
                    }
                })
                .catch((error) => {

                })
                .finally(() => { });
                */
        },
        async resetPassword(rfc: string) {
            await axios.post("/api/resetPassword/" + rfc)
                .then((response) => {
                    this.responseMessage = response.data.message;
                })
                .catch((error) => {

                })
                .finally(() => { });
        },
        async logout() {
            let storage = new Storage();
            await storage.create();

            this.auth = false;
            this.object = {};

            await storage.remove('token');
            await storage.remove('logged');
        },
        async userInformation(rfc: string) {
            // desarrollo
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
import { defineStore } from 'pinia';
import axios from "axios";
import { Storage } from '@ionic/storage';

import FormData from 'form-data';

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

const user = import.meta.env.VITE_APP_API_USER;
const pass = import.meta.env.VITE_APP_API_PASS;

const config = {
    headers: {
        'Content-Type': 'multipart/form-data',
        'x-requested-with': 'XMLHttpRequest',
    },
};

export const useSessionStore = defineStore({
    id: 'session',
    state: () => ({
        auth: false,
        object: {},
        responseMessage: null
    }),
    actions: {

        async getTokenAuth() {
            let storage = new Storage();
            await storage.create();
            await storage.set('token', "TokenCorrecto");

            /*
            if (user !== undefined && pass !== undefined) {
                let data = new FormData();
                data.append('user', user);
                data.append('pass', pass);

                try {
                    const response = await axios.post("/login/token", data, config);
                    if (response.data.type == "success") {
                        await storage.set('token', response.data.result.token);
                    }
                } catch (error) {
                    throw new Error("Ocurrio un problema al conectarse con el servidor");
                }
            } else {
                console.error('API_USER or API_PASS is undefined');
            }*/
        },

        async login(data: any) {
            const storage = new Storage();
            await storage.create();

            console.log(data);

            // desarrollo
            if (data == "SOTJ841111Q39") {
                this.auth = true;

                await storage.set('logged', true);
                await storage.set('rfc', data.rfc);
                this.userInformation(data.rfc);
            }

            // production
            /*
            if (user !== undefined && pass !== undefined) {
                try {
                    const response = await axios.post("/users/login", data, config);

                    console.log(response);
                    if (response.data.type === "success") {
                        this.auth = true;

                        await storage.set('logged', true);
                        await storage.set('rfc', data.rfc);
                        this.userInformation(data.rfc);
                    }
                } catch (error) {
                    throw new Error("Usuario y/o contraseñas incorrectas");
                }
            }*/
        },

        async userInformation(rfc: string) {
            const storage = new Storage();
            await storage.create();

            // desarrollo
            await storage.set('nombreUsuario', 'Rogerio Juan Bosco Casas');
            this.object = {
                nombre: 'Rogerio Juan Bosco Casas', rfc: 'RJCA781002-HR7'
            };

            /*
            try {
                const response = await axios.post("/api/userInformation", rfc)
                this.object = response.data;
            } catch (error) {
                throw new Error("Información del usuario incorrecta");
            }
            */
        },

        async resetPassword(rfc: string) {
            try {
                const response = await axios.post("/api/resetPassword", rfc);
                this.responseMessage = response.data.message;
            } catch (error) {
                throw new Error("Error al enviar la petición de cambiar contraseña");
            }
        },

        async logout() {
            const storage = new Storage();
            await storage.create();

            this.auth = false;
            this.object = {};

            await storage.remove('token');
            await storage.remove('logged');
            await storage.remove('rfc');
            await storage.remove('nombreUsuario');
        },

    },
});
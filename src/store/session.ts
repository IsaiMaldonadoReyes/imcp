import { defineStore } from 'pinia';
import axios from "axios";
import { Storage } from '@ionic/storage';

import FormData from 'form-data';

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

const user = import.meta.env.VITE_APP_API_USER;
const pass = import.meta.env.VITE_APP_API_PASS;

let data = new FormData();
data.append('user', user);
data.append('pass', pass);

const config = {
    headers: {
        'Content-Type': 'multipart/form-data',
        'X-Requested-With': 'xmlhttprequest',
    },
};

const configToken = {
    headers: {
        'Content-Type': 'multipart/form-data',
        'X-Requested-With': 'xmlhttprequest',
        'token': ''
    },
};

export const useSessionStore = defineStore({
    id: 'session',
    state: () => ({
        auth: false,
        object: {},
        responseMessage: ""
    }),
    actions: {

        async getTokenAuth() {
            let storage = new Storage();
            await storage.create();

            if (user !== undefined && pass !== undefined) {

                try {
                    const response = await axios.post("/login/token", data, config);

                    if (response.data.type == "success") {

                        configToken.headers['token'] = response.data.result.token;
                        await storage.set('token', response.data.result.token);
                        await storage.set('configToken', configToken);
                    }
                } catch (error) {
                    throw new Error("Ocurrio un problema al conectarse con el servidor");
                }
            } else {
                console.error('API_USER or API_PASS is undefined');
            }
        },

        async login(data: any) {
            const storage = new Storage();
            await storage.create();

            const configAuthToken = await storage.get("configToken");
            // desarrollo
            /*
            if (data == "SOTJ841111Q39") {
                this.auth = true;

                await storage.set('logged', true);
                await storage.set('rfc', "SOTJ841111Q39");
                this.userInformation("SOTJ841111Q39");
            }*/

            // production

            if (user !== undefined && pass !== undefined) {
                try {
                    const response = await axios.post("/users/login", data, configAuthToken);

                    //console.log(response);
                    if (response.data.type === "success") {
                        this.auth = true;

                        await storage.set('logged', true);
                        await storage.set('rfc', data.get("email"));
                        this.userInformation(data.get("email"));
                    }
                } catch (error) {
                    throw new Error("Usuario y/o contraseñas incorrectas");
                }
            }
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

        async resetPassword(data: any) {
            try {
                const response = await axios.post("/users/recovery_password", data, config);
                //this.responseMessage = response.data.sys.mensaje_operacion;
                this.responseMessage = "Se enviará un correo con instrucciones para recuperar su contraseña";
            } catch (error) {
                throw new Error("Error al enviar la petición de cambio de contraseña");
            }
        },

        async logout() {
            const storage = new Storage();
            await storage.create();

            try {
                
                var dataLogout = new URLSearchParams();
                dataLogout.append("api[token]", await storage.get("token"));

                const response = await axios.put("/login/token", dataLogout.toString(), config);
                
                await storage.remove('token');
                await storage.remove('logged');
                await storage.remove('rfc');
                await storage.remove('nombreUsuario');
                await storage.remove('configToken');
                
                this.auth = false;
                this.object = {};
                
            } catch (error) {
                throw new Error("Error al cerrar la sesión");
            }

        },

    },
});
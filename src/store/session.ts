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
        responseMessage: "",
        type: ""
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
                    //throw new Error("Ocurrio un problema al conectarse con el servidor");
                }
            } else {
                console.error('API_USER or API_PASS is undefined');
            }
        },

        async login(data: any) {
            const storage = new Storage();
            await storage.create();

            const configAuthToken = await storage.get("configToken");

            if (user !== undefined && pass !== undefined) {
                try {
                    const response = await axios.post("/users/login", data, configAuthToken);

                    //console.log(response);
                    if (response.data.type === "success") {
                        this.auth = true;

                        await storage.set('logged', true);
                        await storage.set('rfc', data.get("email"));

                        const params = {
                            datos: {
                                cuenta_rfc: data.get('email')
                            }
                        };

                        const responseInformation = await axios.get("/users/informacion", {
                            params,
                            headers: configAuthToken.headers,
                        });

                        await storage.set('nombreUsuario', responseInformation.data.result.info[0].cuenta_nombre + " " + responseInformation.data.result.info[0].cuenta_apaterno + " " + responseInformation.data.result.info[0].cuenta_amatarno);

                        //this.userInformation();
                    }
                } catch (error) {
                    //throw new Error("Usuario y/o contraseñas incorrectas");
                }
            }
        },

        async userInformation() {
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

                const response = await axios.get("/users/informacion", {
                    params,
                    headers: configAuthToken.headers,
                });

                //console.log(response.data);
                if (response.data.type === "success") {
                    await storage.set('nombreUsuario', response.data.result.info[0].cuenta_nombre + " " + response.data.result.info[0].cuenta_apaterno + " " + response.data.result.info[0].cuenta_amatarno);
                }
            } catch (error) {
                //throw new Error("Error al cargar los ejercicios Dashboard");
            }


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

        async createAccount(data: any) {
            const storage = new Storage();
            await storage.create();

            const configAuthToken = await storage.get("configToken");
            try {
                const response = await axios.post("/users/dummy_contactos", data, configAuthToken);
                this.responseMessage = response.data.sys;
                this.type = response.data.type;
                //this.responseMessage = "Se enviará un correo con instrucciones para recuperar su contraseña";
            } catch (error: any) {
                // Verifica si el error tiene una respuesta de Axios
                let errorResult = error.response?.data?.result;

                // Si es un array, une los mensajes en un string
                let errorReq = Array.isArray(errorResult)
                    ? errorResult.join(' ')
                    : errorResult || "Ocurrió un problema en la petición";


                this.responseMessage = errorReq;
                this.type = "error";
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
                //throw new Error("Error al cerrar la sesión");
            }

        },

    },
});
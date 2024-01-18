import { defineStore } from 'pinia';
import axios from "axios";
import { Storage } from '@ionic/storage';

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;


export const useCuentaStore = defineStore({
    id: 'cuenta',
    state: () => ({
        object: {
            informacion: {},
        },
        responseMessage: "",
        type: ""
    }),
    actions: {

        async actualizarCuenta(informacion: any) {
            const storage = new Storage();
            await storage.create();

            const configAuthToken = await storage.get("configToken");
            try {
                const response = await axios.put("/users/informacion", informacion, configAuthToken);
                this.responseMessage = response.data.sys.mensaje_operacion;
                this.type = response.data.type;
            } catch (error) {
                //throw new Error("Solicitud incorrecta");
            }
        },
    }
});
import { defineStore } from 'pinia';
import axios from "axios";

export const usePagoStore = defineStore({
    id: 'pago',
    state: () => ({
        object: null,
        responseMessage: null
    }),
    actions: {
        async login(credentials: any) {
            await axios.post("/login", credentials)
                .then((response) => {
                    if (response.data.type === "success") {

                        this.userInformation(credentials.email);
                    }
                    else if (response.data.type === "fail") {
                    }
                })
                .catch((error) => {

                })
                .finally(() => { });
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
            this.object = null;
        },
        async userInformation(rfc: string) {
            await axios.post("/api/userInformation/" + rfc)
                .then((response) => {
                    this.object = response.data;
                })
                .catch((error) => {

                })
                .finally(() => { });
        },

    }
});
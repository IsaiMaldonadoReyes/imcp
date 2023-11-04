import { defineStore } from 'pinia';
import axios from "axios";

export const useSessionStore = defineStore({
    id: 'session',
    state: () => ({
        auth: false,
        object: null,
        responseMessage: null
    }),
    actions: {
        async login(credentials: any) {
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
            this.auth = false;
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
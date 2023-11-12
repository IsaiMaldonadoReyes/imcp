import { defineStore } from 'pinia';
import axios from "axios";

export const useDashboardStore = defineStore({
    id: 'dashboard',
    state: () => ({
        object: null,
        responseMessage: null
    }),
    actions: {
        async chartInformation(rfc: string) {
            await axios.post("/api/chartInformation/" + rfc)
                .then((response) => {
                    this.object = response.data;
                })
                .catch((error) => {

                })
                .finally(() => { });
        },

    }
});
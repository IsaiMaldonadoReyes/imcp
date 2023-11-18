<template>
  <ion-page>
    <ion-content>
      <v-container class="ma-# pa-# fill-height">
        <v-row style="height: 10%" class="d-flex align-center justify-center">
          <img style="max-width: 65%" src="../assets/images/logotipo.svg" />
        </v-row>
        <v-row style="height: 65%" class="d-flex align-center justify-center">
          <v-card color="transparent" elevation="0">
            <v-row dense>
              <v-col class="d-flex justify-center align-center pb-10" cols="12" lg="12" md="12" sm="12">
                <v-label style="font-size: 28px; font-weight: bold">
                  Recuperar contraseña
                </v-label>
              </v-col>
              <v-col cols="12" lg="12" md="12" sm="12" class="px-10">
                <v-text-field v-model="form.rfc" :rules="[rules.required, rules.validRFC]" clearable hide-details="auto"
                  label="RFC" rounded="lg" style="font-weight: bold" variant="solo"
                  @input="() => convertToUpperCase('rfc')" />
              </v-col>
              <v-col cols="12" lg="12" md="12" sm="12" class="px-10" align="right">
                <v-btn :to="{ path: '/login' }" class="text-caption text-disabled ms-1 text-capitalize"
                  color="#C6092F" rounded="lg" size="x-small" style="font-weight: bold" variant="plain">
                  Ir a acceso al sistema
                </v-btn>
              </v-col>
              <v-col cols="12" lg="12" md="12" sm="12" class="px-10">
                <v-btn block color="#C6092F" rounded="lg" size="x-large" style="font-weight: bold" @click="sendPassword">
                  ENVIAR
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-row>
        <div class="back" />
        <div class="esquina-br" />
        <div class="esquina-tl" />
      </v-container>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { alertController, IonPage, IonContent } from "@ionic/vue";
import { useRouter } from "vue-router";

import { useSessionStore } from "../store/session";

export default defineComponent({
  name: "resetPassword",
  components: {
    IonPage,
    IonContent
  },
  setup() {
    const session = useSessionStore();
    const router = useRouter();
    const rfcRegex = /^[A-Z&Ñ]{3,4}\d{6}[A-V1-9][A-Z1-9]\d{1}$/;

    async function sendPassword() {
      const rfc = form.value.rfc;
      try {
        //await session.resetPassword(rfc);

        const alert = await alertController.create({
          header: "Recuperación de contraseña",
          message: "Se ha enviado un correo para la recuperación de su contraseña",
          buttons: ["OK"],
        });

        await alert.present();
      } catch (error) {
        console.log(error);
      }
    }

    function convertToUpperCase(fieldName: keyof typeof form.value) {
      form.value[fieldName] = form.value[fieldName].toUpperCase();
    }
    const form = ref({ rfc: "" });

    const rules = {
      required: (v: string) => !!v || "Este campo es requerido",
      validRFC: (v: string) => rfcRegex.test(v) || "RFC no válido",
    };

    return {
      form,
      rules,
      sendPassword,
      convertToUpperCase
    };
  },
});
</script>

<style>
@import "../assets/css/login.css";
</style>

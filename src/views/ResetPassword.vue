<template>
  <ion-page>
    <ion-content>
      <v-container class="ma-# pa-# fill-height" fluid style="align-items:normal;">
        <v-row align="start" style="height: 25%" class="d-flex align-center justify-center">
          <img style="max-width:240px; max-height: 200px" src="../assets/images/logotipo.svg" />
        </v-row>
        <v-row align="start" style="height: 55%" class="d-flex align-start justify-center">
          <v-card color="transparent" elevation="0">
            <v-form v-model="isValid" @submit.prevent="validateAndSend" lazy-validation ref="formEl">
              <v-row dense>
                <v-col class="d-flex justify-center align-center pb-10" cols="12" lg="12" md="12" sm="12">
                  <v-label style="font-size: 28px; font-weight: bold">
                    Recuperar contraseña
                  </v-label>
                </v-col>
                <v-col cols="12" lg="12" md="12" sm="12" class="px-10">
                  <v-text-field v-model="form.rfc" :rules="[rules.required, rules.validRFC]" clearable hide-details="auto"
                    label="RFC" rounded="lg" style="font-weight: bold" variant="solo"
                    @input="convertToUpperCase('rfc')" />
                </v-col>
                <v-col cols="12" lg="12" md="12" sm="12" class="px-10" align="right">
                  <v-btn :to="{ path: '/login' }" class="text-caption text-disabled ms-1 text-capitalize" color="#C6092F"
                    rounded="lg" size="x-small" style="font-weight: bold" variant="plain">
                    Ir a acceso al sistema
                  </v-btn>
                </v-col>
                <v-col cols="12" lg="12" md="12" sm="12" class="px-10">
                  <v-btn block color="#C6092F" rounded="lg" size="x-large" style="font-weight: bold" type="submit">
                    ENVIAR
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
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
import { Storage } from "@ionic/storage";
import { useSessionStore } from "../store/session";

const showAlert = async (header: string, message: string) => {
  const alert = await alertController.create({
    header,
    message,
    buttons: ["OK"]
  });

  await alert.present();
};

export default defineComponent({
  name: "resetPassword",
  components: {
    IonPage,
    IonContent
  },
  setup() {
    const session = useSessionStore();

    const rfcRegex = /^[A-Z&Ñ]{3,4}\d{6}[A-V1-9][A-Z1-9]\d{1}$/;

    const isValid = ref(true);
    const formEl = ref<any>(null);

    const form = ref({ rfc: "" });

    const rules = {
      required: (v: string) => !!v || "Este campo es requerido",
      validRFC: (v: string) => rfcRegex.test(v) || "RFC no válido",
    };

    async function sendPassword() {
      const rfc = form.value.rfc;
      try {
        //await session.resetPassword(rfc);

        await showAlert("Recuperación de contraseña", "Se ha enviado un correo para la recuperación de su contraseña");

        form.value.rfc = "";
      } catch (error) {
        console.log(error);
        await showAlert("Recuperación de contraseña", "Ha ocurrido un error durante el envío de la petición");
        throw new Error("Error al enviar la petición");
      }
    }

    async function validateAndSend() {
      try {
        const isValidForm = await formEl.value?.validate();

        if (isValidForm.valid) {

          await getToken();

          try {
            await sendPassword();

            await formEl.value?.resetValidation();
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        console.log(error);
        return;
      }
    }

    async function getToken() {
      try {
        const storage = new Storage();
        storage.create();
        const tok = await storage.get("token");

        console.log(tok);

        if (tok == "") {
          await session.getTokenAuth();
        }
      }
      catch (error) {
        await showAlert("Ocurrio un problema con el servidor", "Cierre la aplicación e intente más tarde");
        throw new Error("Error al obtener el token resetPassword");
      }
    }

    function convertToUpperCase(fieldName: keyof typeof form.value) {
      form.value[fieldName] = form.value[fieldName].toUpperCase();
    }

    return {
      form,
      rules,
      isValid,
      formEl,
      validateAndSend,
      convertToUpperCase,
    };
  },
});
</script>

<style>
@import "../assets/css/login.css";
</style>

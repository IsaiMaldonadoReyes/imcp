<template>
  <ion-page>
    <ion-content>
      <v-container class="ma-# pa-# fill-height" fluid style="align-items: normal">
        <v-row
          align="start"
          style="height: 25%"
          class="d-flex align-center justify-center"
        >
          <img
            style="max-width: 240px; max-height: 200px"
            src="../assets/images/logotipo.svg"
          />
        </v-row>
        <v-row
          align="start"
          style="height: 55%"
          class="d-flex align-start justify-center"
        >
          <v-card color="transparent" elevation="0">
            <v-form
              v-model="isValid"
              @submit.prevent="validateAndSend"
              lazy-validation
              ref="formEl"
            >
              <v-row dense>
                <v-col
                  class="d-flex justify-center align-center pb-10 text-grey-darken-3"
                  cols="12"
                  lg="12"
                  md="12"
                  sm="12"
                >
                  <v-label style="font-size: 28px; font-weight: bold">
                    Recuperar contraseña
                  </v-label>
                </v-col>
                <v-col cols="12" lg="12" md="12" sm="12" class="px-10">
                  <v-text-field
                    v-model="form.rfc"
                    :rules="[rules.required, rules.validRFC]"
                    clearable
                    hide-details="auto"
                    label="RFC"
                    rounded="lg"
                    style="font-weight: bold"
                    variant="solo"
                    @input="convertToUpperCase('rfc')"
                  />
                </v-col>
                <v-col cols="12" lg="12" md="12" sm="12" class="px-10" align="right">
                  <v-btn
                    :to="{ path: '/login' }"
                    class="text-caption text-disabled ms-1 text-capitalize"
                    color="#C6092F"
                    rounded="lg"
                    size="x-small"
                    style="font-weight: bold"
                    variant="plain"
                  >
                    Ir a acceso al sistema
                  </v-btn>
                </v-col>
                <v-col cols="12" lg="12" md="12" sm="12" class="px-10">
                  <v-btn
                    block
                    color="#C6092F"
                    rounded="lg"
                    size="x-large"
                    style="font-weight: bold"
                    type="submit"
                  >
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
import { useRouter } from "vue-router";
import { IonPage, IonContent } from "@ionic/vue";
import { Storage } from "@ionic/storage";
import { useSessionStore } from "../store/session";

export default defineComponent({
  name: "resetPassword",
  components: {
    IonPage,
    IonContent,
  },
  setup() {
    const session = useSessionStore();
    const router = useRouter();

    const rfcRegex = /^[A-Z&Ñ]{3,4}\d{6}[A-V1-9][A-Z1-9]\d{1}$/;

    const isValid = ref(true);
    const formEl = ref<any>(null);

    const form = ref({ rfc: "" });
    const token = ref("");

    const rules = {
      required: (v: string) => !!v || "Este campo es requerido",
      validRFC: (v: string) => rfcRegex.test(v) || "RFC no válido",
    };

    const colores = ref({
      rojoIMPC: "#B20000",
      rojoClaro: "#FAE6EA",
      grisOscuro: "#222222",
      verdeBoton: "#468C00",
    });

    const dialogPropiedades = ref({
      dialog: false,
      titulo: "",
      cuerpo: "",
      ruta: "",
      color: "",
      boton: "",
      velocidad: 0,
      componente: "",
    });

    const tokenAuth = ref(false);

    async function sendPassword() {
      const rfc = form.value.rfc;
      try {
        let data = new FormData();
        data.append("emailRecupera", form.value.rfc);
        data.append("token", token.value);

        await session.resetPassword(data);

        dialogPropiedades.value = {
          dialog: true,
          titulo: "Recuperación de contraseña",
          cuerpo: session.responseMessage,
          ruta: "correct",
          color: colores.value.rojoIMPC,
          boton: "Aceptar",
          velocidad: 0.5,
          componente: "",
        };

        await formEl.value?.reset();
        /*
        const alert = await showAlert(
          "Recuperación de contraseña",
          session.responseMessage
        );

        if (alert) {
          await alert.present();
          await alert.onDidDismiss();
          await formEl.value?.reset();
        }
        */
      } catch (error) {
        dialogPropiedades.value = {
          dialog: true,
          mensajeTitulo: "Recuperación de contraseña",
          mensajeCuerpo: "Ha ocurrido un error durante el envío de la petición",
          correcto: false,
        };
        /*
        await showAlert(
          "Recuperación de contraseña",
          "Ha ocurrido un error durante el envío de la petición"
        );
        throw new Error("Error al enviar la petición");
        */
      }
    }

    async function validateAndSend() {
      try {
        const isValidForm = await formEl.value?.validate();

        if (isValidForm.valid) {
          await getToken();

          if (tokenAuth.value == true) {
            try {
              await sendPassword();
            } catch (error) {
              console.log(error);
            }
          }
        }
      } catch (error) {
        console.log(error);
        return;
      }
    }

    async function getToken() {
      try {
        await session.getTokenAuth();

        const storage = new Storage();
        storage.create();
        token.value = await storage.get("token");

        if (token.value == "" || token.value == null) {
          dialogPropiedades.value = {
            dialog: true,
            mensajeTitulo: "Ocurrió un problema en la conexión",
            mensajeCuerpo: "Cierre la aplicación e intente mas tarde",
            correcto: false,
          };
          /*
          await showAlert(
            "Ocurrio un problema con el servidor",
            "Cierre la aplicación e intente más tarde"
          );
          */
        } else {
          tokenAuth.value = true;
        }
      } catch (error) {
        dialogPropiedades.value = {
          dialog: true,
          mensajeTitulo: "Ocurrió un problema en la conexión",
          mensajeCuerpo: "Cierre la aplicación e intente mas tarde",
          correcto: false,
        };
        /*
        await showAlert(
          "Ocurrio un problema con el servidor",
          "Cierre la aplicación e intente más tarde"
        );
        throw new Error("Error al obtener el token");
        */
      }
    }

    function convertToUpperCase(fieldName: keyof typeof form.value) {
      form.value[fieldName] = form.value[fieldName].toUpperCase();
    }

    function cerrardialogPropiedades(estado: boolean) {
      dialogPropiedades.value.dialog = false;
      if (estado) {
        //router.push({ name: "login" });
      }
    }

    return {
      colores,
      form,
      rules,
      isValid,
      formEl,
      validateAndSend,
      convertToUpperCase,
      anim,
      dialogPropiedades,
      CorrectAnimation,
      IncorrectAnimation,
      cerrardialogPropiedades,
    };
  },
});
</script>

<style>
@import "../assets/css/login.css";
</style>

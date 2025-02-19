<template>
  <ion-page>
    <ion-content>
      <v-container
        class="ma-# pa-# fill-height"
        fluid
        style="align-items: normal"
      >
        <v-row
          align="start"
          style="height: 25%; width: 100%"
          class="d-flex align-center justify-center"
        >
          <img
            style="max-width: 240px; max-height: 200px"
            src="../assets/images/logotipo.svg"
          />
        </v-row>
        <v-row
          align="start"
          style="height: 62%; width: 100%"
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
                <v-col class="d-flex flex-row px-10">
                  <v-btn
                    :to="{ path: '/login' }"
                    class="text-caption text-disabled text-capitalize pa-0"
                    color="#C6092F"
                    rounded="lg"
                    size="x-small"
                    style="font-weight: bold"
                    variant="plain"
                  >
                    Iniciar sesión
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    :to="{ path: '/createAccount' }"
                    class="text-caption text-disabled text-capitalize pa-0"
                    color="#C6092F"
                    rounded="lg"
                    size="x-small"
                    style="font-weight: bold"
                    variant="plain"
                  >
                    Crear cuenta
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
      <v-dialog v-model="loading">
        <div class="text-center">
          <v-progress-circular
            :size="60"
            :color="colores.rojoIMPC"
            indeterminate
          ></v-progress-circular>
        </div>
      </v-dialog>
    </ion-content>
    <dialog-action
      :dialogView="dialogPropiedades.dialog"
      :dialog-title="dialogPropiedades.titulo"
      :dialog-content="dialogPropiedades.cuerpo"
      :dialog-route="dialogPropiedades.ruta"
      :dialog-colour="dialogPropiedades.color"
      :dialog-text-button="dialogPropiedades.boton"
      :dialog-speed="dialogPropiedades.velocidad"
      :dialog-loop="dialogPropiedades.repetir"
      @cerrarDialog="cerrardialogPropiedades"
    />
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { IonPage, IonContent } from "@ionic/vue";
import { Storage } from "@ionic/storage";
import { useSessionStore } from "../store/session";
import DialogAction from "./helper/DialogAction.vue";

export default defineComponent({
  name: "resetPassword",
  components: {
    IonPage,
    IonContent,
    DialogAction,
  },
  setup() {
    const session = useSessionStore();
    const router = useRouter();

    const rfcRegex =
      /^([A-ZÑ&]{3,4})\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])[A-Z0-9]{3}$/;

    const isValid = ref(true);
    const formEl = ref<any>(null);

    const form = ref({ rfc: "" });
    const token = ref("");

    const loading = ref(false);

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
      repetir: false,
    });

    const tokenAuth = ref(false);

    async function sendPassword() {
      loading.value = true;
      const rfc = form.value.rfc;
      try {
        let data = new FormData();
        data.append("emailRecupera", form.value.rfc);
        data.append("token", token.value);

        await session.resetPassword(data);

        loading.value = false;
        dialogPropiedades.value = {
          dialog: true,
          titulo: "Recuperación de contraseña",
          cuerpo: session.responseMessage,
          ruta: "correct",
          color: colores.value.verdeBoton,
          boton: "Aceptar",
          velocidad: 0.5,
          componente: "",
          repetir: false,
        };

        await formEl.value?.reset();
      } catch (error) {
        loading.value = false;
        dialogPropiedades.value = {
          dialog: true,
          titulo: "Recuperación de contraseña",
          cuerpo: "Ha ocurrido un error durante el envío de la petición",
          ruta: "incorrect",
          color: colores.value.rojoIMPC,
          boton: "Cerrar",
          velocidad: 0.5,
          componente: "",
          repetir: false,
        };
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
            titulo: "Ocurrió un problema en la conexión",
            cuerpo: "Cierre la aplicación e inténtelo más tarde.",
            ruta: "incorrect",
            color: colores.value.rojoIMPC,
            boton: "Cerrar",
            velocidad: 0.5,
            componente: "",
            repetir: false,
          };
        } else {
          tokenAuth.value = true;
        }
      } catch (error) {
        dialogPropiedades.value = {
          dialog: true,
          titulo: "Ocurrió un problema en la conexión",
          cuerpo: "Cierre la aplicación e inténtelo más tarde.",
          ruta: "incorrect",
          color: colores.value.rojoIMPC,
          boton: "Cerrar",
          velocidad: 0.5,
          componente: "",
          repetir: false,
        };
      }
    }

    function convertToUpperCase(fieldName: keyof typeof form.value) {
      form.value[fieldName] = form.value[fieldName].toUpperCase();
    }

    function cerrardialogPropiedades() {
      dialogPropiedades.value.dialog = false;
      if (dialogPropiedades.value.componente != "") {
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
      dialogPropiedades,
      cerrardialogPropiedades,
      loading,
    };
  },
});
</script>

<style>
@import "../assets/css/login.css";
</style>

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
          style="height: 75%; width: 100%"
          class="d-flex align-start justify-center"
        >
          <v-card color="transparent" elevation="0">
            <v-form
              v-model="isValid"
              @submit.prevent="validateAndCreate"
              lazy-validation
              ref="formEl"
            >
              <v-row dense>
                <v-col
                  class="d-flex justify-center align-center pb-10"
                  cols="12"
                  lg="12"
                  md="12"
                  sm="12"
                >
                  <v-label
                    style="font-size: 28px; font-weight: bold; color: #424242"
                    >Preregistro</v-label
                  >
                </v-col>
                <v-col cols="12" lg="12" md="12" sm="12" class="px-10">
                  <v-text-field
                    v-model="form.nombre"
                    :rules="[rules.required, rules.noWhitespace]"
                    clearable
                    hide-details="auto"
                    label="Nombre"
                    rounded="lg"
                    style="font-weight: bold"
                    variant="solo"
                    @input="() => convertToUpperCase('nombre')"
                  />
                </v-col>
                <v-col cols="12" lg="12" md="12" sm="12" class="px-10">
                  <v-text-field
                    v-model="form.apellido"
                    :rules="[rules.required, rules.noWhitespace]"
                    clearable
                    hide-details="auto"
                    label="Apellido"
                    rounded="lg"
                    style="font-weight: bold"
                    variant="solo"
                    @input="() => convertToUpperCase('apellido')"
                  />
                </v-col>
                <v-col cols="12" lg="12" md="12" sm="12" class="px-10">
                  <v-text-field
                    v-model="form.email"
                    :rules="[rules.required, rules.validEmail]"
                    clearable
                    hide-details="auto"
                    label="E-mail"
                    rounded="lg"
                    style="font-weight: bold"
                    variant="solo"
                  />
                </v-col>
                <v-col cols="12" lg="12" md="12" sm="12" class="px-10">
                  <v-text-field
                    v-model="form.telefono"
                    :rules="[rules.required, rules.validTelefono]"
                    clearable
                    hide-details="auto"
                    label="Teléfono"
                    rounded="lg"
                    style="font-weight: bold"
                    variant="solo"
                  />
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
                    @input="() => convertToUpperCase('rfc')"
                  />
                </v-col>
                <v-col
                  cols="6"
                  lg="12"
                  md="12"
                  sm="12"
                  class="px-6"
                  align="left"
                >
                  <v-btn
                    :to="{ path: '/' }"
                    class="text-caption text-disabled ms-1 text-capitalize"
                    color="#C6092F"
                    rounded="lg"
                    size="x-small"
                    style="font-weight: bold"
                    variant="plain"
                  >
                    Iniciar sesión
                  </v-btn>
                </v-col>
                <v-col
                  cols="6"
                  lg="12"
                  md="12"
                  sm="12"
                  class="px-4"
                  align="left"
                >
                  <v-btn
                    :to="{ path: '/resetPassword' }"
                    class="text-caption text-disabled ms-1 text-capitalize"
                    color="#C6092F"
                    rounded="lg"
                    size="x-small"
                    style="font-weight: bold"
                    variant="plain"
                  >
                    Recuperar contraseña
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
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent, onIonViewDidEnter } from "@ionic/vue";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { Storage } from "@ionic/storage";
import { useSessionStore } from "../store/session";

import DialogAction from "./helper/DialogAction.vue";

export default defineComponent({
  name: "Account",
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telefonoRegex = /^\d{10}$/;
    const noWhitespaceRegex = /^\S+$/; // No permite espacios en blanco

    const isValid = ref(true);
    const formEl = ref<any>(null);
    const show1 = ref(false);

    const tokenAuth = ref(false);
    const token = ref("");

    const loading = ref(false);

    const form = ref({
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
      rfc: "",
    });
    const rules = {
      validRFC: (v: string) => rfcRegex.test(v) || "RFC no válido",
      required: (v: string) => !!v || "Este campo es requerido",
      validEmail: (v: string) =>
        emailRegex.test(v) || "Correo electrónico no válido",
      validTelefono: (v: string) =>
        telefonoRegex.test(v) || "Teléfono no válido",
      noWhitespace: (v: string) =>
        noWhitespaceRegex.test(v) || "No se permiten espacios en blanco",
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

    async function createAccount() {
      loading.value = true;
      try {
        let data = new FormData();
        data.append("datos[nombre]", form.value.nombre);
        data.append("datos[apellidos]", form.value.apellido);
        data.append("datos[email]", form.value.email);
        data.append("datos[telefono]", form.value.telefono);
        data.append("datos[rfc]", form.value.rfc);

        await session.createAccount(data);

        if (session.type != "error") {
          await formEl.value?.reset();
        }

        loading.value = false;
        dialogPropiedades.value = {
          dialog: true,
          titulo: "Preregistro de cuenta",
          cuerpo:
            session.type == "error"
              ? session.responseMessage
              : "Hemos recibido tu información de preregistro. Nos pondremos en contacto contigo pronto para confirmar los siguientes pasos.",
          ruta: session.type == "error" ? "incorrect" : "correct",
          color:
            session.type == "error"
              ? colores.value.rojoIMPC
              : colores.value.verdeBoton,
          boton: "Aceptar",
          velocidad: 0.5,
          componente: "login",
          repetir: false,
        };
      } catch (error) {
        let errorReq =
          error instanceof Error
            ? error.message
            : "Ocurrió un problema en la petición";

        loading.value = false;
        dialogPropiedades.value = {
          dialog: true,
          titulo: "Preregistro de cuenta",
          cuerpo: errorReq,
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

    async function validateAndCreate() {
      try {
        const isValidForm = await formEl.value?.validate();

        if (isValidForm.valid) {
          await getToken();

          if (tokenAuth.value == true) {
            try {
              await createAccount();
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

    function cerrardialogPropiedades() {
      dialogPropiedades.value.dialog = false;
      if (dialogPropiedades.value.componente != "") {
        router.push({ name: "login" });
      }
    }

    async function limpiarFormulario() {
      form.value = {
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        rfc: "",
      };
      await formEl.value?.reset();
    }

    onIonViewDidEnter(async () => {
      await limpiarFormulario();
    });

    return {
      colores,
      form,
      rules,
      show1,
      isValid,
      formEl,
      validateAndCreate,
      convertToUpperCase,
      dialogPropiedades,
      cerrardialogPropiedades,
      loading
    };
  },
});
</script>
<style>
@import "../assets/css/login.css";
</style>

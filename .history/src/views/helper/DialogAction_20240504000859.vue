<template>
  <v-dialog v-model="dialogPropiedades.dialog" max-width="500px">
    <div class="icon-box" v-if="animationDataLoaded">
      <lottie-animation
        ref="anim"
        :animationData="animationData"
        :loop="false"
        :autoPlay="true"
        :speed="dialogPropiedades.velocidad"
        class="lottie-container"
      />
    </div>
    <v-card class="pa-6">
      <v-card-text
        class="text-h6 text-grey-darken-3 pt-15 text-center"
        :color="dialogPropiedades.color"
      >
        <span>{{ dialogPropiedades.mensajeTitulo }}</span>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="text-center">
        <span class="text-subtitle-1 text-grey-darken-1">
          {{ dialogPropiedades.mensajeCuerpo }}
        </span>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :color="dialogPropiedades.color"
          block
          size="large"
          variant="flat"
          @click="cerrarDialogPropiedades"
        >
          {{ dialogPropiedades.boton }}
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  watch,
  defineAsyncComponent,
  onBeforeMount,
} from "vue";
import { LottieAnimation } from "lottie-web-vue";
import animationData2 from "../../assets/images/correct.json";

export default defineComponent({
  name: "DialogAction",
  components: {
    LottieAnimation,
  },
  props: {
    dialogView: Boolean,
    dialogTitle: String,
    dialogContent: String,
    dialogRoute: String,
    dialogColour: String,
    dialogTextButton: String,
    dialogSpeed: Number,
  },
  setup(props, { emit }) {
    onMounted(() => {
      console.log(props.dialogRoute);
      animationData = require(`../../assets/images/${props.dialogRoute}.json`);
    });

    const dialogPropiedades = ref({
      dialog: ref(props.dialogView),
      mensajeTitulo: ref(props.dialogTitle),
      mensajeCuerpo: ref(props.dialogContent),
      ruta: ref(props.dialogRoute),
      color: ref(props.dialogColour),
      boton: ref(props.dialogTextButton),
      velocidad: ref(props.dialogSpeed),
    });

    //const animationData = () => import(`../../assets/images/${props.dialogRoute}.json`);

    //const animationData = require("../../assets/images/correct.json");
    //const json = require("../../assets/images/correct.json");
    //const animationData = json.default || json;
    let animationData = {};

    const cargarAnimationData = async () => {
      try {
        console.log("Ruta del archivo:", `../../assets/images/${props.dialogRoute}.json`);
        const module = await import(`../../assets/images/${props.dialogRoute}.json`);
        console.log("Módulo importado:", module);
        const animationData = module.default;
        console.log("Datos de animación:", animationData);
        animationDataLoaded.value = true;
      } catch (error) {
        console.error("Error while loading animation:", error);
      }
    };<template>
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
          style="height: 62%"
          class="d-flex align-start justify-center"
        >
          <v-card color="transparent" elevation="0">
            <v-form
              v-model="isValid"
              @submit.prevent="validateAndLogin"
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
                  <v-label style="font-size: 28px; font-weight: bold; color: #424242"
                    >Acceso al Sistema</v-label
                  >
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
                <v-col cols="12" lg="12" md="12" sm="12" class="px-10">
                  <v-text-field
                    v-model="form.password"
                    :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required]"
                    :type="show1 ? 'text' : 'password'"
                    clearable
                    hide-details="auto"
                    label="Contraseña"
                    rounded="lg"
                    style="font-weight: bold"
                    variant="solo"
                    @click:append-inner="show1 = !show1"
                  />
                </v-col>
                <v-col cols="12" lg="12" md="12" sm="12" class="px-10" align="right">
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
                    ENTRAR
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
      <v-dialog v-model="dialogPropiedades.dialog" max-width="500px">
        <div class="icon-box">
          <lottie-animation
            ref="anim"
            :animationData="IncorrectAnimation"
            :loop="false"
            :autoPlay="true"
            :speed="0.5"
            class="lottie-container"
          />
        </div>
        <v-card class="pa-6">
          <v-card-text
            class="text-h6 text-grey-darken-3 pt-15 text-center"
            :color="colores.rojoIMPC"
          >
            <span>{{ dialogPropiedades.mensajeTitulo }}</span>
          </v-card-text>

          <v-divider></v-divider>
          <!--lottie-animation
            v-if="dialogPropiedades.correcto"
            ref="anim"
            :animationData="CorrectAnimation"
            :loop="false"
            :autoPlay="true"
            :speed="0.5"
            class="lottie-container"
          />
          <lottie-animation
            v-else
            ref="anim"
            :animationData="IncorrectAnimation"
            :loop="false"
            :autoPlay="true"
            :speed="0.5"
            class="lottie-container"
          /-->
          <v-card-text class="text-center">
            <span class="text-subtitle-1 text-grey-darken-1">
              {{ dialogPropiedades.mensajeCuerpo }}
            </span>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :color="colores.rojoIMPC"
              block
              size="large"
              variant="flat"
              @click="cerrardialogPropiedades(dialogPropiedades.correcto)"
            >
              Cerrar
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { alertController, IonPage, IonContent } from "@ionic/vue";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { Storage } from "@ionic/storage";
import { useSessionStore } from "../store/session";

import DialogAction from "./helper/DialogAction.vue";

import { LottieAnimation } from "lottie-web-vue";

import CorrectAnimation from "../assets/images/correct.json";
import IncorrectAnimation from "../assets/images/incorrect.json";

const showAlert = async (header: string, message: string) => {
  const alert = await alertController.create({
    header,
    message,
    buttons: ["OK"],
  });

  await alert.present();
};

export default defineComponent({
  name: "Login",
  components: {
    IonPage,
    IonContent,
    LottieAnimation,
    DialogAction,
  },
  setup() {
    const session = useSessionStore();
    const router = useRouter();
    const rfcRegex = /^[A-Z&Ñ]{3,4}\d{6}[A-V1-9][A-Z1-9]\d{1}$/;

    const isValid = ref(true);
    const formEl = ref<any>(null);
    const show1 = ref(false);

    const tokenAuth = ref(false);
    const token = ref("");

    const form = ref({
      rfc: "CACX610315BD1",
      password: "temporal",
    });

    const rules = {
      validRFC: (v: string) => rfcRegex.test(v) || "RFC no válido",
      required: (v: string) => !!v || "Este campo es requerido",
    };

    const colores = ref({
      rojoIMPC: "#B20000",
      rojoClaro: "#FAE6EA",
      grisOscuro: "#222222",
      verdeBoton: "#468C00",
    });

    let anim = ref();

    const dialogPropiedades = ref({
      dialog: false,
      mensajeTitulo: "",
      mensajeCuerpo: "",
      correcto: false,
    });

    async function login() {
      try {
        let data = new FormData();
        data.append("email", form.value.rfc);
        data.append("password", form.value.password);

        await session.login(data);

        if (session.auth == true) {
          await formEl.value?.reset();
          router.push({ name: "dashboard" });
        } else {
          dialogPropiedades.value = {
            dialog: true,
            mensajeTitulo: "Inicio de sesión",
            mensajeCuerpo: "Usuario y/o contraseña incorrecta",
            correcto: false,
          };
          /*
          await showAlert(
            "Inicio de sesión",
            "Usuario y/o contraseña invalida"
          );
          */
        }
      } catch (error) {
        console.log(error);
        throw new Error("Error al iniciar sesión");
      }
    }

    function convertToUpperCase(fieldName: keyof typeof form.value) {
      form.value[fieldName] = form.value[fieldName].toUpperCase();
    }

    async function validateAndLogin() {
      try {
        const isValidForm = await formEl.value?.validate();

        if (isValidForm.valid) {
          await getToken();

          if (tokenAuth.value == true) {
            try {
              await login();
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
            mensajeCuerpo: "Cierre la aplicación e inténtelo más tarde.",
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
          mensajeCuerpo: "Cierre la aplicación e inténtelo más tarde.",
          correcto: false,
        };
        /*
        await showAlert(
          "Ocurrio un problema con el servidor",
          "Cierre la aplicación e intente más tarde"
        );
        */
        //throw new Error("Error al obtener el token");
      }
    }

    function cerrardialogPropiedades(estado: boolean) {
      dialogPropiedades.value.dialog = false;
      if (estado) {
        router.push({ name: "dashboard" });
      }
    }

    return {
      colores,
      form,
      rules,
      show1,
      isValid,
      formEl,
      validateAndLogin,
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


    const animationDataLoaded = ref(false);
    const cerrarDialogPropiedades = () => {
      emit("cerrarDialog");
    };

    // Llama a cargarAnimationData en el momento adecuado

    watch(
      () => props.dialogView,
      (newValue) => {
        /*import(`../../assets/images/${props.dialogRoute}.json`)
          .then((module) => {
            animationData = module.default;
          })
          .catch((error) => {
            console.error("Error while loading animation:", error);
          });
        animationData = defineAsyncComponent(
          () => import(`../../assets/images/${props.dialogRoute}.json`)
        );*/

        /*import(`../../assets/images/${props.dialogRoute}.json`)
          .then((data) => {
            LottieAnimation.import {  } from "module"; .loadAnimation({
              container: animationData.value,
              loop: true,
              autoplay: true,
              animationData: data.default,
              class: "lottie-container",
            });
          })
          .catch((error) => {
            console.error("Error while loading animation:", error);
          });*/

        /*if (newValue) {
          console.log(props.dialogRoute);
          cargarAnimationData();
        }*/

        animationData = require(`../../assets/images/${props.dialogRoute}.json`);

        dialogPropiedades.value = {
          dialog: props.dialogView,
          mensajeTitulo: props.dialogTitle,
          mensajeCuerpo: props.dialogContent,
          ruta: props.dialogRoute,
          color: props.dialogColour,
          boton: props.dialogTextButton,
          velocidad: props.dialogSpeed,
        };

        console.log(props.dialogRoute);
        // Importar dinámicamente el componente de animación basado en la ruta proporcionada
      }
    );

    return {
      animationData,
      dialogPropiedades,
      cerrarDialogPropiedades,
      animationDataLoaded,
    };
  },
});
</script>
<style>
.lottie-container {
  height: 100px;
}

.icon-box {
  color: #fff;
  position: absolute;
  margin: 0 auto;
  left: 0;
  right: 0;
  top: -40px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  z-index: 2401;
  background: #fff;
  padding: 10px;
  text-align: center;
}
</style>

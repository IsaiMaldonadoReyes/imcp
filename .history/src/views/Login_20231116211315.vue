<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <v-container class="fill-height" style="display: grid">
        <div class="back" />
        <div class="esquina-br" />
        <div class="esquina-tl" />
        <v-card color="transparent">
          <v-row align-self="start" justify="start">
            <v-col cols="12" lg="12" md="12" sm="12" align="center">
              <v-img
                class="logo"
                max-height="90px"
                max-width="300px"
                src="../assets/images/logotipo.svg"
              />
            </v-col>
          </v-row>
          <v-row dense align="center">
            <v-col
              class="d-flex justify-center align-center pb-10"
              cols="12"
              lg="12"
              md="12"
              sm="12"
            >
              <v-label style="font-size: 28px; font-weight: bold"
                >Acceso al Sistema</v-label
              >
            </v-col>
            <v-col cols="12" lg="12" md="12" sm="12" class="px-10">
              <v-text-field
                :rules="[rules.required, rules.validRFC]"
                v-model="form.rfc"
                clearable
                label="RFC"
                rounded="lg"
                style="font-weight: bold"
                variant="solo"
                @input="() => convertToUpperCase('rfc')"
              />
            </v-col>
            <v-col cols="12" lg="12" md="12" sm="12" class="px-10">
              <v-text-field
                :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required]"
                :type="show1 ? 'text' : 'password'"
                v-model="form.password"
                clearable
                label="Contraseña"
                rounded="lg"
                style="font-weight: bold"
                variant="solo"
                @click:append-inner="show1 = !show1"
              />
            </v-col>
            <v-col cols="12" lg="12" md="12" sm="12" class="px-10" align="right">
              <v-btn
                class="text-caption text-disabled ms-1 text-capitalize"
                color="#C6092F"
                rounded="lg"
                size="x-small"
                style="font-weight: bold"
                variant="plain"
                @click="resetPassword"
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
                @click="login"
              >
                ENTRAR
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { alertController, IonPage, IonContent } from "@ionic/vue";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useSessionStore } from "../store/session";

export default defineComponent({
  name: "Login",
  components: {
    IonPage,
    IonContent,
  },
  setup() {
    const rfcRegex = /^[A-Z&Ñ]{3,4}\d{6}[A-V1-9][A-Z1-9]\d{1}$/;
    const session = useSessionStore();
    const router = useRouter();

    async function login() {
      try {
        await session.login(form.value);

        if (session.auth == true) {
          router.push("/tabs/dashboard");
        } else {
          const alert = await alertController.create({
            header: "Inicio de sesión",
            message: "Usuario y/o contraseña inválidos",
            buttons: ["OK"],
          });

          await alert.present();
        }
      } catch (error) {
        console.log(error);
      }
    }

    function convertToUpperCase(fieldName: keyof typeof form.value) {
      form.value[fieldName] = form.value[fieldName].toUpperCase();
    }

    function resetPassword() {
      //router.push({ name: "resetPassword" });
      window.location.href = "/resetPassword";
      //router.push("/resetPassword");
    }

    const form = ref({
      rfc: "",
      password: "",
    });

    const show1 = ref(false);

    const rules = {
      validRFC: (v: string) => rfcRegex.test(v) || "RFC no válido",
      required: (v: string) => !!v || "Este campo es requerido",
    };

    return {
      form,
      rules,
      show1,
      convertToUpperCase,
      login,
      resetPassword,
    };
  },
});
</script>
<style>
@import "../assets/css/login.css";
</style>

<template>
  <ion-page>
    <ion-content>
      <v-container class="ma-# pa-# fill-height">
        <v-row style="height: 10%" class="d-flex align-center justify-center">
          <img style="max-width: 80%; max-height: 80%" src="../assets/images/logotipo.svg" />
        </v-row>
        <v-row style="height: 65%" class="d-flex align-center justify-center">
          <v-card color="transparent" elevation="0">
            <v-form v-model="isValid" @submit.prevent="validateAndLogin" lazy-validation ref="formEl">
              <v-row dense>
                <v-col class="d-flex justify-center align-center pb-10" cols="12" lg="12" md="12" sm="12">
                  <v-label style="font-size: 28px; font-weight: bold">Acceso al Sistema</v-label>
                </v-col>
                <v-col cols="12" lg="12" md="12" sm="12" class="px-10">
                  <v-text-field v-model="form.rfc" :rules="[rules.required, rules.validRFC]" :clearable="!!form.rfc"
                    hide-details="auto" label="RFC" rounded="lg" style="font-weight: bold" variant="solo"
                    @input="() => convertToUpperCase('rfc')" />
                </v-col>
                <v-col cols="12" lg="12" md="12" sm="12" class="px-10">
                  <v-text-field v-model="form.password" :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required]" :type="show1 ? 'text' : 'password'" clearable hide-details="auto"
                    label="Contraseña" rounded="lg" style="font-weight: bold" variant="solo"
                    @click:append-inner="show1 = !show1" />
                </v-col>
                <v-col cols="12" lg="12" md="12" sm="12" class="px-10 " align="right">
                  <v-btn :to="{ path: '/resetPassword' }" class="text-caption text-disabled ms-1 text-capitalize"
                    color="#C6092F" rounded="lg" size="x-small" style="font-weight: bold" variant="plain">
                    Recuperar contraseña
                  </v-btn>
                </v-col>
                <v-col cols="12" lg="12" md="12" sm="12" class="px-10">
                  <v-btn block color="#C6092F" rounded="lg" size="x-large" style="font-weight: bold" type="submit">
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
    const session = useSessionStore();
    const router = useRouter();
    const show1 = ref(false);
    const rfcRegex = /^[A-Z&Ñ]{3,4}\d{6}[A-V1-9][A-Z1-9]\d{1}$/;

    const isValid = ref(true);

    const formEl = ref<any>(null);

    const form = ref({
      rfc: "",
      password: "",
    });

    const rules = {
      validRFC: (v: string) => rfcRegex.test(v) || "RFC no válido",
      required: (v: string) => !!v || "Este campo es requerido",
    };

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

    async function validateAndLogin() {
      const isValidForm = await formEl.value?.validate(); // Llama al método validate del v-form
      
      if (isValidForm.valid) {
        login();
      } else {
        //console.log("El formulario no es válido");
      }
    }

    function convertToUpperCase(fieldName: keyof typeof form.value) {
      form.value[fieldName] = form.value[fieldName].toUpperCase();
    }

    return {
      form,
      rules,
      show1,
      isValid,
      formEl,
      convertToUpperCase,
      validateAndLogin,
    };
  },
});
</script>
<style>
@import "../assets/css/login.css";
</style>

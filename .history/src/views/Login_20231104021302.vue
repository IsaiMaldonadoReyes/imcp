<template>
  <v-container class="fill-height" style="display: grid">
    <div class="back" />
    <div class="esquina-br" />
    <div class="esquina-tl" />
    <v-row dense align-self="start" justify="center">
      <v-col cols="12" lg="12" md="12" sm="12" align="center">
        <v-img
          class="logo"
          max-height="80px"
          max-width="280px"
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
        <v-label style="font-size: 24px; font-weight: bold">Acceso al Sistema</v-label>
      </v-col>
      <v-col cols="12" lg="12" md="12" sm="12" class="px-10">
        <v-text-field
          :rules="[rules.required]"
          v-model="form.rfc"
          clearable
          label="RFC"
          rounded="lg"
          style="font-weight: bold"
          variant="solo"
        />
      </v-col>
      <v-col cols="12" lg="12" md="12" sm="12" class="px-10">
        <v-text-field
          :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required]"
          :type="show2 ? 'text' : 'password'"
          v-model="form.password"
          clearable
          label="Contraseña"
          rounded="lg"
          style="font-weight: bold"
          variant="solo"
          @click:append-inner="show2 = !show2"
        />
      </v-col>
      <v-col cols="12" lg="12" md="12" sm="12" class="px-10" align="right">
        <v-btn
          block
          class="text-caption text-disabled ms-1 text-capitalize text-end"
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
  </v-container>
</template>

<script lang="ts">
import { alertController } from "@ionic/vue";
import { defineComponent, ref, inject } from "vue";
import { useRouter } from "vue-router";
import { useSessionStore } from "../store/session";

export default defineComponent({
  setup() {
    const session = useSessionStore();

    const router = useRouter();

    async function login() {
      try {
        //await session.login(form.value);
        console.log(form.value.rfc);
        console.log(form.value.password);
        if (form.value.rfc == "SOTJ841111Q39" && form.value.password == "temporal") {
          //correcto
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

    function resetPassword() {
      router.push({ name: "resetPassword" });
    }

    const form = ref({
      rfc: "",
      password: "",
    });

    const show1 = ref(true);
    const show2 = ref(false);

    const rules = {
      required: (v: string) => !!v || "Este campo es requerido",
    };

    return {
      form,
      login,
      resetPassword,
      show1,
      show2,
      rules,
    };
  },
});
</script>
<style>
@import "../assets/css/login.css";
</style>

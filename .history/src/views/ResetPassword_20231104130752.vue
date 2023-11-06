<template>
  <v-container class="fill-height" style="display: grid">
    <div class="back" />
    <div class="esquina-br" />
    <div class="esquina-tl" />
    <v-row dense align-self="start" justify="center">
      <v-col cols="12" lg="12" md="12" sm="12" align="center">
        <v-img
          class="logo"
          max-height="90px"
          max-width="290px"
          src="../assets/images/logotipo.svg"
        />
      </v-col>
    </v-row>
    <v-row >
      <v-col
        class="d-flex justify-center align-center pb-10"
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
          :rules="[rules.required]"
          clearable
          label="RFC"
          rounded="lg"
          style="font-weight: bold"
          variant="solo"
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
          @click="redirectLogin"
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
          @click="sendPassword"
        >
          ENVIAR
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { alertController } from "@ionic/vue";
import { useRouter } from "vue-router";

import { useSessionStore } from "../store/session";

export default defineComponent({
  setup() {
    const session = useSessionStore();

    const router = useRouter();

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

    function redirectLogin() {
      //router.push({ name: "login" });
      window.location.href = "/login";
    }

    const form = ref({ rfc: "" });

    const rules = {
      required: (v: string) => !!v || "Este campo es requerido",
    };

    return {
      form,
      sendPassword,
      redirectLogin,
      rules,
    };
  },
});
</script>

<style>
@import "../assets/css/login.css";
</style>

<template>
  <v-container class="fill-height" style="display: grid">
    <div class="imagen1"></div>
    <div class="imagen2"></div>
    <div class="imagen3"></div>
    <v-row dense align-self="start" justify="center">
      <v-col cols="12" lg="12" md="12" sm="12" align="center">
        <v-img
          class="logo"
          max-width="280px"
          max-height="80px"
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
          :rules="[rules.required, rules.min]"
          :type="show2 ? 'text' : 'password'"
          clearable
          hint="Ingresa al menos 8 caracteres"
          label="Contraseña"
          rounded="lg"
          style="font-weight: bold"
          variant="solo"
          @click:append-inner="show2 = !show2"
        />
      </v-col>
      <v-col cols="12" lg="12" md="12" sm="12" class="px-10">
        <v-btn
          block
          color="#C6092F"
          rounded="lg"
          size="x-large"
          style="font-weight: bold"
        >
          ENTRAR
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {
  IonPage,
  IonContent,
  IonAlert,
  IonItem,
  IonButton,
  IonLabel,
  IonInput,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { ref } from "vue";

const isOpen = ref(false);
const alertButtons = ["OK"];

const setOpen = (state: boolean) => {
  isOpen.value = state;
};

export default defineComponent({
  data: () => ({
    form: {
      nombre: "",
      password: "",
    },
    isOpen: false,
    show1: false,
    show2: true,
    password: "Password",
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
      emailMatch: () => `The email and password you entered don't match`,
    },
  }),
  methods: {
    test() {},
    setOpen() {},
    resetPassword() {
      return this.$router.push({ name: "resetPassword" });
    },
  },
});
</script>
<style>
@import "../assets/css/login.css";
</style>

<template>
  <v-container class="d-flex align-center justify-center fill-height fill-width">
    <div class="imagen1"></div>
    <div class="imagen2"></div>
    <div class="imagen3"></div>
    <v-row>
      <v-col cols="12" lg="12" md="12" sm="12" class="d-flex justify-center align-center">
        <v-img
          class="logo"
          max-width="280px"
          max-height="80px"
          src="../assets/images/logotipo.svg"
        />
      </v-col>

      
    </v-row>

    <v-row>
      <v-col cols="12" lg="12" md="12" sm="12" class="d-flex justify-center align-center">
        <v-label class="text-h5 nunito-bold">Acceso al Sistema</v-label>
      </v-col>
      <v-col cols="12" lg="12" md="12" sm="12" class="px-10">
        <v-text-field
          class="nunito-bold"
          clearable
          label="RFC"
          rounded="lg"
          variant="solo"
        />
      </v-col>
      <v-col cols="12" lg="12" md="12" sm="12" class="px-10">
        <v-text-field
          class="nunito-bold"
          clearable
          label="Contraseña"
          rounded="lg"
          variant="solo"
        />
      </v-col>
      <v-col cols="12" lg="12" md="12" sm="12" class="px-10">
        <v-btn class="nunito-bold" color="#C6092F" block rounded="lg" size="x-large">
          ENTRAR
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
  <!--ion-item>
        <ion-label class="float-label" position="floating"> Nombre </ion-label>
        <ion-input v-model="form.nombre" id="nombre" required></ion-input>
      </ion-item> 
      <ion-item>
        <ion-label class="float-label" position="floating">
          Contraseña
        </ion-label>
        <ion-input v-model="form.password" id="password" required></ion-input>
      </ion-item>

      <v-card-text>
        <v-text-field
          v-model="form.nombre"
          outlined
          clearable
          label="Email"
          color="white"
        />
        <v-text-field
          v-model="form.password"
          name="input-10-1"
          label="Contraseña"
          hint="Ingresa al menos 8 caracteres"
          counter
          outlined
          clearable
          color="white"
        />
      </v-card-text>
      <ion-button @click="test">Default</ion-button>

      <ion-button @click="resetPassword">Recuperar contraseña</ion-button>
      <ion-button @click="setOpen">Click Me</ion-button-->
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

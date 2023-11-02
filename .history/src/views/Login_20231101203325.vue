<template>
  <ion-page>
    <v-container class="">
      <v-responsive class="mx-auto" max-width="344">
        <v-text-field clearable label="Last name" variant="solo-inverted"></v-text-field>
      </v-responsive>
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
  </ion-page>
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

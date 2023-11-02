<template>
  <ion-page v-ion-theme="'light'">
      <v-container class="d-flex align-center justify-center fill-height fluid">
        <v-card color="#1E2022" elevation="16" class="">
          <v-row>
          <v-col cols="12" lg="6" class="d-flex align-stretch justify-stretch">
          <v-card color="#285697" elevation="0" width="100%">
            <v-row
              class="d-flex align-center justify-center"
              style="height: 30%"
            >
              <div class="pt-10">
                <div class="containe-x">
                  <div class="box">
                    <div class="title">
                      <span class="block"></span>
                      <h1>Becmin<span></span></h1>
                    </div>
                    <div class="role">
                      <div class="block"></div>
                      <p>Administrador de apps</p>
                    </div>
                  </div>
                </div>
              </div>
            </v-row>
            <v-row
              class="d-flex align-center justify-center"
              style="height: 50%"
            >
              <v-col cols="12" lg="8" md="8" sm="12">
                <v-form @submit.prevent="login">
                  <v-card-text>
                    <v-text-field
                      v-model="form.email"
                      outlined
                      clearable
                      label="Email"
                      color="white"
                    />
                    <v-text-field
                      v-model="form.password"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show1 ? 'text' : 'password'"
                      name="input-10-1"
                      label="Contraseña"
                      hint="Ingresa al menos 8 caracteres"
                      counter
                      outlined
                      clearable
                      @click:append="show1 = !show1"
                      color="white"
                    />
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="white" @click="login" class="primary--text">
                      ENTRAR
                      <v-icon right>mdi-arrow-right-circle</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-form>
              </v-col>
            </v-row>
            <v-row class="d-flex align-end justify-center" style="height: 20%">
              <v-tooltip bottom color="white">
                <template v-slot:activator="{ on, attrs }">
                  <a href="https://solucionesbecma.com" target="_blank">
                    <v-img
                      :src="require('../assets/images/becma_logo.png')"
                      contain
                      max-width="100"
                      max-height="50"
                      v-bind="attrs"
                      v-on="on"
                    />
                  </a>
                </template>
                <span class="primary--text">
                  Soluciones Administrativas BECMA, S.A. de C.V.
                </span>
              </v-tooltip>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
        </v-card>
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

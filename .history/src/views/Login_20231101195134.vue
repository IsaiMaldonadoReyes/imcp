<template>
  <ion-page v-ion-theme="'light'">
      <v-container class="">
        
         
              <v-card color="#285697" elevation="0" >
                <v-row
                  class="d-flex align-center justify-center"
                  style="height: 50%"
                >
                  <v-col cols="12" lg="12" md="12" sm="12">
                    <v-form>
                      <v-card-text>
                        <v-text-field
                          outlined
                          clearable
                          label="Email"
                          color="white"
                        />
                        <v-text-field
                          name="input-10-1"
                          label="Contraseña"
                          hint="Ingresa al menos 8 caracteres"
                          counter
                          outlined
                          clearable
                          
                          color="white"
                        />
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="white"  class="primary--text">
                          ENTRAR
                          <v-icon right>mdi-arrow-right-circle</v-icon>
                        </v-btn>
                      </v-card-actions>
                    </v-form>
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

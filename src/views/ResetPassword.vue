<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-item>
        <ion-label class="float-label" position="floating"> Nombre </ion-label>
        <ion-input v-model="form.nombre" id="nombre" required></ion-input>
      </ion-item>
      <ion-item>
        <ion-label class="float-label" position="floating">
          Contraseña
        </ion-label>
        <ion-input v-model="form.password" id="password" required></ion-input>
      </ion-item>
      <ion-button @click="test">Default</ion-button>

      <ion-button @click="resetPassword">Recuperar contraseña</ion-button>
      
      <ion-alert
        :is-open="isOpen"
        header="Alert"
        sub-header="Important message"
        message="This is an alert!"
      ></ion-alert>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent, IonAlert } from "@ionic/vue";
import { defineComponent } from "vue";
import Swal from "sweetalert2";

export default defineComponent({
  data: () => ({
    form: {
      nombre: "",
      password: "",
    },
    isOpen: false,
  }),
  methods: {
    test() {
      Swal.fire("SweetAlert2 is working!");
    },
    setOpen() {
      this.isOpen = true;
    },
    resetPassword() {
      return this.$router.push({ name: "resetPassword" });
    },
  },
});
</script>

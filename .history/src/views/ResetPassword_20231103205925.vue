<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="imagen1"></div>
      <div class="imagen2"></div>
      <div class="imagen3"></div>
      <v-img src="../assets/images/logotipo.svg"></v-img>
      <v-label class="ma-4 text-h5 nunito-bold">Acceso al Sistema</v-label>
      <v-text-field class="nunito-bold ion-margin tablet-input" label="RFC" rounded="lg" variant="solo"
        v-model="form.rfc"></v-text-field>

      <ion-button @click="sendPassword()" class="nunito-bold ion-margin" expand="full" color="danger">ENTRAR</ion-button>

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { IonPage, IonContent, IonButton, alertController } from '@ionic/vue';
import { useRouter } from 'vue-router';

import { useSessionStore } from '../store/session';

export default defineComponent({
  setup() {
    const session = useSessionStore();

    const router = useRouter();

    async function sendPassword() {
      const rfc = form.value.rfc;
      try {
        //await session.resetPassword(rfc);

        const alert = await alertController.create({
          header: 'Recuperación de contraseña',
          message: 'Se ha enviado un correo para la recuperación de su contraseña',
          buttons: ['OK'],
        });

        await alert.present();

      } catch (error) {
        console.log(error);
      }
    }

    const form = ref({ rfc: '' });

    return {
      form,
      sendPassword
    }

  },

});
</script>

<style>
@import "../assets/css/reset.css";
</style>

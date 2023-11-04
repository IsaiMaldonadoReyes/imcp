<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="imagen1"></div>
      <div class="imagen2"></div>
      <div class="imagen3"></div>
      <v-img src="../assets/images/logotipo.svg"></v-img>
      <v-label class="ma-4 text-h5 nunito-bold">Acceso al Sistema</v-label>
      <v-text-field class="nunito-bold ion-margin tablet-input" label="RFC" rounded="lg" variant="solo"
        v-model="form.email"></v-text-field>
      <v-text-field class="nunito-bold ion-margin tablet-input" label="Contraseña" rounded="lg" variant="solo"
        v-model="form.password" type="password"></v-text-field>
      <ion-button @click="login" class="nunito-bold ion-margin" expand="full" color="danger">ENTRAR</ion-button>

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { IonPage, IonContent, IonButton } from '@ionic/vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const router = useRouter();
    const store = useStore();
    const form = ref({
      email: '',
      password: '',
    });

    const login = async () => {
      if (form.value.email === 'SOTJ841111Q39' && form.value.password === 'temporal') {
        // Aquí puedes despachar la acción de inicio de sesión en Vuex si es necesario
        // await store.dispatch('login', form.value);

        // Navegar a la página de inicio de sesión exitosa o a donde desees
        router.push({ name: 'dashboard' });
      } else {
        // Muestra una alerta de error en el inicio de sesión
        // Puedes usar la función de alerta de Ionic o alguna otra personalización
        console.log('Usuario y/o contraseña no válidos');
      }
    };

    return {
      form,
      login,
    };
  },
});
</script>

<style>
@import "../assets/css/reset.css";
</style>

<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
</script>

<style>
ion-router-outlet {
  background-image: url("assets/images/back.jpg"); /* Ajusta la ruta y nombre del archivo de tu imagen */
  background-size: cover; /* Ajusta la propiedad según tus necesidades */
  background-position: center center; /* Ajusta la propiedad según tus necesidades */
  background-repeat: no-repeat;
  /* Puedes agregar más propiedades según sea necesario para personalizar el fondo */
}
</style>

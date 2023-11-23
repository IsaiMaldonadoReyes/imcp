<template>
  <ion-page>
    <ion-content>
      <v-container>Desgloce de puntos</v-container>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent } from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "desglosePuntos",
  components: {
    IonContent,
    IonPage,
  },
  data: () => ({
    form: {
      rfc: "",
      password: "",
    },
  }),
});
</script>

<template>
  <ion-page>
    <ion-content :fullscreen="true">
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";
import ExploreContainer from "@/components/ExploreContainer.vue";
import { defineComponent } from "vue";

export default defineComponent({
  data: () => ({
    form: {
      rfc: "",
      password: "",
    },
  }),
});
</script>

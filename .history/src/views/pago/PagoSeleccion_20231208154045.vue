<template>
  <ion-page>
    <ion-content>
      <v-container> </v-container>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { ref, computed, defineComponent, onMounted } from "vue";
import { IonPage, IonContent } from "@ionic/vue";
import { useDashboardStore } from "@/store/dashboard";

export default defineComponent({
  name: "dashboard",
  components: {
    IonContent,
    IonPage,
  },
  setup() {
    const dashStore = useDashboardStore();

    const colores = ref({
      rojoIMPC: "#B20000",
      rojoClaro: "#FAE6EA",
      grisOscuro: "#222222",
    });

    return {
      colores,
    };
  },
});
</script>

<style scoped lang="scss">
.blue-tab {
  background-color: white !important;
  /* Cambia 'blue' por el color que desees */
}
</style>

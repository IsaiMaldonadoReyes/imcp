<template>
  <ion-page>
    <ion-content>
      <v-container fluid>
        <v-card elevation="0" color="transparent">
          <v-card-item>
            <v-card-title
              class="text-grey-darken-3 font-weight-bold text-center"
              style="white-space: normal"
            >
              Pago de certificado
            </v-card-title>
          </v-card-item>
        </v-card>
        <v-card class="pa-2">
          <v-card-text>
            <v-select
              model-value="John Doe"
              label="Tipo de pago *"
              placeholder="Débito Visa / Mastercard"
              clearable
              hide-details="auto"
              variant="outlined"
              persistent-placeholder
              no-data-text="No hay datos disponibles"
            ></v-select>
          </v-card-text>
        </v-card>
      </v-container>
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

<style scoped lang="scss"></style>

<template>
  <ion-page>
    <ion-content>
      <v-container fluid>
        <v-card elevation="0" color="transparent">
          <v-card-item>
            <v-card-title class="text-uppercase text-center" style="white-space: normal">
              Certificados en proceso
            </v-card-title>
          </v-card-item>
        </v-card>
        <v-card class="py-1" elevation="0" border>
          <v-card-text>
            <span class="text-subtitle-1 text-grey-darken-1">Certificado: </span>
            <span class="text-subtitle-1 font-weight-bold">EUC 2023</span>
            <br />
            <span class="text-subtitle-1 text-grey-darken-1">Núm. Certificado: </span>
            <span class="text-subtitle-1 font-weight-bold">0000111</span>
            <br />
            <span class="text-subtitle-1 text-grey-darken-1">Fecha: </span>
            <span class="text-subtitle-1 font-weight-bold">2023-01-10</span>
            <br />
            <span class="text-subtitle-1 text-grey-darken-1">Sector: </span>
            <span class="text-subtitle-1 font-weight-bold">Finanzas</span>
          </v-card-text>
          <v-card class="ma-3 pa-3" border elevation="0">
            <v-timeline side="end">
              <v-timeline-item
                v-for="(item, i) in items"
                :key="i"
                :dot-color="item.color"
                :icon="item.icon"
              >
                <template v-slot:opposite>
                  <div
                    :class="`headline text-subtitle-1 font-weight-bold text-${item.color}`"
                    v-text="item.ejercicio"
                  ></div>
                </template>
                <div>
                  <h6 class="headline font-weight-light mb-4 text-grey-darken-1">
                    {{ item.cumpliento }}
                  </h6>
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card>
        </v-card>
      </v-container>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { IonPage, IonContent } from "@ionic/vue";

export default defineComponent({
  name: "CertificadoEstatus",
  components: {
    IonPage,
    IonContent,
  },
  setup() {
    const items = ref([
      {
        color: "green",
        icon: "mdi-check-bold",
        ejercicio: 2023,
        cumpliento: "Si cumplió",
      },
      {
        color: "red",
        icon: "mdi-close-thick",
        ejercicio: 2022,
        cumpliento: "No cumplió",
      },
      {
        color: "green",
        icon: "mdi-check-bold",
        ejercicio: 2021,
        cumpliento: "Si cumplió",
      },
      {
        color: "red",
        icon: "mdi-close-thick",
        ejercicio: 2020,
        cumpliento: "No cumplió",
      },
    ]);

    return { items };
  },
});
</script>

<style scoped lang="scss"></style>

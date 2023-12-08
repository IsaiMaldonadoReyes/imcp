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
        <v-card class="py-1" elevation="0" border rounded="0">
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
          <v-card-text>
            <v-timeline align="start">
              <v-timeline-item
                v-for="(item, i) in items"
                :key="i"
                :dot-color="item.color"
                :icon="item.icon"
                fill-dot
              >
                <v-card>
                  <v-card-title :class="['text-h5 text-center', `bg-${item.color}`]">
                    {{ item.ejercicio }}
                  </v-card-title>
                  <v-card-text class="bg-white text--primary">
                    <p>Si cumplio</p>
                  </v-card-text>
                </v-card>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
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
      },
      {
        color: "red",
        icon: "mdi-close-thick",
        ejercicio: 2022,
      },
      {
        color: "green-lighten-1",
        icon: "mdi-airballoon",
      },
      {
        color: "indigo-lighten-2",
        icon: "mdi-layers-triple",
      },
    ]);

    return { items };
  },
});
</script>

<style scoped lang="scss"></style>

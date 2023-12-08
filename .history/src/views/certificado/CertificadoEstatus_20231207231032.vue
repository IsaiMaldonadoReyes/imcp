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
            <v-table density="compact">
              <tbody>
                <tr>
                  <td class="ma-0 pa-0 text-subtitle-1 text-grey-darken-1">
                    Certificado:
                  </td>
                  <td class="ma-0 pa-0 text-subtitle-1 font-weight-bold">EUC 2023</td>
                </tr>
                <tr>
                  <td class="ma-0 pa-0 text-subtitle-1 text-grey-darken-1">
                    Núm. Certificado:
                  </td>
                  <td class="text-subtitle-1 font-weight-bold text-left">0000111</td>
                </tr>
                <tr>
                  <td class="text-subtitle-1 text-grey-darken-1">Fecha:</td>
                  <td class="text-subtitle-1 font-weight-bold text-justify">
                    2023-01-10
                  </td>
                </tr>
                <tr>
                  <td class="text-subtitle-1 text-grey-darken-1">Sector:</td>
                  <td class="text-subtitle-1 font-weight-bold text-justify">Finanzas</td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
          <v-divider />
          <v-card class="ma-3 pa-4" border elevation="0">
            <v-timeline side="end">
              <v-timeline-item
                v-for="(item, i) in items"
                :key="i"
                :dot-color="item.color"
                :icon="item.icon"
              >
                <template v-slot:opposite>
                  <div
                    class="headline text-subtitle-1 font-weight-bold"
                    :style="`color: ${item.color}`"
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
          <v-divider />
          <v-card-actions>
            <v-btn :color="colores.grisOscuro" block text="VER DETALLE" variant="flat" />
          </v-card-actions>
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
    const colores = ref({
      rojoIMPC: "#B20000",
      rojoClaro: "#FAE6EA",
      grisOscuro: "#222222",
      verdeBoton: "#468C00",
    });

    const items = ref([
      {
        color: "#468C00",
        icon: "mdi-check-bold",
        ejercicio: 2023,
        cumpliento: "Si cumplió",
      },
      {
        color: "#B20000",
        icon: "mdi-close-thick",
        ejercicio: 2022,
        cumpliento: "No cumplió",
      },
      {
        color: "#468C00",
        icon: "mdi-check-bold",
        ejercicio: 2021,
        cumpliento: "Si cumplió",
      },
      {
        color: "#B20000",
        icon: "mdi-close-thick",
        ejercicio: 2020,
        cumpliento: "No cumplió",
      },
    ]);

    return { items, colores };
  },
});
</script>

<style scoped lang="scss"></style>

<template>
  <ion-page>
    <ion-content>
      <v-container fluid>
        <v-card elevation="0" color="transparent">
          <v-card-item>
            <v-card-title
              class="text-grey-darken-3 text-center"
              style="white-space: normal"
            >
              Certificado <span class="font-weight-bold">EUC 2023</span>
            </v-card-title>
          </v-card-item>
        </v-card>
        <v-card class="my-4" elevation="0" border>
          <v-card-text>
            <v-table density="compact">
              <tbody>
                <tr>
                  <td class="ma-0 pa-1 text-subtitle-1 text-grey-darken-1">Periodo:</td>
                  <td class="ma-0 pa-1 text-subtitle-1 font-weight-bold"></td>
                </tr>
                <tr>
                  <td class="ma-0 pa-1 text-subtitle-1 text-grey-darken-1">
                    Núm. Certificado:
                  </td>
                  <td class="ma-0 pa-1 text-subtitle-1 font-weight-bold text-justify">
                    0000111
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>

        <v-card
          border
          class="my-4 py-1"
          elevation="0"
          v-for="item in ejercicios"
          :key="item.ejercicio"
        >
          <div class="d-flex justify-space-between px-3 my-3">
            <div class="d-flex align-center text-caption text-medium-emphasis me-1">
              <span class="text-h6 text-grey-darken-3 font-weight-bold">
                {{ item.ejercicio }}
              </span>
            </div>

            <div class="d-flex align-center text-caption text-medium-emphasis me-1">
              <span class="text-h6 text-grey-darken-1 font-weight-bold"> TOTAL: </span>
              <span class="text-h6 font-weight-bold" style="color: #b80000">
                48 puntos
              </span>
            </div>
          </div>
          <v-divider></v-divider>
          <v-row align="start" no-gutters>
            <v-col cols="4">
              <v-card
                class="ms-1 my-1 text-center"
                :color="item.color"
                elevation="0"
                rounded="0"
              >
                <v-card-text
                  :style="`color:
                  ${item.colorFuerte}; line-height: 1 !important; height: 55px;`"
                >
                  <span
                    class="text-subtitle-2 font-weight-bold"
                    style="line-height: 1 !important"
                  >
                    Puntaje principal
                  </span>
                </v-card-text>
                <v-card-item style="line-height: 1 !important; height: 50px">
                  <span class="text-h6 text-grey-darken-1">20/20</span>
                </v-card-item>
              </v-card>
            </v-col>
            <v-col cols="4">
              <v-card
                class="ms-1 my-1 text-center"
                :color="item.color"
                elevation="0"
                rounded="0"
              >
                <v-card-text
                  :style="`color:
                  ${item.colorFuerte}; line-height: 1 !important; height: 55px;`"
                >
                  <span
                    class="text-subtitle-2 font-weight-bold"
                    style="line-height: 1 !important"
                  >
                    Puntaje otros cursos
                  </span>
                </v-card-text>
                <v-card-item style="line-height: 1 !important; height: 50px">
                  <span class="text-h6 text-grey-darken-1">55/55</span>
                </v-card-item>
              </v-card>
            </v-col>
            <v-col cols="4">
              <v-card
                class="ms-1 me-1 my-1 text-center"
                :color="item.color"
                elevation="0"
                rounded="0"
              >
                <v-card-text
                  :style="`color:
                  ${item.colorFuerte}; line-height: 1 !important; height: 55px;`"
                >
                  <span
                    class="text-subtitle-2 font-weight-bold"
                    style="line-height: 1 !important"
                  >
                    Puntaje ética
                  </span>
                </v-card-text>
                <v-card-item style="line-height: 1 !important; height: 50px">
                  <span class="text-h6 text-grey-darken-1">5/5</span>
                </v-card-item>
              </v-card>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-card-actions class="justify-end">
            <v-btn
              :color="colores.grisOscuro"
              prepend-icon="mdi-eye-arrow-right-outline"
              text="Más información"
              variant="flat"
            >
              <template v-slot:prepend>
                <v-icon class="mx-2" size="large"></v-icon>
              </template>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { IonPage, IonContent } from "@ionic/vue";
import { VDataIterator } from "vuetify/lib/labs/components.mjs";

export default defineComponent({
  name: "CertificadoEstatus",
  components: {
    IonPage,
    IonContent,
    VDataIterator,
  },
  setup() {
    const colores = ref({
      rojoIMPC: "#B20000",
      rojoClaro: "#FAE6EA",
      grisOscuro: "#222222",
      verdeBoton: "#468C00",
      verdeClaro: "#ECF3E4",
    });

    const ejercicios = ref([
      {
        color: "#ECF3E4",
        colorFuerte: "#468C00",
        icon: "mdi-check-bold",
        ejercicio: 2023,
        cumpliento: "Si cumplió",
      },
      {
        color: "#FAE6EA",
        colorFuerte: "#B20000",
        icon: "mdi-close-thick",
        ejercicio: 2022,
        cumpliento: "No cumplió",
      },
      {
        color: "#ECF3E4",
        colorFuerte: "#468C00",
        icon: "mdi-check-bold",
        ejercicio: 2021,
        cumpliento: "Si cumplió",
      },
      {
        color: "#FAE6EA",
        colorFuerte: "#B20000",
        icon: "mdi-close-thick",
        ejercicio: 2020,
        cumpliento: "No cumplió",
      },
    ]);

    return {
      ejercicios,
      colores,
    };
  },
});
</script>

<style scoped lang="scss"></style>

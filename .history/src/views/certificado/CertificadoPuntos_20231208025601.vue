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

        <v-card
          border
          class="my-2 py-1"
          elevation="0"
          v-for="item in ejercicios"
          :key="item.ejercicio"
        >
          <div class="d-flex justify-space-between px-3 my-3">
            <div class="d-flex align-center text-caption text-medium-emphasis me-1">
              <span class="text-h6 text-grey-darken-3 font-weight-bold"> 2023 </span>
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
                :color="colores.verdeClaro"
                elevation="0"
                rounded="0"
              >
                <v-card-text
                  :style="`color:
                  ${colores.verdeBoton}; line-height: 1 !important; height: 55px;`"
                >
                  <span
                    class="text-subtitle-2 font-weight-bold"
                    style="line-height: 1 !important"
                  >
                    Puntaje principal
                  </span>
                </v-card-text>
                <v-card-item
                  :style="`color:
                  ${colores.verdeBoton}; line-height: 1 !important; height: 50px;`"
                >
                  <span class="text-h6 text-grey-darken-1">20/20</span>
                </v-card-item>
              </v-card>
            </v-col>
            <v-col cols="4">
              <v-card
                class="ms-1 my-1 text-center"
                :color="colores.verdeClaro"
                elevation="0"
                rounded="0"
              >
                <v-card-text
                  :style="`color:
                  ${colores.verdeBoton}; line-height: 1 !important; height: 55px;`"
                >
                  <span
                    class="text-subtitle-2 font-weight-bold"
                    style="line-height: 1 !important"
                  >
                    Puntaje otros cursos
                  </span>
                </v-card-text>
                <v-card-item
                  :style="`color:
                  ${colores.verdeBoton}; line-height: 1 !important; height: 50px;`"
                >
                  <span class="text-h6 text-grey-darken-1">55/55</span>
                </v-card-item>
              </v-card>
            </v-col>
            <v-col cols="4">
              <v-card
                class="ms-1 me-1 my-1 text-center"
                :color="colores.verdeClaro"
                elevation="0"
                rounded="0"
              >
                <v-card-text
                  :style="`color:
                  ${colores.verdeBoton}; line-height: 1 !important; height: 55px;`"
                >
                  <span
                    class="text-subtitle-2 font-weight-bold"
                    style="line-height: 1 !important"
                  >
                    Puntaje ética
                  </span>
                </v-card-text>
                <v-card-item
                  :style="`color:
                  ${colores.verdeBoton}; line-height: 1 !important; height: 50px;`"
                >
                  <span class="text-h6 text-grey-darken-1">5/5</span>
                </v-card-item>
              </v-card>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn
              :color="colores.grisOscuro"
              block
              prepend-icon="mdi-eye-arrow-right-outline"
              size="large"
              text="Más información"
              variant="flat"
            >
              <template v-slot:prepend>
                <v-icon class="mr-3" size="large"></v-icon>
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

    return {
      ejercicios,
      colores,
    };
  },
});
</script>

<style scoped lang="scss"></style>

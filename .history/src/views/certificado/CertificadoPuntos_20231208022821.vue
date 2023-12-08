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

        <v-card border class="my-2 py-1" elevation="0">
          <div class="d-flex justify-space-between px-3 my-3">
            <div class="d-flex align-center text-caption text-medium-emphasis me-1">
              <span class="text-subtitle-1 text-grey-darken-3 font-weight-bold">
                2023
              </span>
            </div>

            <div class="d-flex align-center text-caption text-medium-emphasis me-1">
              <span class="text-subtitle-1 text-grey-darken-1 font-weight-bold">
                TOTAL:
              </span>
              <span class="text-subtitle-1 font-weight-bold" style="color: #b80000">
                48 puntos
              </span>
            </div>
          </div>
          <v-divider></v-divider>
          <v-row align="start" no-gutters>
            <v-col cols="4">
              <v-card
                class="ma-1 text-center"
                :color="colores.verdeClaro"
                elevation="0"
                rounded="0"
              >
                <v-card-text
                  :style="`color:
                  ${colores.verdeBoton}; line-height: 1 !important; height: 50px;`"
                >
                  <span
                    class="text-body-2 font-weight-bold"
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
                class="ma-1 text-center"
                :color="colores.verdeClaro"
                elevation="0"
                rounded="0"
              >
                <v-card-text
                  :style="`color:
                  ${colores.verdeBoton}; line-height: 1 !important; height: 50px;`"
                >
                  <span
                    class="text-body-2 font-weight-bold"
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
          </v-row>
        </v-card>
        <v-data-iterator
          :items-per-page="itemsPorPagina"
          :items="certificados"
          :search="busquedaCertificado"
          :sort-by="sortBy"
          item-value="areaEspecialidad"
        >
          <template v-slot:header>
            <v-row dense>
              <v-col cols="12" lg="6" md="12" sm="12" xs="12">
                <v-text-field
                  v-model="busquedaCertificado"
                  clearable
                  density="comfortable"
                  hide-details
                  placeholder="Buscar certificado"
                  prepend-inner-icon="mdi-magnify"
                  variant="solo"
                />
              </v-col>
              <v-col cols="12" lg="6" md="12" sm="12" xs="12">
                <v-row dense>
                  <v-col cols="8">
                    <v-select
                      v-model="sortBy"
                      :item-props="keysProps"
                      :items="keys"
                      density="comfortable"
                      hide-details
                      placeholder="Ordenar por"
                      variant="solo"
                    />
                  </v-col>
                  <v-col cols="4" class="d-flex justify-end">
                    <v-btn-toggle v-model="sortDesc" elevation="2">
                      <v-btn
                        :value="'asc'"
                        color="#B20000"
                        icon="mdi-arrow-up"
                        size="small"
                      />
                      <v-btn
                        :value="'desc'"
                        color="#B20000"
                        icon="mdi-arrow-down"
                        size="small"
                      />
                    </v-btn-toggle>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </template>

          <template v-slot:no-data>
            <v-card
              border
              class="my-5 pa-10 text-center"
              color="transparent"
              elevation="0"
            >
              <v-icon color="grey-lighten-1" size="60">mdi-database-eye-off</v-icon>
              <v-card-text class="text-grey-darken-1">
                No se encontraron certificados que coincidan con la búsqueda.
              </v-card-text>
            </v-card>
          </template>

          <template v-slot:default="{ items }">
            <v-card
              class="my-4"
              elevation="0"
              border
              v-for="item in items"
              :key="item.raw.certificado"
            >
              <v-card-text>
                <v-table density="compact">
                  <tbody>
                    <tr>
                      <td class="ma-0 pa-1 text-subtitle-1 text-grey-darken-1">
                        Certificado:
                      </td>
                      <td class="ma-0 pa-1 text-subtitle-1 font-weight-bold">
                        {{ item.raw.certificado }}
                      </td>
                    </tr>
                    <tr>
                      <td class="ma-0 pa-1 text-subtitle-1 text-grey-darken-1">
                        Núm. Certificado:
                      </td>
                      <td class="ma-0 pa-1 text-subtitle-1 font-weight-bold text-justify">
                        {{ item.raw.numCertificado }}
                      </td>
                    </tr>
                    <tr>
                      <td class="ma-0 pa-1 text-subtitle-1 text-grey-darken-1">Fecha:</td>
                      <td class="ma-0 pa-1 text-subtitle-1 font-weight-bold text-justify">
                        {{ item.raw.fecha }}
                      </td>
                    </tr>
                    <tr>
                      <td class="ma-0 pa-1 text-subtitle-1 text-grey-darken-1">
                        Sector:
                      </td>
                      <td class="ma-0 pa-1 text-subtitle-1 font-weight-bold text-justify">
                        {{ item.raw.sector }}
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </v-card-text>
              <v-divider />
              <v-card class="ma-3 pa-3" border elevation="0">
                <v-timeline side="end">
                  <v-timeline-item
                    v-for="(item, i) in item.raw.ejercicios"
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
                <v-btn
                  v-if="item.raw.estatus"
                  :color="colores.verdeBoton"
                  block
                  prepend-icon="mdi-credit-card-outline"
                  size="large"
                  text="Realizar pago"
                  variant="flat"
                >
                  <template v-slot:prepend>
                    <v-icon class="mr-3" size="large"></v-icon>
                  </template>
                </v-btn>
                <v-btn
                  v-else
                  :color="colores.grisOscuro"
                  block
                  prepend-icon="mdi-eye-arrow-right-outline"
                  size="large"
                  text="Ver detalle"
                  variant="flat"
                  :to="{ name: 'certificadoPuntos', params: { id: 200 } }"
                >
                  <template v-slot:prepend>
                    <v-icon class="mr-3" size="large"></v-icon>
                  </template>
                </v-btn>
              </v-card-actions>
            </v-card>
          </template>
          <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
            <div class="d-flex align-center justify-center pa-4">
              <v-switch
                v-model="itemsPorPagina"
                :base-color="colores.grisOscuro"
                :color="colores.rojoIMPC"
                :false-value="3"
                :inline="false"
                :true-value="certificados.length"
                class="switch-all font-weight-bold d-flex justify-center"
                density="compact"
                false-icon="mdi-eye-off-outline"
                hide-details
                inset
                label="Ver todos los certificados"
                true-icon="mdi-eye-outline"
              />
            </div>
            <div class="d-flex align-center justify-center pa-4">
              <v-btn
                :color="colores.rojoIMPC"
                :disabled="page === 1"
                icon="mdi-arrow-left"
                rounded
                size="small"
                @click="prevPage"
              />

              <div class="mx-2 text-subtitle-1 text-grey-darken-1 font-weight-bold">
                Página {{ page }} de {{ pageCount }}
              </div>

              <v-btn
                :color="colores.rojoIMPC"
                :disabled="page >= pageCount"
                icon="mdi-arrow-right"
                rounded
                size="small"
                @click="nextPage"
              />
            </div>
          </template>
        </v-data-iterator>
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
    let sortBy = ref([]);
    let sortDesc = ref("asc");
    const itemsPorPagina = ref(3);
    let busquedaCertificado = ref("");

    const colores = ref({
      rojoIMPC: "#B20000",
      rojoClaro: "#FAE6EA",
      grisOscuro: "#222222",
      verdeBoton: "#468C00",
      verdeClaro: "#ECF3E4",
    });

    const certificados = ref([
      {
        certificado: "EUC 2023",
        numCertificado: "0000111",
        fecha: "2023-01-10",
        sector: "Finanzas",
        estatus: false,
        ejercicios: [
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
        ],
      },
      {
        certificado: "Fiscal",
        numCertificado: "0000222",
        fecha: "2023-01-10",
        sector: "Finanzas",
        estatus: true,
        ejercicios: [
          {
            color: "#468C00",
            icon: "mdi-check-bold",
            ejercicio: 2023,
            cumpliento: "Si cumplió",
          },
          {
            color: "#468C00",
            icon: "mdi-check-bold",
            ejercicio: 2022,
            cumpliento: "Si cumplió",
          },
        ],
      },
    ]);

    const keys = ref([
      {
        key: "certificado",
        order: sortDesc,
      },
      {
        key: "numCertificado",
        order: sortDesc,
      },
      {
        key: "sector",
        order: sortDesc,
      },
    ]);

    const keysProps = ref((item: any) => {
      switch (item.key) {
        case "certificado":
          return {
            title: "Certificado",
            value: [item],
          };
        case "numCertificado":
          return {
            title: "Núm. Certificado",
            value: [item],
          };
        case "sector":
          return {
            title: "Sector",
            value: [item],
          };
        default:
          return [];
      }
    });

    return {
      certificados,
      colores,
      sortBy,
      sortDesc,
      itemsPorPagina,
      busquedaCertificado,
      keys,
      keysProps,
    };
  },
});
</script>

<style scoped lang="scss"></style>

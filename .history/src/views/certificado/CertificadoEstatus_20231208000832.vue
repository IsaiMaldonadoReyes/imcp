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
            <v-card border class="pa-10 text-center" color="transparent" elevation="0">
              <v-card-text class="text-grey-darken-1">
                <v-icon size="x-large">mdi-database-eye-off</v-icon>
                No se encontraron resultados que coincidan con la búsqueda.
              </v-card-text>
            </v-card>
          </template>
          <template v-slot:default="{ items }">
            <v-card
              class="py-1"
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
                      <td class="ma-0 pa-1 text-subtitle-1 font-weight-bold">EUC 2023</td>
                    </tr>
                    <tr>
                      <td class="ma-0 pa-1 text-subtitle-1 text-grey-darken-1">
                        Núm. Certificado:
                      </td>
                      <td class="ma-0 pa-1 text-subtitle-1 font-weight-bold text-justify">
                        0000111
                      </td>
                    </tr>
                    <tr>
                      <td class="ma-0 pa-1 text-subtitle-1 text-grey-darken-1">Fecha:</td>
                      <td class="ma-0 pa-1 text-subtitle-1 font-weight-bold text-justify">
                        2023-01-10
                      </td>
                    </tr>
                    <tr>
                      <td class="ma-0 pa-1 text-subtitle-1 text-grey-darken-1">
                        Sector:
                      </td>
                      <td class="ma-0 pa-1 text-subtitle-1 font-weight-bold text-justify">
                        Finanzas
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </v-card-text>
              <v-divider />
              <v-card class="ma-3 pa-4" border elevation="0">
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
                  :color="colores.grisOscuro"
                  block
                  text="VER DETALLE"
                  variant="flat"
                />
              </v-card-actions>
            </v-card>
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
    });

    const certificados = ref([
      {
        certificado: "EUC 2023",
        numCertificado: "0000111",
        fecha: "2023-01-10",
        sector: "Finanzas",
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
    ]);

    return {
      certificados,
      colores,
      sortBy,
      sortDesc,
      itemsPorPagina,
      busquedaCertificado,
    };
  },
});
</script>

<style scoped lang="scss"></style>

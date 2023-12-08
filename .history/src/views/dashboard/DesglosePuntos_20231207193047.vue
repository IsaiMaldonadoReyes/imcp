<template>
  <ion-page>
    <ion-content>
      <v-container fluid>
        <v-card class="mx-auto" color="transparent" elevation="0">
          <v-card-item>
            <v-card-title class="text-center" style="white-space: normal">
              Desglose de puntos <span class="font-weight-bold">DCP</span>
            </v-card-title>
          </v-card-item>
        </v-card>
        <v-card class="my-3" elevation="0" border>
          <v-card-title class="text-h6 font-weight-bold">
            Total de puntos por evento
          </v-card-title>

          <v-card-text>
            <span class="text-subtitle-1 text-grey-darken-1">Colegio:</span>
            <span class="text-subtitle-1 font-weight-bold"> CCP México </span>
            <br />
            <span class="text-subtitle-1 text-grey-darken-1">Núm. Certificado:</span>
            <span class="text-subtitle-1 font-weight-bold"> 14382 </span>
            <br />
            <span class="text-subtitle-1 text-grey-darken-1">Total de puntos:</span>
            <span class="text-subtitle-1 font-weight-bold"> 142 </span>
            <br />
            <span class="text-subtitle-1 text-grey-darken-1">Certificado:</span>
            <span class="text-subtitle-1 font-weight-bold"> EUC </span>
            <br />
            <span class="text-subtitle-1 text-grey-darken-1">Fecha emisión:</span>
            <span class="text-subtitle-1 font-weight-bold"> 2019-02-01 </span>
            <br />
            <span class="text-subtitle-1 text-grey-darken-1">
              Cumplimiento NDPCA artículo 2.9:
            </span>
            <span class="text-subtitle-1 font-weight-bold text-red-darken-1">
              Inactivo
            </span>
            <br />
            <span class="text-subtitle-1 text-grey-darken-1">Sector:</span>
            <span class="text-subtitle-1 font-weight-bold">
              Académico tiempo completo
            </span>
            <br />
            <span class="text-subtitle-1 text-grey-darken-1">Fecha vigencia:</span>
            <span class="text-subtitle-1 font-weight-bold"> 2023-01-31 </span>
          </v-card-text>
        </v-card>

        <v-data-iterator
          :items-per-page="itemsPorPagina"
          :items="games"
          :search="busquedaEspecialidad"
          :sort-by="sortBy"
          item-value="areaEspecialidad"
        >
          <template v-slot:header>
            <v-row dense>
              <v-col cols="12" lg="6" md="12" sm="12" xs="12">
                <v-text-field
                  v-model="busquedaEspecialidad"
                  clearable
                  density="comfortable"
                  hide-details
                  placeholder="Buscar especialidad"
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

          <template v-slot:default="{ items }">
            <v-row dense>
              <v-col v-for="item in items" :key="item.raw.title" cols="12">
                <v-card border class="mb-3" color="transparent" elevation="0">
                  <v-card class="py-1" elevation="0" border rounded="0">
                    <v-list-item class="">
                      <template v-slot:title>
                        <span
                          class="text-body-2 text-medium-emphasis"
                          style="letter-spacing: normal"
                        >
                          Área de especialidad
                        </span>
                      </template>
                      <span class="text-subtitle-1 font-weight-bold">
                        {{ item.raw.areaEspecialidad }}
                      </span>
                    </v-list-item>
                  </v-card>
                  <v-text-field
                    v-model="busquedaEvento"
                    class="my-3 mx-3"
                    clearable
                    density="comfortable"
                    hide-details
                    placeholder="Buscar evento"
                    prepend-inner-icon="mdi-magnify"
                    variant="solo"
                  ></v-text-field>

                  <v-card class="my-3 mx-3" elevation="0" border>
                    <v-data-table
                      :headers="encabezadosEvento"
                      :items-per-page="eventosPorPagina"
                      :items="item.raw.eventos"
                      :page="paginaEvento[item.raw.areaEspecialidad]"
                      :search="busquedaEvento"
                      item-value="evento"
                      style="background-color: transparent"
                    >
                      <template v-slot:item="{ item }">
                        <tr class="v-data-table__tr">
                          <td
                            v-for="encabezado in encabezadosEvento"
                            :key="encabezado.key"
                            :data-label="encabezado.title"
                            class="text-body-2 text-medium-emphasis py-1"
                          >
                            <span class="text-body-2 font-weight-bold">
                              {{ item[encabezado.key] }}
                            </span>
                          </td>
                        </tr>
                      </template>

                      <template v-slot:bottom="{ pageCount }">
                        <v-divider />
                        <div class="text-center my-3 mx-3">
                          <v-switch
                            v-model="eventosPorPagina"
                            :base-color="colores.grisOscuro"
                            :color="colores.rojoIMPC"
                            :false-value="1"
                            :inline="false"
                            :true-value="item.raw.eventos.length"
                            class="switch-all my-4 font-weight-bold d-flex justify-center"
                            density="compact"
                            false-icon="mdi-eye-off-outline"
                            hide-details
                            inset
                            label="Ver todos los eventos"
                            true-icon="mdi-eye-outline"
                          >
                          </v-switch>
                          <v-pagination
                            v-model="paginaEvento[item.raw.areaEspecialidad]"
                            :active-color="colores.rojoIMPC"
                            :color="colores.grisOscuro"
                            :length="pageCount"
                            :show-first-last-page="true"
                            ellipsis="..."
                            next-icon="mdi-arrow-right"
                            prev-icon="mdi-arrow-left"
                            size="small"
                            total-visible="1"
                            variant="flat"
                          />
                        </div>
                      </template>
                    </v-data-table>
                  </v-card>
                  <v-card class="py-1" elevation="0" border rounded="0">
                    <div class="d-flex justify-space-between px-3 my-3">
                      <div
                        class="d-flex align-center text-caption text-medium-emphasis me-1"
                      >
                        <span class="text-subtitle-1 text-grey-darken-1 font-weight-bold">
                          Total de horas:
                        </span>
                        <span class="text-h6 font-weight-bold" style="color: #b80000">
                          {{ item.raw.totalHoras }}
                        </span>
                      </div>

                      <div
                        class="d-flex align-center text-caption text-medium-emphasis me-1"
                      >
                        <span class="text-subtitle-1 text-grey-darken-1 font-weight-bold">
                          Total de puntos:
                        </span>
                        <span class="text-h6 font-weight-bold" style="color: #b80000">
                          {{ item.raw.totalPuntos }}
                        </span>
                      </div>
                    </div>
                  </v-card>
                </v-card>
              </v-col>
            </v-row>
          </template>

          <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
            <div class="d-flex align-center justify-center pa-4">
              <v-switch
                v-model="itemsPorPagina"
                :base-color="colores.grisOscuro"
                :color="colores.rojoIMPC"
                :false-value="3"
                :inline="false"
                :true-value="games.length"
                class="switch-all font-weight-bold d-flex justify-center"
                density="compact"
                false-icon="mdi-eye-off-outline"
                hide-details
                inset
                label="Ver todas las especialidades"
                true-icon="mdi-eye-outline"
              >
              </v-switch>
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
              ></v-btn>
            </div>
          </template>
        </v-data-iterator>
        <v-card class="mx-auto my-4" elevation="0" rounded="lg" color="transparent">
          <v-card-actions>
            <v-btn
              :color="colores.verdeBoton"
              block
              size="large"
              class="text-none"
              text="DESCARGAR REPORTE PDF"
              variant="flat"
              :to="{ path: 'desglosePuntos' }"
              rounded="large"
            />
          </v-card-actions>
        </v-card>
      </v-container>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent } from "@ionic/vue";
import { defineComponent, ref, computed, onMounted, Ref } from "vue";
import { VDataIterator, VDataTable } from "vuetify/lib/labs/components.mjs";
import { useDashboardStore } from "@/store/dashboard";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "desglosePuntos",
  components: {
    IonContent,
    IonPage,
    VDataIterator,
    VDataTable,
  },
  setup() {
    const dashStore = useDashboardStore();
    const eventosPorPagina = ref(1);
    const itemsPorPagina = ref(3);
    const paginaEvento = ref([]);
    const route = useRoute();
    let busquedaEspecialidad = ref("");
    let busquedaEvento = ref("");
    let sortBy = ref([]);
    let sortDesc = ref("asc");

    const encabezadosEvento = ref([
      { title: "Evento", key: "evento" },
      { title: "Colegio", key: "colegio" },
      { title: "Núm. Registro", key: "numRegistro" },
      { title: "Fecha", key: "fecha" },
      { title: "Horas", key: "totalHoras" },
      { title: "Puntos", key: "totalPuntos" },
    ]);

    const colores = ref({
      rojoIMPC: "#B20000",
      rojoClaro: "#FAE6EA",
      grisOscuro: "#222222",
      verdeBoton: "#468C00",
    });

    const games = ref([
      {
        areaEspecialidad: "General",
        totalHoras: 70,
        totalPuntos: 70,
        eventos: [
          {
            evento: "REFORMAS FISCALES ESTATALES 2023",
            colegio: "CCP Durango",
            numRegistro: "CCPD-FEP-1-01-2023",
            fecha: "06/01/2023",
            totalHoras: 3,
            totalPuntos: 3,
          },
          {
            evento: "RESOLUCIÓN MISCELÁNEA FISCAL 2023",
            colegio: "CCP Durango",
            numRegistro: "CCPD-FEP-1-01-2023",
            fecha: "12/01/2023",
            totalHoras: 4,
            totalPuntos: 4,
          },
        ],
      },
      {
        areaEspecialidad: "Fiscal",
        eventos: [
          {
            evento: "REFORMAS FISCALES ESTATALES 2023",
            colegio: "CCP Durango",
            numRegistro: "CCPD-FEP-1-01-2023",
            fecha: "06/01/2023",
            totalHoras: 3,
            totalPuntos: 3,
          },
          {
            evento: "RESOLUCIÓN MISCELÁNEA FISCAL 2023",
            colegio: "CCP Durango",
            numRegistro: "CCPD-FEP-1-01-2023",
            fecha: "12/01/2023",
            totalHoras: 4,
            totalPuntos: 4,
          },
          {
            evento: "LA IMPORTANCIA DE LOS ESTADOS FINANCIEROS",
            colegio: "CCP Durango",
            numRegistro: "CCPD-FEP-001-01-2023",
            fecha: "12/01/2023",
            totalHoras: 3,
            totalPuntos: 3,
          },
          {
            evento: "APLICACIÓN PRÁCTICA DE LA REFORMA FISCAL ESTATAL EN DURANGO",
            colegio: "CCP Durango",
            numRegistro: "CCPD-FEP-001-01-2023",
            fecha: "12/04/2023",
            totalHoras: 4,
            totalPuntos: 4,
          },
          {
            evento: "Tratamiento fiscal de régimen de coordinados",
            colegio: "CCP Saltillo",
            numRegistro: "CCPSA-FEME-001-01-2023",
            fecha: "25/04/2023",
            totalHoras: 4,
            totalPuntos: 8,
          },
          {
            evento: "DIPLOMADO FISCAL 2023",
            colegio: "CCP Durango",
            numRegistro: "CCPD-FEME-001-01-2023",
            fecha: "11/11/2023",
            totalHoras: 50,
            totalPuntos: 50,
          },
        ],
        totalHoras: 68,
        totalPuntos: 72,
      },
    ]);

    const keys = ref([
      {
        key: "areaEspecialidad",
        order: sortDesc,
      },
      {
        key: "totalHoras",
        order: sortDesc,
      },
      {
        key: "totalPuntos",
        order: sortDesc,
      },
    ]);

    const keysProps = ref((item: any) => {
      switch (item.key) {
        case "areaEspecialidad":
          return {
            title: "Área de especialidad",
            value: [item],
          };
        case "totalPuntos":
          return {
            title: "Total de puntos",
            value: [item],
          };
        case "totalHoras":
          return {
            title: "Total de horas",
            value: [item],
          };
        default:
          return [];
      }
    });

    async function cargarDesglosePorEjercicio() {
      try {
        const id = route.params.id;
        //await dashStore.desglosePuntosPorEjercicio(id);
      } catch (error) {}
    }

    onMounted(() => {
      cargarDesglosePorEjercicio();
    });

    return {
      busquedaEspecialidad,
      busquedaEvento,
      games,
      sortBy,
      keys,
      sortDesc,
      keysProps,
      itemsPorPagina,
      colores,
      encabezadosEvento,
      paginaEvento,
      eventosPorPagina,
    };
  },
});
</script>

<style>
.switch-all .v-switch__track {
  opacity: 1;
}

/** @media screen and (max-width: 600px) {*/
.v-data-table thead {
  border: none;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}

.v-data-table td {
  border-bottom: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
  display: grid;
  text-align: justify;
  line-height: none;
  height: auto !important;
}

.v-data-table td::before {
  content: attr(data-label);
}

.v-data-table td:last-child {
  border-bottom: 0;
}

.v-data-table tr:not(:first-child) > td:first-child {
  border-top: medium solid rgba(var(--v-border-color), var(--v-border-opacity));
}
/** }*/
</style>

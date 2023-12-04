<template>
  <ion-page>
    <ion-content>
      <v-container>
        <v-card class="mx-auto" color="transparent" elevation="0">
          <v-card-item>
            <v-card-title class="text-center" style="white-space: normal">
              Desglose de puntos <span class="font-weight-bold">DCP</span>
            </v-card-title>
          </v-card-item>
        </v-card>
        <v-card class="my-3" elevation="0" rounded="lg" border>
          <v-card-title class="text-h6 font-weight-bold">
            Total de puntos por evento
          </v-card-title>
          <v-card-text>
            <span class="text-subtitle-1">Curso:</span>
            <span class="text-subtitle-1 text-grey-darken-1 font-weight-bold">
              Administración de Alcaldías
            </span>
            <br />
            <span class="text-subtitle-1">Colegio:</span>
            <span class="text-subtitle-1 text-grey-darken-1 font-weight-bold">
              CCP México
            </span>
            <br />
            <span class="text-subtitle-1">Sector:</span>
            <span class="text-subtitle-1 text-grey-darken-1 font-weight-bold">
              Académico tiempo completo
            </span>
          </v-card-text>
        </v-card>

        <v-data-iterator
          :items="games"
          :items-per-page="itemsPorPagina"
          :search="search"
          :sort-by="sortBy"
          :custom-filter="customFilter"
        >
          <template v-slot:header>
            <v-row dense>
              <v-col cols="12" lg="6" md="12" sm="12" xs="12">
                <v-text-field
                  v-model="search"
                  clearable
                  density="comfortable"
                  hide-details
                  placeholder="Buscar especialidad"
                  prepend-inner-icon="mdi-magnify"
                  variant="solo"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="6" md="12" sm="12" xs="12">
                <v-row>
                  <v-col cols="8">
                    <v-select
                      v-model="sortBy"
                      :item-props="keysProps"
                      :items="keys"
                      density="comfortable"
                      hide-details
                      placeholder="Ordenar por"
                      variant="solo"
                    ></v-select>
                  </v-col>
                  <v-col cols="4" class="d-flex justify-end">
                    <v-btn-toggle v-model="sortDesc" elevation="2">
                      <v-btn
                        size="small"
                        color="#B20000"
                        :value="'asc'"
                        icon="mdi-arrow-up"
                      >
                      </v-btn>
                      <v-btn
                        size="small"
                        color="#B20000"
                        :value="'desc'"
                        icon="mdi-arrow-down"
                      ></v-btn>
                    </v-btn-toggle>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </template>

          <template v-slot:default="{ items }">
            <v-row dense>
              <v-col v-for="item in items" :key="item.raw.title" cols="12">
                <v-card class="pb-3" rounded="lg" elevation="0" border>
                  <v-list-item class="mt-3">
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
                  <v-divider></v-divider>
                  <!--v-text-field
                    v-model="search"
                    clearable
                    density="comfortable"
                    hide-details
                    placeholder="Buscar evento"
                    prepend-inner-icon="mdi-magnify"
                    variant="solo"
                  ></v-text-field-->
                  <v-data-table
                    :headers="headers"
                    :items="item.raw.eventos"
                    item-value="name"
                    :search="searchEvento"
                  >
                    <template v-slot:item="{ item }">
                      <tr class="v-data-table__tr">
                        <td
                          v-for="header in headers"
                          :key="header.key"
                          class="text-subtitle-2"
                        >
                          <span
                            class="text-body-2 text-medium-emphasis"
                            style="letter-spacing: normal"
                          >
                            {{ header.title }}
                          </span>
                          <br />
                          <span class="text-subtitle-1 font-weight-bold">
                            {{ item[header.key] }}
                          </span>
                        </td>
                      </tr>
                    </template>
                  </v-data-table>
                  <v-divider class="py-5"></v-divider>
                  <div class="d-flex justify-space-between px-3">
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
              </v-col>
            </v-row>
          </template>

          <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
            <div class="d-flex align-center justify-center pa-4">
              <v-btn @click="onClickSeeAll" :color="colores.grisOscuro">
                <span class="text-none">Ver todo</span>
              </v-btn>
            </div>
            <div class="d-flex align-center justify-center pa-4">
              <v-btn
                :disabled="page === 1"
                icon="mdi-arrow-left"
                density="comfortable"
                rounded
                size="large"
                :color="colores.rojoIMPC"
                @click="prevPage"
              ></v-btn>

              <div class="mx-2 text-subtitle-1 text-grey-darken-1 font-weight-bold">
                Página {{ page }} de {{ pageCount }}
              </div>

              <v-btn
                :disabled="page >= pageCount"
                icon="mdi-arrow-right"
                density="comfortable"
                rounded
                size="large"
                :color="colores.rojoIMPC"
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
import { VDataIterator, VDataTable} from "vuetify/lib/labs/components.mjs";

interface SortItem {
  key: string;
  order: Ref<string>;
}

interface Evento {
  evento: string;
  colegio: string;
  numRegistro: string;
  fecha: string;
  totalHoras: number;
  totalPuntos: number;
}

interface Especialidad {
  areaEspecialidad: string;
  eventos: Evento[];
  totalHoras: number;
  totalPuntos: number;
}

export default defineComponent({
  name: "desglosePuntos",
  components: {
    IonContent,
    IonPage,
    VDataIterator,
    VDataTable,
  },
  setup() {
    const headers = ref([
      { title: "Evento", key: "evento", removable: true },
      { title: "Colegio", key: "colegio", removable: true },
      { title: "Núm. Registro", key: "numRegistro", removable: true },
      { title: "Fecha", key: "fecha", removable: true },
      { title: "Horas", key: "totalHoras", removable: true },
      { title: "Puntos", key: "totalPuntos", removable: true },
    ]);
    const colores = ref({
      rojoIMPC: "#B20000",
      rojoClaro: "#FAE6EA",
      grisOscuro: "#222222",
      verdeBoton: "#468C00",
    });

    const itemsPorPagina = ref(3);

    let search = ref("");
    let searchEvento = ref("");

    function customFilter() {
      //console.log(item);
    }

    const searchInItem = (item: Especialidad): boolean => {
      if (item.areaEspecialidad.toLowerCase().includes(search.value.toLowerCase())) {
        return true;
      }

      if (item.eventos && item.eventos.length > 0) {
        return item.eventos.some((eventoI) =>
          eventoI.evento.toLowerCase().includes(search.value.toLowerCase())
        );
      }

      return false;
    };

    const games = ref<Especialidad[]>([
      {
        areaEspecialidad: "General",
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

    let sortDesc = ref("asc");
    let sortBy = ref([]);

    const keys = ref<SortItem[]>([
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

    const keysProps = (item: SortItem) => {
      switch (item.key) {
        case "areaEspecialidad":
          return {
            title: "Área de especialidad",
            value: [item],
          };
          break;
        case "totalPuntos":
          return {
            title: "Total de puntos",
            value: [item],
          };
          break;
        case "totalHoras":
          return {
            title: "Total de horas",
            value: [item],
          };
          break;
      }
    };

    function onClickSeeAll() {
      itemsPorPagina.value = itemsPorPagina.value === 3 ? games.length : 3;
    }

    onMounted(() => {});

    return {
      search,
      searchEvento,
      games,
      sortBy,
      keys,
      sortDesc,
      keysProps,
      itemsPorPagina,
      onClickSeeAll,
      colores,
      headers,
      customFilter,
    };
  },
});
</script>

<style>
@media screen and (max-width: 600px) {
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
    display: block;
    text-align: left;
    line-height: 20px;
    height: auto;
  }

  .v-data-table td::before {
    content: attr(data-label);
    float: left;
    font-weight: bold;
  }

  .v-data-table td:last-child {
    border-bottom: 0;
  }

  .v-data-table tr:not(:first-child) > td:first-child {
    border-top: medium solid rgba(var(--v-border-color), var(--v-border-opacity));
  }
}
</style>

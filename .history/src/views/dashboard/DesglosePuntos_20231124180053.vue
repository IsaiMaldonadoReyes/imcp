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
        <v-card class="my-3" elevation="0" rounded="lg" border>
          <v-list
            bg-color="transparent"
            class="d-flex flex-column justify-end"
            density="compact"
          >
            <v-list-item>
              <v-list-item-title>
                <span
                  class="text-caption text-disabled"
                  style="letter-spacing: normal !important"
                >
                  Tipo de puntos
                </span>
              </v-list-item-title>
              <template v-slot:append>
                <span
                  class="text-caption text-disabled"
                  style="letter-spacing: normal !important"
                >
                  Estatus de proceso
                </span>
              </template>
            </v-list-item>
            <v-list-item title="Puntaje principal">
              <v-progress-linear
                :model-value="80"
                class="mx-n5"
                color="rgba(178, 0, 0, 0.6)"
                height="15"
              />
              <template v-slot:append>
                <div class="rating-values">
                  <span>18/20</span>
                </div>
              </template>
            </v-list-item>

            <v-list-item title="Puntaje otros cursos">
              <v-progress-linear
                :model-value="70"
                class="mx-n5"
                color="rgba(89, 89, 89, 0.6)"
                height="15"
              />
              <template v-slot:append>
                <div class="rating-values">
                  <span>20/25</span>
                </div>
              </template>
            </v-list-item>

            <v-list-item title="Puntaje ética">
              <v-progress-linear
                :model-value="40"
                class="mx-n5"
                color="rgba(166, 166, 166, 0.6)"
                height="15"
              />
              <template v-slot:append>
                <div class="rating-values">
                  <span>2/5</span>
                </div>
              </template>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>

          <div class="d-flex justify-space-between px-3 py-3">
            <div class="d-flex align-center text-caption text-medium-emphasis me-1">
              <span class="text-subtitle-1 text-grey-darken-1 font-weight-bold">
                Total de horas:
              </span>
              <span class="text-h6 font-weight-bold" style="color: #b80000"> 40 </span>
            </div>

            <div class="d-flex align-center text-caption text-medium-emphasis me-1">
              <span class="text-subtitle-1 text-grey-darken-1 font-weight-bold">
                Total de puntos:
              </span>
              <span class="text-h6 font-weight-bold" style="color: #b80000"> 40 </span>
            </div>
          </div>
        </v-card>

        <v-data-iterator
          :items="games"
          :items-per-page="itemsPorPagina"
          :search="search"
          :sort-by="sortBy"
        >
          <template v-slot:header>
            <v-row dense>
              <v-col cols="12" lg="6" md="12" sm="12" xs="12">
                <v-text-field
                  v-model="search"
                  clearable
                  density="comfortable"
                  hide-details
                  placeholder="Buscar"
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
                  <v-list-item>
                    <template v-slot:title>
                      <span class="text-body-2 text-medium-emphasis">Evento</span>
                    </template>
                    <strong class="text-subtitle-1 text-grey-darken-1 font-weight-bold">
                      {{ item.raw.evento }}
                    </strong>
                  </v-list-item>
                  <v-list-item>
                    <template v-slot:title>
                      <span class="text-body-2 text-medium-emphasis">Colegio</span>
                    </template>
                    <strong class="text-subtitle-1 text-grey-darken-1 font-weight-bold">
                      {{ item.raw.colegio }}
                    </strong>
                  </v-list-item>
                  <v-list-item>
                    <template v-slot:title>
                      <span class="text-body-2 text-medium-emphasis">Núm Registro</span>
                    </template>
                    <strong class="text-subtitle-1 text-grey-darken-1 font-weight-bold">
                      {{ item.raw.numRegistro }}
                    </strong>
                  </v-list-item>
                  <v-list-item class="mb-3">
                    <template v-slot:title>
                      <span class="text-body-2 text-medium-emphasis">Fecha</span>
                    </template>
                    <strong class="text-subtitle-1 text-grey-darken-1 font-weight-bold">
                      {{ item.raw.fechaVisible }}
                    </strong>
                  </v-list-item>
                  <v-divider></v-divider>

                  <div class="d-flex justify-space-between px-3 pt-2">
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
            <v-btn
              class="me-8"
              variant="text"
              @click="onClickSeeAll"
              :color="colores.rojoIMPC"
            >
              <span class="text-decoration-underline text-none">Ver todo</span>
            </v-btn>
            <div class="d-flex align-center justify-center pa-4">
              <v-btn
                :disabled="page === 1"
                icon="mdi-arrow-left"
                density="comfortable"
                variant="tonal"
                rounded
                :color="colores.rojoIMPC"
                @click="prevPage"
              ></v-btn>

              <div class="mx-2 text-caption">Página {{ page }} de {{ pageCount }}</div>

              <v-btn
                :disabled="page >= pageCount"
                icon="mdi-arrow-right"
                density="comfortable"
                rounded
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
              rounded="lg"
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
import { VDataIterator } from "vuetify/lib/labs/components.mjs";

interface SortItem {
  key: string;
  order: Ref<string>;
}

export default defineComponent({
  name: "desglosePuntos",
  components: {
    IonContent,
    IonPage,
    VDataIterator,
  },
  setup() {
    const colores = ref({
      rojoIMPC: "#B20000",
      rojoClaro: "#FAE6EA",
      grisOscuro: "#222222",
      verdeBoton: "#468C00",
    });

    const itemsPorPagina = ref(3);

    let search = ref("");

    const games = ref([
      {
        areaEspecialidad: "General",
        evento: "Administración de Alcaldías",
        colegio: "CCP México",
        numRegistro: "CCPGJ-FEME-001-01-2023",
        fechaVisible: new Date("01/20/2023")
          .toISOString()
          .slice(0, 10)
          .split("-")
          .reverse()
          .join("/"),
        fecha: new Date("01/20/2023"),
        totalHoras: 18,
        totalPuntos: 18,
      },
      {
        areaEspecialidad: "Fiscal",
        evento: "Administración de Alcaldías II",
        colegio: "CCP México",
        numRegistro: "CCPGJ-FEME-001-01-2023",
        fechaVisible: new Date("02/20/2023")
          .toISOString()
          .slice(0, 10)
          .split("-")
          .reverse()
          .join("/"),
        fecha: new Date("02/20/2023"),
        totalHoras: 3,
        totalPuntos: 3,
      },
      {
        areaEspecialidad: "Finanzas Empresariales",
        evento: "Cumplimiento de puntos DCP IMCP 2019",
        colegio: "IMCP",
        numRegistro: "CCPST-FEME-01-01-2023",
        fechaVisible: new Date("02/01/2023")
          .toISOString()
          .slice(0, 10)
          .split("-")
          .reverse()
          .join("/"),
        fecha: new Date("02/01/2023"),
        totalHoras: 15,
        totalPuntos: 15,
      },
      {
        areaEspecialidad: "Ética y Responsabilidades profesionales",
        evento: "SEMANA DE CONTADURIA 2023",
        colegio: "IMCP",
        numRegistro: "CCPST-FEME-01-01-2023",
        fechaVisible: new Date("01/09/2023")
          .toISOString()
          .slice(0, 10)
          .split("-")
          .reverse()
          .join("/"),
        fecha: new Date("01/09/2023"),
        totalHoras: 5,
        totalPuntos: 5,
      },
    ]);

    let sortDesc = ref("asc");
    let sortBy = ref<SortItem[]>([]);

    const keys = ref<SortItem[]>([
      {
        key: "areaEspecialidad",
        order: sortDesc,
      },
      {
        key: "evento",
        order: sortDesc,
      },
      {
        key: "colegio",
        order: sortDesc,
      },
      {
        key: "numRegistro",
        order: sortDesc,
      },
      {
        key: "fecha",
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
        case "evento":
          return {
            title: "Evento",
            value: [item],
          };
          break;
        case "colegio":
          return {
            title: "Colegio",
            value: [item],
          };
          break;
        case "numRegistro":
          return {
            title: "Núm. Registro",
            value: [item],
          };
          break;
        case "fecha":
          return {
            title: "Fecha",
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
      itemsPorPagina.value = itemsPorPagina.value === 3 ? games.value.length : 3;
    }

    onMounted(() => {});

    return {
      search,
      games,
      sortBy,
      keys,
      sortDesc,
      keysProps,
      itemsPorPagina,
      onClickSeeAll,
      colores,
    };
  },
});
</script>

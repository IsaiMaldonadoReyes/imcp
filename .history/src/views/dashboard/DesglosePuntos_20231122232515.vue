<template>
  <ion-page>
    <ion-content>
      <v-container>
        <v-card>
          <v-data-iterator
            :items="games"
            :items-per-page="3"
            :search="search"
            :show-select="false"
            :sort-by="sortByArray"
          >
            <template v-slot:header>
              <v-toolbar class="px-2">
                <v-text-field
                  v-model="search"
                  clearable
                  density="comfortable"
                  hide-details
                  placeholder="Buscar"
                  prepend-inner-icon="mdi-magnify"
                  style="max-width: 300px"
                  variant="solo"
                  elevation="1"
                ></v-text-field>
                <v-select
                  v-model="sortBy"
                  :items="keys"
                  :item-props="keysProps"
                  label="Ordenar por"
                  return-object
                >
                </v-select>
                <v-btn-toggle class="mx-4" v-model="sortDesc" elevation="2">
                  <v-btn color="#B20000" :value="'asc'" @click="console.log(sortDesc)">
                    <v-icon>mdi-arrow-up</v-icon>
                  </v-btn>
                  <v-btn color="#B20000" :value="'desc'" @click="console.log(sortDesc)">
                    <v-icon>mdi-arrow-down</v-icon>
                  </v-btn>
                </v-btn-toggle>
              </v-toolbar>
            </template>

            <template v-slot:default="{ items }">
              <v-container class="pa-2" fluid>
                <v-row dense>
                  <v-col v-for="item in items" :key="item.raw.title" cols="12" md="12">
                    <v-card grow class="pb-3" border flat>
                      <v-list-item>
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
                        <strong
                          class="text-subtitle-1 text-grey-darken-1 font-weight-bold"
                        >
                          {{ item.raw.evento }}
                        </strong>
                      </v-list-item>
                      <v-list-item>
                        <template v-slot:title>
                          <span class="text-body-2 text-medium-emphasis">Colegio</span>
                        </template>
                        <strong
                          class="text-subtitle-1 text-grey-darken-1 font-weight-bold"
                        >
                          {{ item.raw.colegio }}
                        </strong>
                      </v-list-item>
                      <v-list-item>
                        <template v-slot:title>
                          <span class="text-body-2 text-medium-emphasis"
                            >Núm Registro</span
                          >
                        </template>
                        <strong
                          class="text-subtitle-1 text-grey-darken-1 font-weight-bold"
                        >
                          {{ item.raw.numRegistro }}
                        </strong>
                      </v-list-item>
                      <v-list-item class="mb-3">
                        <template v-slot:title>
                          <span class="text-body-2 text-medium-emphasis">Fecha</span>
                        </template>
                        <strong
                          class="text-subtitle-1 text-grey-darken-1 font-weight-bold"
                        >
                          {{ item.raw.fecha }}
                        </strong>
                      </v-list-item>
                      <v-divider></v-divider>

                      <div class="d-flex justify-space-between px-3 pt-2">
                        <div
                          class="d-flex align-center text-caption text-medium-emphasis me-1"
                        >
                          <span
                            class="text-subtitle-1 text-grey-darken-1 font-weight-bold"
                          >
                            Total de horas:
                          </span>
                          <span class="text-h6 font-weight-bold" style="color: #b80000">
                            {{ item.raw.totalHoras }}
                          </span>
                        </div>

                        <div
                          class="d-flex align-center text-caption text-medium-emphasis me-1"
                        >
                          <span
                            class="text-subtitle-1 text-grey-darken-1 font-weight-bold"
                          >
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
              </v-container>
            </template>

            <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
              <div class="d-flex align-center justify-center pa-4">
                <v-btn
                  :disabled="page === 1"
                  icon="mdi-arrow-left"
                  density="comfortable"
                  variant="tonal"
                  rounded
                  @click="prevPage"
                ></v-btn>

                <div class="mx-2 text-caption">Página {{ page }} de {{ pageCount }}</div>

                <v-btn
                  :disabled="page >= pageCount"
                  icon="mdi-arrow-right"
                  density="comfortable"
                  variant="tonal"
                  rounded
                  @click="nextPage"
                ></v-btn>
              </div>
            </template>
          </v-data-iterator>
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
    let search = ref("");

    let SelectItemKey = ref([]);
    const games = ref([
      {
        areaEspecialidad: "General",
        evento: "Administración de Alcaldías",
        colegio: "CCP México",
        numRegistro: "CCPGJ-FEME-001-01-2023",
        fecha: "20/01/2023",
        totalHoras: 18,
        totalPuntos: 18,
      },
      {
        areaEspecialidad: "Fiscal",
        evento: "Administración de Alcaldías II",
        colegio: "CCP México",
        numRegistro: "CCPGJ-FEME-001-01-2023",
        fecha: "20/02/2023",
        totalHoras: 3,
        totalPuntos: 3,
      },
      {
        areaEspecialidad: "Finanzas Empresariales",
        evento: "Cumplimiento de puntos DCP IMCP 2019",
        colegio: "IMCP",
        numRegistro: "CCPST-FEME-01-01-2023",
        fecha: "01/02/2023",
        totalHoras: 15,
        totalPuntos: 15,
      },
      {
        areaEspecialidad: "Ética y Responsabilidades profesionales",
        evento: "SEMANA DE CONTADURIA 2023",
        colegio: "IMCP",
        numRegistro: "CCPST-FEME-01-01-2023",
        fecha: "09/02/2023",
        totalHoras: 5,
        totalPuntos: 5,
      },
    ]);

    let sortDesc = ref("asc");
    let sortBy = ref<SortItem[]>([]);
    const sortByArray = ref(sortBy.value.map((item) => ({ ...item })));

    const keys = ref<SortItem[]>([
      {
        key: "areaEspecialidad",
        order: sortDesc,
      },
      {
        key: "totalHoras",
        order: sortDesc,
      },
    ]);

    const keysProps = (item: SortItem) => {
      switch (item.key) {
        case "areaEspecialidad":
          return {
            title: "Área de especialidad",
            value: item.key,
          };
          break;
        case "totalHoras":
          return {
            title: "Total de horas",
            value: item.key,
          };
          break;
      }
    };

    onMounted(() => {});

    return {
      search,
      games,
      SelectItemKey,
      sortBy,
      keys,
      sortDesc,
      keysProps,
      sortByArray,
    };
  },
});
</script>

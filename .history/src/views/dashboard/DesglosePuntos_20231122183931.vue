<template>
  <ion-page>
    <ion-content>
      <v-container>
        <v-card>
          <v-data-iterator
            :items="games"
            :items-per-page="3"
            :search="search"
            :multi-sort="true"
            must-sort
            :show-select="false"
            :sort-by="sortBy"
          >
            <template v-slot:header>
              <v-toolbar class="px-2">
                <v-text-field
                  v-model="search"
                  clearable
                  density="comfortable"
                  hide-details
                  placeholder="Search"
                  prepend-inner-icon="mdi-magnify"
                  style="max-width: 300px"
                  variant="solo"
                ></v-text-field>
                <!--v-select
                  :v-model="sortBy"
                  :items="keys"
                  item-title="text"
                  item-value="value"
                  label="Ordenar por"
                  return-object
                >
                </v-select-->
                <v-btn-toggle class="mx-4" v-model="sortDesc">
                  <v-btn color="primary" :value="'asc'" @click="console.log(sortDesc)" />
                  <v-btn color="primary" :value="'desc'" @click="console.log(sortDesc)" />
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
                          <span class="text-body-2 text-medium-emphasis">
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
                        <strong class="text-subtitle-1">
                          {{ item.raw.colegio }}
                        </strong>
                      </v-list-item>
                      <v-list-item>
                        <template v-slot:title>
                          <span class="text-body-2 text-medium-emphasis"
                            >Núm Registro</span
                          >
                        </template>
                        <strong class="text-subtitle-1">
                          {{ item.raw.numRegistro }}
                        </strong>
                      </v-list-item>
                      <v-list-item>
                        <template v-slot:title>
                          <span class="text-body-2 text-medium-emphasis">Fecha</span>
                        </template>
                        <strong class="text-subtitle-1">
                          {{ item.raw.fecha }}
                        </strong>
                      </v-list-item>
                      <v-divider></v-divider>

                      <div class="d-flex justify-space-between px-4">
                        <div
                          class="d-flex align-center text-caption text-medium-emphasis me-1"
                        >
                          <v-icon icon="mdi-clock" start></v-icon>

                          <div class="text-truncate">Total de horas</div>
                        </div>

                        <v-btn border flat size="small" class="text-none" text="Read">
                        </v-btn>
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

                <div class="mx-2 text-caption">Page {{ page }} of {{ pageCount }}</div>

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
import { defineComponent, ref, computed, onMounted } from "vue";
import { VDataIterator } from "vuetify/lib/labs/components.mjs";

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
        img: "https://cdn.vuetifyjs.com/docs/images/graphics/games/4.png",
        title: "The Sci-Fi Shooter Experience",
        subtitle: "Dive into a futuristic world of intense battles and alien encounters.",
        advanced: false,
        duration: "08 minutes",

        areaEspecialidad: "General",
        evento: "Administración de Alcaldías",
        colegio: "CCP México",
        numRegistro: "CCPGJ-FEME-001-01-2023",
        fecha: "20/01/2023",
        totalHoras: 18,
        totalPuntos: 18,
      },
      {
        img: "https://cdn.vuetifyjs.com/docs/images/graphics/games/2.png",
        title: "Epic Adventures in Open Worlds",
        subtitle: "Embark on a journey through vast, immersive landscapes and quests.",
        advanced: true,
        duration: "10 minutes",

        areaEspecialidad: "Fiscal",
        evento: "Administración de Alcaldías II",
        colegio: "CCP México",
        numRegistro: "CCPGJ-FEME-001-01-2023",
        fecha: "20/02/2023",
        totalHoras: 3,
        totalPuntos: 3,
      },
      {
        img: "https://cdn.vuetifyjs.com/docs/images/graphics/games/3.png",
        title: "Surviving the Space Station Horror",
        subtitle:
          "Navigate a haunted space station in this chilling survival horror game.",
        advanced: false,
        duration: "09 minutes",

        areaEspecialidad: "Finanzas Empresariales",
        evento: "Cumplimiento de puntos DCP IMCP 2019",
        colegio: "IMCP",
        numRegistro: "CCPST-FEME-01-01-2023",
        fecha: "01/02/2023",
        totalHoras: 15,
        totalPuntos: 15,
      },
      {
        img: "https://cdn.vuetifyjs.com/docs/images/graphics/games/5.png",
        title: "Neon-Lit High-Speed Racing Thrills",
        subtitle:
          "Experience adrenaline-pumping races in a futuristic, neon-soaked city.",
        advanced: true,
        duration: "12 minutes",

        areaEspecialidad: "Ética y Responsabilidades profesionales",
        evento: "SEMANA DE CONTADURIA 2023",
        colegio: "IMCP",
        numRegistro: "CCPST-FEME-01-01-2023",
        fecha: "09/02/2023",
        totalHoras: 5,
        totalPuntos: 5,
      },
    ]);

    const sortDesc = ref("asc");
    const sortBy = ref([
      { text: "duración", value: "duration", key: "duration", order: sortDesc },
    ]);

    const keys = ref([
      { text: "duración", value: "duration", key: "duration", order: sortDesc },
    ]);

    const sortedGames = computed(() => {
      // Clona el arreglo para no modificar el original directamente
      let sorted = [...games.value];

      // Ordena el arreglo según el título de forma ascendente
      sorted.sort((a, b) => (a.title > b.title ? 1 : -1));

      // Si quieres orden descendente, puedes invertir el resultado
      // sorted.sort((a, b) => (a.raw.title > b.raw.title ? -1 : 1));

      console.log(sortBy);

      return sorted;
    });

    onMounted(() => {});

    return { search, games, sortedGames, SelectItemKey, sortBy, keys, sortDesc };
  },
});
</script>

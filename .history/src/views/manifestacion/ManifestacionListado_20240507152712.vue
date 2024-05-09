<template>
  <ion-page>
    <ion-content ref="contentRef">
      <v-container>
        <v-tabs
          v-model="tabs"
          bg-color="transparent"
          color="red"
          density="compact"
          grow
          style="border-bottom: 5px solid #b20000"
        >
          <v-tab
            :color="colores.rojoIMPC"
            :slider-color="colores.rojoIMPC"
            :value="1"
            class="mr-1 text-none"
            rounded="t-lg"
            size="small"
            text="Manifestaciones"
            variant="flat"
          />
          <v-tab
            :color="colores.rojoIMPC"
            :slider-color="colores.rojoIMPC"
            :value="2"
            class="text-none"
            rounded="t-lg"
            size="small"
            text="Manifestaciones realizadas"
            variant="flat"
          />
        </v-tabs>
        <v-window v-model="tabs">
          <v-window-item :value="1">
            <v-card color="transparent" elevation="0" rounded="b-lg">
              <v-card class="my-5" color="transparent" elevation="0" border>
                <v-card-text class="text-justify">
                  <v-card class="pa-10 text-center" color="transparent" elevation="0">
                    <v-icon color="grey-lighten-1" size="60">
                      mdi-account-tie-voice
                    </v-icon>
                    <v-card-text class="text-grey-darken-1">
                      Para iniciar su proceso de manifestación tendrá que contar con las
                      capacitaciones externas así como datos que se le preguntarán de
                      acuerdo a su Certificado DPC.
                      <br />
                      De clic en el botón de Manifestaciones
                    </v-card-text>
                  </v-card>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    :color="colores.verdeBoton"
                    block
                    prepend-icon="mdi-account-tie-voice"
                    size="large"
                    text="Manifestaciones"
                    variant="flat"
                    :to="{ name: 'manifestacionRegistro' }"
                  >
                    <template v-slot:prepend>
                      <v-icon class="mr-3" size="large"></v-icon>
                    </template>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-card>
          </v-window-item>
          <v-window-item :value="2">
            <v-card border class="mb-3" color="transparent" elevation="0">
              <v-card class="py-1" elevation="0" border rounded="0">
                <v-card-item>
                  <v-card-title
                    class="text-uppercase text-center"
                    style="white-space: normal"
                  >
                    Listado de manifestaciones
                  </v-card-title>
                </v-card-item>
              </v-card>
              <v-text-field
                v-model="busquedaManifestacion"
                class="ma-3"
                clearable
                density="comfortable"
                hide-details
                placeholder="Buscar manifestación"
                prepend-inner-icon="mdi-magnify"
                variant="solo"
              />
              <v-card border class="ma-3" elevation="0">
                <v-data-table
                  :headers="encabezadosEvento"
                  :items-per-page="manifestacionesPorPagina"
                  :items="listadoManifestaciones.dataset"
                  :page="paginaManifestacion"
                  :search="busquedaManifestacion"
                  item-value="EventosNombreEvento"
                  style="background-color: transparent"
                  class="tb-avisos pa-2"
                >
                  <template v-slot:[`item`]="{ item }">
                    <tr class="v-data-table__tr">
                      <td
                        v-for="encabezado in encabezadosEvento"
                        :key="encabezado.key"
                        :data-label="encabezado.title"
                        class="v-data-table__td v-data-table-column--align-start text-body-2 text-medium-emphasis py-1"
                      >
                        <v-chip
                          :color="getColor(item[encabezado.key])"
                          variant="outlined"
                          size="small"
                          label
                          style="width: fit-content"
                          class="mr-2"
                          v-if="encabezado.key == 'status_solicitud'"
                        >
                          <v-icon size="x-small" class="mr-2">mdi-circle</v-icon>
                          {{ item[encabezado.key] }}
                        </v-chip>

                        <v-btn
                          v-else-if="
                            encabezado.key == 'archivo' &&
                            item[encabezado.key].endsWith('.xlsx')
                          "
                          :color="colores.verdeBoton"
                          block
                          prepend-icon="mdi-file-download-outline"
                          size="large"
                          text="DESCARGAR MANIFESTACIÓN"
                          variant="flat"
                          @click="descargarArchivo(item[encabezado.key])"
                          style="font-size: 14px"
                        >
                          <template v-slot:prepend>
                            <v-icon class="mr-3" size="large"></v-icon>
                          </template>
                        </v-btn>

                        <span
                          v-else-if="
                            encabezado.key == 'archivo' &&
                            item[encabezado.key].endsWith('manifestacion/')
                          "
                          class="text-body-2 font-weight-bold"
                        >
                          Sin archivo
                        </span>
                        <span
                          v-else-if="encabezado.key == 'fecha_solicitada'"
                          class="text-body-2 font-weight-bold"
                        >
                          {{ formatearFecha(item[encabezado.key]) }}
                        </span>
                        <span v-else class="text-body-2 font-weight-bold">
                          {{ item[encabezado.key] }}
                        </span>
                      </td>
                    </tr>
                  </template>
                  <template v-slot:no-data>
                    <v-card
                      border
                      class="my-5 pa-10 text-center"
                      color="transparent"
                      elevation="0"
                    >
                      <v-icon color="grey-lighten-1" size="60">
                        mdi-database-eye-off
                      </v-icon>
                      <v-card-text class="text-grey-darken-1">
                        No se encontraron manifestaciones que coincidan con la búsqueda.
                      </v-card-text>
                    </v-card>
                  </template>
                  <template v-slot:bottom="{ pageCount }">
                    <v-divider />

                    <div
                      class="text-center my-3 mx-3"
                      v-if="listadoManifestaciones.dataset.length > 4"
                    >
                      <v-select
                        v-model="manifestacionesPorPagina"
                        :items="[
                          { value: 1, title: '1' },
                          { value: 3, title: '3' },
                          { value: 5, title: '5' },
                          { value: 10, title: '10' },
                          { value: -1, title: 'Todos' },
                        ]"
                        class="my-2"
                        hide-details
                        label="Manifestaciones por página"
                        variant="solo"
                      ></v-select>
                      <v-pagination
                        v-model="paginaManifestacion"
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
                        v-if="listadoManifestaciones.dataset.length > 1"
                      >
                        <template v-slot:item="{ page }">
                          <div
                            class="mx-2 my-1 text-subtitle-1 text-grey-darken-1 font-weight-bold"
                          >
                            {{ page }} de {{ pageCount }}
                          </div>
                        </template>
                      </v-pagination>
                    </div>
                  </template>
                </v-data-table>
              </v-card>
            </v-card>
          </v-window-item>
        </v-window>
      </v-container>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { IonPage, IonContent, onIonViewDidEnter } from "@ionic/vue";
import { useManifestacionStore } from "@/store/manifestacion";
import { VDataTable } from "vuetify/lib/labs/components.mjs";

export interface Manifestaciones {
  dataset: Dataset[];
}

export interface Dataset {
  manifestacionSolicitudesId: number;
  url: string;
  manifestacion_solicitudes_id: number;
  id_colegio: number;
  id_sector: number;
  catalogo_especialidad_id: number;
  cuentas_usuarios_id: number;
  registro_contribuciones: string;
  contador_public: string;
  numero_asociado: string;
  tipo_solicitud: string;
  status_solicitud: string;
  archivo_generado: any;
  status: string;
  datecreation: string;
  dateupdate: string;
  fecha_solicitada: string;
  fecha_revisada: any;
  fecha_generada: any;
  fecha_descarga: any;
  nombre: string;
  sector: string;
  colegio: string;
  especialidad: string;
  archivo: string;
}

export default defineComponent({
  name: "ManifestacionListado",
  components: {
    IonContent,
    IonPage,
    VDataTable,
  },
  setup() {
    const contentRef = ref<HTMLElement | null>(null);

    const scrollToTop = () => {
      if (contentRef.value) {
        contentRef.value.scrollTop = 0; // Scrolls to the top of the content
      }
    };

    const manifestacionStore = useManifestacionStore();

    const colores = ref({
      rojoIMPC: "#B20000",
      rojoClaro: "#FAE6EA",
      grisOscuro: "#222222",
      verdeBoton: "#468C00",
    });

    const encabezadosEvento = ref([
      { title: "Especialidad", key: "especialidad" },
      { title: "Tipo", key: "tipo_solicitud" },
      { title: "Fecha de generación", key: "fecha_solicitada" },
      { title: "Estatus", key: "status_solicitud" },
      { title: "Archivo", key: "archivo" },
    ]);

    const manifestacionesPorPagina = ref(5);
    const paginaManifestacion = ref(1);
    const busquedaManifestacion = ref("");

    const tabs = ref(null);
    const dataLoaded = ref(false);

    const options = ref({
      indexAxis: "x",
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    });

    const listadoManifestaciones = ref<Manifestaciones>({
      dataset: [],
    });

    const getColor = (status: string) => {
      switch (status) {
        case "Solicitada":
          return "#FF7F00";
        case "Revisada":
          return "#0080FF";
        case "Generada":
          return "#85B201";
        case "Descargada":
          return "#FE4948";
      }
    };

    async function cargarDashboard() {
      dataLoaded.value = false;

      listadoManifestaciones.value = {
        dataset: [],
      };

      try {
        await manifestacionStore.cargarListado();

        if (
          Array.isArray(manifestacionStore.object.listado) &&
          manifestacionStore.object.listado.length > 0
        ) {
          listadoManifestaciones.value = { dataset: manifestacionStore.object.listado };
        }
      } catch (error) {}
    }

    function descargarArchivo(ruta: string) {
      window.open(ruta, "_blank");
    }

    function formatearFecha(dateString: any) {
      const date = new Date(dateString);
      const day = ("0" + date.getDate()).slice(-2);
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }

    onIonViewDidEnter(() => {
      if (contentRef.value !== null) {
        contentRef.value.scrollTop = 0;
      }

      scrollToTop();
      cargarDashboard();
    });

    return {
      dataLoaded,
      colores,
      options,
      tabs,
      listadoManifestaciones,
      encabezadosEvento,
      manifestacionesPorPagina,
      paginaManifestacion,
      busquedaManifestacion,
      getColor,
      descargarArchivo,
      contentRef,
      formatearFecha,
    };
  },
});
</script>

<style>
.v-btn[aria-selected="false"] .v-btn__content {
  color: #333333 !important; /* Cambia el color del texto a verde */
}

.blue-tab {
  background-color: white !important;
  /* Cambia 'blue' por el color que desees */
}

.rating-values {
  margin-left: 10px;
  min-width: 65px;
}

.tb-avisos thead {
  font-size: 0.875rem;
}

@media screen and (max-width: 600px) {
  .tb-avisos thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  .tb-avisos.v-data-table td {
    border-bottom: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
    display: grid;
    text-align: justify;
    line-height: none;
    height: auto !important;
  }

  .tb-avisos.v-data-table td::before {
    content: attr(data-label);
  }

  .tb-avisos.v-data-table td:last-child {
    border-bottom: 0;
  }

  .tb-avisos.v-data-table tr:not(:first-child) > td:first-child {
    border-top-width: 10px;
    border-top-style: solid;
    border-top-color: #eeeeee;
  }
}
</style>

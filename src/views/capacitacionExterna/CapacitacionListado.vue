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
            text="Aviso de capacitación externa"
            variant="flat"
          />
          <v-tab
            :color="colores.rojoIMPC"
            :slider-color="colores.rojoIMPC"
            :value="2"
            class="text-none"
            rounded="t-lg"
            size="small"
            text="Avisos realizados"
            variant="flat"
          />
        </v-tabs>
        <v-window v-model="tabs">
          <v-window-item :value="1">
            <v-card color="transparent" elevation="0" rounded="b-lg">
              <v-card class="mx-auto" color="transparent" elevation="0">
                <v-card-item>
                  <v-card-title
                    class="text-uppercase text-grey-darken-3 font-weight-bold text-center"
                    style="white-space: normal"
                  >
                    Aviso de <br />
                    capacitación externa
                  </v-card-title>
                </v-card-item>
              </v-card>
              <v-card class="my-5" color="transparent" elevation="0" border>
                <v-card-text class="text-justify">
                  <v-card
                    class="pa-10 text-center"
                    color="transparent"
                    elevation="0"
                  >
                    <v-icon color="grey-lighten-1" size="60"
                      >mdi-account-school</v-icon
                    >
                    <v-card-text class="text-grey-darken-1">
                      Para iniciar su proceso de capacitación externa de clic en
                      el siguiente botón
                    </v-card-text>
                  </v-card>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    :color="colores.verdeBoton"
                    :to="{ name: 'capacitacionExternaRegistro' }"
                    block
                    prepend-icon="mdi-account-school"
                    size="large"
                    text="Nueva capacitación externa"
                    variant="flat"
                  >
                    <template v-slot:prepend>
                      <v-icon size="large"></v-icon>
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
                    Listado de capacitaciones externas
                  </v-card-title>
                </v-card-item>
              </v-card>
              <v-text-field
                v-model="busquedaAvisoCapacitacion"
                class="ma-3"
                clearable
                density="comfortable"
                hide-details
                placeholder="Buscar capacitación"
                prepend-inner-icon="mdi-magnify"
                variant="solo"
              />
              <v-card border class="ma-3" elevation="0">
                <v-data-table
                  :headers="encabezadosEvento"
                  :items-per-page="avisosCapacitacionPorPagina"
                  :items="listadoCapacitaciones.dataset"
                  :page="paginaAvisoCapacitacion"
                  :search="busquedaAvisoCapacitacion"
                  item-value="EventosNombreEvento"
                  style="background-color: transparent"
                  class="tb-avisos pa-2"
                  @update:page="(page) => detectaValorPaginador()"
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
                          v-if="encabezado.key == 'status'"
                          :color="getColor(item[encabezado.key])"
                          class="mr-2 my-2"
                          label
                          size="small"
                          style="width: fit-content"
                          variant="outlined"
                        >
                          <v-icon class="mr-2">mdi-circle</v-icon>
                          {{ item[encabezado.key] }}
                        </v-chip>
                        <span
                          v-else-if="encabezado.key == 'eventos_fecha_inicio'"
                          class="text-body-2 font-weight-bold"
                        >
                          {{
                            item[encabezado.key] === "0000-00-00 00:00:00"
                              ? "Fecha inválida"
                              : formatearFecha(item[encabezado.key])
                          }}
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
                        No se encontraron eventos que coincidan con la búsqueda.
                      </v-card-text>
                    </v-card>
                  </template>
                  <template v-slot:bottom="{ pageCount }">
                    <v-divider />

                    <div
                      class="text-center my-3 mx-3"
                      v-if="listadoCapacitaciones.dataset.length > 4"
                    >
                      <v-select
                        v-model="avisosCapacitacionPorPagina"
                        :items="[
                          { value: 1, title: '1' },
                          { value: 3, title: '3' },
                          { value: 5, title: '5' },
                          { value: 10, title: '10' },
                          { value: -1, title: 'Todos' },
                        ]"
                        class="my-2"
                        hide-details
                        label="Eventos por página"
                        variant="solo"
                      ></v-select>
                      <v-pagination
                        v-model="paginaAvisoCapacitacion"
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
                        v-if="listadoCapacitaciones.dataset.length > 1"
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
        <v-dialog v-model="loading">
          <div class="text-center">
            <v-progress-circular
              :size="60"
              :color="colores.rojoIMPC"
              indeterminate
            ></v-progress-circular>
          </div>
        </v-dialog>
      </v-container>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { IonPage, IonContent, onIonViewDidEnter } from "@ionic/vue";
import { useCapacitacionStore } from "@/store/capacitacionExterna";
import { VDataTable } from "vuetify/lib/labs/components.mjs";

export interface Capacitaciones {
  dataset: Dataset[];
  totalSize: number;
}

export interface Dataset {
  externo_evento_id: number;
  usuario_id: any;
  cuentas_usuarios_id: number;
  id_colegio: number;
  nombre_evento: string;
  eventos_sede: string;
  expositor: string;
  eventos_fecha_inicio: string;
  eventos_fecha_fin: string;
  comentarios_autorizacion: string;
  comentarios_rechazo: string;
  telefono: string;
  email: string;
  status: string;
  datecreation: string;
  externo_archivos_id: string;
  externo_puntos_id: string;
  archivo: any;
  status_archivo: string;
  disiplinas_id: number;
  puntos: number;
  horas: number;
  modalidad: string;
  status_puntos: string;
  cuenta_rfc: string;
  cuenta_nombre: string;
  cuenta_apaterno: string;
  cuenta_amatarno: string;
  expositor_status: string;
  externo_archivos: ExternoArchivo[];
  externo_puntos: ExternoPunto[];
}

export interface ExternoArchivo {
  externoArchivosId: number;
  externoEventoId: number;
  status: string;
}

export interface ExternoPunto {
  externoPuntosId: number;
  externoEventoId: number;
  disiplinasId: number;
  disiplinas: string;
  puntos: number;
  horas: number;
  modalidad: string;
  status: string;
}

export default defineComponent({
  name: "CapacitacionExterna",
  components: {
    IonContent,
    IonPage,
    VDataTable,
  },
  setup() {
    const capacitacionStore = useCapacitacionStore();

    const contentRef = ref<HTMLElement | null>(null);

    const scrollToTop = () => {
      if (contentRef.value) {
        contentRef.value.scrollTop = 0; // Scrolls to the top of the content
      }
    };

    const colores = ref({
      rojoIMPC: "#B20000",
      rojoClaro: "#FAE6EA",
      grisOscuro: "#222222",
      verdeBoton: "#468C00",
    });

    const encabezadosEvento = ref([
      { title: "Especialidad", key: "modalidad" },
      { title: "Fecha de inicio", key: "eventos_fecha_inicio" },
      { title: "Lugar", key: "eventos_sede" },
      { title: "Puntos generados", key: "puntos" },
      { title: "Estatus", key: "status" },
    ]);

    const avisosCapacitacionPorPagina = ref(5);
    const paginaAvisoCapacitacion = ref(1);
    const busquedaAvisoCapacitacion = ref("");
    const loading = ref(false);

    const tabs = ref(1);
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

    const listadoCapacitaciones = ref<Capacitaciones>({
      dataset: [],
      totalSize: 0,
    });

    const getColor = (status: string) => {
      switch (status) {
        case "Solicitud":
          return "#FF7F00";
        case "Revisión":
          return "#0080FF";
        case "Autorizado":
          return "#85B201";
        case "Rechazado":
          return "#FE4948";
      }
    };

    async function cargarDashboard() {
      dataLoaded.value = false;
      loading.value = true;
      tabs.value = 1;

      listadoCapacitaciones.value = {
        dataset: [],
        totalSize: 0,
      };

      try {
        await capacitacionStore.cargarListado();

        if (capacitacionStore.object.listado.totalSize >= 0) {
          listadoCapacitaciones.value = capacitacionStore.object.listado;
        }
      } catch (error) {}
      loading.value = false;
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

    function detectaValorPaginador() {
      paginaAvisoCapacitacion.value = 1;
    }

    return {
      dataLoaded,
      colores,
      options,
      tabs,
      listadoCapacitaciones,
      encabezadosEvento,
      avisosCapacitacionPorPagina,
      paginaAvisoCapacitacion,
      busquedaAvisoCapacitacion,
      getColor,
      contentRef,
      formatearFecha,
      loading,
      detectaValorPaginador
    };
  },
});
</script>

<style>
.v-slide-group-item--active .v-btn__content {
  color: white !important;
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
    border-bottom: thin solid
      rgba(var(--v-border-color), var(--v-border-opacity));
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

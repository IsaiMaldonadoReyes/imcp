<template>
  <ion-page>
    <ion-content>
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
            text="Nuevo aviso"
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
                    Aviso de capacitación
                  </v-card-title>
                </v-card-item>
              </v-card>
              <v-card class="mx-auto my-4" elevation="0" rounded="lg">
                <v-divider />
                <v-card-actions>
                  <v-btn
                    :color="colores.verdeBoton"
                    block
                    prepend-icon="mdi-account-school-outline"
                    size="large"
                    text="Nuevo aviso de capacitación"
                    variant="flat"
                    @click="abrirDialogAviso"
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
                    Listado de avisos
                  </v-card-title>
                </v-card-item>
              </v-card>
              <v-text-field
                class="ma-3"
                clearable
                density="comfortable"
                hide-details
                placeholder="Buscar evento"
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
                >
                  <template v-slot:[`item`]="{ item }">
                    <tr class="v-data-table__tr">
                      <td
                        v-for="encabezado in encabezadosEvento"
                        :key="encabezado.key"
                        :data-label="encabezado.title"
                        class="v-data-table__td v-data-table-column--align-start text-body-2 text-medium-emphasis py-1"
                      >
                        <v-icon
                          v-if="encabezado.key == 'status'"
                          :color="getColor(item[encabezado.key])"
                          class="mr-2"
                        >
                          mdi-circle
                        </v-icon>
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
                    <v-row class="my-2" no-gutters>
                      <v-col class="d-flex align-center justify-end">
                        <v-chip
                          color="#FF7F00"
                          variant="outlined"
                          size="small"
                          label
                          style="width: 50"
                          class="ma-2"
                        >
                          <v-icon size="x-small" class="mr-2"
                            >mdi-circle</v-icon
                          >
                          Solicitud
                        </v-chip>
                      </v-col>
                      <v-col class="d-flex align-center justify-end">
                        <v-chip
                          color="#0080FF"
                          variant="outlined"
                          size="small"
                          label
                          class="ma-2"
                        >
                          <v-icon size="x-small" class="mr-2"
                            >mdi-circle</v-icon
                          >
                          Revisión
                        </v-chip>
                      </v-col>
                      <v-col class="d-flex align-center justify-end">
                        <v-chip
                          color="#85B201"
                          variant="outlined"
                          size="small"
                          label
                          class="ma-2"
                        >
                          <v-icon size="x-small" class="mr-2"
                            >mdi-circle</v-icon
                          >
                          Autorizado
                        </v-chip>
                      </v-col>
                      <v-col class="d-flex align-center justify-end">
                        <v-chip
                          color="#FE4948"
                          variant="outlined"
                          size="small"
                          label
                          class="ma-2"
                        >
                          <v-icon size="x-small" class="mr-2"
                            >mdi-circle</v-icon
                          >
                          Rechazado
                        </v-chip>
                      </v-col>
                    </v-row>

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
      </v-container>
      <v-dialog v-model="dialogFormCapacitacionExterna" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="text-h5">Nuevo aviso</span>
          </v-card-title>

          <v-card-text>
            <v-row>
              <v-select
                class="my-4"
                clearable
                hide-details="auto"
                label="Colegio *"
                no-data-text="No hay datos disponibles"
                variant="outlined"
                item-value="value"
                item-title="label"
              ></v-select>
            </v-row>
            <v-row>
              <v-text-field
                class="my-4"
                clearable
                hide-details="auto"
                label="Nombre del evento *"
                placeholder="Nombre del evento"
                variant="outlined"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                class="my-4"
                clearable
                hide-details="auto"
                label="Sede *"
                placeholder="Sede"
                variant="outlined"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                class="my-4"
                clearable
                hide-details="auto"
                label="Expositor *"
                placeholder="Expositor"
                variant="outlined"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                class="my-4"
                clearable
                hide-details="auto"
                label="Telefono *"
                placeholder="Telefono"
                variant="outlined"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                class="my-4"
                clearable
                hide-details="auto"
                label="Email *"
                placeholder="Email"
                variant="outlined"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                class="my-4"
                clearable
                hide-details="auto"
                label="Fecha de inicio *"
                placeholder="Fecha de inicio"
                variant="outlined"
              ></v-text-field>
              <v-text-field
                class="my-4"
                clearable
                hide-details="auto"
                label="Fecha de fin *"
                placeholder="Fecha de fin"
                variant="outlined"
              ></v-text-field>
            </v-row>
          </v-card-text>
          <v-spacer></v-spacer>

          <v-card-text>
            <v-row>
              <v-select
                class="my-4"
                clearable
                hide-details="auto"
                label="Disciplina *"
                no-data-text="No hay datos disponibles"
                variant="outlined"
                item-value="value"
                item-title="label"
              ></v-select>
            </v-row>
            <v-row>
              <v-text-field
                class="my-4"
                clearable
                hide-details="auto"
                label="Puntos *"
                placeholder="Puntos"
                variant="outlined"
              ></v-text-field>
              <v-text-field
                class="my-4"
                clearable
                hide-details="auto"
                label="Horas *"
                placeholder="Horas"
                variant="outlined"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-select
                class="my-4"
                clearable
                hide-details="auto"
                label="Modalidad *"
                no-data-text="No hay datos disponibles"
                variant="outlined"
                item-value="value"
                item-title="label"
              ></v-select>
            </v-row>
          </v-card-text>
          <v-data-table
            :show-footer="false"
            class="tb-grados pa-2"
            item-value="EventosNombreEvento"
            style="background-color: transparent"
          >
            <template v-slot:no-data>
              <v-card
                border
                class="my-5 pa-10 text-center"
                color="transparent"
                elevation="0"
              >
                <v-icon color="grey-lighten-1" size="60"> mdi-school </v-icon>
                <v-card-text class="text-grey-darken-1">
                  Aún no hay grados académicos registrados.
                </v-card-text>
              </v-card>
            </template>
            <template #bottom></template>
          </v-data-table>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="text-grey-darken-1"
              variant="text"
              @click="cerrarDialogAviso"
            >
              Cancelar
            </v-btn>
            <v-btn
              color="text-grey-darken-1"
              variant="text"
              @click="agregarAviso"
            >
              Guardar
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { IonPage, IonContent, onIonViewDidEnter } from "@ionic/vue";
import { useCapacitacionStore } from "@/store/capacitacionExterna";
import { VDataTable } from "vuetify/lib/labs/components.mjs";
//import MobileTableHelper from "@/components/MobileTableHelper.vue";

export interface Capacitaciones {
  dataset: Dataset[];
  totalSize: number;
  pageSize: number;
  intervaloSeccion: number;
  nombreListado: string;
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

    const colores = ref({
      rojoIMPC: "#B20000",
      rojoClaro: "#FAE6EA",
      grisOscuro: "#222222",
      verdeBoton: "#468C00",
    });

    const encabezadosEvento = ref([
      { title: "Especialidad", key: "modalidad" },
      { title: "Fecha", key: "eventos_fecha_inicio" },
      { title: "Lugar", key: "eventos_sede" },
      { title: "Puntos generados", key: "puntos" },
      { title: "Estatus", key: "status" },
    ]);

    const avisosCapacitacionPorPagina = ref(5);
    const paginaAvisoCapacitacion = ref(1);
    const busquedaAvisoCapacitacion = ref("");

    const dialogFormCapacitacionExterna = ref(false);
    const isValidCapacitacionExterna = ref(true);
    const formCapacitacionExterna = ref<any>(null);

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

    const listadoCapacitaciones = ref<Capacitaciones>({
      dataset: [],
      totalSize: 0,
      pageSize: 0,
      intervaloSeccion: 0,
      nombreListado: "",
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

      listadoCapacitaciones.value = {
        dataset: [],
        totalSize: 0,
        pageSize: 0,
        intervaloSeccion: 0,
        nombreListado: "",
      };

      try {
        await capacitacionStore.cargarListado();

        listadoCapacitaciones.value = capacitacionStore.object
          .listado as Capacitaciones;

        console.log(listadoCapacitaciones.value);
      } catch (error) {}
    }

    function cerrarDialogAviso() {
      dialogFormCapacitacionExterna.value = false;
    }

    function agregarAviso() {}

    function abrirDialogAviso() {
      dialogFormCapacitacionExterna.value = true;
    }

    onIonViewDidEnter(() => {
      cargarDashboard();
    });

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
      cerrarDialogAviso,
      abrirDialogAviso,
      agregarAviso,
      dialogFormCapacitacionExterna,
      isValidCapacitacionExterna,
    };
  },
});
</script>

<style>
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
    border-top: medium solid
      rgba(var(--v-border-color), var(--v-border-opacity));
  }
}
</style>

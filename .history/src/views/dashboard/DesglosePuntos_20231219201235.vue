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
            <span class="text-subtitle-1 font-weight-bold">
              {{ desgloseEspecialidades.CuentasUsuarios.colegio }}
            </span>
            <br />
            <span class="text-subtitle-1 text-grey-darken-1">Sector:</span>
            <span class="text-subtitle-1 font-weight-bold">
              {{ desgloseEspecialidades.CuentasUsuarios.sector }}
            </span>
            <br />
            <span class="text-subtitle-1 text-grey-darken-1"> Registro Agaff: </span>
            <span class="text-subtitle-1 font-weight-bold">
              {{ desgloseEspecialidades.CuentasUsuarios.registroAgaff }}
            </span>
            <br />
            <span class="text-subtitle-1 text-grey-darken-1">Registro IMSS:</span>
            <span class="text-subtitle-1 font-weight-bold">
              {{ desgloseEspecialidades.CuentasUsuarios.registroImss }}
            </span>
            <br />
            <span class="text-subtitle-1 text-grey-darken-1">Total de puntos:</span>
            <span class="text-subtitle-1 font-weight-bold">
              {{ desgloseEspecialidades.total }}
            </span>
            <br />
            <span class="text-subtitle-1 text-grey-darken-1">
              Cumplimiento NDPCA artículo 2.9:
            </span>
            <span class="text-subtitle-1 font-weight-bold text-red-darken-1">
              {{ desgloseEspecialidades.CuentasUsuarios.articulo }}
            </span>
          </v-card-text>
        </v-card>

        <v-data-iterator
          :items-per-page="itemsPorPagina"
          :items="desgloseEspecialidades.PuntosEvento || []"
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

          <template v-slot:no-data>
            <v-card
              border
              class="my-5 pa-10 text-center"
              color="transparent"
              elevation="0"
            >
              <v-icon color="grey-lighten-1" size="60">mdi-database-eye-off</v-icon>
              <v-card-text class="text-grey-darken-1">
                No se encontraron especialidades que coincidan con la búsqueda.
              </v-card-text>
            </v-card>
          </template>

          <template v-slot:default="{ items }">
            <v-row dense>
              <v-col v-for="item in items" :key="item.raw.areaEspecialidad" cols="12">
                <v-card border class="mb-3" color="transparent" elevation="0">
                  <v-card class="py-1" elevation="0" border rounded="0">
                    <v-list-item class="text-justify">
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
                    v-model="busquedaEvento[item.raw.areaEspecialidad]"
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
                      :items-per-page="eventosPorPagina[item.raw.areaEspecialidad]"
                      :items="item.raw.dataset"
                      :page="paginaEvento[item.raw.areaEspecialidad]"
                      :search="busquedaEvento[item.raw.areaEspecialidad]"
                      item-value="EventosNombreEvento"
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
                          v-if="item.raw.dataset.length > 1"
                        >
                          <v-select
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
                  <v-card border class="py-1" elevation="0" rounded="0">
                    <div class="d-flex justify-space-between px-3 my-3">
                      <div
                        class="d-flex align-center text-caption text-medium-emphasis me-1"
                      >
                        <span class="text-subtitle-1 text-grey-darken-1 font-weight-bold">
                          Total de horas:
                        </span>
                        <span class="text-h6 font-weight-bold" style="color: #b80000">
                          {{ item.raw.total.SumHora }}
                        </span>
                      </div>

                      <div
                        class="d-flex align-center text-caption text-medium-emphasis me-1"
                      >
                        <span class="text-subtitle-1 text-grey-darken-1 font-weight-bold">
                          Total de puntos:
                        </span>
                        <span class="text-h6 font-weight-bold" style="color: #b80000">
                          {{ item.raw.total.SumEspecialidad }}
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
                v-if="desgloseEspecialidades.PuntosEvento.length > 3"
                v-model="itemsPorPagina"
                :base-color="colores.grisOscuro"
                :color="colores.rojoIMPC"
                :false-value="3"
                :inline="false"
                :true-value="desgloseEspecialidades.PuntosEvento.length"
                class="switch-all font-weight-bold d-flex justify-center"
                density="compact"
                false-icon="mdi-eye-off-outline"
                hide-details
                inset
                label="Ver todas las especialidades"
                true-icon="mdi-eye-outline"
              />
            </div>
            <div
              class="d-flex align-center justify-center pa-4"
              v-if="desgloseEspecialidades.PuntosEvento.length > 3"
            >
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
        <v-card
          color="transparent"
          rounded="lg"
          class="mx-auto my-4"
          elevation="0"
          v-if="desgloseEspecialidades.PuntosEvento.length > 0"
        >
          <v-card-actions>
            <v-btn
              :color="colores.verdeBoton"
              block
              class="text-none"
              prepend-icon="mdi-file-download-outline"
              rounded="large"
              size="large"
              text="DESCARGAR REPORTE PDF"
              variant="flat"
              @click="descargarPdf"
            >
              <template v-slot:prepend>
                <v-icon class="mr-3" size="large"></v-icon>
              </template>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent, onIonViewDidEnter } from "@ionic/vue";
import { defineComponent, ref } from "vue";
import { VDataIterator, VDataTable } from "vuetify/lib/labs/components.mjs";
import { useDashboardStore } from "@/store/dashboard";
import { useRoute } from "vue-router";

export interface Result {
  anhio: string;
  CuentasUsuarios: CuentasUsuarios;
  total: number;
  PuntosEvento: PuntosEvento[];
  totales_general: TotalesGeneral;
}

export interface CuentasUsuarios {
  cuentasUsuariosId: number;
  idColegio: number;
  idSector: number;
  cuentaRfc: string;
  cuentaNombre: string;
  cuentaApaterno: string;
  cuentaAmatarno: string;
  cuentaSocio: string;
  cuentaSexo: string;
  cuentaEmail: string;
  registroAgaff: string;
  registroImss: string;
  tipoUsusario: string;
  puntos: string;
  articulo: string;
  anhioNacimiento: number;
  status: string;
  colegio: string;
  sector: string;
}

export interface PuntosEvento {
  areaEspecialidad: string;
  dataset: Dataset[];
  total: Total;
}

export interface Dataset {
  NombreEspecialidad: string;
  EventosNombreEvento: string;
  NombreColegio: string;
  NumeroRegistro: string;
  EventosFechaFin: string;
  AsistenciaHora: number;
  AsistenciaPuntos: number;
}

export interface Total {
  TotalEspecialidad: string;
  SumEspecialidad: number;
  SumHora: number;
}

export interface TotalesGeneral {
  TotalPuntos: string;
  SumEspecialidadTotal: number;
  sumEspecialidadTotalHora: number;
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
    const dashStore = useDashboardStore();
    let eventosPorPagina = ref([1]);
    const itemsPorPagina = ref(3);
    const paginaEvento = ref([]);
    const route = useRoute();
    let busquedaEspecialidad = ref("");
    let busquedaEvento = ref([]);
    let sortBy = ref([]);
    let sortDesc = ref("asc");
    let rutaPdf = ref("");

    console.log("!!!");
    console.log(eventosPorPagina.value);

    const encabezadosEvento = ref([
      { title: "Evento", key: "EventosNombreEvento" },
      { title: "Colegio", key: "NombreColegio" },
      { title: "Núm. Registro", key: "NumeroRegistro" },
      { title: "Fecha", key: "EventosFechaFin" },
      { title: "Horas", key: "AsistenciaHora" },
      { title: "Puntos", key: "AsistenciaPuntos" },
    ]);

    const colores = ref({
      rojoIMPC: "#B20000",
      rojoClaro: "#FAE6EA",
      grisOscuro: "#222222",
      verdeBoton: "#468C00",
    });

    const desgloseEspecialidades = ref<Result>({
      anhio: "",
      CuentasUsuarios: {
        cuentasUsuariosId: 0,
        idColegio: 0,
        idSector: 0,
        cuentaRfc: "",
        cuentaNombre: "",
        cuentaApaterno: "",
        cuentaAmatarno: "",
        cuentaSocio: "",
        cuentaSexo: "",
        cuentaEmail: "",
        registroAgaff: "",
        registroImss: "",
        tipoUsusario: "",
        puntos: "",
        articulo: "",
        anhioNacimiento: 0,
        status: "",
        colegio: "",
        sector: "",
      },
      total: 0,
      PuntosEvento: [],
      totales_general: {
        TotalPuntos: "",
        SumEspecialidadTotal: 0,
        sumEspecialidadTotalHora: 0,
      },
    });

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

    async function cargarDesglosePorEjercicio(id: any) {
      try {
        desgloseEspecialidades.value = {
          anhio: "",
          CuentasUsuarios: {
            cuentasUsuariosId: 0,
            idColegio: 0,
            idSector: 0,
            cuentaRfc: "",
            cuentaNombre: "",
            cuentaApaterno: "",
            cuentaAmatarno: "",
            cuentaSocio: "",
            cuentaSexo: "",
            cuentaEmail: "",
            registroAgaff: "",
            registroImss: "",
            tipoUsusario: "",
            puntos: "",
            articulo: "",
            anhioNacimiento: 0,
            status: "",
            colegio: "",
            sector: "",
          },
          total: 0,
          PuntosEvento: [],
          totales_general: {
            TotalPuntos: "",
            SumEspecialidadTotal: 0,
            sumEspecialidadTotalHora: 0,
          },
        };
        await dashStore.desglosePuntosPorEjercicio(id);
        desgloseEspecialidades.value = dashStore.object.desglosePuntos as Result;
      } catch (error) {}
    }

    async function cargarPdfDesglosePorEjercicio(id: any) {
      rutaPdf.value = "";

      try {
        await dashStore.desglosePuntosPorEjercicioPdf(id);
        rutaPdf.value = dashStore.object.rutaPdf;
      } catch (error) {}
    }

    function descargarPdf() {
      window.open(rutaPdf.value, "_blank");
    }

    onIonViewDidEnter(() => {
      const id = route.params.id;

      cargarDesglosePorEjercicio(id);
      cargarPdfDesglosePorEjercicio(id);
    });

    return {
      keys,
      keysProps,
      busquedaEspecialidad,
      busquedaEvento,
      colores,
      encabezadosEvento,
      eventosPorPagina,
      itemsPorPagina,
      paginaEvento,
      sortBy,
      sortDesc,
      desgloseEspecialidades,
      descargarPdf,
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

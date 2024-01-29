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
                    Aviso de capacitacion
                  </v-card-title>
                </v-card-item>
              </v-card>
              <v-card class="mx-auto my-4" elevation="0" rounded="lg">
                <v-divider />
                <v-card-actions>
                  <v-btn
                    :color="colores.grisOscuro"
                    block
                    prepend-icon="mdi-eye-arrow-right-outline"
                    size="large"
                    text="Nuevo aviso de capacitación"
                    variant="flat"
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
            <v-card color="transparent" elevation="0" rounded="b-lg">
              <v-card class="mx-auto" color="transparent" elevation="0">
                <v-card-item>
                  <v-card-title
                    class="text-uppercase text-center"
                    style="white-space: normal"
                  >
                    Listado de avisosa
                  </v-card-title>
                </v-card-item>
              </v-card>

              <v-data-iterator
                :items-per-page="itemsPorPagina"
                :items="certificadosEmitidos.dataset || []"
                :search="busquedaCertificado"
                :sort-by="sortBy"
                item-value="cert_tipo"
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
                  <v-card
                    border
                    class="my-5 pa-10 text-center"
                    color="transparent"
                    elevation="0"
                  >
                    <v-icon color="grey-lighten-1" size="60">mdi-database-eye-off</v-icon>
                    <v-card-text class="text-grey-darken-1">
                      No se encontraron certificados que coincidan con la búsqueda.
                    </v-card-text>
                  </v-card>
                </template>

                <template v-slot:default="{ items }">
                  <v-card
                    class="my-4"
                    elevation="0"
                    border
                    v-for="item in items"
                    :key="item.raw.num_certificado"
                  >
                    <!--v-card-title
                class="text-none text-center"
                style="white-space: normal"
              >
                Disciplina: {{ item.raw.cert_disciplina }}
              </v-card-title>
              <v-divider></v-divider-->
                    <v-divider></v-divider>
                    <v-card-text>
                      <v-table density="compact">
                        <tbody>
                          <tr>
                            <td class="ma-0 pa-1 text-subtitle-1 text-grey-darken-1">
                              Tipo:
                            </td>
                            <td class="ma-0 pa-1 text-subtitle-1 font-weight-bold">
                              {{ item.raw.cert_tipo }}
                            </td>
                          </tr>
                          <tr>
                            <td class="ma-0 pa-1 text-subtitle-1 text-grey-darken-1">
                              No. certificado:
                            </td>
                            <td class="ma-0 pa-1 text-subtitle-1 font-weight-bold">
                              {{ item.raw.num_certificado }}
                            </td>
                          </tr>
                          <tr>
                            <td class="ma-0 pa-1 text-subtitle-1 text-grey-darken-1">
                              Emisión:
                            </td>
                            <td class="ma-0 pa-1 text-subtitle-1 font-weight-bold">
                              {{ item.raw.fecha_vigencia }}
                            </td>
                          </tr>
                          <tr>
                            <td class="ma-0 pa-1 text-subtitle-1 text-grey-darken-1">
                              Vigencia:
                            </td>
                            <td class="ma-0 pa-1 text-subtitle-1 font-weight-bold">
                              {{ item.raw.fecha_inicio }}
                            </td>
                          </tr>
                          <tr>
                            <td class="ma-0 pa-1 text-subtitle-1 text-grey-darken-1">
                              Estatus:
                            </td>
                            <td class="ma-0 pa-1 text-subtitle-1 font-weight-bold">
                              {{ item.raw.status }}
                            </td>
                          </tr>
                        </tbody>
                      </v-table>
                    </v-card-text>
                    <v-divider />
                    <v-card-actions v-if="item.raw.Descargar !== ''">
                      <v-btn
                        :color="colores.verdeBoton"
                        block
                        prepend-icon="mdi-file-download-outline"
                        size="large"
                        text="DESCARGAR CERTIFICADO"
                        @click="descargarCertificado(item.raw.Descargar)"
                        variant="flat"
                      >
                        <template v-slot:prepend>
                          <v-icon class="mr-3" size="large"></v-icon>
                        </template>
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </template>

                <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
                  <div class="d-flex align-center justify-center pa-4">
                    <v-switch
                      v-model="itemsPorPagina"
                      :base-color="colores.grisOscuro"
                      :color="colores.rojoIMPC"
                      :false-value="3"
                      :inline="false"
                      :true-value="certificadosEmitidos.dataset.length"
                      class="switch-all font-weight-bold d-flex justify-center"
                      density="compact"
                      false-icon="mdi-eye-off-outline"
                      hide-details
                      inset
                      label="Ver todos los certificados"
                      true-icon="mdi-eye-outline"
                      v-if="certificadosEmitidos.dataset.length > 3"
                    />
                  </div>
                  <div
                    class="d-flex align-center justify-center pa-4"
                    v-if="certificadosEmitidos.dataset.length > 3"
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

              <v-card class="mx-auto my-2" elevation="0" rounded="lg">
                <v-card-text> </v-card-text>
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
import { useCapacitacionStore } from "@/store/capacitacionExterna";

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
  },
  setup() {
    const capacitacionStore = useCapacitacionStore();

    const colores = ref({
      rojoIMPC: "#B20000",
      rojoClaro: "#FAE6EA",
      grisOscuro: "#222222",
    });

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

        listadoCapacitaciones.value = capacitacionStore.object.listado as Capacitaciones;

        console.log(listadoCapacitaciones.value);
      } catch (error) {}
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
    };
  },
});
</script>

<style scoped lang="scss">
.blue-tab {
  background-color: white !important;
  /* Cambia 'blue' por el color que desees */
}
.rating-values {
  margin-left: 10px;
  min-width: 65px;
}
</style>

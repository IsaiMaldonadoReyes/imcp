<template>
  <ion-page>
    <ion-content>
      <v-container fluid>
        <v-card elevation="0" color="transparent">
          <v-card-item>
            <v-card-title class="text-uppercase text-center" style="white-space: normal">
              Certificados en proceso
            </v-card-title>
          </v-card-item>
        </v-card>
        <v-data-iterator
          :items-per-page="itemsPorPagina"
          :items="certificadosPendientes.dataset || []"
          :search="busquedaCertificado"
          :sort-by="sortBy"
          item-value="tipo_certificado"
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
              :key="item.raw.certificado_dis"
            >
              <v-card-text>
                <v-table density="compact">
                  <tbody>
                    <tr>
                      <td class="ma-0 pa-1 text-subtitle-1 text-grey-darken-1">
                        Certificado:
                      </td>
                      <td class="ma-0 pa-1 text-subtitle-1 font-weight-bold">
                        {{ item.raw.certificado_dis }}
                      </td>
                    </tr>
                    <tr>
                      <td class="ma-0 pa-1 text-subtitle-1 text-grey-darken-1">
                        Núm. Certificado:
                      </td>
                      <td class="ma-0 pa-1 text-subtitle-1 font-weight-bold text-justify">
                        {{ item.raw.num_certificado }}
                      </td>
                    </tr>
                    <tr>
                      <td class="ma-0 pa-1 text-subtitle-1 text-grey-darken-1">
                        Fecha vigencia:
                      </td>
                      <td class="ma-0 pa-1 text-subtitle-1 font-weight-bold text-justify">
                        {{ item.raw.fecha_vigencia }}
                      </td>
                    </tr>
                    <tr>
                      <td class="ma-0 pa-1 text-subtitle-1 text-grey-darken-1">
                        Sector:
                      </td>
                      <td class="ma-0 pa-1 text-subtitle-1 font-weight-bold text-justify">
                        {{ item.raw.sector }}
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </v-card-text>
              <v-divider />
              <v-card
                v-if="item.raw.tipo_certificado !== 'Sustentante'"
                class="ma-3 pa-3"
                border
                elevation="0"
              >
                <v-timeline side="end" direction="horizontal" truncate-line="both" line-inset="10px" justify>
                  <v-timeline-item
                    v-for="(item, i) in item.raw.revisionAnual"
                    :key="i"
                    :dot-color="getDotColor(item.status)"
                    :icon="getIcon(item.status)"
                    size="small"
                    fill-dot
                  >
                    <template v-slot:opposite>
                      <!--div
                        class="headline text-subtitle-1 font-weight-bold"
                        :style="`color: ${getDotColor(item.status)}`"
                        v-text="item.anhio"
                      ></div-->
                      {{ item.anhio }}
                    </template>
                    {{ item.status }}
                    <!--div>
                      <h6 class="headline font-weight-light mb-4 text-grey-darken-1">
                        {{ item.status }}
                      </h6>
                    </div-->
                  </v-timeline-item>
                </v-timeline>
              </v-card>
              <v-divider />
              <v-card-actions>
                <v-btn
                  v-if="
                    item.raw.tipo_certificado == 'Sustentante' ||
                    item.raw.tipo_certificado == 'Refrendo'
                  "
                  :color="colores.verdeBoton"
                  block
                  prepend-icon="mdi-credit-card-outline"
                  size="large"
                  text="Realizar pago"
                  :to="{
                    name: 'seleccionPagoCertificado',
                    params: { idCertificado: 200 },
                  }"
                  variant="flat"
                >
                  <template v-slot:prepend>
                    <v-icon class="mr-3" size="large"></v-icon>
                  </template>
                </v-btn>
                <v-btn
                  v-else
                  :color="colores.grisOscuro"
                  block
                  prepend-icon="mdi-eye-arrow-right-outline"
                  size="large"
                  text="Ver detalle"
                  variant="flat"
                  :to="{
                    name: 'certificadoPuntos',
                    params: {
                      idCertificado: item.raw.id_certificado,
                      anhioInicio: item.raw.anhio_inicio_vigencia,
                      anhioFin: item.raw.anhio_fin_vigencia,
                      numCertificado: item.raw.num_certificado,
                    },
                  }"
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
                :true-value="certificadosPendientes.dataset.length"
                class="switch-all font-weight-bold d-flex justify-center"
                density="compact"
                false-icon="mdi-eye-off-outline"
                hide-details
                inset
                label="Ver todos los certificados"
                true-icon="mdi-eye-outline"
              />
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
              />
            </div>
          </template>
        </v-data-iterator>
      </v-container>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { IonPage, IonContent } from "@ionic/vue";
import { VDataIterator } from "vuetify/lib/labs/components.mjs";
import { useCertificadoStore } from "@/store/certificado";
import { useRoute } from "vue-router";

export interface Certificados {
  dataset: Dataset[];
  totalSize: number;
  pageSize: number;
  nombreListado: string;
}

export interface Dataset {
  id_certificado: number;
  id_estudiante: number;
  id_colegio: number;
  id_tipo: number;
  id_tipo_certificado: number;
  id_certificado_dis: number;
  num_certificado: string;
  fecha_vigencia: string;
  fecha_inicio: string;
  status_certificado: string;
  proviene: string;
  id_certificado_nuevo: number;
  status: string;
  id_certificado_viejo: number;
  nombre: string;
  puntos_obtenidos: number;
  puntos_totales: number;
  status_autorizar: string;
  info_certificado: string;
  dateupdate: string;
  datecreation: string;
  anhio_inicio_vigencia: string;
  anhio_fin_vigencia: string;
  cuenta_rfc: string;
  cuenta_nombre: string;
  cuenta_apaterno: string;
  cuenta_amatarno: string;
  cuenta_email: string;
  status_contacto: string;
  registro_agaff: string;
  anhio_inicio_vigencia_nuevo: string;
  anhio_fin_vigencia_nuevo: string;
  tipo: string;
  tipo_certificado: string;
  certificado_dis: string;
  sector: string;
  revisionAnual: RevisionAnual[];
}

export interface RevisionAnual {
  anhio: string;
  status: string;
}

export default defineComponent({
  name: "certificado",
  components: {
    IonPage,
    IonContent,
    VDataIterator,
  },
  setup() {
    const certificadoStore = useCertificadoStore();

    let sortBy = ref([]);
    let sortDesc = ref("asc");
    const itemsPorPagina = ref(3);
    let busquedaCertificado = ref("");

    const colores = ref({
      rojoIMPC: "#B20000",
      rojoClaro: "#FAE6EA",
      grisOscuro: "#222222",
      verdeBoton: "#468C00",
    });

    const certificadosPendientes = ref<Certificados>({
      dataset: [],
      totalSize: 0,
      pageSize: 0,
      nombreListado: "",
    });

    const keys = ref([
      {
        key: "certificado_dis",
        order: sortDesc,
      },
      {
        key: "num_certificado",
        order: sortDesc,
      },
      {
        key: "sector",
        order: sortDesc,
      },
    ]);

    const getDotColor = computed(() => (status: string) =>
      status === "Cumplido" ? "#468C00" : "#B20000"
    );
    const getIcon = computed(() => (status: string) =>
      status === "Cumplido" ? "mdi-check-bold" : "mdi-close-thick"
    );

    const keysProps = ref((item: any) => {
      switch (item.key) {
        case "certificado_dis":
          return {
            title: "Certificado",
            value: [item],
          };
        case "num_certificado":
          return {
            title: "Núm. Certificado",
            value: [item],
          };
        case "sector":
          return {
            title: "Sector",
            value: [item],
          };
        default:
          return [];
      }
    });

    async function cargarDesglosePorEjercicio() {
      try {
        await certificadoStore.cargarCertificadosPendientes();
        certificadosPendientes.value = certificadoStore.object
          .certificadosPendientes as Certificados;
      } catch (error) {}
    }

    onMounted(() => {
      cargarDesglosePorEjercicio();
    });

    return {
      colores,
      sortBy,
      sortDesc,
      itemsPorPagina,
      busquedaCertificado,
      keys,
      keysProps,
      certificadosPendientes,
      getDotColor,
      getIcon,
    };
  },
});
</script>

<style scoped lang="scss"></style>

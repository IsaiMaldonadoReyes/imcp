<template>
  <ion-page>
    <ion-content ref="contentRef">
      <v-container fluid>
        <v-card elevation="0" color="transparent">
          <v-card-item>
            <v-card-title
              class="text-uppercase text-grey-darken-3 font-weight-bold text-center"
              style="white-space: normal"
            >
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
            <v-row dense class="mt-3">
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
              <v-icon color="grey-lighten-1" size="60"
                >mdi-database-eye-off</v-icon
              >
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
                      <td
                        class="ma-0 pa-1 text-subtitle-1 font-weight-bold text-justify"
                      >
                        {{ item.raw.num_certificado }}
                      </td>
                    </tr>
                    <tr>
                      <td class="ma-0 pa-1 text-subtitle-1 text-grey-darken-1">
                        Fecha vigencia:
                      </td>
                      <td
                        class="ma-0 pa-1 text-subtitle-1 font-weight-bold text-justify"
                      >
                        {{ formatearFecha(item.raw.fecha_vigencia) }}
                      </td>
                    </tr>
                    <tr>
                      <td class="ma-0 pa-1 text-subtitle-1 text-grey-darken-1">
                        Sector:
                      </td>
                      <td
                        class="ma-0 pa-1 text-subtitle-1 font-weight-bold text-justify"
                      >
                        {{ item.raw.sector }}
                      </td>
                    </tr>
                    <tr>
                      <td class="ma-0 pa-1 text-subtitle-1 text-grey-darken-1">
                        Estatus:
                      </td>
                      <td
                        class="ma-0 pa-1 text-subtitle-1 font-weight-bold text-justify"
                      >
                        {{
                          item.raw.status_autorizar === "Autorizar"
                            ? "Autorizado"
                            : "Por autorizar"
                        }}
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </v-card-text>
              <v-divider />
              <v-card elevation="0" rounded="0" class="ma-1">
                <v-slide-group show-arrows class="imcp-slide-group">
                  <v-slide-group-item
                    v-for="(revision, i) in item.raw.revisionAnual"
                    :key="i"
                  >
                    <v-card
                      class="ma-1 pa-1 text-center"
                      height="90"
                      width="30%"
                      elevation="0"
                      border
                    >
                      <div
                        class="text-subtitle-1 font-weight-bold"
                        :style="`color: ${getDotColor(revision.status)}`"
                        v-text="revision.anhio"
                      ></div>
                      <v-divider></v-divider>
                      <v-icon
                        :color="getDotColor(revision.status)"
                        :icon="getIcon(revision.status)"
                        class="my-1"
                      ></v-icon>
                      <div>
                        <h6
                          class="ma-0 pa-0 font-weight-light text-grey-darken-1"
                          style="font-size: 0.88rem"
                        >
                          {{ revision.status }}
                        </h6>
                      </div>
                    </v-card>
                  </v-slide-group-item>
                </v-slide-group>
              </v-card>
              <v-divider />

              <v-card-actions>
                <v-btn
                  v-if="
                    item.raw.status_certificado === 'Autorizado Refrendo' &&
                    item.raw.status_autorizar === 'Autorizar'
                  "
                  :color="colores.verdeBoton"
                  block
                  prepend-icon="mdi-eye-arrow-right-outline"
                  size="large"
                  text="Actualizar datos"
                  @click="
                    dirigirSeleccionAccion(
                      item.raw.id_certificado,
                      '1',
                      item.raw.token,
                      item.raw.token_id
                    )
                  "
                  variant="flat"
                >
                  <template v-slot:prepend>
                    <v-icon size="large"></v-icon>
                  </template>
                </v-btn>
                <v-btn
                  v-else-if="
                    item.raw.status_certificado === 'Actualizar Datos' &&
                    item.raw.status_autorizar === 'Autorizar'
                  "
                  :color="colores.verdeBoton"
                  block
                  prepend-icon="mdi-credit-card-outline"
                  size="large"
                  text="Realizar pago"
                  @click="
                    dirigirSeleccionAccion(
                      item.raw.id_certificado,
                      '2',
                      item.raw.token,
                      item.raw.token_id
                    )
                  "
                  variant="flat"
                >
                  <template v-slot:prepend>
                    <v-icon size="large"></v-icon>
                  </template>
                </v-btn>
                <v-btn
                  v-else-if="item.raw.status_certificado === 'Pago Realizado'"
                  :color="colores.grisOscuro"
                  block
                  prepend-icon="mdi-eye-arrow-right-outline"
                  size="large"
                  text="Pago realizado"
                  variant="flat"
                  disabled
                >
                  <template v-slot:prepend>
                    <v-icon size="large"></v-icon>
                  </template>
                </v-btn>
                <v-btn
                  v-else-if="item.raw.status_certificado === 'Generado'"
                  :color="colores.grisOscuro"
                  block
                  prepend-icon="mdi-eye-arrow-right-outline"
                  size="large"
                  text="En espera"
                  variant="flat"
                  disabled
                >
                  <template v-slot:prepend>
                    <v-icon size="large"></v-icon>
                  </template>
                </v-btn>
                <v-btn
                  v-else-if="
                    item.raw.status_certificado === 'Puntos no Cubiertos'
                  "
                  :color="colores.grisOscuro"
                  block
                  prepend-icon="mdi-eye-arrow-right-outline"
                  size="large"
                  text="Ver detalle"
                  variant="flat"
                  :to="{
                    name: 'certificadoPuntos',
                    params: {
                      idCertificado: item.raw.id_certificado_dis,
                      anhioInicio: item.raw.anhio_inicio_vigencia,
                      anhioFin: item.raw.anhio_fin_vigencia,
                      numCertificado: item.raw.num_certificado,
                    },
                  }"
                >
                  <template v-slot:prepend>
                    <v-icon size="large"></v-icon>
                  </template>
                </v-btn>
                <v-btn
                  v-else-if="item.raw.status_autorizar !== 'Autorizar'"
                  :color="colores.grisOscuro"
                  block
                  prepend-icon="mdi-eye-arrow-right-outline"
                  size="large"
                  text="Ver detalle"
                  variant="flat"
                  :to="{
                    name: 'certificadoPuntos',
                    params: {
                      idCertificado: item.raw.id_certificado_dis,
                      anhioInicio: item.raw.anhio_inicio_vigencia,
                      anhioFin: item.raw.anhio_fin_vigencia,
                      numCertificado: item.raw.num_certificado,
                    },
                  }"
                >
                  <template v-slot:prepend>
                    <v-icon size="large"></v-icon>
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
                v-if="certificadosPendientes.dataset.length > 3"
              />
            </div>
            <div
              class="d-flex align-center justify-center pa-4"
              v-if="certificadosPendientes.dataset.length > 3"
            >
              <v-btn
                :color="colores.rojoIMPC"
                :disabled="page === 1"
                icon="mdi-arrow-left"
                rounded
                size="small"
                @click="prevPage"
              />

              <div
                class="mx-2 text-subtitle-1 text-grey-darken-1 font-weight-bold"
              >
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
import { defineComponent, ref, computed } from "vue";
import { IonPage, IonContent, onIonViewDidEnter } from "@ionic/vue";
import { VDataIterator } from "vuetify/lib/labs/components.mjs";
import { useCertificadoStore } from "@/store/certificado";
import { useRouter, Router, useRoute } from "vue-router";

export interface Certificados {
  dataset: Dataset[];
  totalSize: number;
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
  token_id: number;
  token: string;
  token_status: string;
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
    const contentRef = ref<HTMLElement | null>(null);

    const scrollToTop = () => {
      if (contentRef.value) {
        contentRef.value.scrollTop = 0; // Scrolls to the top of the content
      }
    };

    const certificadoStore = useCertificadoStore();

    let sortBy = ref([]);
    let sortDesc = ref("asc");
    const itemsPorPagina = ref(3);
    let busquedaCertificado = ref("");
    const loading = ref(false);

    const route = useRoute();
    const router: Router = useRouter();

    const colores = ref({
      rojoIMPC: "#B20000",
      rojoClaro: "#FAE6EA",
      grisOscuro: "#222222",
      verdeBoton: "#468C00",
    });

    const certificadosPendientes = ref<Certificados>({
      dataset: [],
      totalSize: 0,
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

    const getDotColor = computed(
      () => (status: string) => status === "Cumplido" ? "#468C00" : "#B20000"
    );
    const getIcon = computed(
      () => (status: string) =>
        status === "Cumplido" ? "mdi-check-circle" : "mdi-close-circle"
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
      loading.value = true;
      certificadosPendientes.value = {
        dataset: [],
        totalSize: 0,
      };

      try {
        await certificadoStore.cargarCertificadosPendientes();

        if (certificadoStore.object.certificadosPendientes.totalSize >= 0) {
          const filtrados =
            certificadoStore.object.certificadosPendientes.dataset.filter(
              (certificado: Dataset) =>
                certificado.status_certificado !== "Liberado"
            );

          certificadosPendientes.value = {
            dataset: filtrados,
            totalSize: filtrados.length,
          };
        }
      } catch (error) {}

      loading.value = false;
    }

    async function dirigirSeleccionAccion(
      idCertificado: any,
      estatus: any,
      tokenCertificado: any,
      tokenId: any
    ) {
      router.push({
        name: "seleccionAccion",
        params: {
          idCertificado: idCertificado,
          estatus: estatus,
          tokenCertificado: tokenCertificado,
          idToken: tokenId,
        },
      });
    }

    function formatearFecha(dateString: string) {
      const [year, month, day] = dateString.split("-").map(Number); // Extraer partes
      const date = new Date(Date.UTC(year, month - 1, day)); // Crear la fecha en UTC

      const formattedDay = ("0" + date.getUTCDate()).slice(-2);
      const formattedMonth = ("0" + (date.getUTCMonth() + 1)).slice(-2);
      const formattedYear = date.getUTCFullYear();

      return `${formattedDay}/${formattedMonth}/${formattedYear}`;
    }

    onIonViewDidEnter(() => {
      if (contentRef.value !== null) {
        contentRef.value.scrollTop = 0;
      }
      scrollToTop();
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
      dirigirSeleccionAccion,
      contentRef,
      formatearFecha,
      loading,
    };
  },
});
</script>

<style>
.imcp-slide-group .v-slide-group__next,
.imcp-slide-group .v-slide-group__prev {
  flex: 0px !important;
  min-width: 15px !important;
}

.v-field__input > input {
  color: #333333;
}
.mdi-menu-down.mdi.v-icon {
  color: black;
}
.v-select__selection .v-select__selection-text {
  color: 333333;
}
</style>

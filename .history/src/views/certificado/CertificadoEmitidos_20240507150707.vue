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
              Certificados emitidos
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
                      <td class="ma-0 pa-1 text-subtitle-1 text-grey-darken-1">Tipo:</td>
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
                        {{ formatearFecha(item.raw.fecha_vigencia) }}
                      </td>
                    </tr>
                    <tr>
                      <td class="ma-0 pa-1 text-subtitle-1 text-grey-darken-1">
                        Vigencia:
                      </td>
                      <td class="ma-0 pa-1 text-subtitle-1 font-weight-bold">
                        {{ formatearFecha(item.raw.fecha_inicio) }}
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
      </v-container>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { IonPage, IonContent, onIonViewDidEnter } from "@ionic/vue";
import { VDataIterator } from "vuetify/lib/labs/components.mjs";
import { useCertificadoStore } from "@/store/certificado";
import { useRoute } from "vue-router";

export interface Certificados {
  dataset: Dataset[];
}

export interface Dataset {
  id_certificado: number;
  cuentas_usuarios_id: number;
  cuenta_nombre: string;
  cuenta_apaterno: string;
  cuenta_amatarno: string;
  nombre_colegio: string;
  cuenta_rfc: string;
  cert_tipo: string;
  cert_tipo_certificado: string;
  cert_disciplina: string;
  num_certificado: string;
  fecha_vigencia: string;
  fecha_inicio: string;
  status: string;
  anhio_inicio_vigencia: string;
  anhio_fin_vigencia: string;
  status_certificado: string;
  clasificacion: string;
  tipo_entrega: string;
  Descargar: string;
}

export default defineComponent({
  name: "emitidos",
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

    const colores = ref({
      rojoIMPC: "#B20000",
      rojoClaro: "#FAE6EA",
      grisOscuro: "#222222",
      verdeBoton: "#468C00",
    });

    const certificadosEmitidos = ref<Certificados>({
      dataset: [],
    });

    const keys = ref([
      {
        key: "cert_tipo",
        order: sortDesc,
      },
      {
        key: "num_certificado",
        order: sortDesc,
      },
      {
        key: "fecha_vigencia",
        order: sortDesc,
      },
    ]);

    const getDotColor = computed(() => (status: string) =>
      status === "Cumplido" ? "#468C00" : "#B20000"
    );
    const getIcon = computed(() => (status: string) =>
      status === "Cumplido" ? "mdi-check-circle" : "mdi-close-circle"
    );

    const keysProps = ref((item: any) => {
      switch (item.key) {
        case "cert_tipo":
          return {
            title: "Tipo",
            value: [item],
          };
        case "num_certificado":
          return {
            title: "No. certificado",
            value: [item],
          };
        case "fecha_vigencia":
          return {
            title: "Fecha de emisión",
            value: [item],
          };
        default:
          return [];
      }
    });

    async function cargarDesglosePorEjercicio() {
      certificadosEmitidos.value = {
        dataset: [],
      };

      try {
        await certificadoStore.cargarCertificadosEmitidos();

        if (
          Array.isArray(certificadoStore.object.certificadosEmitidos) &&
          certificadoStore.object.certificadosEmitidos.length > 0
        ) {
          certificadosEmitidos.value = {
            dataset: certificadoStore.object.certificadosEmitidos.filter(
              (certificado: Certificado) => certificado.Descargar !== ""
            ),
          };
        }
      } catch (error) {}
    }

    function descargarCertificado(ruta: string) {
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
      certificadosEmitidos,
      getDotColor,
      getIcon,
      descargarCertificado,
      contentRef,
      formatearFecha,
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
.rating-values {
  margin-left: 10px;
  min-width: 65px;
}

.v-field__input > input {
  color: #333333;
}

.mdi-menu-down.mdi.v-icon {
  color: black;
}
</style>

<template>
  <ion-page>
    <ion-content>
      <v-container fluid>
        <v-card elevation="0" color="transparent">
          <v-card-item>
            <v-card-title
              class="text-uppercase text-grey-darken-3 font-weight-bold text-center"
              style="white-space: normal"
            >
              Certificado <span class="font-weight-bold">EUC 2023</span>
            </v-card-title>
          </v-card-item>
        </v-card>
        <v-card class="my-2" elevation="0" border>
          <v-card-text>
            <v-table density="compact">
              <tbody>
                <tr>
                  <td
                    class="ma-1 pa-1 text-subtitle-1 text-grey-darken-1"
                    style="line-height: 1.2em"
                  >
                    Periodo:
                  </td>
                  <td
                    class="ma-1 pa-2 text-subtitle-1 font-weight-bold"
                    style="line-height: 1.2em"
                  >
                    {{ ejercicioInicio }} a {{ ejercicioFin }}
                  </td>
                </tr>
                <tr>
                  <td
                    class="ma-1 pa-1 text-subtitle-1 text-grey-darken-1"
                    style="line-height: 1.2em"
                  >
                    Núm. Certificado:
                  </td>
                  <td
                    class="ma-1 pa-1 text-subtitle-1 font-weight-bold text-justify"
                    style="line-height: 1.2em"
                  >
                    {{ numCertificado }}
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>

        <v-card
          border
          class="my-4 py-1"
          elevation="0"
          v-for="item in certificadosPendientes.dataset"
          :key="item.anhio_aplica"
        >
          <div class="d-flex justify-space-between px-3 my-3">
            <div
              class="d-flex align-center text-caption text-medium-emphasis me-1"
            >
              <span class="text-h6 text-grey-darken-3 font-weight-bold">
                {{ item.anhio_aplica }}
              </span>
            </div>

            <div
              class="d-flex align-center text-caption text-medium-emphasis me-1"
            >
              <span class="text-h6 text-grey-darken-1 font-weight-bold">
                TOTAL:
              </span>
              <span class="text-h6 font-weight-bold" style="color: #b80000">
                {{ item.sumatoria_puntos_totales }} puntos
              </span>
            </div>
          </div>
          <v-divider></v-divider>
          <v-row align="start" no-gutters>
            <v-col cols="4">
              <v-card
                class="ms-1 my-1 text-center"
                :color="
                  getColor(
                    item.puntos_principales,
                    item.control_puntos_principales
                  )
                "
                elevation="0"
                rounded="0"
              >
                <v-card-text
                  :style="`color:
                  ${getColorFuerte(
                    item.puntos_principales,
                    item.control_puntos_principales
                  )}; line-height: 1 !important; height: 55px;`"
                >
                  <span
                    class="text-subtitle-2 font-weight-bold"
                    style="line-height: 1 !important"
                  >
                    Puntaje principal
                  </span>
                </v-card-text>
                <v-card-item style="line-height: 1 !important; height: 50px">
                  <span class="text-h6 text-grey-darken-1"
                    >{{ item.puntos_principales }}/{{
                      item.control_puntos_principales
                    }}</span
                  >
                </v-card-item>
              </v-card>
            </v-col>
            <v-col cols="4">
              <v-card
                class="ms-1 my-1 text-center"
                :color="
                  getColor(
                    item.puntos_otros_cursos_sobrantes,
                    item.control_puntos_otros_cursos
                  )
                "
                elevation="0"
                rounded="0"
              >
                <v-card-text
                  :style="`color:
                  ${getColorFuerte(
                    item.puntos_otros_cursos_sobrantes,
                    item.control_puntos_otros_cursos
                  )}; line-height: 1 !important; height: 55px;`"
                >
                  <span
                    class="text-subtitle-2 font-weight-bold"
                    style="line-height: 1 !important"
                  >
                    Puntaje otros cursos
                  </span>
                </v-card-text>
                <v-card-item style="line-height: 1 !important; height: 50px">
                  <span class="text-h6 text-grey-darken-1"
                    >{{ item.puntos_otros_cursos_sobrantes }}/{{
                      item.control_puntos_otros_cursos
                    }}</span
                  >
                </v-card-item>
              </v-card>
            </v-col>
            <v-col cols="4">
              <v-card
                class="ms-1 me-1 my-1 text-center"
                :color="getColor(item.puntos_etica, item.control_puntos_etica)"
                elevation="0"
                rounded="0"
              >
                <v-card-text
                  :style="`color:
                  ${getColorFuerte(
                    item.puntos_etica,
                    item.control_puntos_etica
                  )}; line-height: 1 !important; height: 55px;`"
                >
                  <span
                    class="text-subtitle-2 font-weight-bold"
                    style="line-height: 1 !important"
                  >
                    Puntaje ética
                  </span>
                </v-card-text>
                <v-card-item style="line-height: 1 !important; height: 50px">
                  <span class="text-h6 text-grey-darken-1"
                    >{{ item.puntos_etica }}/{{
                      item.control_puntos_etica
                    }}</span
                  >
                </v-card-item>
              </v-card>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-card-actions class="justify-end">
            <v-btn
              :color="colores.grisOscuro"
              prepend-icon="mdi-eye-arrow-right-outline"
              text="Más información"
              variant="flat"
              :to="{
                name: 'certificadoPuntosDesglosados',
                params: {
                  idCertificado: idCertificadoDesglose,
                  anhio: item.anhio_aplica,
                },
              }"
            >
              <template v-slot:prepend>
                <v-icon class="mx-2" size="large"></v-icon>
              </template>
            </v-btn>
          </v-card-actions>
        </v-card>
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

export interface Puntos {
  dataset: Dataset[];
  totalSize: number;
  pageSize: number;
  intervaloSeccion: number;
  nombreListado: string;
}

export interface Dataset {
  revision_puntos_anual_id: number;
  id_especialidad_general: number;
  id_sector: number;
  sector_nombre: string;
  cuentas_usuarios_id: number;
  cuenta_rfc: string;
  nombre_contacto: string;
  nombre_especialidad: string;
  control_puntos_imss: number;
  control_puntos_principales: number;
  control_puntos_otros_cursos: number;
  control_puntos_etica: number;
  control_puntos_totales: number;
  puntos_principales: number;
  puntos_otros_cursos_sobrantes: number;
  puntos_etica: number;
  sumatoria_puntos_totales: number;
  puntos_imss: number;
  anhio_aplica: string;
  tiene_imss: string;
  validado_admin: string;
  status: string;
  datecreation: string;
  dateupdate: string;
}

export default defineComponent({
  name: "CertificadoPuntos",
  components: {
    IonPage,
    IonContent,
    VDataIterator,
  },
  setup() {
    const certificadoStore = useCertificadoStore();
    const route = useRoute();

    const certificadosPendientes = ref<Puntos>({
      dataset: [],
      totalSize: 0,
      pageSize: 0,
      intervaloSeccion: 0,
      nombreListado: "",
    });

    const getColor = computed(
      () => (value1: number, value2: number) =>
        value1 > value2 ? "#ECF3E4" : "#FAE6EA"
    );
    const getColorFuerte = computed(
      () => (value1: number, value2: number) =>
        value1 > value2 ? "#468C00" : "#B20000"
    );
    const idCertificadoDesglose = ref(0);

    const ejercicioInicio = ref("");
    const ejercicioFin = ref("");
    const numCertificado = ref("");

    const colores = ref({
      rojoIMPC: "#B20000",
      rojoClaro: "#FAE6EA",
      grisOscuro: "#222222",
      verdeBoton: "#468C00",
      verdeClaro: "#ECF3E4",
    });

    async function cargarPuntosPorCertificado(
      idCertificado: any,
      anhioInicio: any,
      anhioFin: any,
      numCertificadox: any
    ) {
      certificadosPendientes.value = {
        dataset: [],
        totalSize: 0,
        pageSize: 0,
        intervaloSeccion: 0,
        nombreListado: "",
      };

      try {
        await certificadoStore.cargarPuntosPorCertificado(
          idCertificado,
          anhioInicio,
          anhioFin
        );
        certificadosPendientes.value = certificadoStore.object
          .puntosPorCertificado as Puntos;

        idCertificadoDesglose.value = idCertificado;

        ejercicioInicio.value = anhioInicio;
        ejercicioFin.value = anhioFin;
        numCertificado.value = numCertificadox;
      } catch (error) {}
    }

    onIonViewDidEnter(() => {
      const idCertificado = route.params.idCertificado;
      const anhioInicio = route.params.anhioInicio;
      const anhioFin = route.params.anhioFin;
      const numCertificado = route.params.numCertificado;

      cargarPuntosPorCertificado(
        idCertificado,
        anhioInicio,
        anhioFin,
        numCertificado
      );
    });

    return {
      colores,
      certificadosPendientes,
      getColor,
      getColorFuerte,
      idCertificadoDesglose,
      ejercicioInicio,
      ejercicioFin,
      numCertificado,
    };
  },
});
</script>

<style scoped lang="scss"></style>

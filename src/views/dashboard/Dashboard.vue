<template>
  <ion-page>
    <ion-content ref="contentRef">
      <v-container>
        <v-tabs
          v-model="tabs"
          density="compact"
          grow
          style="border-bottom: 5px solid #b20000"
        >
          <v-tab
            :color="colores.rojoIMPC"
            :value="1"
            class="mr-1 text-none tab-dashboard"
            rounded="t-lg"
            size="small"
            text="Periodo anual"
            variant="flat"
          />
          <v-tab
            :color="colores.rojoIMPC"
            :value="2"
            class="text-none tab-dashboard"
            rounded="t-lg"
            size="small"
            text="Periodo 4 años"
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
                    {{ title }} <br />
                    anual
                  </v-card-title>
                  <v-card-subtitle class="text-capitalize text-center">
                    {{ subtitlePeriodoAnual }}
                  </v-card-subtitle>
                </v-card-item>
              </v-card>

              <v-card v-if="dataLoaded" class="mx-auto my-2" elevation="0">
                <v-card-text>
                  <BarChart v-bind="barChartPropsAnual" />
                </v-card-text>
              </v-card>
              <template v-else>
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
                    No se encontraron datos a mostrar.
                  </v-card-text>
                </v-card>
              </template>

              <v-card v-if="dataLoaded" class="mx-auto my-4" elevation="0">
                <v-list
                  bg-color="transparent"
                  class="d-flex flex-column justify-end"
                  density="compact"
                >
                  <v-list-item
                    v-for="(item, i) in cursos"
                    :title="'Puntaje ' + item.label"
                    :key="i"
                  >
                    <v-progress-linear
                      :model-value="(item.data[1] * 100) / item.data[0]"
                      :color="item.backgroundColor"
                      height="15"
                    />
                    <template v-slot:append>
                      <div class="rating-values text-end">
                        <span>{{ item.data[1] }}/{{ item.data[0] }}</span>
                      </div>
                    </template>
                  </v-list-item>
                </v-list>
                <v-divider />
                <v-card-actions>
                  <v-btn
                    :color="colores.grisOscuro"
                    :to="{ name: 'desglosePuntos', params: { id: anioActual } }"
                    block
                    prepend-icon="mdi-eye-arrow-right-outline"
                    size="large"
                    text="Desglose de puntos"
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
            <v-card color="transparent" elevation="0" rounded="b-lg">
              <v-card class="mx-auto" color="transparent" elevation="0">
                <v-card-item>
                  <v-card-title
                    class="text-uppercase text-grey-darken-3 font-weight-bold text-center"
                    style="white-space: normal"
                  >
                    {{ title }} <br />
                    por 4 años
                  </v-card-title>
                  <v-card-subtitle class="text-capitalize text-center">
                    {{ subtitlePeriodo4 }}
                  </v-card-subtitle>
                </v-card-item>
              </v-card>

              <v-card v-if="dataLoaded" class="mx-auto my-2" elevation="0">
                <v-card-text>
                  <BarChart v-bind="barChartPropsPor4" />
                </v-card-text>
              </v-card>
              <template v-else>
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
                    No se encontraron datos a mostrar.
                  </v-card-text>
                </v-card>
              </template>

              <v-card
                v-for="(itm, h) in listadoEjercicios"
                :key="h"
                class="mx-auto my-4"
                elevation="0"
              >
                <v-card-title
                  class="text-none text-center"
                  style="white-space: normal"
                >
                  {{ itm.label }} {{ itm.year }}
                </v-card-title>
                <v-divider></v-divider>
                <v-list
                  bg-color="transparent"
                  class="d-flex flex-column justify-end"
                  density="compact"
                >
                  <v-list-item
                    v-for="(item, i) in cursosPor4"
                    :key="i"
                    :title="'Puntaje ' + item.label"
                  >
                    <v-progress-linear
                      :color="item.backgroundColor"
                      :model-value="
                        (item.data[h * 2 + 1] * 100) / item.data[h * 2]
                      "
                      height="15"
                    />
                    <template v-slot:append>
                      <div class="rating-values text-end">
                        <span
                          >{{ item.data[h * 2 + 1] }} /
                          {{ item.data[h * 2] }}</span
                        >
                      </div>
                    </template>
                  </v-list-item>
                </v-list>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-btn
                    :color="colores.grisOscuro"
                    :to="{ name: 'desglosePuntos', params: { id: itm.year } }"
                    block
                    prepend-icon="mdi-eye-arrow-right-outline"
                    text="Desglose de puntos"
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
import { BarChart, useBarChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import { IonPage, IonContent, onIonViewDidEnter } from "@ionic/vue";
import { Storage } from "@ionic/storage";
import { useDashboardStore } from "@/store/dashboard";

Chart.register(...registerables);

export default defineComponent({
  name: "Dashboard",
  components: {
    BarChart,
    IonContent,
    IonPage,
  },
  setup() {
    const dashStore = useDashboardStore();

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
    });

    const title = ref("Estatus de capacitación");
    const subtitlePeriodoAnual = ref("");
    const subtitlePeriodo4 = ref("");
    const tabs = ref(1);
    const anioActual = ref("");

    const dataLoaded = ref(false);
    const loading = ref(false);

    const listadoEjercicios = ref<
      Array<{
        label: string;
        year: number;
      }>
    >([]);

    const cursos = ref<
      Array<{
        label: string;
        data: number[];
        backgroundColor: string;
      }>
    >([]);

    const cursosPor4 = ref<
      Array<{
        label: string;
        data: number[];
        backgroundColor: string;
      }>
    >([]);

    const labels4 = ref<string[]>([]);

    const chartData = ref({
      labels: ["Esperado", "Obtenido"],
      datasets: cursos,
    });

    const chartPor4 = ref({
      labels: labels4,
      datasets: cursosPor4,
    });

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

    const { barChartProps: barChartPropsAnual } = useBarChart({
      chartData,
      options,
    });

    const { barChartProps: barChartPropsPor4 } = useBarChart({
      chartData: chartPor4,
      options,
    });

    async function cargarDashboard() {
      cursos.value = [];
      cursosPor4.value = [];
      labels4.value = [];
      listadoEjercicios.value = [];
      dataLoaded.value = false;
      loading.value = true;
      tabs.value = 1;

      const storage = new Storage();
      storage.create();

      const rfc = await storage.get("rfc");

      try {
        await dashStore.loadEjercicios();

        const ejercicios: any[] = Array.isArray(
          dashStore.object.ejercicios.dataset
        )
          ? dashStore.object.ejercicios.dataset
          : [];

        if (Array.isArray(ejercicios) && ejercicios.length > 0) {
          ejercicios.sort(
            (a, b) => parseInt(b.anhio_aplica) - parseInt(a.anhio_aplica)
          );

          const ejercicioActual = ejercicios[0];
          subtitlePeriodoAnual.value =
            dashStore.object.ejercicios.titulo_periodo_anual;
          subtitlePeriodo4.value =
            dashStore.object.ejercicios.titulo_periodo_4_anios;

          anioActual.value = ejercicioActual.anhio_aplica;

          cursos.value.push({
            label: "Principal",
            data:
              ejercicioActual.puntos_principales >
              ejercicioActual.control_puntos_principales
                ? [
                    ejercicioActual.control_puntos_principales,
                    ejercicioActual.control_puntos_principales,
                  ]
                : [
                    ejercicioActual.control_puntos_principales,
                    ejercicioActual.puntos_principales,
                  ],
            backgroundColor: "rgba(178, 0, 0, 0.6)",
          });

          cursos.value.push({
            label: "Otros cursos",
            data:
              ejercicioActual.puntos_otros_cursos >
              ejercicioActual.control_puntos_otros_cursos
                ? [
                    ejercicioActual.control_puntos_otros_cursos,
                    ejercicioActual.control_puntos_otros_cursos,
                  ]
                : [
                    ejercicioActual.control_puntos_otros_cursos,
                    ejercicioActual.puntos_otros_cursos,
                  ],
            backgroundColor: "rgba(89, 89, 89, 0.6)",
          });

          cursos.value.push({
            label: "Ética",
            data:
              ejercicioActual.puntos_etica >
              ejercicioActual.control_puntos_etica
                ? [
                    ejercicioActual.control_puntos_etica,
                    ejercicioActual.control_puntos_etica,
                  ]
                : [
                    ejercicioActual.control_puntos_etica,
                    ejercicioActual.puntos_etica,
                  ],
            backgroundColor: "rgba(166, 166, 166, 0.6)",
          });

          const ejercicio4 = ejercicios.slice(1);

          if (Array.isArray(ejercicio4) && ejercicio4.length > 0) {
            const principalesData: number[] = [];
            const OtrosCursosData: number[] = [];
            const eticaData: number[] = [];

            ejercicio4.forEach((ejercicio) => {
              labels4.value.push("Esperado " + ejercicio.anhio_aplica);
              labels4.value.push("Obtenido " + ejercicio.anhio_aplica);

              if (
                ejercicio.puntos_principales >
                ejercicio.control_puntos_principales
              ) {
                principalesData.push(
                  ejercicio.control_puntos_principales,
                  ejercicio.control_puntos_principales
                );
              } else {
                principalesData.push(
                  ejercicio.control_puntos_principales,
                  ejercicio.puntos_principales
                );
              }

              if (
                ejercicio.puntos_otros_cursos >
                ejercicio.control_puntos_otros_cursos
              ) {
                OtrosCursosData.push(
                  ejercicio.control_puntos_otros_cursos,
                  ejercicio.control_puntos_principales
                );
              } else {
                OtrosCursosData.push(
                  ejercicio.control_puntos_otros_cursos,
                  ejercicio.puntos_otros_cursos
                );
              }

              if (ejercicio.puntos_etica > ejercicio.control_puntos_etica) {
                eticaData.push(
                  ejercicio.control_puntos_etica,
                  ejercicio.control_puntos_etica
                );
              } else {
                eticaData.push(
                  ejercicio.control_puntos_etica,
                  ejercicio.puntos_etica
                );
              }

              listadoEjercicios.value.push({
                label: ejercicio.sector_nombre,
                year: parseInt(ejercicio.anhio_aplica),
              });
            });

            cursosPor4.value.push({
              label: "Principal",
              data: principalesData,
              backgroundColor: "rgba(178, 0, 0, 0.6)",
            });

            cursosPor4.value.push({
              label: "Otros cursos",
              data: OtrosCursosData,
              backgroundColor: "rgba(89, 89, 89, 0.6)",
            });

            cursosPor4.value.push({
              label: "Ética",
              data: eticaData,
              backgroundColor: "rgba(166, 166, 166, 0.6)",
            });
          }

          dataLoaded.value = true;
        }
      } catch (error) {}
      loading.value = false;
    }

    onIonViewDidEnter(() => {
      if (contentRef.value !== null) {
        contentRef.value.scrollTop = 0;
      }

      scrollToTop();
      cargarDashboard();
    });

    return {
      anioActual,
      barChartPropsAnual,
      dataLoaded,
      barChartPropsPor4,
      colores,
      cursos,
      cursosPor4,
      options,
      subtitlePeriodoAnual,
      subtitlePeriodo4,
      tabs,
      title,
      listadoEjercicios,
      contentRef,
      loading,
    };
  },
});
</script>

<style>
.tab-dashboard .v-btn__content {
  color: #424242 !important;
}
.tab-dashboard.v-slide-group-item--active .v-btn__content {
  color: white !important;
}
</style>

<style scoped lang="scss">
.rating-values {
  margin-left: 10px;
  min-width: 65px;
}
</style>

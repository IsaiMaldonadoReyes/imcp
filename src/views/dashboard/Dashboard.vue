<template>
  <ion-page>
    <ion-content>
      <v-container>
        <v-tabs v-model="tabs" bg-color="transparent" color="red" density="compact" grow
          style="border-bottom: 5px solid #b20000">
          <v-tab :color="colores.rojoIMPC" :slider-color="colores.rojoIMPC" :value="1" class="mr-1 text-none"
            rounded="t-lg" size="small" text="Periodo anual" variant="flat" />
          <v-tab :color="colores.rojoIMPC" :slider-color="colores.rojoIMPC" :value="2" class="text-none" rounded="t-lg"
            size="small" text="Periodo 4 años" variant="flat" />
        </v-tabs>
        <v-window v-model="tabs">
          <v-window-item :value="1">
            <v-card color="transparent" elevation="0" rounded="b-lg">
              <v-card class="mx-auto" color="transparent" elevation="0">
                <v-card-item>
                  <v-card-title class="text-uppercase text-center" style="white-space: normal">
                    {{ title }} <br> anual
                  </v-card-title>
                  <v-card-subtitle class="text-capitalize text-center">
                    {{ subtitle }}
                  </v-card-subtitle>
                </v-card-item>
              </v-card>

              <v-card v-if="dataLoaded" class="mx-auto my-2" elevation="0" rounded="lg">
                <v-card-text>
                  <BarChart v-bind="barChartPropsAnual" />
                </v-card-text>
              </v-card>

              <v-card v-if="dataLoaded" class="mx-auto my-4" elevation="0" rounded="lg">
                <v-list bg-color="transparent" class="d-flex flex-column justify-end" density="compact">
                  <v-list-item title="Puntaje principal">
                    <v-progress-linear :model-value="80" class="mx-n5" color="rgba(178, 0, 0, 0.6)" height="15" />
                    <template v-slot:append>
                      <div class="rating-values">
                        <span>18/20</span>
                      </div>
                    </template>
                  </v-list-item>

                  <v-list-item title="Puntaje otros cursos">
                    <v-progress-linear :model-value="70" class="mx-n5" color="rgba(89, 89, 89, 0.6)" height="15" />
                    <template v-slot:append>
                      <div class="rating-values">
                        <span>20/25</span>
                      </div>
                    </template>
                  </v-list-item>

                  <v-list-item title="Puntaje ética">
                    <v-progress-linear :model-value="40" class="mx-n5" color="rgba(166, 166, 166, 0.6)" height="15" />
                    <template v-slot:append>
                      <div class="rating-values">
                        <span>2/5</span>
                      </div>
                    </template>
                  </v-list-item>
                </v-list>
                <v-divider />
                <v-card-actions>
                  <v-btn :color="colores.grisOscuro" block class="text-none" text="Desglose de puntos" variant="flat"
                    :to="{ path: 'desglosePuntos' }" />
                </v-card-actions>
              </v-card>
            </v-card>
          </v-window-item>
          <v-window-item :value="2">
            <v-card color="transparent" elevation="0" rounded="b-lg">
              <v-card class="mx-auto" color="transparent" elevation="0">
                <v-card-item>
                  <v-card-title class="text-uppercase text-center" style="white-space: normal">
                    {{ title }} <br> por 4 años
                  </v-card-title>
                  <v-card-subtitle class="text-capitalize text-center">
                    {{ subtitle }}
                  </v-card-subtitle>
                </v-card-item>
              </v-card>

              <v-card class="mx-auto my-2" elevation="0" rounded="lg">
                <v-card-text>
                  <BarChart v-bind="barChartPropsPor4" />
                </v-card-text>
              </v-card>

              <v-card v-for="(year, h) in [2022, 2021, 2020, 2019]" :key="year" class="mx-auto my-4" elevation="0"
                rounded="lg">
                <v-card-title class="text-none text-center" style="white-space: normal">
                  {{ year }}
                </v-card-title>
                <v-divider></v-divider>
                <v-list bg-color="transparent" class="d-flex flex-column justify-end" density="compact">
                  <v-list-item v-for="(item, i) in cursosPor4" :key="i" :title="'Puntaje ' + item.label">
                    <v-progress-linear :color="item.backgroundColor"
                      :model-value="(item.data[h * 2 + 1] * 100) / item.data[h * 2]" class="mx-n5" height="15" />
                    <template v-slot:append>
                      <div class="rating-values">
                        <span>{{ item.data[h * 2 + 1] }} / {{ item.data[h * 2] }}</span>
                      </div>
                    </template>
                  </v-list-item>
                </v-list>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-btn block :color="colores.grisOscuro" class="text-none" text="Desglose de puntos" variant="flat" />
                </v-card-actions>
              </v-card>
            </v-card>
          </v-window-item>
        </v-window>
      </v-container>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { ref, computed, defineComponent, onMounted } from "vue";
import { BarChart, useBarChart } from "vue-chart-3";
import { Chart, registerables, ScriptableContext } from "chart.js";
import { IonPage, IonContent } from "@ionic/vue";
import { Storage } from "@ionic/storage";
import { useDashboardStore } from "@/store/dashboard";

Chart.register(...registerables);

export default defineComponent({
  name: "dashboard",
  components: {
    BarChart,
    IonContent,
    IonPage,
  },
  setup() {

    const dashStore = useDashboardStore();


    const colores = ref({
      rojoIMPC: "#B20000",
      rojoClaro: "#FAE6EA",
      grisOscuro: "#222222",
    });
    const data = [20, 18];
    const data2 = [25, 20];
    const data3 = [5, 2];

    const dataC1Por4 = [20, 18, 30, 26, 30, 20, 30, 20];
    const dataC2Por4 = [25, 20, 25, 23, 30, 15, 35, 30];
    const dataC3Por4 = [5, 2, 10, 9, 15, 8, 20, 14];
    const title = ref("Estatus de capacitación");
    const subtitle = ref("Sector Gubernamental");
    const tabs = ref(null);

    const dataLoaded = ref(false);

    const cursos = ref<Array<
      | {
        label: string,
        data: number[],
        backgroundColor: string
      }
    >
    >([]);

    const cursosPor4 = [
      {
        label: "Principales",
        data: dataC1Por4,
        backgroundColor: "rgba(178, 0, 0, 0.6)",
      },
      {
        label: "Otros cursos",
        data: dataC2Por4,
        backgroundColor: "rgba(89, 89, 89, 0.6)",
      },
      {
        label: "Ética",
        data: dataC3Por4,
        backgroundColor: "rgba(166, 166, 166, 0.6)",
      },
    ];


    const chartData = ref({
      labels: ["Esperado", "Obtenido"],
      datasets: cursos,
    });

    const chartPor4 = computed(() => ({
      labels: [
        "Esperado 2022",
        "Obtenido 2022",
        "Esperado 2021",
        "Obtenido 2021",
        "Esperado 2020",
        "Obtenido 2020",
        "Esperado 2019",
        "Obtenido 2019",
      ],
      datasets: cursosPor4,
    }));

    const options = ref({
      indexAxis: "x",
      plugins: {
        title: {
          display: true,
          text: "Porcentaje de alcance Norma DCP",
        },
      },
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
      chartData: chartPor4, // Cambié la variable a chartPor4
      options,
    });

    async function cargarEjercicios() {
      const storage = new Storage();
      storage.create();

      const rfc = await storage.get("rfc");
      const token = await storage.get("token");

      console.log(token);

      try {

        await dashStore.loadEjercicios(rfc);
        const ejercicios: any[] = Array.isArray(dashStore.object) ? dashStore.object : [];

        ejercicios.sort((a, b) => parseInt(b.anhio_aplica) - parseInt(a.anhio_aplica));

        if (Array.isArray(ejercicios) && ejercicios.length > 0) {
          const ejercicioActual = ejercicios[0];

          cursos.value.push({
            label: "Principales",
            data: [ejercicioActual.control_puntos_principales, ejercicioActual.puntos_principales],
            backgroundColor: "rgba(178, 0, 0, 0.6)"
          });

          cursos.value.push({
            label: "Otros cursos",
            data: [ejercicioActual.control_puntos_otros_cursos, ejercicioActual.puntos_otros_cursos],
            backgroundColor: "rgba(89, 89, 89, 0.6)"
          });

          cursos.value.push({
            label: "Ética",
            data: [ejercicioActual.control_puntos_etica, ejercicioActual.puntos_etica],
            backgroundColor: "rgba(166, 166, 166, 0.6)"
          });
          dataLoaded.value = true;
        }

      } catch (error) {

      }

    }

    onMounted(() => {
      cargarEjercicios();
    });

    return {
      barChartPropsAnual,
      dataLoaded,
      barChartPropsPor4,
      colores,
      cursosPor4,
      options,
      subtitle,
      tabs,
      title,
    };
  },
});
</script>

<style scoped lang="scss">
.blue-tab {
  background-color: white !important;
  /* Cambia 'blue' por el color que desees */
}
</style>

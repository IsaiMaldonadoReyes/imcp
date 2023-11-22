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
            text="Periodo anual"
            variant="flat"
          />
          <v-tab
            :color="colores.rojoIMPC"
            :slider-color="colores.rojoIMPC"
            :value="2"
            class="text-none"
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
                    class="text-uppercase text-center"
                    style="white-space: normal"
                  >
                    {{ title }} anual
                  </v-card-title>
                  <v-card-subtitle class="text-capitalize text-center">
                    {{ subtitle }}
                  </v-card-subtitle>
                </v-card-item>
              </v-card>

              <v-card class="mx-auto my-2" elevation="0" rounded="lg">
                <v-card-text>
                  <BarChart v-bind="barChartPropsAnual" />
                </v-card-text>
              </v-card>

              <v-card class="mx-auto my-4" elevation="0" rounded="lg">
                <v-list
                  bg-color="transparent"
                  class="d-flex flex-column justify-end"
                  density="compact"
                >
                  <v-list-item title="Puntaje principal">
                    <v-progress-linear
                      :model-value="80"
                      class="mx-n5"
                      color="rgba(178, 0, 0, 0.6)"
                      height="15"
                    />
                    <template v-slot:append>
                      <div class="rating-values">
                        <span>18/20</span>
                      </div>
                    </template>
                  </v-list-item>

                  <v-list-item title="Puntaje otros cursos">
                    <v-progress-linear
                      :model-value="70"
                      class="mx-n5"
                      color="rgba(178, 0, 0, 0.6)"
                      height="15"
                    />
                    <template v-slot:append>
                      <div class="rating-values">
                        <span>20/25</span>
                      </div>
                    </template>
                  </v-list-item>

                  <v-list-item title="Puntaje ética">
                    <v-progress-linear
                      :model-value="30"
                      class="mx-n5"
                      color="rgba(178, 0, 0, 0.6)"
                      height="15"
                    />
                    <template v-slot:append>
                      <div class="rating-values">
                        <span>2/5</span>
                      </div>
                    </template>
                  </v-list-item>
                </v-list>
              </v-card>

              <v-card class="mx-auto my-4" color="transparent" elevation="0" rounded="lg">
                <v-btn
                  :color="colores.rojoIMPC"
                  block
                  class="text-none mb-4"
                  rounded="lg"
                  size="large"
                  text="Histórico de capacitaciones"
                  variant="flat"
                />
                <v-btn
                  :color="colores.grisOscuro"
                  block
                  class="text-none"
                  rounded="lg"
                  size="large"
                  text="Desglose de puntos"
                  variant="flat"
                />
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
                    {{ title }} por 4 años
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

              <v-card
                v-for="(year, h) in [2022, 2021, 2020, 2019]"
                :key="year"
                class="mx-auto my-4"
                elevation="0"
                rounded="lg"
              >
                <v-card-title class="text-none text-center" style="white-space: normal">
                  {{ year }}
                </v-card-title>
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
                      :model-value="(item.data[h * 2 + 1] * 100) / item.data[h * 2]"
                      class="mx-n5"
                      height="15"
                    />
                    <template v-slot:append>
                      <div class="rating-values">
                        <span>{{ item.data[h * 2 + 1] }} / {{ item.data[h * 2] }}</span>
                      </div>
                    </template>
                  </v-list-item>
                </v-list>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-row>
                    <v-col cols="6">
                      <v-btn
                      grow
                        :color="colores.rojoIMPC"
                        class="text-none mb-4"
                        size="small"
                        text="Histórico"
                        variant="flat"
                      />
                    </v-col>
                    <v-col cols="6">
                      <v-btn
                        :color="colores.grisOscuro"
                        class="text-none"
                        rounded="lg"
                        size="small"
                        text="Desglose de puntos"
                        variant="flat"
                      />
                    </v-col>
                  </v-row>
                </v-card-actions>
              </v-card>

              <v-card class="mx-auto my-4" color="transparent" elevation="0" rounded="lg">
                <v-btn
                  :color="colores.rojoIMPC"
                  block
                  class="text-none mb-4"
                  rounded="lg"
                  size="large"
                  text="Histórico de capacitaciones"
                  variant="flat"
                />
                <v-btn
                  :color="colores.grisOscuro"
                  block
                  class="text-none"
                  rounded="lg"
                  size="large"
                  text="Desglose de puntos"
                  variant="flat"
                />
              </v-card>
            </v-card>
          </v-window-item>
        </v-window>
      </v-container>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { ref, computed, defineComponent } from "vue";
import { BarChart, useBarChart } from "vue-chart-3";
import { Chart, registerables, ScriptableContext } from "chart.js";
import { IonPage, IonContent } from "@ionic/vue";

Chart.register(...registerables);

export default defineComponent({
  name: "App",
  components: {
    BarChart,
    IonContent,
    IonPage,
  },
  setup() {
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

    const cursos = [
      {
        label: "Principales",
        data: data,
        backgroundColor: "rgba(178, 0, 0, 0.6)",
      },
      {
        label: "Otros cursos",
        data: data2,
        backgroundColor: "rgba(89, 89, 89, 0.6)",
      },
      {
        label: "Ética",
        data: data3,
        backgroundColor: "rgba(166, 166, 166, 0.6)",
      },
    ];

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

    const chartData = computed(() => ({
      labels: ["Esperado", "Obtenido"],
      datasets: cursos,
    }));

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

    let delayed = ref(false);

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

    return {
      barChartPropsAnual,
      barChartPropsPor4,
      options,
      title,
      subtitle,
      tabs,
      colores,
      cursosPor4,
    };
  },
});
</script>

<style scoped lang="scss">
.blue-tab {
  background-color: white !important; /* Cambia 'blue' por el color que desees */
}
</style>

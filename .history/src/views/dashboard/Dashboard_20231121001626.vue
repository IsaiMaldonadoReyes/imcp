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
                  <BarChart :ref="barChartRef" v-bind="barChartProps" />
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
                      rounded
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
                      rounded
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
                      rounded
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
                  <BarChart :ref="barChartRef" v-bind="barChartProps" />
                </v-card-text>
              </v-card>

              <v-card class="mx-auto my-4" elevation="0" rounded="lg">
                <v-card-title class="text-none text-center" style="white-space: normal">
                  2022
                </v-card-title>
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
                      rounded
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
                      rounded
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
                      rounded
                    />
                    <template v-slot:append>
                      <div class="rating-values">
                        <span>2/5</span>
                      </div>
                    </template>
                  </v-list-item>
                </v-list>
              </v-card>

              <v-card class="mx-auto my-4" elevation="0" rounded="lg">
                <v-card-title class="text-none text-center" style="white-space: normal">
                  2021
                </v-card-title>
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
                      rounded
                    />
                    <template v-slot:append>
                      <div class="rating-values d-flex align-self-end">
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
                      rounded
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
                      rounded
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
    const data = [30, 40, 20, 5, 15, 25, 30, 40, 50];
    const data2 = [10, 20, 10, 50, 20, 13, 45, 30];
    const data3 = [50, 30, 30, 40, 26, 29, 18, 10];
    const barChartRef = ref();
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

    const chartData = computed(() => ({
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
      datasets: [
        cursos
      ],
    }));

    const chart4Ejercicios = computed(() => ({
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
      datasets: [
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
      ],
    }));

    let delayed = ref(false);

    const options = ref({
      indexAxis: "y",
      plugins: {
        title: {
          display: true,
          text: "Porcentaje de alcance Norma DCP",
        },
      },
      responsive: true,
      animation: {
        onComplete: () => {
          delayed.value = true;
          console.log("Animación completa");
        },
        delay: (context: ScriptableContext<"bar">) => {
          let delay = ref(0);
          if (context.type === "data" && context.mode === "default" && !delayed.value) {
            delay.value = context.dataIndex * 300 + context.datasetIndex * 100;
          }
          return delay.value;
        },
        easing: "easeInOutSine",
      },
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    });

    const { barChartProps } = useBarChart({
      chartData,
      options,
    });

    return { barChartProps, barChartRef, options, title, subtitle, tabs, colores };
  },
});
</script>

<style scoped lang="scss">
.blue-tab {
  background-color: white !important; /* Cambia 'blue' por el color que desees */
}
</style>

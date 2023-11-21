<template>
  <ion-page>
    <ion-content>
      <v-container>
        <v-card class="mx-auto" elevation="0" color="transparent">
          <v-card-item>
            <v-card-title class="text-uppercase text-center" style="white-space: normal">
              {{ title }}
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
              ></v-progress-linear>
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
              ></v-progress-linear>
              <template v-slot:append>
                <div class="rating-values">
                  <span>20/25</span>
                </div>
              </template>
            </v-list-item>
            <v-list-item title="Puntaje otros cursos">
              <v-progress-linear
                :model-value="30"
                class="mx-n5"
                color="rgba(178, 0, 0, 0.6)"
                height="15"
                rounded
              ></v-progress-linear>
              <template v-slot:append>
                <div class="rating-values">
                  <span>2/5</span>
                </div>
              </template>
            </v-list-item>
          </v-list>
        </v-card>

        <v-card class="mx-auto my-4" elevation="0" rounded="lg" color="transparent">
          <v-btn
            block
            class="text-none mb-4"
            color="#C60A2F"
            size="large"
            variant="flat"
            rounded="lg"
          >
            Histórico de capacitaciones
          </v-btn>

          <v-btn
            block
            class="text-none"
            color="#222222"
            rounded="lg"
            size="large"
            variant="flat"
          >
            Desglose de puntos
          </v-btn>
        </v-card>

        <v-tabs
          v-model="tabs"
          bg-color="transparent"
          color="red"
          density="compact"
          grow
          slider-color="#C60A2F"
          style="border-bottom: 5px solid #c60a2f"
        >
          <v-tab
            :value="1"
            class="mr-1 text-none"
            color="#C60A2F"
            rounded="t-lg"
            size="small"
            slider-color="#C60A2F"
            variant="flat"
          >
            Periodo anual
          </v-tab>

          <v-tab
            :value="2"
            class="text-none"
            color="#C60A2F"
            rounded="t-lg"
            size="small"
            slider-color="#C60A2F"
            variant="flat"
          >
            Periodo 4 años
          </v-tab>
        </v-tabs>
        <v-window v-model="tabs">
          <v-window-item :value="1">
            <v-card rounded="b-lg" elevation="0">
              <v-card-text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat.
              </v-card-text>
            </v-card>
          </v-window-item>
          <v-window-item :value="2">
            <v-card rounded="b-lg" elevation="0">
              <v-card-text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat.
              </v-card-text>
            </v-card>
          </v-window-item>
        </v-window>
      </v-container>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { BarChart, useBarChart } from "vue-chart-3";
import { Chart, registerables, ScriptableContext } from "chart.js";
import { IonPage, IonContent } from "@ionic/vue";

Chart.register(...registerables);

export default defineComponent({
  name: "App",
  components: {
    BarChart,
    IonPage,
    IonContent,
  },
  setup() {
    const data = [30, 40];
    const data2 = [10, 20];
    const data3 = [50, 30];
    const barChartRef = ref();
    const title = ref("Estatus de capacitación anual");
    const subtitle = ref("Sector Gubernamental");
    const tabs = ref(null);

    const chartData = computed(() => ({
      labels: ["Esperado", "Obtenido"],
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

    return { barChartProps, barChartRef, options, title, subtitle, tabs };
  },
});
</script>

<style scoped lang="scss">
.blue-tab {
  background-color: white !important; /* Cambia 'blue' por el color que desees */
}
</style>

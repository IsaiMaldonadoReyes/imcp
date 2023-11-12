<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <v-container class="px-5 pt-10 px-md-16 py-md-10 px-lg-16 py-lg-10">
        <v-card class="mx-auto my-8" max-width="344">
          <v-card-item>
            <v-card-title class="text-uppercase text-no-wrap">{{ title }}</v-card-title>
            <v-card-subtitle class="text-capitalize">{{ subtitle }}</v-card-subtitle>
          </v-card-item>

          <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </v-card-text>
          <BarChart :ref="barChartRef" v-bind="barChartProps" />
        </v-card>
      </v-container>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { BarChart, useBarChart } from "vue-chart-3";
import { Chart, registerables, ScriptableContext } from "chart.js";

Chart.register(...registerables);

export default defineComponent({
  name: "App",
  components: {
    BarChart,
  },
  setup() {
    const data = [30, 40];
    const data2 = [10, 20];
    const data3 = [50, 30];
    const barChartRef = ref();
    const title = ref("Estatus de capacitación anual");
    const subtitle = ref("Sector Gubernamental");

    const chartData = computed(() => ({
      labels: ["Esperado", "Obtenido"],
      datasets: [
        {
          label: "Principales",
          data: data,
          borderColor: "cyan",
          backgroundColor: "rgba(255, 0, 0, 0.5)",
        },
        {
          label: "Otros cursos",
          data: data2,
          borderColor: "cyan",
          backgroundColor: "rgba(0, 0, 128, 0.5)",
        },
        {
          label: "Ética",
          data: data3,
          borderColor: "cyan",
          backgroundColor: "rgba(0, 128, 0, 0.5)",
        },
      ],
    }));
    let delayed = ref(false);

    const options = ref({
      plugins: {
        title: {
          display: true,
          text: "Puntos",
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

    return { barChartProps, barChartRef, options, title, subtitle };
  },
});
</script>

<style lang="scss">
/* Definir variables personalizadas */
:root {
  --card-title-word-wrap: break-word; /* Puedes definir tus propias variables y valores aquí */
}
</style>

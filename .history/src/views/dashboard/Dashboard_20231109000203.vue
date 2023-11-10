<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <BarChart v-bind="barChartProps" :options="options" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { BarChart, useBarChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

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
    let delayed = true;

    const config = {
      type: "bar",
      options: {
        plugins: {
          title: {
            display: true,
            text: "Puntos",
          },
        },
        responsive: true,
        animation: {
          onComplete: () => {
            delayed = true;
          },
          delay: (context) => {
            let delay = 0;
            if (context.type === "data" && context.mode === "default" && !delayed) {
              delay = context.dataIndex * 300 + context.datasetIndex * 100;
            }
            return delay;
          },
        },
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      },
    };

    const { barChartProps, barChartRef } = useBarChart({
      chartData,
    });

    function shuffleData() {
      data.value = shuffle(data.value);
    }

    return { shuffleData, barChartProps, barChartRef, options };
  },
});
</script>

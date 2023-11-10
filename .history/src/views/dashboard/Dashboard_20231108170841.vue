<template>
  <ion-page>
    <ion-content :fullscreen="true">
     
      <BarChart v-bind="barChartProps" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { DoughnutChart, BarChart, useBarChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default defineComponent({
  name: "App",
  components: {
    BarChart,
  },
  setup() {
    const data = ref([30, 40, 60, 70, 5]);

    const chartData = {
      labels: ["Paris", "Nîmes", "Toulon", "Perpignan", "Autre"],
      datasets: [
        {
          label: "Dataset 1",
          data: 30,
          backgroundColor: "red",
        },
        {
          label: "Dataset 2",
          data: 40,
          backgroundColor: "blue",
        },
        {
          label: "Dataset 3",
          data: 10,
          backgroundColor: "green",
        },
      ],
    };

    const { barChartProps, barChartRef } = useBarChart({
      data: chartData,
      options: {
        plugins: {
          title: {
            display: true,
            text: "Chart.js Bar Chart - Stacked",
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
      },
    });


    return { shuffleData, barChartProps, barChartRef };
  },
});
</script>

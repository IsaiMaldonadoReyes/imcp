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
    const data = ref([30, 40, 60, 70, 5]);

    const chartData = computed(() => ({
      labels: ["Paris", "Nîmes", "Toulon", "Perpignan", "Autre"],
      datasets: [
        {
          label: "Dataset 1",
          data: data,
          backgroundColor: "red",
        },
        {
          label: "Dataset 2",
          data: data,
          backgroundColor: "blue",
        },
        {
          label: "Dataset 3",
          data: data,
          backgroundColor: "green",
        },
      ],
    }));

    const options = {
      plugins: {
        title: {
          display: true,
          text: "Puntos",
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

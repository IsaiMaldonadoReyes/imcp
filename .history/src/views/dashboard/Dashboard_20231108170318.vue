<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <button @click="shuffleData">Shuffle</button>
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

    const chartData = computed(() => ({
      labels: ["Paris", "Nîmes", "Toulon", "Perpignan", "Autre"],
      datasets: [
        {
          label: "Dataset 1",
          data: Utils.numbers(NUMBER_CFG),
          backgroundColor: Utils.CHART_COLORS.red,
        },
        {
          label: "Dataset 2",
          data: Utils.numbers(NUMBER_CFG),
          backgroundColor: Utils.CHART_COLORS.blue,
        },
        {
          label: "Dataset 3",
          data: Utils.numbers(NUMBER_CFG),
          backgroundColor: Utils.CHART_COLORS.green,
        },
      ],
    }));

    const { barChartProps, barChartRef } = useBarChart({
      chartData,
      type: "bar",
      data: data,
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

    function shuffleData() {
      data.value = shuffle(data.value);
    }

    return { shuffleData, barChartProps, barChartRef };
  },
});
</script>

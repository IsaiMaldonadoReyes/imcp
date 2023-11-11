<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <BarChart v-bind="barChartProps" />
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
    const chartData = computed(() => ({
      labels: ["Paris", "Nîmes", "Toulon", "Perpignan", "Autre"],
      datasets: [
        {
          label: "Dataset 1",
          data: 0.2,
          backgroundColor: "#77CEFF",
        },
        {
          label: "Dataset 2",
          data: 1,
          backgroundColor: "blue",
        },
        {
          label: "Dataset 3",
          data: 10,
          backgroundColor: "green",
        },
      ],
      
    }));

    const barChartProps = useBarChart({
      chartData,
    });

    return { barChartProps };
  },
});
</script>

<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <Bar :data="data" :options="options" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/vue";
import ExploreContainer from "@/components/ExploreContainer.vue";
import { defineComponent, ref, inject } from "vue";
import { Chart as ChartJS } from "chart.js";
import { Bar } from "vue-chartjs";
import { CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
  labels: ["January", "February", "March"],
  datasets: [{ data: [40, 20, 12] }],
};

const options = {
  responsive: true,
};

const config = { 
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
};

export default defineComponent({
  setup() {
    const DATA_COUNT = 7;
    const NUMBER_CFG = { count: DATA_COUNT, min: -100, max: 100 };

    const labels = Utils.months({ count: 7 });
    const data = {
      labels: labels,
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
    };
  },
});
</script>

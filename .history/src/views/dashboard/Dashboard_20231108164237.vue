<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <BarChart :chartData="testData" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { DoughnutChart, BarChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";

Chart.register(...registerables);

export default defineComponent({
  name: 'Home',
  components: { DoughnutChart, BarChart },
  setup() {
    const testData = {
      labels: ['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre'],
      datasets: [
        {
          data: [30, 40, 60, 70, 5],
          backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
        },
      ],
    };

    return { testData };
  },
});
</script>
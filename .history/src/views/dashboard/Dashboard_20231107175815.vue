<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <Bar :data="data" :options="options" />
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/vue";
import ExploreContainer from "@/components/ExploreContainer.vue";
import { Chart as ChartJS } from "chart.js";
import { Bar } from "vue-chartjs";
import {
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
  labels: ["January", "February", "March"],
  datasets: [{ data: [40, 20, 12] }],
};

const options = {
  responsive: true,
};
</script>

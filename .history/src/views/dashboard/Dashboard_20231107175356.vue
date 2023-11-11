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
import { defineComponent } from "vue";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

import { Bar } from "vue-chartjs";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default defineComponent({
  components: {
    Bar,
  },
  data: () => ({
    form: {
      rfc: "",
      password: "",
    },
    data: {
      labels: ["January", "February", "March"],
      datasets: [{ data: [40, 20, 12] }],
    },
  }),
});
</script>

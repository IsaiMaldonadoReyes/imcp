<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <BarChart :ref="barChartRef" v-bind="barChartProps" />
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
    const drawer = ref(true);
    const rail = ref(ref);
    

    return { drawer, rail};
  },
});
</script>

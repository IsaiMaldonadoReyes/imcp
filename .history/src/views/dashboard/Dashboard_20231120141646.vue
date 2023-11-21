<template>
  <ion-page>
    <ion-content>
      hola
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { BarChart, useBarChart } from "vue-chart-3";
import { Chart, registerables, ScriptableContext } from "chart.js";
import { IonPage, IonContent } from "@ionic/vue";

Chart.register(...registerables);

export default defineComponent({
  name: "App",
  components: {
    BarChart,
    IonPage,
    IonContent,
  },
  setup() {
    const data = [30, 40];
    const data2 = [10, 20];
    const data3 = [50, 30];
    const barChartRef = ref();
    const title = ref("Estatus de capacitación anual");
    const subtitle = ref("Sector Gubernamental");

    const chartData = computed(() => ({
      labels: ["Esperado", "Obtenido"],
      datasets: [
        {
          label: "Principales",
          data: data,
          backgroundColor: "rgba(178, 0, 0, 0.6)",
        },
        {
          label: "Otros cursos",
          data: data2,
          backgroundColor: "rgba(89, 89, 89, 0.6)",
        },
        {
          label: "Ética",
          data: data3,
          backgroundColor: "rgba(166, 166, 166, 0.6)",
        },
      ],
    }));
    let delayed = ref(false);

    const options = ref({
      plugins: {
        title: {
          display: true,
          text: "Porcentaje de alcance Norma DCP",
        },
      },
      responsive: true,
      animation: {
        onComplete: () => {
          delayed.value = true;
          console.log("Animación completa");
        },
        delay: (context: ScriptableContext<"bar">) => {
          let delay = ref(0);
          if (context.type === "data" && context.mode === "default" && !delayed.value) {
            delay.value = context.dataIndex * 300 + context.datasetIndex * 100;
          }
          return delay.value;
        },
        easing: "easeInOutSine",
      },
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    });

    const { barChartProps } = useBarChart({
      chartData,
      options,
    });

    return { barChartProps, barChartRef, options, title, subtitle };
  },
});
</script>

<style scoped lang="scss"></style>

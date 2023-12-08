<template>
  <ion-page>
    <ion-content>
      <v-container>
        <v-card class="mx-auto" elevation="0" color="transparent">
          <v-card-item>
            <v-card-title class="text-uppercase text-center" style="white-space: normal">
              Certificados en proceso
            </v-card-title>
          </v-card-item>
        </v-card>
        <v-card class="py-1" elevation="0" border rounded="0">
          <v-card-text>
            <span class="text-subtitle-1 text-grey-darken-1">Certificado: </span>
            <span class="text-subtitle-1 font-weight-bold">EUC 2023</span>
            <br />
            <span class="text-subtitle-1 text-grey-darken-1">Núm. Certificado: </span>
            <span class="text-subtitle-1 font-weight-bold">0000111</span>
            <br />
            <span class="text-subtitle-1 text-grey-darken-1">Fecha: </span>
            <span class="text-subtitle-1 font-weight-bold">2023-01-10</span>
            <br />
            <span class="text-subtitle-1 text-grey-darken-1">Sector: </span>
            <span class="text-subtitle-1 font-weight-bold">Finanzas</span>
          </v-card-text>
        </v-card>
      </v-container>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { IonPage, IonContent } from "@ionic/vue";

export default defineComponent({
  name: "CertificadoEstatus",
  components: {
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

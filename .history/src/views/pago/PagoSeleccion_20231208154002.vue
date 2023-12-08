<template>
  <ion-page>
    <ion-content>
      <v-container> </v-container>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { ref, computed, defineComponent, onMounted } from "vue";
import { BarChart, useBarChart } from "vue-chart-3";
import { Chart, registerables, ScriptableContext } from "chart.js";
import { IonPage, IonContent } from "@ionic/vue";
import { Storage } from "@ionic/storage";
import { useDashboardStore } from "@/store/dashboard";

Chart.register(...registerables);

export default defineComponent({
  name: "dashboard",
  components: {
    BarChart,
    IonContent,
    IonPage,
  },
  setup() {
    const dashStore = useDashboardStore();

    const colores = ref({
      rojoIMPC: "#B20000",
      rojoClaro: "#FAE6EA",
      grisOscuro: "#222222",
    });

    const title = ref("Estatus de capacitación");
    const subtitlePeriodoAnual = ref("");
    const subtitlePeriodo4 = ref("");
    const tabs = ref(null);
    const anioActual = ref("");

    const dataLoaded = ref(false);

    const listadoEjercicios = ref<
      Array<{
        label: string;
        year: number;
      }>
    >([]);

    const cursos = ref<
      Array<{
        label: string;
        data: number[];
        backgroundColor: string;
      }>
    >([]);

    const cursosPor4 = ref<
      Array<{
        label: string;
        data: number[];
        backgroundColor: string;
      }>
    >([]);

    const labels4 = ref<string[]>([]);

    const chartData = ref({
      labels: ["Esperado", "Obtenido"],
      datasets: cursos,
    });

    const chartPor4 = ref({
      labels: labels4,
      datasets: cursosPor4,
    });

    const options = ref({
      indexAxis: "x",
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    });

    const { barChartProps: barChartPropsAnual } = useBarChart({
      chartData,
      options,
    });

    const { barChartProps: barChartPropsPor4 } = useBarChart({
      chartData: chartPor4,
      options,
    });

    async function cargarEjercicios() {
      const storage = new Storage();
      storage.create();

      const rfc = await storage.get("rfc");

      try {
        await dashStore.loadEjercicios(rfc);

        const ejercicios: any[] = Array.isArray(dashStore.object.ejercicios.dataset)
          ? dashStore.object.ejercicios.dataset
          : [];

        if (Array.isArray(ejercicios) && ejercicios.length > 0) {
          ejercicios.sort((a, b) => parseInt(b.anhio_aplica) - parseInt(a.anhio_aplica));

          const ejercicioActual = ejercicios[0];
          subtitlePeriodoAnual.value = dashStore.object.ejercicios.titulo_periodo_anual;
          subtitlePeriodo4.value = dashStore.object.ejercicios.titulo_periodo_4_anios;

          //console.log(ejercicioActual);

          anioActual.value = ejercicioActual.anhio_aplica;

          cursos.value.push({
            label: "Principales",
            data:
              ejercicioActual.puntos_principales >
              ejercicioActual.control_puntos_principales
                ? [
                    ejercicioActual.control_puntos_principales,
                    ejercicioActual.control_puntos_principales,
                  ]
                : [
                    ejercicioActual.control_puntos_principales,
                    ejercicioActual.puntos_principales,
                  ],
            backgroundColor: "rgba(178, 0, 0, 0.6)",
          });

          cursos.value.push({
            label: "Otros cursos",
            data:
              ejercicioActual.puntos_otros_cursos >
              ejercicioActual.control_puntos_otros_cursos
                ? [
                    ejercicioActual.control_puntos_otros_cursos,
                    ejercicioActual.control_puntos_otros_cursos,
                  ]
                : [
                    ejercicioActual.control_puntos_otros_cursos,
                    ejercicioActual.puntos_otros_cursos,
                  ],
            backgroundColor: "rgba(89, 89, 89, 0.6)",
          });

          cursos.value.push({
            label: "Ética",
            data:
              ejercicioActual.puntos_etica > ejercicioActual.control_puntos_etica
                ? [
                    ejercicioActual.control_puntos_etica,
                    ejercicioActual.control_puntos_etica,
                  ]
                : [ejercicioActual.control_puntos_etica, ejercicioActual.puntos_etica],
            backgroundColor: "rgba(166, 166, 166, 0.6)",
          });

          const ejercicio4 = ejercicios.slice(1);

          if (Array.isArray(ejercicio4) && ejercicio4.length > 0) {
            const principalesData: number[] = [];
            const OtrosCursosData: number[] = [];
            const eticaData: number[] = [];

            ejercicio4.forEach((ejercicio) => {
              labels4.value.push("Esperado " + ejercicio.anhio_aplica);
              labels4.value.push("Obtenido " + ejercicio.anhio_aplica);

              if (ejercicio.puntos_principales > ejercicio.control_puntos_principales) {
                principalesData.push(
                  ejercicio.control_puntos_principales,
                  ejercicio.control_puntos_principales
                );
              } else {
                principalesData.push(
                  ejercicio.control_puntos_principales,
                  ejercicio.puntos_principales
                );
              }

              if (ejercicio.puntos_otros_cursos > ejercicio.control_puntos_otros_cursos) {
                OtrosCursosData.push(
                  ejercicio.control_puntos_otros_cursos,
                  ejercicio.control_puntos_principales
                );
              } else {
                OtrosCursosData.push(
                  ejercicio.control_puntos_otros_cursos,
                  ejercicio.puntos_otros_cursos
                );
              }

              if (ejercicio.puntos_etica > ejercicio.control_puntos_etica) {
                eticaData.push(
                  ejercicio.control_puntos_etica,
                  ejercicio.control_puntos_etica
                );
              } else {
                eticaData.push(ejercicio.control_puntos_etica, ejercicio.puntos_etica);
              }

              //listadoEjercicios.value.push(parseInt(ejercicio.anhio_aplica));

              listadoEjercicios.value.push({
                label: ejercicio.sector_nombre,
                year: parseInt(ejercicio.anhio_aplica),
              });
            });

            cursosPor4.value.push({
              label: "Principales",
              data: principalesData,
              backgroundColor: "rgba(178, 0, 0, 0.6)",
            });

            cursosPor4.value.push({
              label: "Otros cursos",
              data: OtrosCursosData,
              backgroundColor: "rgba(89, 89, 89, 0.6)",
            });

            cursosPor4.value.push({
              label: "Ética",
              data: eticaData,
              backgroundColor: "rgba(166, 166, 166, 0.6)",
            });
          }

          dataLoaded.value = true;
        }
      } catch (error) {}
    }

    onMounted(() => {
      cargarEjercicios();
    });

    return {
      anioActual,
      barChartPropsAnual,
      dataLoaded,
      barChartPropsPor4,
      colores,
      cursos,
      cursosPor4,
      options,
      subtitlePeriodoAnual,
      subtitlePeriodo4,
      tabs,
      title,
      listadoEjercicios,
    };
  },
});
</script>

<style scoped lang="scss">
.blue-tab {
  background-color: white !important;
  /* Cambia 'blue' por el color que desees */
}
</style>

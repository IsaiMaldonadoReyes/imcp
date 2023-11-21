<template>
  <ion-page>
    <ion-content>
     
      <v-container>
        <ion-header>
        <v-card>
          <v-layout>
            <v-app-bar color="#EBEFF0" elevation="1">
              <div class="back" />
              <div class="esquina-tl-toolbar" />

              <img class="ml-5" style="max-height: 45%; max-width: 45%" src="../assets/images/logotipo.svg" />
              <v-spacer></v-spacer>

              <v-list class="imcp-header" bg-color="transparent" density="compact" max-width="200px">
                <v-list-item :title="nombreUsuario" :subtitle="'RFC ' + rfc">
                  <template v-slot:append>
                    <div class="text-center">
                      <v-menu v-model="menu" :close-on-content-click="false" location="bottom">
                        <template v-slot:activator="{ props }">
                          <v-btn size="x-small" variant="text" icon="mdi-menu-down" v-bind="props"></v-btn>
                        </template>

                        <v-card color="transparent">
                          <v-list color="transparent">
                            <v-list-item :title="nombreUsuario" :subtitle="'RFC ' + rfc" class="my-3">
                              <template v-slot:prepend>
                                <v-avatar color="#AAAAAA">
                                  <span class="text-h5">RJ</span>
                                </v-avatar>
                              </template>
                            </v-list-item>
                            <v-divider></v-divider>
                            <v-list-item class="mx-auto text-left">
                              <v-btn block rounded="lg" variant="text" class="text-none">
                                <template v-slot:prepend>
                                  <v-icon size="12" color="#B20000">
                                    <svg ref="icon" class="v-icon">
                                      <use xlink:href="../assets/images/ico.svg#ico-menu-micuenta"></use>
                                    </svg>
                                  </v-icon>
                                </template>
                                Mi cuenta
                              </v-btn>
                            </v-list-item>
                            <v-divider></v-divider>
                            <v-list-item class="mx-auto">
                              <v-btn block rounded="lg" variant="text" class="text-none" @click="logout">
                                <template v-slot:prepend>
                                  <v-icon size="12" color="#B20000"> mdi-logout </v-icon>
                                </template>
                                Cerrar sesión
                              </v-btn>
                            </v-list-item>
                          </v-list>
                        </v-card>
                      </v-menu>
                    </div>
                  </template>
                </v-list-item>
              </v-list>

              <v-menu v-model="menuNotificacion" :close-on-content-click="false" location="bottom">
                <template v-slot:activator="{ props }">
                  <v-btn class="text-none text-left" color="#B20000" icon variant="outlined" size="large" v-bind="props">
                    <v-badge class="small-dot" :content="cantidadNotificaciones" text-color="#ffffff" location="center">
                      <v-icon color="#B20000" size="x-large">mdi-bell</v-icon>
                    </v-badge>
                  </v-btn>
                </template>

                <v-card>
                  <v-list :items="items" item-props lines="three">
                    <template v-slot:subtitle="{ subtitle }">
                      <div v-html="subtitle"></div>
                    </template>
                  </v-list>
                </v-card>
              </v-menu>

              <!--v-btn class="text-none" icon color="#AAAAAA" variant="outlined">
            <v-badge content="2" color="#B01F24">
              <v-icon color="#AAAAAA">mdi-bell</v-icon>
            </v-badge>
          </v-btn>

          <v-btn class="text-none" icon color="#AAAAAA" >
            <v-badge content="2" color="#B01F24">
              <v-icon color="#AAAAAA">mdi-bell</v-icon>
            </v-badge>
          </v-btn-->
            </v-app-bar>
          </v-layout>
        </v-card>
      </ion-header>
        <v-card class="mx-auto" elevation="0" color="transparent">
          <v-card-item>
            <v-card-title class="text-uppercase text-center" style="white-space: normal">
              {{ title }}
            </v-card-title>
            <v-card-subtitle class="text-capitalize text-center">
              {{ subtitle }}
            </v-card-subtitle>
          </v-card-item>
        </v-card>

        <v-card class="mx-auto my-2" elevation="0" rounded="lg">
          <v-card-text>
            <BarChart :ref="barChartRef" v-bind="barChartProps" />
          </v-card-text>
        </v-card>

        <v-card class="mx-auto my-4" elevation="0" rounded="lg">
          <v-list bg-color="transparent" class="d-flex flex-column justify-end" density="compact">
            <v-list-item title="Puntaje principal">
              <v-progress-linear :model-value="80" class="mx-n5" color="rgba(178, 0, 0, 0.6)" height="15"
                rounded></v-progress-linear>
              <template v-slot:append>
                <div class="rating-values">
                  <span>18/20</span>
                </div>
              </template>
            </v-list-item>
            <v-list-item title="Puntaje otros cursos">
              <v-progress-linear :model-value="70" class="mx-n5" color="rgba(178, 0, 0, 0.6)" height="15"
                rounded></v-progress-linear>
              <template v-slot:append>
                <div class="rating-values">
                  <span>20/25</span>
                </div>
              </template>
            </v-list-item>
            <v-list-item title="Puntaje otros cursos">
              <v-progress-linear :model-value="30" class="mx-n5" color="rgba(178, 0, 0, 0.6)" height="15"
                rounded></v-progress-linear>
              <template v-slot:append>
                <div class="rating-values">
                  <span>2/5</span>
                </div>
              </template>
            </v-list-item>
          </v-list>
        </v-card>

        <v-card class="mx-auto my-4" elevation="0" rounded="lg" color="transparent">
          <v-btn block class="text-none mb-4" color="#C60A2F" size="large" variant="flat" rounded="lg">
            Histórico de capacitaciones
          </v-btn>

          <v-btn block class="text-none" color="#222222" rounded="lg" size="large" variant="flat">
            Desglose de puntos
          </v-btn>
        </v-card>
      </v-container>
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
    IonContent
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

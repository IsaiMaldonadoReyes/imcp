<template>
  <ion-app>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="dashboard" href="/tabs/dashboard">
          <ion-icon aria-hidden="true" :icon="triangle" />
          <!--ion-label>Dashboard</ion-label-->
        </ion-tab-button>

        <ion-tab-button tab="certificado" href="/tabs/certificado">
          <ion-icon aria-hidden="true" :icon="ellipse" />
          <!--ion-label>Certificados Estatus</ion-label-->
        </ion-tab-button>

        <ion-tab-button tab="emitidos" href="/tabs/emitidos">
          <ion-icon aria-hidden="true" :icon="square" />
          <!--ion-label>Certificados emitidos</ion-label-->
        </ion-tab-button>

        <ion-tab-button tab="cuenta" href="/tabs/cuenta">
          <ion-icon aria-hidden="true" :icon="triangle" />
          <!--ion-label>Mi cuenta</ion-label-->
        </ion-tab-button>

        <ion-tab-button tab="avisos" href="/tabs/avisos">
          <ion-icon aria-hidden="true" :icon="helpCircle" />
          <!--ion-label>Capacitaciones externas</ion-label-->
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-app>
</template>

<script lang="ts">
import {
  IonApp,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonIcon,
  IonPage,
  IonRouterOutlet,
} from "@ionic/vue";
import { defineComponent, ref, computed } from "vue";
import { ellipse, helpCircle, square, triangle } from "ionicons/icons";

export default defineComponent({
  name: "App",
  components: {},
  setup() {
    const drawer = ref(false);
    const rail = ref(false);
    const value = ref(1);

    const color = computed(() => {
      switch (value.value) {
        case 0:
          return "#B20000";
        case 1:
          return "#A9A9A9";
        case 2:
          return "brown";
        case 3:
          return "indigo";
        default:
          return "blue-grey";
      }
    });
    return { drawer, rail, value, color, ellipse, helpCircle, square, triangle };
  },
});
</script>

<style>
@import "assets/css/login.css";
</style>

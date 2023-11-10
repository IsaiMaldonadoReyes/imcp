<template>
  <ion-app>
    <v-card max-width="448" class="mx-auto" color="grey-lighten-3">
      <v-layout>
        <v-app-bar color="#E9EDEE">
          <v-app-bar-title>
            hola
            <v-img src="../assets/images/logotipo.svg" height="40" max-width="40" />
          </v-app-bar-title>

          <v-spacer></v-spacer>

          <v-btn icon size="x-small">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>mdi-heart</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-app-bar>
        <v-main> </v-main>
      </v-layout>
    </v-card>
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

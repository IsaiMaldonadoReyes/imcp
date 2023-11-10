<template>
  <ion-app>
    
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineComponent, ref, computed } from "vue";

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
    return { drawer, rail, value, color };
  },
});
</script>

<style>
@import "assets/css/login.css";
</style>

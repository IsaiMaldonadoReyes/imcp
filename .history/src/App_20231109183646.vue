<template>
  <ion-app>
    
    <ion-router-outlet></ion-router-outlet>
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineComponent, ref, computed } from "vue";

export default defineComponent({
  name: "App",
  components: {},
  setup() {
    const drawer = ref(true);
    const rail = ref(true);
    return { drawer, rail };
  },
});
</script>

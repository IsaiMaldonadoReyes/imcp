<template>
  <ion-page>
    <ion-content>
      <v-container fluid>
        <v-date-picker elevation="24"></v-date-picker>
      </v-container>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { ref, defineComponent, watch, computed, defineProps, defineEmits } from "vue";
import { IonPage, IonContent, onIonViewDidEnter } from "@ionic/vue";
import { VDatePicker, VDatePickerMonth } from "vuetify/lib/labs/components.mjs";

export default defineComponent({
  name: "PagoSeleccion",
  components: {
    IonContent,
    IonPage,
    VDatePicker,
    VDatePickerMonth,
  },

  setup(props, { emit }) {
    const show = ref(false);
    const colores = ref({
      rojoIMPC: "#B20000",
      rojoClaro: "#FAE6EA",
      grisOscuro: "#222222",
    });

    const tooltipVisible = ref(false);

    const toggleTooltip = () => {
      tooltipVisible.value = !tooltipVisible.value;
      console.log("Clic en icono!");
    };

    const closeTooltipOnClickOutside = (event: any) => {
      const tooltipActivator = document.querySelector(".informacion-adicional");
      const tooltip = document.querySelector(".v-tooltip");

      if (
        tooltip &&
        !tooltip.contains(event.target) &&
        (!tooltipActivator || !tooltipActivator.contains(event.target))
      ) {
        tooltipVisible.value = false;
      }
    };

    onIonViewDidEnter(() => {
      document.addEventListener("click", closeTooltipOnClickOutside);
    });

    return {
      colores,
      show,
      tooltipVisible,
      toggleTooltip,
      closeTooltipOnClickOutside,
    };
  },
});
</script>

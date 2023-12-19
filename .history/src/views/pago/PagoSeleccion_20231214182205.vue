<template>
  <ion-page>
    <ion-content>
      <v-container fluid>
        <v-card elevation="0" color="transparent">
          <v-card-item>
            <v-card-title
              class="text-grey-darken-3 font-weight-bold text-center"
              style="white-space: normal"
            >
              Pago de certificado
            </v-card-title>
          </v-card-item>
        </v-card>
        <v-card class="pa-2" elevation="0" border="">
          <v-card-text>
            <v-select
              class="my-4"
              clearable
              hide-details="auto"
              label="Tipo de pago *"
              no-data-text="No hay datos disponibles"
              placeholder="Débito Visa / Mastercard"
              variant="outlined"
            ></v-select>
            <v-text-field
              class="my-4"
              clearable
              hide-details="auto"
              label="Nombre(s) *"
              placeholder="Nombre(s) como aparece en la tarjeta"
              variant="outlined"
            ></v-text-field>
            <v-text-field
              class="my-4"
              clearable
              hide-details="auto"
              label="Apellido(s) *"
              placeholder="Apllido(s) como aparece en la tarjeta"
              variant="outlined"
            ></v-text-field>
            <v-text-field
              class="my-4"
              clearable
              hide-details="auto"
              label="Calle"
              placeholder="Calle del tarjetahabiente"
              variant="outlined"
            ></v-text-field>
            <v-text-field
              class="my-4"
              clearable
              hide-details="auto"
              label="País *"
              placeholder="País del tarjetahabiente"
              variant="outlined"
            ></v-text-field>
            <v-text-field
              class="my-4"
              clearable
              hide-details="auto"
              label="Estado *"
              placeholder="Estado del tarjetahabiente"
              variant="outlined"
            ></v-text-field>
            <v-text-field
              class="my-4"
              clearable
              hide-details="auto"
              label="Código *"
              placeholder="Código postal del tarjetahabiente"
              variant="outlined"
            ></v-text-field>
            <v-text-field
              class="my-4"
              clearable
              hide-details="auto"
              label="Celular *"
              placeholder="Celular del tarjetahabiente"
              variant="outlined"
            ></v-text-field>
            <v-text-field
              class="my-4"
              clearable
              hide-details="auto"
              label="Número de tarjeta *"
              placeholder="Número de tarjeta"
              variant="outlined"
            ></v-text-field>
            <v-select
              class="my-4"
              clearable
              hide-details="auto"
              label="Marca de la tarjeta *"
              no-data-text="No hay datos disponibles"
              placeholder="Marca de la tarjeta"
              variant="outlined"
            ></v-select>
            <v-select
              class="my-4"
              clearable
              hide-details="auto"
              label="Tipo de tarjeta *"
              no-data-text="No hay datos disponibles"
              placeholder="Seleccione tipo de tarjeta"
              variant="outlined"
            ></v-select>
            <v-menu
              v-model="monthMenu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ props }">
                <v-text-field
                  v-model="txtMonth"
                  label="Month"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="props"
                ></v-text-field>
              </template>
              <v-date-picker
                @input="onInput"
                color="primary"
                view-mode="month"
                ref="picker"
              ></v-date-picker>
            </v-menu>

            <v-date-picker :show-adjacent-months="true"></v-date-picker>
            <v-text-field
              class="my-4"
              clearable
              hide-details="auto"
              label="Código de seguridad"
              placeholder="CVV"
              variant="outlined"
            >
              <template v-slot:append>
                <v-tooltip class="text-justify" location="top" v-model="tooltipVisible">
                  <template v-slot:activator="{ props }">
                    <v-icon
                      v-bind="props"
                      @click="toggleTooltip"
                      class="informacion-adicional"
                    >
                      mdi-information-outline
                    </v-icon>
                  </template>
                  <span>
                    El código CVV o CVC es un grupo de 3 o 4 números situado en el reverso
                    de la tarjeta de crédito o débito.
                  </span>
                </v-tooltip>
              </template>
            </v-text-field>
          </v-card-text>
        </v-card>
      </v-container>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { ref, defineComponent, watch } from "vue";
import { IonPage, IonContent, onIonViewDidEnter } from "@ionic/vue";
import { VDatePicker } from "vuetify/lib/labs/components.mjs";

export default defineComponent({
  name: "PagoSeleccion",
  components: {
    IonContent,
    IonPage,
    VDatePicker,
  },
  setup() {
    const show = ref(false);
    const colores = ref({
      rojoIMPC: "#B20000",
      rojoClaro: "#FAE6EA",
      grisOscuro: "#222222",
    });

    const monthMenu = ref(false);
    const txtMonth = ref("");
    const month = ref("");

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

    const onInput = (dateStr: any) => {
      const month = dateStr.split("-")[1];
      const year = dateStr.split("-")[0];
      txtMonth.value = `${month}, ${year}`;
    };

    watch(monthMenu, (val) => {
      if (val) {
        setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
      }
    });

    watch(
      () => txtMonth.value,
      (val) => {
        monthMenu.value = false;
      }
    );

    return {
      colores,
      show,
      tooltipVisible,
      toggleTooltip,
      closeTooltipOnClickOutside,
      monthMenu,
      txtMonth,
      month,
      onInput,
    };
  },
});
</script>

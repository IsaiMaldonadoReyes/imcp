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
            <v-menu v-model="isMenuOpen" :close-on-content-click="true">
              <template v-slot:activator="{ props }">
                <v-text-field
                  v-model="formattedDate"
                  readonly
                  v-bind="props"
                  variant="outlined"
                  label="Fecha de expiración *"
                  placeholder="mm/yy*"
                  hide-details
                  clearable
                ></v-text-field>
              </template>
              <ion-datetime
                presentation="month-year"
                @ionChange="handleDateChange"
              ></ion-datetime>
            </v-menu>
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
                      mdi-help-circle-outline
                    </v-icon>
                  </template>
                  <span>
                    El código CVV o CVC es un grupo de 3 o 4 números situado en el reverso
                    de la tarjeta de crédito o débito.
                  </span>
                </v-tooltip>
              </template>
            </v-text-field>
            <v-btn class="text-grey-darken-1" variant="text">
              <span class="text-decoration-underline text-none">
                Políticas de compra segura
              </span>
            </v-btn>
            <v-checkbox :center-affix="true" append-icon="mdi-help-circle-outline">
              <template v-slot:label>
                <div>
                  Estoy de acuerdo en la políticas de
                  <v-tooltip location="bottom">
                    <template v-slot:activator="{ props }">
                      <a
                        target="_blank"
                        href="https://www.xpertshop.mx"
                        v-bind="props"
                        @click.stop
                      >
                        www.xpertshop.mx
                      </a>
                    </template>
                    Abrir en navegador
                  </v-tooltip>
                </div>
              </template>
            </v-checkbox>
            <v-checkbox :center-affix="true" append-icon="mdi-help-circle-outline">
              <template v-slot:label>
                <div>Si desea factura</div>
              </template>
            </v-checkbox>
          </v-card-text>
          <v-card-actions>
            <v-btn
              :color="colores.verdeBoton"
              block
              prepend-icon="mdi-account-credit-card"
              size="large"
              text="Pagar"
              :to="{
                name: 'seleccionAccion',
                params: { idCertificado: 2 },
              }"
              variant="flat"
            >
              <template v-slot:prepend>
                <v-icon class="mr-3" size="large"></v-icon>
              </template>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { ref, defineComponent, watch, computed, defineProps, defineEmits } from "vue";
import { IonPage, IonContent, onIonViewDidEnter, IonDatetime } from "@ionic/vue";
import { VDatePicker, VDatePickerMonth } from "vuetify/lib/labs/components.mjs";

export default defineComponent({
  name: "PagoSeleccion",
  components: {
    IonContent,
    IonPage,
    VDatePicker,
    VDatePickerMonth,
    IonDatetime,
  },

  setup() {
    const show = ref(false);
    const colores = ref({
      rojoIMPC: "#B20000",
      rojoClaro: "#FAE6EA",
      grisOscuro: "#222222",
      verdeBoton: "#468C00",
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

    let isMenuOpen = ref(false);
    let formattedDate = ref("");

    function handleDateChange(event: any) {
      // El valor seleccionado estará en event.detail.value
      isMenuOpen.value = false;
      formattedDate.value = event.detail.value;
      console.log("Fecha seleccionada:", event.detail.value);
      // Puedes asignar el valor a una variable si es necesario
    }

    return {
      colores,
      show,
      tooltipVisible,
      toggleTooltip,
      closeTooltipOnClickOutside,
      isMenuOpen,
      formattedDate,
      handleDateChange,
    };
  },
});
</script>

<style>
.v-overlay__content:has(> .v-date-picker) {
  min-width: auto !important;
}
</style>

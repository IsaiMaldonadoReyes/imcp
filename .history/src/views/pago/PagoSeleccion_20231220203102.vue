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
        <v-card class="" elevation="0" border="">
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
              label="Código postal *"
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
            <v-row>
              <v-col sm="12" md="6" lg="6">
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
              </v-col>
              <v-col offset-sm="12" md="6" lg="6">
                <v-text-field
                  clearable
                  hide-details="auto"
                  label="Código de seguridad *"
                  placeholder="CVV"
                  variant="outlined"
                >
                  <!--template v-slot:append>
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
              </template-->
                  <template v-slot:append-inner>
                    <v-menu v-model="menu" :close-on-content-click="false" location="end">
                      <template v-slot:activator="{ props }">
                        <v-icon v-bind="props">mdi-help-circle-outline</v-icon>
                      </template>

                      <v-card max-width="250">
                        <v-card-text>
                          El código
                          <span
                            class="font-weight-bold"
                            :style="`color:${colores.verdeBoton}`"
                          >
                            CVV
                          </span>
                          o
                          <span
                            class="font-weight-bold"
                            :style="`color:${colores.verdeBoton}`"
                          >
                            CVC
                          </span>
                          es un grupo de 3 o 4 números situado en el reverso de la tarjeta
                          de crédito o débito.
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-item class="text-center ma-0 pa-0">
                          <img
                            src="../../assets/images/cvv.png"
                            style="max-width: 150px"
                          />
                        </v-card-item>
                        <v-divider></v-divider>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            :color="colores.verdeBoton"
                            class="me-2"
                            variant="text"
                            @click="menu = false"
                            text="Cerrar"
                          />
                        </v-card-actions>
                      </v-card>
                    </v-menu>
                  </template>
                </v-text-field>
              </v-col>
            </v-row>

            <v-btn class="mb-2" variant="text">
              <a
                class="text-decoration-underline text-none text-grey-darken-1"
                target="_blank"
                href="https://www.xpertshop.mx/v2/contenidos/terminos_condiciones_xpertshop.php"
                @click.stop
              >
                <span>
                  Políticas de compra segura <v-icon size="14">mdi-open-in-new</v-icon>
                </span>
              </a>
            </v-btn>
            <v-checkbox
              :center-affix="true"
              true-icon="mdi-shield-check"
              :color="colores.verdeBoton"
              hide-details
            >
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
              <template v-slot:append>
                <a
                  class="text-grey-darken-1"
                  target="_blank"
                  href="https://www.xpertshop.mx/v2/contenidos/aviso_privacidad_xpertshop.php"
                  @click.stop
                >
                  <v-icon>mdi-open-in-new</v-icon>
                </a>
                <!--span class="text-caption text-medium-emphasis ms-1 font-weight-light">
                  ver
                </span-->
              </template>
            </v-checkbox>
            <v-checkbox
              :center-affix="true"
              :color="colores.verdeBoton"
              hide-details
              true-icon="mdi-receipt-text-check"
            >
              <template v-slot:label>Si desea factura</template>
            </v-checkbox>
          </v-card-text>
          <v-card-actions>
            <v-btn
              :color="colores.verdeBoton"
              :to="{
                name: 'seleccionAccion',
                params: { idCertificado: 2 },
              }"
              block
              prepend-icon="mdi-account-credit-card"
              size="large"
              text="Pagar"
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
    const menu = ref(false);
    const colores = ref({
      rojoIMPC: "#B20000",
      rojoClaro: "#FAE6EA",
      grisOscuro: "#222222",
      verdeBoton: "#468C00",
    });

    let tooltipVisible = ref(false);

    function toggleTooltip() {
      tooltipVisible.value = !tooltipVisible.value;
    }

    function closeTooltipOnClickOutside(event: any) {
      const tooltipActivator = document.querySelector(".informacion-adicional");
      const tooltip = document.querySelector(".v-tooltip");

      if (
        tooltip &&
        !tooltip.contains(event.target) &&
        (!tooltipActivator || !tooltipActivator.contains(event.target))
      ) {
        tooltipVisible.value = false;
      }
    }

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
      menu,
    };
  },
});
</script>

<style>
.v-overlay__content:has(> .v-date-picker) {
  min-width: auto !important;
}
</style>

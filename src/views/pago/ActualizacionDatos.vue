<template>
  <ion-page>
    <ion-content>
      <v-container fluid>
        <v-card class="mx-auto" color="transparent" elevation="0">
          <v-card-item>
            <v-card-title class="text-center" style="white-space: normal">
              Actualizar datos
            </v-card-title>
          </v-card-item>
        </v-card>
        <v-card class="my-3" elevation="0" border>
          <v-card-title
            >Estimado (a)
            <span class="font-weight-bold">Nombre</span></v-card-title
          >
          <v-card-text>
            <span class="text-subtitle-1 text-grey-darken-1">
              La información del certificado que esta actualizando
            </span>
          </v-card-text>
          <v-card-text>
            <span class="text-subtitle-1 text-grey-darken-1">Certificado:</span>
            <span class="text-subtitle-1 font-weight-bold"
              >Nombre certificado</span
            >
            <br />
            <span class="text-subtitle-1 text-grey-darken-1"
              >No. de certificado:</span
            >
            <span class="text-subtitle-1 font-weight-bold">1880</span>
            <br />
            <span class="text-subtitle-1 text-grey-darken-1"
              >Fecha emisión:</span
            >
            <span class="text-subtitle-1 font-weight-bold">01-Nov-2022</span>
            <br />
            <span class="text-subtitle-1 text-grey-darken-1"
              >Fecha emisión:</span
            >
            <span class="text-subtitle-1 font-weight-bold">01-Nov-2022</span>
          </v-card-text>
          <v-card-text>
            <span class="text-subtitle-1 text-grey-darken-1"
              >Por medio de este formulario se actualizará su información en el
              sistema DPC (Sistema de puntos de control) del Instituto Mexicano
              de Contadores Públicos.</span
            >
          </v-card-text>
        </v-card>
        <v-card class="my-3" elevation="0" border>
          <v-card-title>
            <span class="font-weight-bold">Datos personales</span></v-card-title
          >
          <v-card-text>
            <v-text-field
              class="my-4"
              clearable
              hide-details="auto"
              label="Nombre *"
              placeholder="Nombre(s)"
              variant="outlined"
            ></v-text-field>
            <v-text-field
              class="my-4"
              clearable
              hide-details="auto"
              label="Apellido paterno *"
              placeholder="Apellido paterno"
              variant="outlined"
            ></v-text-field>
            <v-text-field
              class="my-4"
              clearable
              hide-details="auto"
              label="Apellido materno *"
              placeholder="Apellido materno"
              variant="outlined"
            ></v-text-field>
            <br />
            <br />
            <span class="text-subtitle-1 text-grey-darken-1">
              * En caso de requerir actualizar el nombre y/o apellidos, favor de
              enviar un correo a la direccion soporte.certificacion@imcp.org.mx
            </span>
            <br />
            <br />
            <v-text-field
              class="my-4"
              clearable
              hide-details="auto"
              label="RFC *"
              placeholder="RFC"
              variant="outlined"
            ></v-text-field>
            <v-select
              class="my-4"
              clearable
              hide-details="auto"
              label="Sexo *"
              no-data-text="No hay datos disponibles"
              variant="outlined"
            ></v-select>
            <v-select
              class="my-4"
              clearable
              hide-details="auto"
              label="Estado civil *"
              no-data-text="No hay datos disponibles"
              variant="outlined"
            ></v-select>
            <v-text-field
              class="my-4"
              clearable
              hide-details="auto"
              label="Lugar de nacimiento *"
              placeholder="Estado"
              variant="outlined"
            ></v-text-field>

            <v-text-field
              class="my-4"
              clearable
              hide-details="auto"
              label="AGAFF *"
              placeholder="Dato AGAFF"
              variant="outlined"
            ></v-text-field>

            <v-text-field
              class="my-4"
              clearable
              hide-details="auto"
              label="IMSS *"
              placeholder="Dato IMMS"
              variant="outlined"
            ></v-text-field>

            <v-text-field
              class="my-4"
              clearable
              hide-details="auto"
              label="Email *"
              placeholder="Email"
              variant="outlined"
            ></v-text-field>
          </v-card-text>
        </v-card>
        <v-card class="my-3" elevation="0" border>
          <v-card-title>
            <span class="font-weight-bold"
              >Organismos profesionales a los que perteneces</span
            ></v-card-title
          >
          <v-card-text>
            <v-select
              class="my-4"
              clearable
              hide-details="auto"
              label="Colegio afiliados *"
              no-data-text="No hay datos disponibles"
              variant="outlined"
            ></v-select>
          </v-card-text>
        </v-card>
        <v-card class="my-3" elevation="0" border>
          <v-card-title>
            <span class="font-weight-bold">Grado académico</span></v-card-title
          >
          <v-card-text>
            <span class="text-subtitle-1 text-grey-darken-1"
              >Grado académico:
            </span>
            <span class="text-subtitle-1 font-weight-bold">LCP</span>
            <br />
            <span class="text-subtitle-1 text-grey-darken-1"
              >Institución:
            </span>
            <span class="text-subtitle-1 font-weight-bold">UNAM</span>
            <br />
            <span class="text-subtitle-1 text-grey-darken-1"
              >Año titulación:
            </span>
            <span class="text-subtitle-1 font-weight-bold">2008</span>
            <br />
          </v-card-text>
        </v-card>
        <v-card class="my-3" elevation="0" border>
          <v-card-title>
            <span class="font-weight-bold">Domicilio</span></v-card-title
          >
          <v-card-text>
            <v-text-field
              class="my-4"
              clearable
              hide-details="auto"
              label="Calle y número *"
              placeholder="Domicilio"
              variant="outlined"
            ></v-text-field>
            <v-text-field
              class="my-4"
              clearable
              hide-details="auto"
              label="C.P."
              placeholder="Código postal"
              variant="outlined"
            ></v-text-field>
            <v-select
              class="my-4"
              clearable
              hide-details="auto"
              label="Colonia *"
              no-data-text="No hay datos disponibles"
              variant="outlined"
            ></v-select>
            <v-select
              class="my-4"
              clearable
              hide-details="auto"
              label="Alcaldía o municipio *"
              no-data-text="No hay datos disponibles"
              variant="outlined"
            ></v-select>
            <v-select
              class="my-4"
              clearable
              hide-details="auto"
              label="Estado *"
              no-data-text="No hay datos disponibles"
              variant="outlined"
            ></v-select>
            <v-text-field
              class="my-4"
              clearable
              hide-details="auto"
              label="Teléfono *"
              placeholder="Teléfono"
              variant="outlined"
            ></v-text-field>
          </v-card-text>
        </v-card>
        <v-card class="my-3" elevation="0" border>
          <v-card-title>
            <span class="font-weight-bold"
              >Empresas, institución o despacho en que labora</span
            ></v-card-title
          >
          <v-card-text>
            <v-select
              class="my-4"
              clearable
              hide-details="auto"
              label="Sector *"
              no-data-text="No hay datos disponibles"
              variant="outlined"
            ></v-select>
            <v-text-field
              class="my-4"
              clearable
              hide-details="auto"
              label="Empresa *"
              placeholder="Empresa en la que labora"
              variant="outlined"
            ></v-text-field>
            <v-text-field
              class="my-4"
              clearable
              hide-details="auto"
              label="Antiguedad *"
              placeholder="Antiguedad en la empresa en la que labora"
              variant="outlined"
            ></v-text-field>
            <v-select
              class="my-4"
              clearable
              hide-details="auto"
              label="Puesto *"
              no-data-text="No hay datos disponibles"
              variant="outlined"
            ></v-select>
            <v-select
              class="my-4"
              clearable
              hide-details="auto"
              label="Especialidad *"
              no-data-text="No hay datos disponibles"
              variant="outlined"
            ></v-select>
          </v-card-text>
        </v-card>
        <v-card class="my-3" elevation="0" border>
          <v-card-title>
            <span class="font-weight-bold"
              >Domicilio: Lugar de residencia de empresa, institución o despacho
              en que labora</span
            ></v-card-title
          >
          <v-card-text>
            <v-text-field
              class="my-4"
              clearable
              hide-details="auto"
              label="Calle y número *"
              placeholder="Domicilio"
              variant="outlined"
            ></v-text-field>
            <v-text-field
              class="my-4"
              clearable
              hide-details="auto"
              label="C.P."
              placeholder="Código postal"
              variant="outlined"
            ></v-text-field>
            <v-select
              class="my-4"
              clearable
              hide-details="auto"
              label="Colonia *"
              no-data-text="No hay datos disponibles"
              variant="outlined"
            ></v-select>
            <v-select
              class="my-4"
              clearable
              hide-details="auto"
              label="Alcaldía o municipio *"
              no-data-text="No hay datos disponibles"
              variant="outlined"
            ></v-select>
            <v-select
              class="my-4"
              clearable
              hide-details="auto"
              label="Estado *"
              no-data-text="No hay datos disponibles"
              variant="outlined"
            ></v-select>
            <v-text-field
              class="my-4"
              clearable
              hide-details="auto"
              label="Teléfono empresa *"
              placeholder="Teléfono"
              variant="outlined"
            ></v-text-field>
          </v-card-text>
        </v-card>
        <v-card class="my-3" elevation="0" border>
          <v-card-title>
            <span class="font-weight-bold"
              >Datos para la facturación</span
            ></v-card-title
          >
          <v-card-text>
            <v-text-field
              class="my-4"
              clearable
              hide-details="auto"
              label="Nombre *"
              placeholder="Nombre"
              variant="outlined"
            ></v-text-field>
            <v-text-field
              class="my-4"
              clearable
              hide-details="auto"
              label="RFC *"
              placeholder="RFC"
              variant="outlined"
            ></v-text-field>
            <v-text-field
              class="my-4"
              clearable
              hide-details="auto"
              label="Calle y número *"
              placeholder="Domicilio"
              variant="outlined"
            ></v-text-field>
            <v-text-field
              class="my-4"
              clearable
              hide-details="auto"
              label="C.P."
              placeholder="Código postal"
              variant="outlined"
            ></v-text-field>
            <v-select
              class="my-4"
              clearable
              hide-details="auto"
              label="Colonia *"
              no-data-text="No hay datos disponibles"
              variant="outlined"
            ></v-select>
            <v-select
              class="my-4"
              clearable
              hide-details="auto"
              label="Alcaldía o municipio *"
              no-data-text="No hay datos disponibles"
              variant="outlined"
            ></v-select>
            <v-select
              class="my-4"
              clearable
              hide-details="auto"
              label="Estado *"
              no-data-text="No hay datos disponibles"
              variant="outlined"
            ></v-select>
          </v-card-text>
        </v-card>
        <v-card
          color="transparent"
          rounded="lg"
          class="mx-auto my-4"
          elevation="0"
        >
          <v-card-text>
            <span class="text-subtitle-1 text-grey-darken-1"
              >Instituto Mexicano de Contadores Públicos, A.C. aprovecha para
              informarle que de conformidad con la Ley Federal de Protección de
              Datos Personales en Posesión de Particulares, se entenderá que
              usted está de acuerdo con la recopilación, uso, transferencia y
              almacenamiento de datos personales, patrimoniales y, en su caso,
              sensibles que nos sean proporcionados con motivo de "Solicitud de
              Exámen Uniforme de Certificación, Certificación por Disciplinas",
              para moayor información respecto a nuestras políticas de
              privacidad por favor consulte la página (www.imcp.org.mx).
            </span>
          </v-card-text>
        </v-card>
        <v-card
          color="transparent"
          rounded="lg"
          class="mx-auto my-4"
          elevation="0"
        >
          <div>
            <v-btn
              block
              class="text-none"
              prepend-icon="mdi-file-download-outline"
              rounded="large"
              size="large"
              text="GUARDAR"
              variant="flat"
              :color="colores.verdeBoton"
            >
              <template v-slot:prepend>
                <v-icon class="mr-3" size="large"></v-icon>
              </template>
            </v-btn>
          </div>
          <br />
          <div>
            <v-btn
              block
              class="text-none"
              prepend-icon="mdi-file-download-outline"
              rounded="large"
              size="large"
              text="CANCELAR"
              variant="flat"
              :color="colores.rojoIMPC"
            >
              <template v-slot:prepend>
                <v-icon class="mr-3" size="large"></v-icon>
              </template>
            </v-btn>
          </div>
        </v-card>
      </v-container>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { ref, computed, defineComponent } from "vue";
import { IonPage, IonContent, onIonViewDidEnter } from "@ionic/vue";
import { usePagoStore } from "@/store/pago";
import { stringifyQuery } from "vue-router";

export interface Genero {
  result: ResultGenero[];
  type: string;
}

export interface ResultGenero {
  value: any;
  label: string;
}

export interface EstadoCivil {
  result: ResultEstadoCivil[];
  type: string;
}

export interface ResultEstadoCivil {
  value: any;
  label: string;
}

export interface Colegio {
  result: ResultColegio[];
  type: string;
}

export interface ResultColegio {
  value: any;
  label: string;
}

export interface Sector {
  result: ResultSector[];
  type: string;
}

export interface ResultSector {
  value: any;
  label: string;
}

export interface Especialidad {
  result: ResultEspecialidad[];
  type: string;
}

export interface ResultEspecialidad {
  value: any;
  label: string;
}

export default defineComponent({
  name: "ActualizacionDatos",
  components: {
    IonContent,
    IonPage,
  },
  setup() {
    const pagoStore = usePagoStore();

    const show = ref(false);
    const colores = ref({
      rojoIMPC: "#B20000",
      rojoClaro: "#FAE6EA",
      grisOscuro: "#222222",
      verdeBoton: "#468C00",
    });

    const dataGenero = ref<Genero>({
      result: [],
      type: "",
    });

    const dataEstadoCivil = ref<EstadoCivil>({
      result: [],
      type: "",
    });

    const dataColegio = ref<Colegio>({
      result: [],
      type: "",
    });

    const dataSector = ref<Sector>({
      result: [],
      type: "",
    });

    const dataEspecialidad = ref<Especialidad>({
      result: [],
      type: "",
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

    async function catalogoGenero() {
      try {
        await pagoStore.cargarCatalogoGenero();
      } catch (error) {
        console.log(error);
      }
    }

    async function catalogoEstadoCivil() {
      try {
        await pagoStore.cargarCatalogoEstadoCivil();
      } catch (error) {
        console.log(error);
      }
    }

    async function catalogoColegio() {
      try {
        await pagoStore.cargarCatalogoColegio();
      } catch (error) {
        console.log(error);
      }
    }

    async function catalogoSector() {
      try {
        await pagoStore.cargarCatalogoSector();
      } catch (error) {
        console.log(error);
      }
    }

    async function catalogoEspecialidad() {
      try {
        await pagoStore.cargarCatalogoEspecialidad();
      } catch (error) {
        console.log(error);
      }
    }

    onIonViewDidEnter(() => {
      document.addEventListener("click", closeTooltipOnClickOutside);

      catalogoGenero();
      catalogoEstadoCivil();
      catalogoColegio();
      catalogoSector();
      catalogoEspecialidad();
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

<template>
  <ion-page>
    <ion-content>
      <v-container fluid>
        <v-card class="mx-auto" color="transparent" elevation="0">
          <v-card-item>
            <v-card-title
              class="text-uppercase text-grey-darken-3 font-weight-bold text-center"
              style="white-space: normal"
            >
              Nueva manifestación
            </v-card-title>
          </v-card-item>
        </v-card>
        <v-form v-model="isValidForm" lazy-validation ref="refForm">
          <v-card border class="mb-3" color="transparent" elevation="0">
            <v-card border class="ma-3" elevation="0">
              <v-card-text class="text-justify">
                <v-text-field
                  class="my-4"
                  clearable
                  hide-details="auto"
                  label="Nombre del evento *"
                  placeholder="Nombre del evento"
                  variant="outlined"
                  v-model="dataModel.nombre_evento"
                ></v-text-field>
              </v-card-text>
            </v-card>
          </v-card>
          <v-card color="transparent" class="mx-auto my-4" elevation="0">
            <div>
              <v-btn
                block
                class="text-none"
                prepend-icon="mdi-content-save-edit-outline"
                rounded="large"
                size="large"
                text="GUARDAR"
                variant="flat"
                :color="colores.verdeBoton"
                @click="guardarDatos"
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
                prepend-icon="mdi-content-save-off-outline"
                rounded="large"
                size="large"
                text="CANCELAR"
                variant="flat"
                :color="colores.rojoIMPC"
                :to="{ name: 'manifestacionListado' }"
              >
                <template v-slot:prepend>
                  <v-icon class="mr-3" size="large"></v-icon>
                </template>
              </v-btn>
            </div>
          </v-card>
        </v-form>
      </v-container>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import {
  IonPage,
  IonContent,
  onIonViewDidEnter,
  alertController,
} from "@ionic/vue";

import { useManifestacionStore } from "@/store/manifestacion";
import { useRouter, Router, useRoute } from "vue-router";
import { VDataTable } from "vuetify/lib/labs/components.mjs";
import { Storage } from "@ionic/storage";
import { es } from "date-fns/locale";

export interface Permisos {
  dataset: Dataset[]
  totalSize: number
  pageSize: number
  intervaloSeccion: number
  nombreListado: string
}

export interface Dataset {
  cuentas_usuarios_id: number
  cuenta_nombre: string
  cuenta_apaterno: string
  cuenta_amatarno: string
  cuenta_rfc: string
  id_sector: number
  registro_agaff: string
  registro_imss: string
  id_certificado: number
  id_tipo: number
  id_tipo_certificado: number
  id_certificado_dis: number
  num_certificado: string
  fecha_vigencia: string
  fecha_inicio: string
  status: string
  anhio_inicio_vigencia: string
  anhio_fin_vigencia: string
  status_certificado: string
  permitidos: Permitido[]
  info_solcitar: InfoSolcitar[]
  sector: string
  disciplina: string
}

export interface Permitido {
  label: string
}

export interface InfoSolcitar {
  value: string
  label: any
}

export interface Especilidad {
  result: ResultEspecialidad[];
  type: string;
}

export interface ResultEspecialidad {
  value: any;
  label: string;
}

export interface Modalidad {
  result: ResultModalidad[];
  type: string;
}

export interface ResultModalidad {
  value: any;
  label: string;
}

export interface Informacion {
  cuentas_usuarios_id: number;
  id_sector: number;
  id_tipo_origen: number;
  cuenta_rfc: string;
  cuenta_nombre: string;
  cuenta_apaterno: string;
  cuenta_amatarno: string;
  cuenta_sexo: string;
  cuenta_email: string;
  cuenta_civil: string;
  lugar_nacimiento: string;
  registro_agaff: string;
  anhio_titulo: string;
  tipo_ususario: string;
  expositor: string;
  status: string;
  registro_imss: string;
  infonavit: string;
  datecreation: string;
  dateupdate: string;
  id_colegio: number;
  organismo: string;
  cuenta_pagado: number;
  cuenta_socio: string;
  cuenta_status: string;
  articulo: string;
  anhio_nacimiento: string;
  nombre_colegio: string;
  dato_facturacion_id: number;
  nombre: string;
  rfc: string;
  cp: string;
  calle: string;
  colinia: string;
  delegacion: string;
  ciudad: string;
  estado: string;
  tipo_persona: any;
  regimen_fiscal_id: any;
  direccion_id_personal: number;
  num_personal: string;
  direccion_nombre_personal: string;
  direccion_calle_numero_personal: string;
  direccion_cp_personal: string;
  direccion_colonia_personal: string;
  direccion_delegacion_personal: string;
  direccion_estado_personal: string;
  direccion_id_empresa: number;
  num_empresa: string;
  direccion_nombre_empresa: string;
  direccion_calle_numero_empresa: string;
  direccion_cp_empresa: string;
  direccion_colonia_empresa: string;
  direccion_delegacion_empresa: string;
  direccion_estado_empresa: string;
}

const showAlert = async (header: string, message: string) => {
  const alert = await alertController.create({
    header,
    message,
    buttons: ["OK"],
  });

  return alert;
};

export default defineComponent({
  name: "RegistroManifestacion",
  components: {
    IonContent,
    IonPage,
    VDataTable,
  },
  setup() {
    const route = useRoute();
    const router: Router = useRouter();

    const manifestacionStore = useManifestacionStore();

    const isValidForm = ref(true);
    const refForm = ref<any>(null);

    const encabezadosEspecilidad = ref([
      { title: "Disciplina", key: "disciplina" },
      { title: "Puntos", key: "puntos" },
      { title: "Horas", key: "horas" },
      { title: "Modalidad", key: "modalidad" },
      { title: "", key: "actions", sortable: true },
    ]);


    const dataModel = ref({
      id_colegio: 0,
      nombre_evento: "",
      eventos_sede: "",
      expositor: "",
      eventos_fecha_inicio: "",
      eventos_fecha_fin: "",
      telefono: "",
      email: "",
      imss_id: [] as number[],
      id_disciplina: "",
      disciplina: "",
      puntos: "",
      horas: "",
      modalidad: "",
      listado_eventos: [] as {
        id_disciplina: string;
        disciplina: string;
        puntos: string;
        horas: string;
        modalidad: string;
      }[],
      archivos: [] as File[],
    });

    const dataEspecialidad = ref<Especilidad>({
      result: [],
      type: "",
    });

    const colores = ref({
      rojoIMPC: "#B20000",
      rojoClaro: "#FAE6EA",
      grisOscuro: "#222222",
      verdeBoton: "#468C00",
    });

    async function limpiarFormulario() {
      dataModel.value = {
        id_colegio: 0,
        nombre_evento: "",
        eventos_sede: "",
        expositor: "",
        eventos_fecha_inicio: "",
        eventos_fecha_fin: "",
        telefono: "",
        email: "",
        imss_id: [] as number[],
        id_disciplina: "",
        disciplina: "",
        puntos: "",
        horas: "",
        modalidad: "",
        listado_eventos: [] as {
          id_disciplina: string;
          disciplina: string;
          puntos: string;
          horas: string;
          modalidad: string;
        }[],
        archivos: [] as File[],
      };
    }

    onIonViewDidEnter(async () => {
      await limpiarFormulario();
    });

    async function guardarDatos() {
      try {
        const isValidForm = await refForm.value?.validate();
        if (isValidForm.valid && dataModel.value.listado_eventos.length > 0) {
          const formData = new FormData();

          const storage = new Storage();
          storage.create();

          const rfc = await storage.get("rfc");

          formData.append("eventos_externos[cuenta_rfc]", rfc);
          formData.append(
            "eventos_externos[id_colegio]",
            dataModel.value.id_colegio.toString()
          );

          await capacitacionStore.registrarCapacitacion(formData);

          if (capacitacionStore.type == "success") {
            await refForm.value?.reset();
            const alert = await showAlert(
              "Capacitación externa",
              capacitacionStore.responseMessage
            );

            if (alert) {
              await alert.present();
              await alert.onDidDismiss();

              router.push({
                name: "capacitacionExternaListado",
              });
            }
          } else {
            await showAlert("Capacitación externa", "Revise los datos");
          }
        }
      } catch (error) {}
    }

    return {
      colores,
      dataModel,
      dataEspecialidad,

      refForm,
      isValidForm,

      encabezadosEspecilidad,

      guardarDatos,
      es,
    };
  },
});
</script>

<style>
.dp__pointer {
  height: 56px;
}

.tb-grados thead {
  font-size: 0.875rem;
}

@media screen and (max-width: 600px) {
  .tb-grados thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  .tb-grados.v-data-table td {
    border-bottom: thin solid
      rgba(var(--v-border-color), var(--v-border-opacity));
    display: grid;
    text-align: justify;
    line-height: none;
    height: auto !important;
  }

  .tb-grados.v-data-table td::before {
    content: attr(data-label);
  }

  .tb-grados.v-data-table td:last-child {
    border-bottom: 0;
  }

  .tb-grados.v-data-table tr:not(:first-child) > td:first-child {
    border-top: medium solid
      rgba(var(--v-border-color), var(--v-border-opacity));
  }
}
</style>

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
            <span class="font-weight-bold">{{
              dataContacto.informacion.nombre
            }}</span></v-card-title
          >
          <v-card-text>
            <span class="text-subtitle-1 text-grey-darken-1">
              La información del certificado que esta actualizando
            </span>
          </v-card-text>
          <v-card-text>
            <span class="text-subtitle-1 text-grey-darken-1">Certificado:</span>
            <span class="text-subtitle-1 font-weight-bold">{{
              certificadoActual.dataset.length > 0
                ? certificadoActual.dataset[0].certificado_dis
                : ""
            }}</span>
            <br />
            <span class="text-subtitle-1 text-grey-darken-1"
              >No. de certificado:</span
            >
            <span class="text-subtitle-1 font-weight-bold">{{
              certificadoActual.dataset.length > 0
                ? certificadoActual.dataset[0].num_certificado
                : ""
            }}</span>
            <br />
            <span class="text-subtitle-1 text-grey-darken-1"
              >Fecha emisión:</span
            >
            <span class="text-subtitle-1 font-weight-bold">{{
              certificadoActual.dataset.length > 0
                ? certificadoActual.dataset[0].fecha_vigencia
                : ""
            }}</span>
            <br />
            <span class="text-subtitle-1 text-grey-darken-1"
              >Fecha emisión:</span
            >
            <span class="text-subtitle-1 font-weight-bold">{{
              certificadoActual.dataset.length > 0
                ? certificadoActual.dataset[0].fecha_inicio
                : ""
            }}</span>
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
              hide-details="auto"
              label="Nombre *"
              placeholder="Nombre(s)"
              v-model="dataContacto.informacion.cuenta_nombre"
              readonly
              selectable="false"
            ></v-text-field>
            <v-text-field
              class="my-4"
              hide-details="auto"
              label="Apellido paterno *"
              placeholder="Apellido paterno"
              v-model="dataContacto.informacion.cuenta_apaterno"
              readonly
              selectable="false"
            ></v-text-field>
            <v-text-field
              class="my-4"
              hide-details="auto"
              label="Apellido materno *"
              placeholder="Apellido materno"
              v-model="dataContacto.informacion.cuenta_amatarno"
              readonly
              selectable="false"
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
              v-model="dataContacto.informacion.cuenta_rfc"
            ></v-text-field>
            <v-select
              class="my-4"
              clearable
              hide-details="auto"
              label="Sexo *"
              no-data-text="No hay datos disponibles"
              variant="outlined"
              v-model="dataContacto.informacion.cuenta_sexo"
              :items="dataGenero.result"
              item-value="value"
              item-title="label"
            ></v-select>
            <v-select
              class="my-4"
              clearable
              hide-details="auto"
              label="Estado civil *"
              no-data-text="No hay datos disponibles"
              variant="outlined"
              v-model="dataContacto.informacion.cuenta_civil"
              :items="dataEstadoCivil.result"
              item-value="value"
              item-title="label"
            ></v-select>
            <v-text-field
              class="my-4"
              clearable
              hide-details="auto"
              label="Lugar de nacimiento *"
              placeholder="Estado"
              variant="outlined"
              v-model="dataContacto.informacion.lugar_nacimiento"
            ></v-text-field>

            <v-text-field
              class="my-4"
              clearable
              hide-details="auto"
              label="AGAFF *"
              placeholder="Dato AGAFF"
              variant="outlined"
              v-model="dataContacto.informacion.registro_agaff"
            ></v-text-field>

            <v-text-field
              class="my-4"
              clearable
              hide-details="auto"
              label="IMSS *"
              placeholder="Dato IMMS"
              variant="outlined"
              v-model="dataContacto.informacion.registro_imss"
            ></v-text-field>

            <v-text-field
              class="my-4"
              clearable
              hide-details="auto"
              label="Email *"
              placeholder="Email"
              variant="outlined"
              v-model="dataContacto.informacion.cuenta_email"
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
              v-model="dataContacto.informacion.id_colegio"
              :items="dataColegio.result"
              item-value="value"
              item-title="label"
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
            <span class="text-subtitle-1 font-weight-bold">{{
              dataContacto.Grados &&
              Array.isArray(dataContacto.Grados) &&
              dataContacto.Grados.length > 0
                ? dataContacto.Grados[0].gradoAcademico
                : ""
            }}</span>
            <br />
            <span class="text-subtitle-1 text-grey-darken-1"
              >Institución:
            </span>
            <span class="text-subtitle-1 font-weight-bold">{{
              dataContacto.Grados &&
              Array.isArray(dataContacto.Grados) &&
              dataContacto.Grados.length > 0
                ? dataContacto.Grados[0].institucion
                : ""
            }}</span>
            <br />
            <span class="text-subtitle-1 text-grey-darken-1"
              >Año titulación:
            </span>
            <span class="text-subtitle-1 font-weight-bold">{{
              dataContacto.Grados &&
              Array.isArray(dataContacto.Grados) &&
              dataContacto.Grados.length > 0
                ? dataContacto.Grados[0].anhioTitulo
                : ""
            }}</span>
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
              v-model="dataContacto.informacion.calle"
            ></v-text-field>
            <v-text-field
              class="my-4"
              clearable
              hide-details="auto"
              label="C.P."
              placeholder="Código postal"
              variant="outlined"
              v-model="dataContacto.informacion.cp"
              v-on:keyup="cambiarCodigoPostal"
            ></v-text-field>
            <v-select
              class="my-4"
              hide-details="auto"
              label="Colonia *"
              no-data-text="No hay datos disponibles"
              variant="outlined"
              v-model="dataContacto.informacion.colinia"
              :items="nuevasColoniasOptions"
              item-value="value"
              item-title="label"
            ></v-select>
            <v-text-field
              class="my-4"
              hide-details="auto"
              label="Alcaldía o municipio *"
              no-data-text="No hay datos disponibles"
              variant="outlined"
              readonly
              selectable="false"
              v-model="dataContacto.informacion.delegacion"
            ></v-text-field>
            <v-text-field
              class="my-4"
              hide-details="auto"
              label="Estado *"
              no-data-text="No hay datos disponibles"
              variant="outlined"
              readonly
              selectable="false"
              v-model="dataContacto.informacion.estado"
            ></v-text-field>
            <v-text-field
              class="my-4"
              clearable
              hide-details="auto"
              label="Teléfono *"
              placeholder="Teléfono"
              variant="outlined"
              v-model="dataContacto.informacion.num_personal"
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
              hide-details="auto"
              label="Sector *"
              no-data-text="No hay datos disponibles"
              variant="outlined"
              v-model="dataContacto.informacion.id_sector"
              :items="dataSector.result"
              item-value="value"
              item-title="label"
            ></v-select>
            <v-text-field
              class="my-4"
              clearable
              hide-details="auto"
              label="Empresa *"
              placeholder="Empresa en la que labora"
              variant="outlined"
              v-model="dataEmpresa.nombreEmpresa"
            ></v-text-field>
            <v-text-field
              class="my-4"
              hide-details="auto"
              label="Antiguedad *"
              placeholder="Antiguedad en la empresa en la que labora"
              variant="outlined"
              v-model="dataEmpresa.antiguedad"
            ></v-text-field>

            <v-menu :close-on-content-click="true">
              <template v-slot:activator="{ props }">
                <v-text-field
                  label="Antiguedad"
                  :model-value="formattedDate"
                  readonly
                  v-bind="props"
                  variant="solo"
                  hide-details
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="selectedDate"
                hide-actions
                title="Seleccione fecha"
                :color="colores.rojoClaro"
              >
                <template v-slot:header></template>
              </v-date-picker>
            </v-menu>

            <v-text-field
              class="my-4"
              clearable
              hide-details="auto"
              label="Puesto *"
              no-data-text="No hay datos disponibles"
              variant="outlined"
              v-model="dataEmpresa.puesto"
            ></v-text-field>
            <v-select
              class="my-4"
              hide-details="auto"
              label="Especialidad *"
              no-data-text="No hay datos disponibles"
              variant="outlined"
              v-model="dataEmpresa.idEspecialidad"
              :items="dataEspecialidad.result"
              item-value="value"
              item-title="label"
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
              v-model="dataContacto.informacion.direccion_calle_numero_empresa"
            ></v-text-field>
            <v-text-field
              class="my-4"
              clearable
              hide-details="auto"
              label="C.P."
              placeholder="Código postal"
              variant="outlined"
              v-model="dataContacto.informacion.direccion_cp_empresa"
              v-on:keyup="cambiarCodigoPostalEmpresa"
            ></v-text-field>
            <v-select
              class="my-4"
              hide-details="auto"
              label="Colonia *"
              no-data-text="No hay datos disponibles"
              variant="outlined"
              v-model="dataContacto.informacion.direccion_colonia_empresa"
              :items="nuevasColoniasEmpresaOptions"
              item-value="value"
              item-title="label"
            ></v-select>
            <v-text-field
              class="my-4"
              hide-details="auto"
              label="Alcaldía o municipio *"
              no-data-text="No hay datos disponibles"
              variant="outlined"
              readonly
              selectable="false"
              v-model="dataContacto.informacion.direccion_delegacion_empresa"
            ></v-text-field>
            <v-text-field
              class="my-4"
              hide-details="auto"
              label="Estado *"
              no-data-text="No hay datos disponibles"
              variant="outlined"
              readonly
              selectable="false"
              v-model="dataContacto.informacion.direccion_estado_empresa"
            ></v-text-field>
            <v-text-field
              class="my-4"
              clearable
              hide-details="auto"
              label="Teléfono empresa *"
              placeholder="Teléfono"
              variant="outlined"
              v-model="dataContacto.informacion.num_empresa"
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
              v-model="dataContacto.informacion.nombre"
            ></v-text-field>
            <v-text-field
              class="my-4"
              clearable
              hide-details="auto"
              label="RFC *"
              placeholder="RFC"
              variant="outlined"
              v-model="dataContacto.informacion.rfc"
            ></v-text-field>
            <v-text-field
              class="my-4"
              clearable
              hide-details="auto"
              label="Calle y número *"
              placeholder="Domicilio"
              variant="outlined"
              v-model="dataContacto.informacion.direccion_calle_numero_personal"
            ></v-text-field>
            <v-text-field
              class="my-4"
              clearable
              hide-details="auto"
              label="C.P."
              placeholder="Código postal"
              variant="outlined"
              v-model="dataContacto.informacion.direccion_cp_personal"
              v-on:keyup="cambiarCodigoPostalFacturacion"
            ></v-text-field>
            <v-select
              class="my-4"
              hide-details="auto"
              label="Colonia *"
              no-data-text="No hay datos disponibles"
              variant="outlined"
              v-model="dataContacto.informacion.direccion_colonia_personal"
              :items="nuevasColoniasFacturacionOptions"
              item-value="value"
              item-title="label"
            ></v-select>
            <v-text-field
              class="my-4"
              hide-details="auto"
              label="Alcaldía o municipio *"
              no-data-text="No hay datos disponibles"
              variant="outlined"
              readonly
              selectable="false"
              v-model="dataContacto.informacion.direccion_delegacion_personal"
            ></v-text-field>
            <v-text-field
              class="my-4"
              hide-details="auto"
              label="Estado *"
              no-data-text="No hay datos disponibles"
              variant="outlined"
              readonly
              selectable="false"
              v-model="dataContacto.informacion.direccion_estado_personal"
            ></v-text-field>
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
import {
  ref,
  computed,
  defineComponent,
  watch,
  onMounted,
  onBeforeMount,
  onBeforeUnmount,
  defineProps,
  defineEmits,
} from "vue";
import { IonPage, IonContent, onIonViewDidEnter } from "@ionic/vue";
import { usePagoStore } from "@/store/pago";
import { useCertificadoStore } from "@/store/certificado";
import { useRoute } from "vue-router";
import { VDatePicker } from "vuetify/lib/labs/components.mjs";

export interface Certificados {
  dataset: Dataset[];
  totalSize: number;
  pageSize: number;
  nombreListado: string;
}

export interface Dataset {
  id_certificado: number;
  id_estudiante: number;
  id_colegio: number;
  id_tipo: number;
  id_tipo_certificado: number;
  id_certificado_dis: number;
  num_certificado: string;
  fecha_vigencia: string;
  fecha_inicio: string;
  status_certificado: string;
  proviene: string;
  id_certificado_nuevo: number;
  status: string;
  id_certificado_viejo: number;
  nombre: string;
  puntos_obtenidos: number;
  puntos_totales: number;
  status_autorizar: string;
  info_certificado: string;
  dateupdate: string;
  datecreation: string;
  anhio_inicio_vigencia: string;
  anhio_fin_vigencia: string;
  cuenta_rfc: string;
  cuenta_nombre: string;
  cuenta_apaterno: string;
  cuenta_amatarno: string;
  cuenta_email: string;
  status_contacto: string;
  registro_agaff: string;
  anhio_inicio_vigencia_nuevo: string;
  anhio_fin_vigencia_nuevo: string;
  tipo: string;
  tipo_certificado: string;
  certificado_dis: string;
  sector: string;
  revisionAnual: RevisionAnual[];
}

export interface RevisionAnual {
  anhio: string;
  status: string;
}

export interface Genero {
  result: ResultGenero[];
  type: string;
}

export interface ResultGenero {
  value: string;
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

export interface InformacionUsuario {
  informacion: Informacion;
  empresa: Empresa[];
  Grados: Grado[];
  especialidad: EspecialidadContanto[];
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

export interface Empresa {
  empresaId: number;
  idSector: number;
  cuentasUsuariosId: number;
  nombreEmpresa: string;
  antiguedad: string;
  puesto: string;
}

export interface Grado {
  idGradoAcademico: number;
  cuentasUsuariosId: number;
  gradoAcademico: string;
  institucion: string;
  anhioTitulo: number;
}

export interface EspecialidadContanto {
  cuentasUsuariosId: number;
  catalogoEspecialidadId: number;
}

export interface CodigoPostal {
  result: ResultCodigoPostal[];
  type: string;
}

export interface ResultCodigoPostal {
  codigoPostal: string;
  estadoId: number;
  estado: string;
  colonia: string;
  delegacion: string;
}

export default defineComponent({
  name: "ActualizacionDatos",
  components: {
    IonContent,
    IonPage,
    VDatePicker,
  },
  props: ["label", "color", "modelValue"],
  setup(props, { emit }) {
    const pagoStore = usePagoStore();
    const route = useRoute();

    const certificadoStore = useCertificadoStore();

    const certificadoActual = ref<Certificados>({
      dataset: [],
      totalSize: 0,
      pageSize: 0,
      nombreListado: "",
    });

    const show = ref(false);
    const colores = ref({
      rojoIMPC: "#B20000",
      rojoClaro: "#FAE6EA",
      grisOscuro: "#222222",
      verdeBoton: "#468C00",
    });

    const dataContacto = ref<InformacionUsuario>({
      informacion: {
        cuentas_usuarios_id: 0,
        id_sector: 0,
        id_tipo_origen: 0,
        cuenta_rfc: "",
        cuenta_nombre: "",
        cuenta_apaterno: "",
        cuenta_amatarno: "",
        cuenta_sexo: "",
        cuenta_email: "",
        cuenta_civil: "",
        lugar_nacimiento: "",
        registro_agaff: "",
        anhio_titulo: "",
        tipo_ususario: "",
        expositor: "",
        status: "",
        registro_imss: "",
        infonavit: "",
        datecreation: "",
        dateupdate: "",
        id_colegio: 0,
        organismo: "",
        cuenta_pagado: 0,
        cuenta_socio: "",
        cuenta_status: "",
        articulo: "",
        anhio_nacimiento: "",
        nombre_colegio: "",
        dato_facturacion_id: 0,
        nombre: "",
        rfc: "",
        cp: "",
        calle: "",
        colinia: "",
        delegacion: "",
        ciudad: "",
        estado: "",
        tipo_persona: null,
        regimen_fiscal_id: null,
        direccion_id_personal: 0,
        num_personal: "",
        direccion_nombre_personal: "",
        direccion_calle_numero_personal: "",
        direccion_cp_personal: "",
        direccion_colonia_personal: "",
        direccion_delegacion_personal: "",
        direccion_estado_personal: "",
        direccion_id_empresa: 0,
        num_empresa: "",
        direccion_nombre_empresa: "",
        direccion_calle_numero_empresa: "",
        direccion_cp_empresa: "",
        direccion_colonia_empresa: "",
        direccion_delegacion_empresa: "",
        direccion_estado_empresa: "",
      },
      empresa: [],
      Grados: [],
      especialidad: [],
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

    const dataCodigoPostal = ref<CodigoPostal>({
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

    const nuevasColoniasOptions = ref([
      {
        label: "",
        value: "",
      },
    ]);

    const nuevasColoniasFacturacionOptions = ref([
      {
        label: "",
        value: "",
      },
    ]);

    const nuevasColoniasEmpresaOptions = ref([
      {
        label: "",
        value: "",
      },
    ]);

    const dataEmpresa = ref({
      nombreEmpresa: "",
      idSector: 0,
      empresaId: 0,
      antiguedad: "",
      puesto: "",
      idEspecialidad: 0,
    });

    async function catalogoGenero() {
      try {
        await pagoStore.cargarCatalogoGenero();
        dataGenero.value = pagoStore.object.catalogoGenero as Genero;
      } catch (error) {
        console.log(error);
      }
    }

    async function catalogoEstadoCivil() {
      try {
        await pagoStore.cargarCatalogoEstadoCivil();
        dataEstadoCivil.value = pagoStore.object
          .catalogoEstadoCivil as EstadoCivil;
      } catch (error) {
        console.log(error);
      }
    }

    async function catalogoColegio() {
      try {
        await pagoStore.cargarCatalogoColegio();

        dataColegio.value = pagoStore.object.catalogoColegio as Colegio;
      } catch (error) {
        console.log(error);
      }
    }

    async function catalogoSector() {
      try {
        if (dataContacto.value.informacion.articulo == "Inactivo") {
          await pagoStore.cargarCatalogoSector();
        } else {
          await pagoStore.cargarCatalogoSectorEspecial();
        }

        dataSector.value = pagoStore.object.catalogoSector as Sector;
      } catch (error) {
        console.log(error);
      }
    }

    async function catalogoEspecialidad() {
      try {
        await pagoStore.cargarCatalogoEspecialidad();

        dataEspecialidad.value = pagoStore.object
          .catalogoEspecialidad as Especialidad;
      } catch (error) {
        console.log(error);
      }
    }

    async function cargarDesglosePorEjercicio(idCertificado: any) {
      certificadoActual.value = {
        dataset: [],
        totalSize: 0,
        pageSize: 0,
        nombreListado: "",
      };

      try {
        await certificadoStore.cargarCertificadosPendientes();

        certificadoActual.value = certificadoStore.object
          .certificadosPendientes as Certificados;

        certificadoActual.value.dataset = (
          certificadoActual.value.dataset as Dataset[]
        ).filter(
          (certificado) => certificado.id_certificado == idCertificado
        ) as Dataset[];
      } catch (error) {}
    }

    async function cargarContacto() {
      try {
        await pagoStore.cargarContacto();

        dataContacto.value = pagoStore.object.contacto as InformacionUsuario;

        await cargarCodigoPostal(dataContacto.value.informacion.cp);

        await cargarCodigoPostalFacturacion(
          dataContacto.value.informacion.direccion_cp_personal
        );

        await cargarCodigoPostalEmpresa(
          dataContacto.value.informacion.direccion_cp_empresa
        );

        if (dataContacto.value.empresa.length > 0) {
          dataEmpresa.value.empresaId = dataContacto.value.empresa[0].empresaId;
          dataEmpresa.value.idSector = dataContacto.value.empresa[0].idSector;
          dataEmpresa.value.nombreEmpresa =
            dataContacto.value.empresa[0].nombreEmpresa;
          dataEmpresa.value.antiguedad =
            dataContacto.value.empresa[0].antiguedad;
          dataEmpresa.value.puesto = dataContacto.value.empresa[0].puesto;

          dataEmpresa.value.idEspecialidad =
            dataContacto.value.especialidad[0].catalogoEspecialidadId;
        }

        await catalogoSector();
      } catch (error) {
        console.log(error);
      }
    }

    async function cargarCodigoPostalEmpresa(codigoPostal: string) {
      await pagoStore.cargarCatalogoCodigoPostal(codigoPostal);

      dataCodigoPostal.value = pagoStore.object.codigoPostal as CodigoPostal;

      if (dataCodigoPostal.value.result.length > 0) {
        dataContacto.value.informacion.direccion_delegacion_empresa =
          dataCodigoPostal.value.result[0].delegacion;
        dataContacto.value.informacion.direccion_estado_empresa =
          dataCodigoPostal.value.result[0].estado;
      }

      await cargarColoniasEmpresa();
    }

    async function cargarColoniasEmpresa() {
      nuevasColoniasEmpresaOptions.value = [];

      try {
        const coloniasOptions = dataCodigoPostal.value.result.map(
          (colonia) => ({
            value: colonia.colonia,
            label: colonia.colonia,
          })
        );

        nuevasColoniasEmpresaOptions.value = coloniasOptions;
      } catch (error) {
        console.error(error);
      }
    }

    function cambiarCodigoPostalEmpresa() {
      dataContacto.value.informacion.direccion_delegacion_empresa = "";
      dataContacto.value.informacion.direccion_estado_empresa = "";
      dataContacto.value.informacion.direccion_colonia_empresa = "";
      nuevasColoniasEmpresaOptions.value = [];

      if (dataContacto.value.informacion.direccion_cp_empresa.length == 5) {
        cargarCodigoPostalEmpresa(
          dataContacto.value.informacion.direccion_cp_empresa
        );
      }
    }

    async function cargarCodigoPostalFacturacion(codigoPostal: string) {
      await pagoStore.cargarCatalogoCodigoPostal(codigoPostal);

      dataCodigoPostal.value = pagoStore.object.codigoPostal as CodigoPostal;

      if (dataCodigoPostal.value.result.length > 0) {
        dataContacto.value.informacion.direccion_delegacion_personal =
          dataCodigoPostal.value.result[0].delegacion;
        dataContacto.value.informacion.direccion_estado_personal =
          dataCodigoPostal.value.result[0].estado;
      }

      await cargarColoniasFacturacion();
    }

    async function cargarColoniasFacturacion() {
      nuevasColoniasFacturacionOptions.value = [];

      try {
        const coloniasOptions = dataCodigoPostal.value.result.map(
          (colonia) => ({
            value: colonia.colonia,
            label: colonia.colonia,
          })
        );

        nuevasColoniasFacturacionOptions.value = coloniasOptions;
      } catch (error) {
        console.error(error);
      }
    }

    function cambiarCodigoPostalFacturacion() {
      dataContacto.value.informacion.direccion_delegacion_personal = "";
      dataContacto.value.informacion.direccion_estado_personal = "";
      dataContacto.value.informacion.direccion_colonia_personal = "";
      nuevasColoniasFacturacionOptions.value = [];

      if (dataContacto.value.informacion.direccion_cp_personal.length == 5) {
        cargarCodigoPostalFacturacion(
          dataContacto.value.informacion.direccion_cp_personal
        );
      }
    }

    async function cargarCodigoPostal(codigoPostal: string) {
      await pagoStore.cargarCatalogoCodigoPostal(codigoPostal);

      dataCodigoPostal.value = pagoStore.object.codigoPostal as CodigoPostal;

      if (dataCodigoPostal.value.result.length > 0) {
        dataContacto.value.informacion.delegacion =
          dataCodigoPostal.value.result[0].delegacion;
        dataContacto.value.informacion.estado =
          dataCodigoPostal.value.result[0].estado;
      }

      await cargarColonias();
    }

    async function cargarColonias() {
      nuevasColoniasOptions.value = [];

      try {
        const coloniasOptions = dataCodigoPostal.value.result.map(
          (colonia) => ({
            value: colonia.colonia,
            label: colonia.colonia,
          })
        );

        nuevasColoniasOptions.value = coloniasOptions;
      } catch (error) {
        console.error(error);
      }
    }

    function cambiarCodigoPostal() {
      dataContacto.value.informacion.delegacion = "";
      dataContacto.value.informacion.estado = "";
      dataContacto.value.informacion.colinia = "";
      nuevasColoniasOptions.value = [];

      if (dataContacto.value.informacion.cp.length == 5) {
        cargarCodigoPostal(dataContacto.value.informacion.cp);
      }
    }

    onIonViewDidEnter(async () => {
      const idCertificado = route.params.idCertificado;

      await cargarDesglosePorEjercicio(idCertificado);
      await catalogoGenero();
      await catalogoEstadoCivil();
      await catalogoColegio();
      //await catalogoSector();
      await catalogoEspecialidad();
      await cargarContacto();
    });

    const isMenuOpen = ref(false);
    const selectedDate = ref(props.modelValue);

    const formattedDate = computed(() => {
      return selectedDate.value
        ? selectedDate.value.toLocaleString("en-GB", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })
        : "";
    });

    watch(
      () => props.modelValue,
      (newDate) => {
        selectedDate.value = newDate;
      }
    );

    watch(
      () => selectedDate.value,
      (newDate) => {
        emit("update:modelValue", newDate);
      }
    );

    return {
      colores,
      show,
      certificadoActual,
      dataContacto,
      dataGenero,
      dataEstadoCivil,
      dataColegio,
      dataSector,
      nuevasColoniasOptions,
      cambiarCodigoPostal,
      nuevasColoniasFacturacionOptions,
      cambiarCodigoPostalFacturacion,
      nuevasColoniasEmpresaOptions,
      cambiarCodigoPostalEmpresa,
      dataEmpresa,
      dataEspecialidad,
      selectedDate,
      isMenuOpen,
      formattedDate,
    };
  },
});
</script>

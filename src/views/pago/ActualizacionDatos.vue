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
              Actualizar datos
            </v-card-title>
          </v-card-item>
        </v-card>
        <v-form v-model="isValid" lazy-validation ref="formEl">
          <v-card class="my-3" elevation="0" border>
            <v-card-title
              >Estimado (a)
              <span class="font-weight-bold">{{
                dataModel.nombre
              }}</span></v-card-title
            >
            <v-card-text>
              <span class="text-subtitle-1 text-grey-darken-1">
                La información del certificado que esta actualizando
              </span>
            </v-card-text>
            <v-card-text>
              <span class="text-subtitle-1 text-grey-darken-1"
                >Certificado:</span
              >
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
                >Por medio de este formulario se actualizará su información en
                el sistema DPC (Sistema de puntos de control) del Instituto
                Mexicano de Contadores Públicos.</span
              >
            </v-card-text>
          </v-card>
          <v-card class="my-3" elevation="0" border>
            <v-card-title>
              <span class="font-weight-bold"
                >Datos personales</span
              ></v-card-title
            >
            <v-card-text>
              <v-text-field
                class="my-4"
                hide-details="auto"
                label="Nombre *"
                placeholder="Nombre(s)"
                v-model="dataModel.cuenta_nombre"
                readonly
                selectable="false"
              ></v-text-field>
              <v-text-field
                class="my-4"
                hide-details="auto"
                label="Apellido paterno *"
                placeholder="Apellido paterno"
                v-model="dataModel.cuenta_apaterno"
                readonly
                selectable="false"
              ></v-text-field>
              <v-text-field
                class="my-4"
                hide-details="auto"
                label="Apellido materno *"
                placeholder="Apellido materno"
                v-model="dataModel.cuenta_amatarno"
                readonly
                selectable="false"
              ></v-text-field>
              <br />
              <br />
              <span class="text-subtitle-1 text-red-darken-1">
                * En caso de requerir actualizar el nombre y/o apellidos, favor
                de enviar un correo a la direccion
                soporte.certificacion@imcp.org.mx
              </span>
              <br />
              <br />
              <v-text-field
                class="my-4"
                hide-details="auto"
                label="RFC *"
                placeholder="RFC"
                readonly
                selectable="false"
                v-model="dataModel.cuenta_rfc"
              ></v-text-field>
              <v-select
                class="my-4"
                clearable
                hide-details="auto"
                label="Sexo *"
                no-data-text="No hay datos disponibles"
                variant="outlined"
                v-model="dataModel.cuenta_sexo"
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
                v-model="dataModel.cuenta_civil"
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
                v-model="dataModel.lugar_nacimiento"
                :rules="[rules.required]"
              ></v-text-field>

              <v-text-field
                class="my-4"
                clearable
                hide-details="auto"
                label="AGAFF *"
                placeholder="Dato AGAFF"
                variant="outlined"
                v-model="dataModel.registro_agaff"
                :rules="[rules.required]"
              ></v-text-field>

              <v-text-field
                class="my-4"
                clearable
                hide-details="auto"
                label="IMSS *"
                placeholder="Dato IMMS"
                variant="outlined"
                v-model="dataModel.registro_imss"
                :rules="[rules.required]"
              ></v-text-field>

              <v-text-field
                class="my-4"
                clearable
                hide-details="auto"
                label="Email *"
                placeholder="Email"
                variant="outlined"
                v-model="dataModel.cuenta_email"
                :rules="[rules.required, rules.validEmail]"
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
                v-model="dataModel.id_colegio"
                :items="dataColegio.result"
                item-value="value"
                item-title="label"
              ></v-select>
            </v-card-text>
          </v-card>
          <v-card class="my-3" elevation="0" border>
            <v-card-title>
              <span class="font-weight-bold"
                >Grado académico</span
              ></v-card-title
            >
            <v-card-text>
              <span class="text-subtitle-1 text-grey-darken-1"
                >Grado académico:
              </span>
              <span class="text-subtitle-1 font-weight-bold">{{
                dataModel.grado_academico
              }}</span>
              <br />
              <span class="text-subtitle-1 text-grey-darken-1"
                >Institución:
              </span>
              <span class="text-subtitle-1 font-weight-bold">{{
                dataModel.grado_academico_institucion
              }}</span>
              <br />
              <span class="text-subtitle-1 text-grey-darken-1"
                >Año titulación:
              </span>
              <span class="text-subtitle-1 font-weight-bold">{{
                dataModel.grado_academico_anhio_titulo
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
                v-model="dataModel.direccion_calle_numero"
                :rules="[rules.required]"
              ></v-text-field>
              <v-text-field
                class="my-4"
                clearable
                hide-details="auto"
                label="C.P."
                placeholder="Código postal"
                variant="outlined"
                v-model="dataModel.direccion_cp"
                v-on:keyup="cambiarCodigoPostal"
                :rules="[rules.required]"
              ></v-text-field>
              <v-select
                class="my-4"
                hide-details="auto"
                label="Colonia *"
                no-data-text="No hay datos disponibles"
                variant="outlined"
                v-model="dataModel.direccion_colonia"
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
                v-model="dataModel.direccion_delegacion"
              ></v-text-field>
              <v-text-field
                class="my-4"
                hide-details="auto"
                label="Estado *"
                no-data-text="No hay datos disponibles"
                variant="outlined"
                readonly
                selectable="false"
                v-model="dataModel.direccion_estado"
              ></v-text-field>
              <v-text-field
                class="my-4"
                clearable
                hide-details="auto"
                label="Teléfono *"
                placeholder="Teléfono"
                variant="outlined"
                v-model="dataModel.telefono"
                :rules="[rules.required, rules.validTelefono]"
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
                v-model="dataModel.empresa_id_sector"
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
                v-model="dataModel.empresa_nombre_empresa"
                :rules="[rules.required]"
              ></v-text-field>

              <v-menu :close-on-content-click="true">
                <template v-slot:activator="{ props }">
                  <v-text-field
                    label="Antiguedad"
                    v-model="dataModel.empresa_antiguedad"
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
                v-model="dataModel.empresa_puesto"
              ></v-text-field>
              <v-select
                class="my-4"
                hide-details="auto"
                label="Especialidad *"
                no-data-text="No hay datos disponibles"
                variant="outlined"
                v-model="dataModel.empresa_catalogo_especialidad_id"
                :items="dataEspecialidad.result"
                :rules="[rules.required]"
                item-value="value"
                item-title="label"
              ></v-select>
            </v-card-text>
          </v-card>
          <v-card class="my-3" elevation="0" border>
            <v-card-title>
              <span class="font-weight-bold"
                >Domicilio: Lugar de residencia de empresa, institución o
                despacho en que labora</span
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
                v-model="dataModel.direccion_empresa_calle_numero"
                :rules="[rules.required]"
              ></v-text-field>
              <v-text-field
                class="my-4"
                clearable
                hide-details="auto"
                label="C.P."
                placeholder="Código postal"
                variant="outlined"
                v-model="dataModel.direccion_empresa_cp"
                v-on:keyup="cambiarCodigoPostalEmpresa"
                :rules="[rules.required]"
              ></v-text-field>
              <v-select
                class="my-4"
                hide-details="auto"
                label="Colonia *"
                no-data-text="No hay datos disponibles"
                variant="outlined"
                v-model="dataModel.direccion_empresa_colonia"
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
                v-model="dataModel.direccion_empresa_delegacion"
              ></v-text-field>
              <v-text-field
                class="my-4"
                hide-details="auto"
                label="Estado *"
                no-data-text="No hay datos disponibles"
                variant="outlined"
                readonly
                selectable="false"
                v-model="dataModel.direccion_empresa_estado"
              ></v-text-field>
              <v-text-field
                class="my-4"
                clearable
                hide-details="auto"
                label="Teléfono empresa *"
                placeholder="Teléfono"
                variant="outlined"
                v-model="dataModel.direccion_empresa_telefono"
                :rules="[rules.required, rules.validTelefono]"
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
                v-model="dataModel.facturacion_nombre"
                :rules="[rules.required]"
              ></v-text-field>
              <v-text-field
                class="my-4"
                clearable
                hide-details="auto"
                label="RFC *"
                placeholder="RFC"
                variant="outlined"
                v-model="dataModel.facturacion_rfc"
                :rules="[rules.required, rules.validRFC]"
              ></v-text-field>
              <v-text-field
                class="my-4"
                clearable
                hide-details="auto"
                label="Calle y número *"
                placeholder="Domicilio"
                variant="outlined"
                v-model="dataModel.facturacion_calle"
                :rules="[rules.required]"
              ></v-text-field>
              <v-text-field
                class="my-4"
                clearable
                hide-details="auto"
                label="C.P."
                placeholder="Código postal"
                variant="outlined"
                v-model="dataModel.facturacion_cp"
                v-on:keyup="cambiarCodigoPostalFacturacion"
              ></v-text-field>
              <v-select
                class="my-4"
                hide-details="auto"
                label="Colonia *"
                no-data-text="No hay datos disponibles"
                variant="outlined"
                v-model="dataModel.facturacion_colonia"
                :items="nuevasColoniasFacturacionOptions"
                :rules="[rules.required]"
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
                v-model="dataModel.facturacion_delegacion"
              ></v-text-field>
              <v-text-field
                class="my-4"
                hide-details="auto"
                label="Estado *"
                no-data-text="No hay datos disponibles"
                variant="outlined"
                readonly
                selectable="false"
                v-model="dataModel.facturacion_estado"
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
                informarle que de conformidad con la Ley Federal de Protección
                de Datos Personales en Posesión de Particulares, se entenderá
                que usted está de acuerdo con la recopilación, uso,
                transferencia y almacenamiento de datos personales,
                patrimoniales y, en su caso, sensibles que nos sean
                proporcionados con motivo de "Solicitud de Exámen Uniforme de
                Certificación, Certificación por Disciplinas", para moayor
                información respecto a nuestras políticas de privacidad por
                favor consulte la página (www.imcp.org.mx).
              </span>
            </v-card-text>
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
                @click="actualizarDatos"
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
                :to="{ name: 'certificadoEstatus' }"
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
import { ref, computed, defineComponent, watch } from "vue";
import {
  IonPage,
  IonContent,
  onIonViewDidEnter,
  alertController,
} from "@ionic/vue";
import { usePagoStore } from "@/store/pago";
import { useCertificadoStore } from "@/store/certificado";
import { useRouter, Router, useRoute } from "vue-router";
import { VDatePicker } from "vuetify/lib/labs/components.mjs";

const showAlert = async (header: string, message: string) => {
  const alert = await alertController.create({
    header,
    message,
    buttons: ["OK"],
  });

  await alert.present();
};

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
    const router: Router = useRouter();
    const isValid = ref(true);
    const formEl = ref<any>(null);
    const certificadoStore = useCertificadoStore();

    const certificadoActual = ref<Certificados>({
      dataset: [],
      totalSize: 0,
      pageSize: 0,
      nombreListado: "",
    });

    const rfcRegex = /^[A-Z&Ñ]{3,4}\d{6}[A-V1-9][A-Z1-9]\d{1}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telefonoRegex = /^\d{10}$/;

    const rules = {
      validRFC: (v: string) => rfcRegex.test(v) || "RFC no válido",
      validEmail: (v: string) =>
        emailRegex.test(v) || "Correo electrónico no válido",
      validTelefono: (v: string) =>
        telefonoRegex.test(v) || "Teléfono no válido",
      required: (v: string) => !!v || "Este campo es requerido",
    };

    const idCertificadoParams = ref(0);
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

        idCertificadoParams.value = idCertificado;
      } catch (error) {}
    }

    const dataModel = ref({
      nombre: "",
      cuentas_usuarios_id: 0,
      cuenta_socio: "Si",
      cuenta_nombre: "",
      cuenta_apaterno: "",
      cuenta_amatarno: "",
      cuenta_rfc: "",
      cuenta_sexo: "",
      cuenta_civil: "",
      lugar_nacimiento: "",
      registro_agaff: "",
      registro_imss: "",
      cuenta_email: "",
      id_colegio: 0,
      grado_academico: "",
      grado_academico_institucion: "",
      grado_academico_anhio_titulo: 0,
      direccion_id: 0,
      direccion_calle_numero: "",
      direccion_cp: "",
      direccion_colonia: "",
      direccion_delegacion: "",
      direccion_estado: "",
      telefono: "",
      empresa_id: 0,
      empresa_id_sector: 0,
      empresa_nombre_empresa: "",
      empresa_antiguedad: "",
      empresa_puesto: "",
      empresa_catalogo_especialidad_id: 0,
      direccion_empresa_id: 0,
      direccion_empresa_calle_numero: "",
      direccion_empresa_cp: "",
      direccion_empresa_colonia: "",
      direccion_empresa_delegacion: "",
      direccion_empresa_estado: "",
      direccion_empresa_telefono: "",

      dato_facturacion_id: 0,
      facturacion_nombre: "",
      facturacion_rfc: "",
      facturacion_calle: "",
      facturacion_cp: "",
      facturacion_colonia: "",
      facturacion_delegacion: "",
      facturacion_estado: "",
      tipo_persona: "",
      regimen_fiscal_id: "",
    });

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

        /*
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
        }*/

        // cuenta_usuarios[]
        dataModel.value.cuentas_usuarios_id =
          dataContacto.value.informacion.cuentas_usuarios_id;
        dataModel.value.nombre = dataContacto.value.informacion.nombre;
        dataModel.value.cuenta_nombre =
          dataContacto.value.informacion.cuenta_nombre;
        dataModel.value.cuenta_apaterno =
          dataContacto.value.informacion.cuenta_apaterno;
        dataModel.value.cuenta_amatarno =
          dataContacto.value.informacion.cuenta_amatarno;

        // cuenta_usuarios[]
        dataModel.value.cuenta_rfc = dataContacto.value.informacion.cuenta_rfc;
        dataModel.value.cuenta_sexo =
          dataContacto.value.informacion.cuenta_sexo;
        dataModel.value.cuenta_civil =
          dataContacto.value.informacion.cuenta_civil;
        dataModel.value.lugar_nacimiento =
          dataContacto.value.informacion.lugar_nacimiento;
        dataModel.value.registro_agaff =
          dataContacto.value.informacion.registro_agaff;
        dataModel.value.registro_imss =
          dataContacto.value.informacion.registro_imss;
        dataModel.value.cuenta_email =
          dataContacto.value.informacion.cuenta_email;

        // cuenta_usuarios[]
        dataModel.value.id_colegio = dataContacto.value.informacion.id_colegio;

        // grados_academicos_cuentas[]
        dataModel.value.grado_academico =
          dataContacto.value.Grados &&
          Array.isArray(dataContacto.value.Grados) &&
          dataContacto.value.Grados.length > 0
            ? dataContacto.value.Grados[0].gradoAcademico
            : "";
        dataModel.value.grado_academico_institucion =
          dataContacto.value.Grados &&
          Array.isArray(dataContacto.value.Grados) &&
          dataContacto.value.Grados.length > 0
            ? dataContacto.value.Grados[0].institucion
            : "";
        dataModel.value.grado_academico_anhio_titulo =
          dataContacto.value.Grados &&
          Array.isArray(dataContacto.value.Grados) &&
          dataContacto.value.Grados.length > 0
            ? dataContacto.value.Grados[0].anhioTitulo
            : 0;

        // direccionesUs[]
        dataModel.value.direccion_id =
          dataContacto.value.informacion.direccion_id_personal;
        dataModel.value.direccion_calle_numero =
          dataContacto.value.informacion.direccion_calle_numero_personal;
        dataModel.value.direccion_cp =
          dataContacto.value.informacion.direccion_cp_personal;
        dataModel.value.direccion_colonia =
          dataContacto.value.informacion.direccion_colonia_personal;
        dataModel.value.direccion_delegacion =
          dataContacto.value.informacion.direccion_colonia_personal;
        dataModel.value.direccion_estado =
          dataContacto.value.informacion.direccion_estado_personal;
        dataModel.value.telefono =
          dataContacto.value.informacion.num_personal.replace(/\s/g, "");

        // empresa[0][]
        dataModel.value.empresa_id =
          dataContacto.value.empresa &&
          Array.isArray(dataContacto.value.empresa) &&
          dataContacto.value.empresa.length > 0
            ? dataContacto.value.empresa[0].empresaId
            : 0;
        dataModel.value.empresa_id_sector =
          dataContacto.value.empresa &&
          Array.isArray(dataContacto.value.empresa) &&
          dataContacto.value.empresa.length > 0
            ? dataContacto.value.empresa[0].idSector
            : 0;
        dataModel.value.empresa_nombre_empresa =
          dataContacto.value.empresa &&
          Array.isArray(dataContacto.value.empresa) &&
          dataContacto.value.empresa.length > 0
            ? dataContacto.value.empresa[0].nombreEmpresa
            : "";
        dataModel.value.empresa_antiguedad =
          dataContacto.value.empresa &&
          Array.isArray(dataContacto.value.empresa) &&
          dataContacto.value.empresa.length > 0
            ? dataContacto.value.empresa[0].antiguedad
            : "";
        dataModel.value.empresa_puesto =
          dataContacto.value.empresa &&
          Array.isArray(dataContacto.value.empresa) &&
          dataContacto.value.empresa.length > 0
            ? dataContacto.value.empresa[0].puesto
            : "";

        // cuentas_especialidades[]
        dataModel.value.empresa_catalogo_especialidad_id =
          dataContacto.value.especialidad &&
          Array.isArray(dataContacto.value.especialidad) &&
          dataContacto.value.especialidad.length > 0
            ? dataContacto.value.especialidad[0].catalogoEspecialidadId
            : 0;

        // direccionesEmpresa[]
        dataModel.value.direccion_empresa_id =
          dataContacto.value.informacion.direccion_id_empresa;
        dataModel.value.direccion_empresa_calle_numero =
          dataContacto.value.informacion.direccion_calle_numero_empresa;
        dataModel.value.direccion_empresa_cp =
          dataContacto.value.informacion.direccion_cp_empresa;
        dataModel.value.direccion_empresa_colonia =
          dataContacto.value.informacion.direccion_colonia_empresa;
        dataModel.value.direccion_empresa_delegacion =
          dataContacto.value.informacion.direccion_delegacion_empresa;
        dataModel.value.direccion_empresa_estado =
          dataContacto.value.informacion.direccion_estado_empresa;
        dataModel.value.direccion_empresa_telefono =
          dataContacto.value.informacion.num_empresa.replace(/\s/g, "");

        // datos_facturacion[]
        dataModel.value.dato_facturacion_id =
          dataContacto.value.informacion.dato_facturacion_id;
        dataModel.value.facturacion_nombre =
          dataContacto.value.informacion.nombre;
        dataModel.value.facturacion_rfc = dataContacto.value.informacion.rfc;
        dataModel.value.facturacion_calle =
          dataContacto.value.informacion.calle;
        dataModel.value.facturacion_cp = dataContacto.value.informacion.cp;
        dataModel.value.facturacion_colonia =
          dataContacto.value.informacion.colinia;
        dataModel.value.facturacion_delegacion =
          dataContacto.value.informacion.delegacion;
        dataModel.value.facturacion_estado =
          dataContacto.value.informacion.estado;

        //
        dataModel.value.tipo_persona =
          dataContacto.value.informacion.tipo_persona;
        dataModel.value.regimen_fiscal_id =
          dataContacto.value.informacion.regimen_fiscal_id;
        await catalogoSector();
      } catch (error) {
        console.log(error);
      }
    }

    async function cargarCodigoPostalEmpresa(codigoPostal: string) {
      await pagoStore.cargarCatalogoCodigoPostal(codigoPostal);

      dataCodigoPostal.value = pagoStore.object.codigoPostal as CodigoPostal;

      if (dataCodigoPostal.value.result.length > 0) {
        dataModel.value.direccion_empresa_delegacion =
          dataCodigoPostal.value.result[0].delegacion;
        dataModel.value.direccion_empresa_estado =
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
      dataModel.value.direccion_empresa_colonia = "";
      dataModel.value.direccion_empresa_delegacion = "";
      dataModel.value.direccion_empresa_estado = "";

      nuevasColoniasEmpresaOptions.value = [];

      if (dataModel.value.direccion_empresa_cp.length == 5) {
        cargarCodigoPostalEmpresa(dataModel.value.direccion_empresa_cp);
      }
    }

    async function cargarCodigoPostalFacturacion(codigoPostal: string) {
      await pagoStore.cargarCatalogoCodigoPostal(codigoPostal);

      dataCodigoPostal.value = pagoStore.object.codigoPostal as CodigoPostal;

      if (dataCodigoPostal.value.result.length > 0) {
        dataModel.value.facturacion_delegacion =
          dataCodigoPostal.value.result[0].delegacion;
        dataModel.value.facturacion_estado =
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
      dataModel.value.facturacion_delegacion = "";
      dataModel.value.facturacion_estado = "";
      dataModel.value.facturacion_colonia = "";
      nuevasColoniasFacturacionOptions.value = [];

      if (dataModel.value.facturacion_cp.length == 5) {
        cargarCodigoPostalFacturacion(dataModel.value.facturacion_cp);
      }
    }

    async function cargarCodigoPostal(codigoPostal: string) {
      await pagoStore.cargarCatalogoCodigoPostal(codigoPostal);

      dataCodigoPostal.value = pagoStore.object.codigoPostal as CodigoPostal;

      if (dataCodigoPostal.value.result.length > 0) {
        dataModel.value.direccion_delegacion =
          dataCodigoPostal.value.result[0].delegacion;
        dataModel.value.direccion_estado =
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
      dataModel.value.direccion_delegacion = "";
      dataModel.value.direccion_colonia = "";
      dataModel.value.direccion_estado = "";
      nuevasColoniasOptions.value = [];

      if (dataModel.value.direccion_cp.length == 5) {
        cargarCodigoPostal(dataModel.value.direccion_cp);
      }
    }

    onIonViewDidEnter(async () => {
      const idCertificado = route.params.idCertificado;
      //const estatus = route.params.estatus;

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

    const formattedAntiguedad = computed(() => {
      if (dataEmpresa.value && dataEmpresa.value.antiguedad) {
        const [year, month, day] = dataEmpresa.value.antiguedad.split("-");
        return `${day}/${month}/${year}`;
      }
      return "";
    });

    async function actualizarDatos() {
      try {
        const isValidForm = await formEl.value?.validate();
        if (isValidForm.valid) {
          const formData = new URLSearchParams();

          formData.append(
            "cuentas_usuarios[cuentas_usuarios_id]",
            dataModel.value.cuentas_usuarios_id.toString()
          );
          formData.append(
            "cuentas_usuarios[cuenta_rfc]",
            dataModel.value.cuenta_rfc
          );
          formData.append(
            "cuentas_usuarios[cuenta_email]",
            dataModel.value.cuenta_email
          );
          formData.append(
            "cuentas_usuarios[cuenta_nombre]",
            dataModel.value.cuenta_nombre
          );
          formData.append(
            "cuentas_usuarios[cuenta_apaterno]",
            dataModel.value.cuenta_apaterno
          );
          formData.append(
            "cuentas_usuarios[cuenta_amatarno]",
            dataModel.value.cuenta_amatarno
          );
          formData.append(
            "cuentas_usuarios[cuenta_sexo]",
            dataModel.value.cuenta_sexo
          );
          formData.append(
            "cuentas_usuarios[cuenta_civil]",
            dataModel.value.cuenta_civil
          );
          formData.append(
            "cuentas_usuarios[registro_agaff]",
            dataModel.value.registro_agaff
          );
          formData.append(
            "cuentas_usuarios[registro_imss]",
            dataModel.value.registro_imss
          );
          formData.append(
            "cuentas_usuarios[id_colegio]",
            dataModel.value.id_colegio.toString()
          );

          formData.append(
            "grados_academicos_cuentas[grado_academico][]",
            dataModel.value.grado_academico
          );
          formData.append(
            "grados_academicos_cuentas[institucion][]",
            dataModel.value.grado_academico_institucion
          );
          formData.append(
            "grados_academicos_cuentas[anhio_titulo][]",
            dataModel.value.grado_academico_anhio_titulo.toString()
          );

          formData.append(
            "direccionesUs[direccion_id]",
            dataModel.value.direccion_id.toString()
          );
          formData.append(
            "direccionesUs[direccion_calle_numero]",
            dataModel.value.direccion_calle_numero
          );
          formData.append(
            "direccionesUs[direccion_cp]",
            dataModel.value.direccion_cp
          );
          formData.append(
            "direccionesUs[direccion_colonia]",
            dataModel.value.direccion_colonia
          );
          formData.append(
            "direccionesUs[direccion_delegacion]",
            dataModel.value.direccion_delegacion
          );
          formData.append(
            "direccionesUs[direccion_estado]",
            dataModel.value.direccion_estado
          );
          formData.append("direccionesUs[telefono]", dataModel.value.telefono);

          formData.append(
            "empresa[0][empresa_id]",
            dataModel.value.empresa_id.toString()
          );
          formData.append(
            "empresa[0][id_sector]",
            dataModel.value.empresa_id_sector.toString()
          );
          formData.append(
            "empresa[0][nombre_empresa]",
            dataModel.value.empresa_nombre_empresa
          );
          formData.append(
            "empresa[0][antiguedad]",
            dataModel.value.empresa_antiguedad
          );
          formData.append("empresa[0][puesto]", dataModel.value.empresa_puesto);
          //formData.append("empresa[0][anhio_aplica_sector]", dataModel.value.empresa_id_sector);

          formData.append(
            "cuentas_especialidades[catalogo_especialidad_id][]",
            dataModel.value.empresa_catalogo_especialidad_id.toString()
          );

          formData.append(
            "direccionesEmpresa[direccion_id]",
            dataModel.value.direccion_empresa_id.toString()
          );
          formData.append(
            "direccionesEmpresa[direccion_calle_numero]",
            dataModel.value.direccion_empresa_calle_numero
          );
          formData.append(
            "direccionesEmpresa[direccion_cp]",
            dataModel.value.direccion_empresa_cp
          );
          formData.append(
            "direccionesEmpresa[direccion_colonia]",
            dataModel.value.direccion_empresa_colonia
          );
          formData.append(
            "direccionesEmpresa[direccion_delegacion]",
            dataModel.value.direccion_empresa_delegacion
          );
          formData.append(
            "direccionesEmpresa[direccion_estado]",
            dataModel.value.direccion_empresa_estado
          );
          formData.append(
            "direccionesEmpresa[telefono]",
            dataModel.value.direccion_empresa_telefono
          );

          formData.append(
            "datos_facturacion[dato_facturacion_id]",
            dataModel.value.dato_facturacion_id.toString()
          );
          formData.append(
            "datos_facturacion[nombre]",
            dataModel.value.facturacion_nombre
          );
          formData.append(
            "datos_facturacion[rfc]",
            dataModel.value.facturacion_rfc
          );
          formData.append(
            "datos_facturacion[calle]",
            dataModel.value.facturacion_calle
          );
          formData.append(
            "datos_facturacion[cp]",
            dataModel.value.facturacion_cp
          );
          formData.append(
            "datos_facturacion[DatosFacturacionColiniax]",
            dataModel.value.facturacion_colonia
          );
          formData.append(
            "datos_facturacion[delegacion]",
            dataModel.value.facturacion_delegacion
          );
          formData.append(
            "datos_facturacion[estado]",
            dataModel.value.facturacion_estado
          );

          formData.append(
            "datos_facturacion[tipo_persona]",
            dataModel.value.tipo_persona
          );
          formData.append(
            "datos_facturacion[regimen_fiscal_id]",
            dataModel.value.regimen_fiscal_id
          );

          await certificadoStore.actualizarDatos(formData);
          /*
          await showAlert(
            "Actualización de datos",
            certificadoStore.responseMessage
          );*/

          if (certificadoStore.type == "success") {
            await formEl.value?.reset();
            router.push({
              name: "seleccionAccion",
              params: {
                idCertificado: idCertificadoParams.value,
                estatus: "2",
              },
            });
          }
        } else {
          await showAlert("Actualización de datos", "Revise los datos");
        }
      } catch (error) {
        console.log(error);
        return;
      }
    }

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
      formattedAntiguedad,
      rules,
      dataModel,
      formEl,
      isValid,
      actualizarDatos,
    };
  },
});
</script>

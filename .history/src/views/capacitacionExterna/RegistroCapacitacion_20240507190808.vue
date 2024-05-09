<template>
  <ion-page>
    <ion-content ref="contentRef">
      <v-container fluid>
        <v-card class="mx-auto" color="transparent" elevation="0">
          <v-card-item>
            <v-card-title
              class="text-uppercase text-grey-darken-3 font-weight-bold text-center"
              style="white-space: normal"
            >
              Nueva capacitación externa
            </v-card-title>
          </v-card-item>
        </v-card>
        <v-form v-model="isValidForm" lazy-validation ref="refForm">
          <v-card border class="mb-3" elevation="0">
            <v-card-text class="text-justify">
              <v-select
                class="my-4"
                hide-details="auto"
                label="Colegio *"
                no-data-text="No hay datos disponibles"
                variant="outlined"
                item-value="value"
                item-title="label"
                v-model="dataModel.id_colegio"
                :items="dataColegio.result"
                :rules="[rules.requiredSelection]"
                readonly
                disabled
              ></v-select>
              <v-text-field
                class="my-4"
                clearable
                hide-details="auto"
                label="Nombre del evento *"
                placeholder="Nombre del evento"
                variant="outlined"
                v-model="dataModel.nombre_evento"
                :rules="[rules.required]"
              ></v-text-field>
              <v-text-field
                class="my-4"
                clearable
                hide-details="auto"
                label="Sede *"
                placeholder="Sede"
                variant="outlined"
                v-model="dataModel.eventos_sede"
                :rules="[rules.required]"
              ></v-text-field>
              <v-text-field
                class="my-4"
                clearable
                hide-details="auto"
                label="Expositor *"
                placeholder="Expositor"
                variant="outlined"
                v-model="dataModel.expositor"
                :rules="[rules.required]"
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
              <v-text-field
                v-model="dataModel.email"
                :rules="[rules.required, rules.validEmail]"
                class="my-4"
                clearable
                hide-details="auto"
                label="Email *"
                placeholder="Email"
                variant="outlined"
              ></v-text-field>
              <Datepicker
                v-model="dataModel.eventos_fecha_inicio"
                :format-locale="es"
                :rules="[rules.required]"
                :teleport="true"
                cancelText="Cancelar"
                class="my-4 datepickerisai"
                format="dd/MM/yyyy HH:mm"
                placeholder="Fecha de inicio *"
                required
                selectText="Aceptar"
              />
              <Datepicker
                v-model="dataModel.eventos_fecha_fin"
                :format-locale="es"
                :rules="[rules.required]"
                :teleport="true"
                cancelText="Cancelar"
                class="my-4"
                format="dd/MM/yyyy HH:mm"
                placeholder="Fecha de fin *"
                required
                selectText="Aceptar"
              />
              <v-select
                class="my-4"
                hide-details="auto"
                label="IMSS *"
                no-data-text="No hay datos disponibles"
                variant="outlined"
                v-model="dataModel.imss_id"
                :items="dataImss.result"
                item-value="value"
                item-title="label"
                multiple
              ></v-select>
            </v-card-text>

            <v-card border class="ma-3" elevation="0">
              <v-data-table
                :headers="encabezadosEspecilidad"
                :show-footer="false"
                :items="dataModel.listado_eventos"
                class="tb-grados pa-2"
                item-value="EventosNombreEvento"
                style="background-color: transparent"
              >
                <template v-slot:top>
                  <v-toolbar flat>
                    <v-spacer></v-spacer>
                    <v-btn
                      :color="colores.verdeBoton"
                      class="text-none ma-3"
                      prepend-icon="mdi-content-save-edit-outline"
                      text="Agregar disciplinas"
                      variant="flat"
                      @click="openDialogDisciplina"
                    >
                      <template v-slot:prepend>
                        <v-icon class="mr-3" size="large"></v-icon>
                      </template>
                    </v-btn>
                  </v-toolbar>
                </template>

                <template v-slot:[`item`]="{ item }">
                  <tr class="v-data-table__tr">
                    <td
                      v-for="encabezado in encabezadosEspecilidad"
                      :key="encabezado.key"
                      :data-label="encabezado.title"
                      class="v-data-table__td v-data-table-column--align-start text-body-2 text-medium-emphasis py-1"
                    >
                      <v-btn-group v-if="encabezado.key == 'actions'">
                        <v-btn
                          color="#0080FF"
                          size="small"
                          @click="editarDisciplina(item)"
                        >
                          <v-icon> mdi-pencil </v-icon>
                        </v-btn>
                        <v-btn
                          color="#B20000"
                          size="small"
                          @click="eliminarDisciplina(item)"
                        >
                          <v-icon> mdi-delete </v-icon>
                        </v-btn>
                      </v-btn-group>
                      <span v-else class="text-body-2 font-weight-bold">
                        {{ item[encabezado.key] }}
                      </span>
                    </td>
                  </tr>
                </template>
                <template v-slot:no-data>
                  <v-card
                    border
                    class="my-5 pa-10 text-center"
                    color="transparent"
                    elevation="0"
                  >
                    <v-icon color="grey-lighten-1" size="60"> mdi-school </v-icon>
                    <v-card-text class="text-grey-darken-1">
                      Aún no hay disciplinas registradas.
                    </v-card-text>
                  </v-card>
                </template>
                <template #bottom></template>
              </v-data-table>
            </v-card>
            <v-card border class="ma-3" elevation="0">
              <v-card-text class="text-justify">
                <v-file-input
                  :rules="[rules.fileRule]"
                  :show-size="1000"
                  accept="image/png, image/jpeg, image/bmp, application/pdf, "
                  placeholder="Seleccione hasta 5 archivos"
                  prepend-icon="mdi-file-multiple-outline"
                  label="Seleccione archivos"
                  multiple
                  counter
                  variant="outlined"
                  v-model="dataModel.archivos"
                ></v-file-input>
              </v-card-text>
            </v-card>
          </v-card>
          <div class="d-flex flex-column">
            <v-btn
              block
              class="mt-4"
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
            <v-btn
              block
              class="mt-4"
              prepend-icon="mdi-content-save-off-outline"
              rounded="large"
              size="large"
              text="CANCELAR"
              variant="flat"
              :color="colores.rojoIMPC"
              :to="{ name: 'capacitacionExternaListado' }"
            >
              <template v-slot:prepend>
                <v-icon class="mr-3" size="large"></v-icon>
              </template>
            </v-btn>
          </div>
        </v-form>
        <v-dialog v-model="dialogFormDisciplina" max-width="500px">
          <v-form v-model="isValidFormDisciplina" lazy-validation ref="refFormDisciplina">
            <v-card>
              <v-card-title class="text-grey-darken-1" style="text-align: center"
                >Disciplina
              </v-card-title>

              <v-card-text>
                <v-select
                  class="my-4"
                  hide-details="auto"
                  label="Disciplina *"
                  no-data-text="No hay datos disponibles"
                  variant="outlined"
                  v-model="dataModel.id_disciplina"
                  item-value="value"
                  item-title="label"
                  :items="dataEspecialidad.result"
                  :rules="[rules.requiredSelection]"
                ></v-select>
                <v-text-field
                  class="my-4"
                  clearable
                  hide-details="auto"
                  label="Puntos *"
                  placeholder="Puntos"
                  variant="outlined"
                  v-model="dataModel.puntos"
                  :rules="[rules.required, rules.onlyNumbers]"
                ></v-text-field>
                <v-text-field
                  class="my-4"
                  clearable
                  hide-details="auto"
                  label="Horas *"
                  placeholder="Horas"
                  variant="outlined"
                  v-model="dataModel.horas"
                  :rules="[rules.required, rules.onlyNumbers]"
                ></v-text-field>
                <v-select
                  class="my-4"
                  hide-details="auto"
                  label="Modalidad *"
                  no-data-text="No hay datos disponibles"
                  variant="outlined"
                  v-model="dataModel.modalidad"
                  item-value="value"
                  item-title="label"
                  :items="dataModalidad.result"
                  :rules="[rules.requiredSelection]"
                ></v-select>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  :color="colores.grisOscuro"
                  variant="flat"
                  @click="cerrarDialogDisciplina"
                >
                  Cancelar
                </v-btn>
                <v-btn
                  :color="colores.verdeBoton"
                  variant="flat"
                  @click="agregarDisciplina"
                >
                  Guardar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-dialog>
        <v-dialog v-model="dialogConfirmationDisciplina" max-width="500px">
          <v-card>
            <v-card-title
              class="text-subtitle-1 text-grey-darken-1"
              style="text-align: center"
              >¿Está seguro de eliminar el registro?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                :color="colores.grisOscuro"
                variant="flat"
                @click="cerrarDialogConfirmationDisciplina"
                >Cancelar</v-btn
              >
              <v-btn
                :color="colores.verdeBoton"
                variant="flat"
                @click="confirmarDialogDisciplina"
                >Aceptar</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
      <dialog-action
        :dialogView="dialogPropiedades.dialog"
        :dialog-title="dialogPropiedades.titulo"
        :dialog-content="dialogPropiedades.cuerpo"
        :dialog-route="dialogPropiedades.ruta"
        :dialog-colour="dialogPropiedades.color"
        :dialog-text-button="dialogPropiedades.boton"
        :dialog-speed="dialogPropiedades.velocidad"
        @cerrarDialog="cerrardialogPropiedades"
      />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { IonPage, IonContent, onIonViewDidEnter, IonSpinner } from "@ionic/vue";
import { usePagoStore } from "@/store/pago";
import { useCapacitacionStore } from "@/store/capacitacionExterna";
import { useRouter, Router, useRoute } from "vue-router";
import { VDataTable } from "vuetify/lib/labs/components.mjs";
import { Storage } from "@ionic/storage";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import "v-calendar/style.css";
import { es } from "date-fns/locale";
import DialogAction from "../helper/DialogAction.vue";

export interface Especilidad {
  result: ResultEspecialidad[];
}

export interface ResultEspecialidad {
  value: any;
  label: string;
}

export interface Modalidad {
  result: ResultModalidad[];
}

export interface ResultModalidad {
  value: any;
  label: string;
}

export interface Colegio {
  result: ResultColegio[];
}

export interface ResultColegio {
  value: any;
  label: string;
}

export interface Imss {
  result: ResultImss[];
}

export interface ResultImss {
  value: any;
  label: string;
}

export interface InformacionUsuario {
  informacion: Informacion;
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

export default defineComponent({
  name: "RegistroCapacitacion",
  components: {
    IonContent,
    IonPage,
    VDataTable,
    IonSpinner,
    Datepicker,
    DialogAction,
  },
  props: ["label", "color", "modelValue"],
  setup() {
    const route = useRoute();
    const router: Router = useRouter();

    const pagoStore = usePagoStore();
    const capacitacionStore = useCapacitacionStore();

    const contentRef = ref<HTMLElement | null>(null);

    const scrollToTop = () => {
      if (contentRef.value) {
        contentRef.value.scrollTop = 0; // Scrolls to the top of the content
      }
    };

    const isValidForm = ref(true);
    const refForm = ref<any>(null);

    const isValidFormDisciplina = ref(true);
    const refFormDisciplina = ref<any>(null);

    const editedIndex = ref(-1);

    const dialogPropiedades = ref({
      dialog: false,
      titulo: "",
      cuerpo: "",
      ruta: "",
      color: "",
      boton: "",
      velocidad: 0,
      componente: "",
    });

    const encabezadosEspecilidad = ref([
      { title: "Disciplina", key: "disciplina" },
      { title: "Puntos", key: "puntos" },
      { title: "Horas", key: "horas" },
      { title: "Modalidad", key: "modalidad" },
      { title: "", key: "actions", sortable: true },
    ]);

    const dialogFormDisciplina = ref(false);
    const dialogConfirmationDisciplina = ref(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telefonoRegex = /^\d{10}$/;

    const rules = {
      validEmail: (v: string) => emailRegex.test(v) || "Correo electrónico no válido",
      validTelefono: (v: string) => telefonoRegex.test(v) || "Teléfono no válido",
      required: (v: string) => !!v || "Este campo es requerido",
      requiredSelection: (v: string | null | undefined) =>
        !!v || "Por favor, selecciona una opción",
      fileRule: (value: any) => {
        if (!value || !value.length) {
          return "Por favor, seleccione al menos un archivo.";
        }

        for (let i = 0; i < value.length; i++) {
          if (value[i].size > 3000000) {
            return "El archivo debe pesar menos de 3 MB.";
          }
        }

        return true;
      },
      onlyNumbers: (v: string) => /^\d+$/.test(v) || "Solo se permiten números",
    };

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
    });

    const dataModalidad = ref<Modalidad>({
      result: [],
    });

    const dataColegio = ref<Colegio>({
      result: [],
    });

    const dataImss = ref<Imss>({
      result: [],
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
    });

    const colores = ref({
      rojoIMPC: "#B20000",
      rojoClaro: "#FAE6EA",
      grisOscuro: "#222222",
      verdeBoton: "#468C00",
    });

    async function catalogoColegio() {
      try {
        await pagoStore.cargarContacto();
        dataContacto.value = pagoStore.object.contacto as InformacionUsuario;

        if (Object.keys(dataContacto.value.informacion).length !== 0) {
          dataModel.value.id_colegio = dataContacto.value.informacion.id_colegio;
        }

        await capacitacionStore.cargarCatalogoColegios();

        console.log(capacitacionStore.object.catalogoColegio);
        console.log(Array.isArray(capacitacionStore.object.catalogoColegio));
        console.log(Array.isArray(capacitacionStore.object.catalogoColegio.length));
        if (capacitacionStore.object.catalogoColegio.result.length >= 0) {
          dataColegio.value = { result: capacitacionStore.object.catalogoColegio.result };
        }
      } catch (error) {}
    }

    async function catalogoEspecilidad() {
      try {
        await capacitacionStore.cargarCatalogoDisciplina();

        if (
          Array.isArray(capacitacionStore.object.catalogoDisciplina) &&
          capacitacionStore.object.catalogoDisciplina.length > 0
        ) {
          dataEspecialidad.value = {
            result: capacitacionStore.object.catalogoDisciplina,
          };
        }
      } catch (error) {}
    }

    async function catalogoModalidad() {
      try {
        await capacitacionStore.cargarCatalogoModalidad();

        if (
          Array.isArray(capacitacionStore.object.catalogoModalidad) &&
          capacitacionStore.object.catalogoModalidad.length > 0
        ) {
          dataModalidad.value = { result: capacitacionStore.object.catalogoModalidad };
        }
      } catch (error) {}
    }

    async function catalogoImss() {
      try {
        await capacitacionStore.cargarCatalogoImss();

        if (
          Array.isArray(capacitacionStore.object.catalogoImss) &&
          capacitacionStore.object.catalogoImss.length > 0
        ) {
          dataImss.value = { result: capacitacionStore.object.catalogoImss };
          dataImss.value.result.shift();
        }
      } catch (error) {}
    }

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

      await refForm.value?.reset();
    }

    onIonViewDidEnter(async () => {
      if (contentRef.value !== null) {
        contentRef.value.scrollTop = 0;
      }

      scrollToTop();
      await limpiarFormulario();
      await catalogoColegio();
      await catalogoImss();
      await catalogoEspecilidad();
      await catalogoModalidad();
    });

    async function guardarDatos() {
      try {
        const isValidForm = await refForm.value?.validate();

        if (isValidForm.valid && dataColegio.value.result.length > 0) {
          const formData = new FormData();

          const storage = new Storage();
          storage.create();

          const rfc = await storage.get("rfc");

          formData.append("eventos_externos[cuenta_rfc]", rfc);
          formData.append(
            "eventos_externos[id_colegio]",
            dataModel.value.id_colegio.toString()
          );
          formData.append(
            "eventos_externos[nombre_evento]",
            dataModel.value.nombre_evento
          );
          formData.append("eventos_externos[eventos_sede]", dataModel.value.eventos_sede);
          formData.append("eventos_externos[expositor]", dataModel.value.expositor);
          formData.append("eventos_externos[origen]", "Externo");
          formData.append(
            "eventos_externos[eventos_fecha_inicio]",
            cambiarFormatoFecha(dataModel.value.eventos_fecha_inicio)
          );
          formData.append(
            "eventos_externos[eventos_fecha_fin]",
            cambiarFormatoFecha(dataModel.value.eventos_fecha_fin)
          );
          formData.append("eventos_externos[telefono]", dataModel.value.telefono);
          formData.append("eventos_externos[temas_imss]", "No");
          formData.append("eventos_externos[email]", dataModel.value.email);
          formData.append("eventos_externos[status]", "Solicitud");
          dataModel.value.listado_eventos.forEach((evento, index) => {
            formData.append(
              `eventos_externos[externo_puntos][${index}][disiplinasId]`,
              evento.id_disciplina
            );
            formData.append(
              `eventos_externos[externo_puntos][${index}][puntos]`,
              evento.puntos
            );
            formData.append(
              `eventos_externos[externo_puntos][${index}][horas]`,
              evento.horas
            );
            formData.append(
              `eventos_externos[externo_puntos][${index}][modalidad]`,
              evento.modalidad
            );
            formData.append(
              `eventos_externos[externo_puntos][${index}][status]`,
              "Activo"
            );
          });

          for (const [index, archivo] of dataModel.value.archivos.entries()) {
            const base64String: string = await convertirABase64(archivo);
            formData.append(
              `eventos_externos[externo_archivos][${index}][archivo]`,
              base64String
            );
            formData.append(
              `eventos_externos[externo_archivos][${index}][status]`,
              "Activo"
            );
          }

          if (dataModel.value.imss_id.length > 0) {
            dataModel.value.imss_id.forEach((imss, index) => {
              formData.append(
                `eventos_externos[externo_eventos_temas_imss][${index}][catlogo_temas_imss_id]`,
                imss.toString()
              );
              formData.append(
                `eventos_externos[externo_eventos_temas_imss][${index}][status]`,
                "Activo"
              );
            });
          }

          await capacitacionStore.registrarCapacitacion(formData);

          if (capacitacionStore.type == "success") {
            await refForm.value?.reset();

            dialogPropiedades.value = {
              dialog: true,
              titulo: "Capacitación externa",
              cuerpo:
                "Su capacitación externa ha sido enviada exitosamente. Se iniciará un proceso de revisión, y en caso de ser favorable se notificará o podrá consultarla en el listado.",
              ruta: "correct",
              color: colores.value.verdeBoton,
              boton: "Aceptar",
              velocidad: 0.5,
              componente: "capacitacionExternaListado",
            };
          } else {
            dialogPropiedades.value = {
              dialog: true,
              titulo: "Capacitación externa",
              cuerpo: "Revise los datos obligatorios.",
              ruta: "incorrect",
              color: colores.value.rojoIMPC,
              boton: "Cerrar",
              velocidad: 0.5,
              componente: "",
            };
          }
        } else if (!isValidForm.valid && dataColegio.value.result.length > 0) {
          dialogPropiedades.value = {
            dialog: true,
            titulo: "Capacitación externa",
            cuerpo:
              "Por favor, asegúrese de llenar todos los campos requeridos para poder continuar.",
            ruta: "incorrect",
            color: colores.value.rojoIMPC,
            boton: "Cerrar",
            velocidad: 0.5,
            componente: "",
          };
        } else if (dataColegio.value.result.length == 0) {
          dialogPropiedades.value = {
            dialog: true,
            titulo: "Ocurrió un problema en la conexión",
            cuerpo: "Cierre la aplicación e inténtelo más tarde.",
            ruta: "incorrect",
            color: colores.value.rojoIMPC,
            boton: "Cerrar",
            velocidad: 0.5,
            componente: "",
          };
        }
      } catch (error) {}
    }

    async function convertirABase64(archivo: any): Promise<string> {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
          resolve(reader.result as string);
        };

        reader.onerror = (error) => {
          reject(error);
        };

        reader.readAsDataURL(archivo);
      });
    }

    function cambiarFormatoFecha(fecha: string): string {
      const fechaObj = new Date(fecha);
      const dia = fechaObj.getDate().toString().padStart(2, "0");
      const mes = (fechaObj.getMonth() + 1).toString().padStart(2, "0"); // Meses en JavaScript son base 0
      const anio = fechaObj.getFullYear();
      const horas = fechaObj.getHours().toString().padStart(2, "0");
      const minutos = fechaObj.getMinutes().toString().padStart(2, "0");
      //const segundos = fechaObj.getSeconds().toString().padStart(2, "0");

      return `${dia}/${mes}/${anio} ${horas}:${minutos}`;
    }

    function cerrarDialogDisciplina() {
      dataModel.value.id_disciplina = "";
      dataModel.value.puntos = "";
      dataModel.value.horas = "";
      dataModel.value.modalidad = "";
      dialogFormDisciplina.value = false;

      editedIndex.value = -1;
    }

    function cerrarDialogConfirmationDisciplina() {
      dataModel.value.id_disciplina = "";
      dataModel.value.puntos = "";
      dataModel.value.horas = "";
      dataModel.value.modalidad = "";

      dialogConfirmationDisciplina.value = false;

      editedIndex.value = -1;
    }

    function openDialogDisciplina() {
      dialogFormDisciplina.value = true;
    }

    function editarDisciplina(item) {
      editedIndex.value = dataModel.value.listado_eventos.indexOf(item);

      dataModel.value.id_disciplina = item.id_disciplina;
      dataModel.value.puntos = item.puntos;
      dataModel.value.horas = item.horas;
      dataModel.value.modalidad = item.modalidad;

      dialogFormDisciplina.value = true;
    }

    function eliminarDisciplina(item) {
      editedIndex.value = dataModel.value.listado_eventos.indexOf(item);
      dialogConfirmationDisciplina.value = true;

      editedIndex.value = -1;
    }

    function confirmarDialogDisciplina() {
      dataModel.value.listado_eventos.splice(editedIndex.value, 1);

      dialogConfirmationDisciplina.value = false;

      editedIndex.value = -1;
    }

    async function agregarDisciplina() {
      const isValidForm = await refFormDisciplina.value?.validate();

      if (isValidForm.valid) {
        const selectedDisciplina = dataEspecialidad.value.result.find(
          (item) => item.value == dataModel.value.id_disciplina
        );

        const nuevaDisciplina = {
          id_disciplina: dataModel.value.id_disciplina,
          disciplina: selectedDisciplina ? selectedDisciplina.label : "",
          puntos: dataModel.value.puntos,
          horas: dataModel.value.horas,
          modalidad: dataModel.value.modalidad,
        };

        if (!Array.isArray(dataModel.value.listado_eventos)) {
          dataModel.value.listado_eventos = [];
        }

        if (editedIndex.value > -1) {
          Object.assign(
            dataModel.value.listado_eventos[editedIndex.value],
            nuevaDisciplina
          );
        } else {
          dataModel.value.listado_eventos.push(nuevaDisciplina);
        }

        dataModel.value.id_disciplina = "";
        dataModel.value.puntos = "";
        dataModel.value.horas = "";
        dataModel.value.modalidad = "";

        dialogFormDisciplina.value = false;
        editedIndex.value = -1;
      }
    }

    function cerrardialogPropiedades() {
      dialogPropiedades.value.dialog = false;
      if (dialogPropiedades.value.componente != "") {
        router.push({ name: "capacitacionExternaListado" });
      }
    }

    return {
      colores,
      rules,
      dataModel,
      dataEspecialidad,
      dataModalidad,
      dataColegio,
      dataImss,

      refForm,
      isValidForm,

      refFormDisciplina,
      isValidFormDisciplina,

      encabezadosEspecilidad,

      dialogFormDisciplina,
      dialogConfirmationDisciplina,

      guardarDatos,
      cerrarDialogDisciplina,
      openDialogDisciplina,

      editarDisciplina,
      eliminarDisciplina,

      cerrarDialogConfirmationDisciplina,
      confirmarDialogDisciplina,

      agregarDisciplina,
      es,
      dialogPropiedades,
      cerrardialogPropiedades,
      contentRef,
    };
  },
});
</script>

<style>
.lottie-container {
  height: 150px;
}

.tb-grados thead {
  font-size: 0.875rem;
}

.dp__calendar_row {
  margin: 0;
}

.dp__pointer.dp__input_readonly.dp__input.dp__input_icon_pad.dp__input_focus.dp__input_reg {
  height: 56px;
}

.dp__pointer.dp__input_readonly.dp__input.dp__input_icon_pad.dp__input_reg {
  height: 56px;
}

.dp__cell_inner.dp__pointer.dp--past.dp__date_hover {
  height: 35px;
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
    border-bottom: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
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
    border-top: medium solid rgba(var(--v-border-color), var(--v-border-opacity));
  }
}
</style>

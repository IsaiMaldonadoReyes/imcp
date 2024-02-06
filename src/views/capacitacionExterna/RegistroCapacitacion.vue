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
              Nuevo aviso
            </v-card-title>
          </v-card-item>
        </v-card>
        <v-form v-model="isValidForm" lazy-validation ref="refForm">
          <v-card border class="mb-3" color="transparent" elevation="0">
            <v-card border class="ma-3" elevation="0">
              <v-card-text class="text-justify">
                <v-select
                  class="my-4"
                  clearable
                  hide-details="auto"
                  label="Colegio *"
                  no-data-text="No hay datos disponibles"
                  variant="outlined"
                  item-value="value"
                  item-title="label"
                  v-model="dataModel.id_colegio"
                  :items="dataColegio.result"
                  :rules="[rules.requiredSelection]"
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
                  label="Telefono *"
                  placeholder="Telefono"
                  variant="outlined"
                  v-model="dataModel.telefono"
                  :rules="[rules.required, rules.validTelefono]"
                ></v-text-field>
                <v-text-field
                  class="my-4"
                  clearable
                  hide-details="auto"
                  label="Email *"
                  placeholder="Email"
                  variant="outlined"
                  v-model="dataModel.email"
                  :rules="[rules.required, rules.validEmail]"
                ></v-text-field>
                <v-text-field
                  class="my-4"
                  clearable
                  hide-details="auto"
                  label="Fecha de inicio *"
                  placeholder="Fecha de inicio"
                  variant="outlined"
                  v-model="dataModel.eventos_fecha_inicio"
                  type="datetime-local"
                ></v-text-field>
                <v-text-field
                  class="my-4"
                  clearable
                  hide-details="auto"
                  label="Fecha de fin *"
                  placeholder="Fecha de fin"
                  variant="outlined"
                  v-model="dataModel.eventos_fecha_fin"
                  type="datetime-local"
                ></v-text-field>
              </v-card-text>
            </v-card>
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
                      <v-btn-toggle
                        v-if="encabezado.key == 'actions'"
                        color="primary"
                        divided
                      >
                        <v-btn color="#85B201">
                          <v-icon @click="editarDisciplina(item)">
                            mdi-pencil
                          </v-icon>
                        </v-btn>
                        <v-btn color="grey">
                          <v-icon @click="eliminarDisciplina(item)">
                            mdi-delete
                          </v-icon>
                        </v-btn>
                      </v-btn-toggle>
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
                    <v-icon color="grey-lighten-1" size="60">
                      mdi-school
                    </v-icon>
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
                  v-model="dataModel.archivos"
                ></v-file-input>
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
                :to="{ name: 'capacitacionExternaListado' }"
              >
                <template v-slot:prepend>
                  <v-icon class="mr-3" size="large"></v-icon>
                </template>
              </v-btn>
            </div>
          </v-card>
        </v-form>
        <v-dialog v-model="dialogFormDisciplina" max-width="500px">
          <v-form
            v-model="isValidFormDisciplina"
            lazy-validation
            ref="refFormDisciplina"
          >
            <v-card>
              <v-card-title>
                <span class="text-h5">Disciplina</span>
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
                  :rules="[rules.required]"
                  @keyup="($event : any) => handleKeyUp($event, 'puntos')"
                ></v-text-field>
                <v-text-field
                  class="my-4"
                  clearable
                  hide-details="auto"
                  label="Horas *"
                  placeholder="Horas"
                  variant="outlined"
                  v-model="dataModel.horas"
                  :rules="[rules.required]"
                  @keyup="($event : any) => handleKeyUp($event, 'horas')"
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
                  color="text-grey-darken-1"
                  variant="text"
                  @click="cerrarDialogDisciplina"
                >
                  Cancelar
                </v-btn>
                <v-btn
                  color="text-grey-darken-1"
                  variant="text"
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
            <v-card-title class="text-subtitle-1 text-grey-darken-1"
              >¿Está seguro de eliminar el registro?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="text-grey-darken-1"
                variant="text"
                @click="cerrarDialogConfirmationDisciplina"
                >Cancelar</v-btn
              >
              <v-btn
                color="text-grey-darken-1"
                variant="text"
                @click="confirmarDialogDisciplina"
                >Aceptar</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
import { useCapacitacionStore } from "@/store/capacitacionExterna";
import { useRouter, Router, useRoute } from "vue-router";
import { VDatePicker, VDataTable } from "vuetify/lib/labs/components.mjs";
import { Storage } from "@ionic/storage";

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

export interface Colegio {
  result: ResultColegio[];
  type: string;
}

export interface ResultColegio {
  value: any;
  label: string;
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
  name: "RegistroCapacitacion",
  components: {
    IonContent,
    IonPage,
    VDatePicker,
    VDataTable,
  },
  props: ["label", "color", "modelValue"],
  setup() {
    const route = useRoute();
    const router: Router = useRouter();

    const capacitacionStore = useCapacitacionStore();

    const isValidForm = ref(true);
    const refForm = ref<any>(null);

    const isValidFormDisciplina = ref(true);
    const refFormDisciplina = ref<any>(null);

    const editedIndex = ref(-1);

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

    const handleKeyUp = (event: any, property: any) => {
      let inputValue = event.target.value;
      inputValue = inputValue.replace(/[^0-9]/g, "");
      dataModel.value[property as keyof typeof dataModel.value] = inputValue;
    };

    const rules = {
      validEmail: (v: string) =>
        emailRegex.test(v) || "Correo electrónico no válido",
      validTelefono: (v: string) =>
        telefonoRegex.test(v) || "Teléfono no válido",
      required: (v: string) => !!v || "Este campo es requerido",
      requiredSelection: (v: string | null | undefined) =>
        !!v || "Por favor, selecciona una opción",
      fileRule: (value: any) =>
        !value ||
        !value.length ||
        value[0].size < 2000000 ||
        "El archivo debe de pesar menos de 5 MB!",
    };

    const dataModel = ref({
      id_colegio: "",
      nombre_evento: "",
      eventos_sede: "",
      expositor: "",
      eventos_fecha_inicio: "",
      eventos_fecha_fin: "",
      telefono: "",
      email: "",
      id_disciplina: "",
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

    const dataModalidad = ref<Modalidad>({
      result: [],
      type: "",
    });

    const dataColegio = ref<Colegio>({
      result: [],
      type: "",
    });

    const colores = ref({
      rojoIMPC: "#B20000",
      rojoClaro: "#FAE6EA",
      grisOscuro: "#222222",
      verdeBoton: "#468C00",
    });

    async function catalogoColegio() {
      try {
        await capacitacionStore.cargarCatalogoColegios();
        dataColegio.value = capacitacionStore.object.catalogoColegio as Colegio;
      } catch (error) {}
    }

    async function catalogoEspecilidad() {
      try {
        await capacitacionStore.cargarCatalogoDisciplina();
        dataEspecialidad.value = capacitacionStore.object
          .catalogoDisciplina as Especilidad;
      } catch (error) {}
    }

    async function catalogoModalidad() {
      try {
        await capacitacionStore.cargarCatalogoModalidad();
        dataModalidad.value = capacitacionStore.object
          .catalogoModalidad as Modalidad;
      } catch (error) {}
    }

    onIonViewDidEnter(async () => {
      await catalogoColegio();
      await catalogoEspecilidad();
      await catalogoModalidad();
    });

    async function guardarDatos() {
      try {
        const isValidForm = await refForm.value?.validate();
        if (isValidForm.valid) {
          const formData = new FormData();

          const storage = new Storage();
          storage.create();

          const rfc = await storage.get("rfc");

          formData.append("eventos_externos[cuenta_rfc]", rfc);
          formData.append(
            "eventos_externos[id_colegio]",
            dataModel.value.id_colegio
          );
          formData.append(
            "eventos_externos[nombre_evento]",
            dataModel.value.nombre_evento
          );
          formData.append(
            "eventos_externos[eventos_sede]",
            dataModel.value.eventos_sede
          );
          formData.append(
            "eventos_externos[expositor]",
            dataModel.value.expositor
          );
          formData.append(
            "eventos_externos[eventos_fecha_inicio]",
            cambiarFormatoFecha(dataModel.value.eventos_fecha_inicio)
          );
          formData.append(
            "eventos_externos[eventos_fecha_fin]",
            cambiarFormatoFecha(dataModel.value.eventos_fecha_fin)
          );
          formData.append(
            "eventos_externos[telefono]",
            dataModel.value.telefono
          );

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
      const segundos = fechaObj.getSeconds().toString().padStart(2, "0");

      return `${dia}/${mes}/${anio} ${horas}:${minutos}:${segundos}`;
    }

    function cerrarDialogDisciplina() {
      dataModel.value.id_disciplina = "";
      dataModel.value.puntos = "";
      dataModel.value.horas = "";
      dataModel.value.modalidad = "";
      dialogFormDisciplina.value = false;
    }

    function cerrarDialogConfirmationDisciplina() {
      dataModel.value.id_disciplina = "";
      dataModel.value.puntos = "";
      dataModel.value.horas = "";
      dataModel.value.modalidad = "";

      dialogConfirmationDisciplina.value = false;
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
    }

    function confirmarDialogDisciplina() {
      dataModel.value.listado_eventos.splice(editedIndex.value, 1);

      dialogConfirmationDisciplina.value = false;
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
      }
    }

    return {
      colores,
      rules,
      dataModel,
      dataEspecialidad,
      dataModalidad,
      dataColegio,

      refForm,
      isValidForm,

      refFormDisciplina,
      isValidFormDisciplina,

      encabezadosEspecilidad,

      dialogFormDisciplina,
      dialogConfirmationDisciplina,

      handleKeyUp,

      guardarDatos,
      cerrarDialogDisciplina,
      openDialogDisciplina,

      editarDisciplina,
      eliminarDisciplina,

      cerrarDialogConfirmationDisciplina,
      confirmarDialogDisciplina,

      agregarDisciplina,
    };
  },
});
</script>

<style>
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

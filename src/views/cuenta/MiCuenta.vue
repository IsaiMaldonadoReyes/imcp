<template>
  <ion-page>
    <ion-content ref="contentRef">
      <v-container fluid>
        <v-card color="transparent" elevation="0">
          <v-card-item>
            <v-card-title
              class="text-uppercase text-grey-darken-3 font-weight-bold text-center"
              style="white-space: normal"
            >
              Mi cuenta
            </v-card-title>
          </v-card-item>
        </v-card>

        <v-form v-model="isValid" lazy-validation ref="formEl">
          <v-card class="my-3" elevation="0" border>
            <!--v-card-title>
              <span class="font-weight-bold"
                >Datos personales</span
              ></v-card-title
            -->
            <v-card-text>
              <v-text-field
                v-model="dataCuenta.cuenta_nombre"
                class="my-4"
                disabled
                hide-details="auto"
                label="Nombre *"
                placeholder="Nombre(s)"
                readonly
                selectable="false"
                variant="outlined"
              ></v-text-field>
              <v-text-field
                v-model="dataCuenta.cuenta_apaterno"
                class="my-4"
                disabled
                hide-details="auto"
                label="Apellido paterno *"
                placeholder="Apellido paterno"
                readonly
                selectable="false"
                variant="outlined"
              ></v-text-field>
              <v-text-field
                v-model="dataCuenta.cuenta_amatarno"
                class="my-4"
                disabled
                hide-details="auto"
                label="Apellido materno *"
                placeholder="Apellido materno"
                readonly
                selectable="false"
                variant="outlined"
              ></v-text-field>

              <v-text-field
                v-model="dataCuenta.cuenta_rfc"
                class="my-4"
                disabled
                hide-details="auto"
                label="RFC *"
                placeholder="RFC"
                readonly
                selectable="false"
                variant="outlined"
              ></v-text-field>

              <v-text-field
                v-model="dataCuenta.cuenta_email"
                :rules="[rules.validEmail, rules.required]"
                class="my-4"
                clearable
                hide-details="auto"
                label="Email *"
                placeholder="Email"
                selectable="false"
                variant="outlined"
              ></v-text-field>

              <v-text-field
                v-model="dataCuenta.registro_agaff"
                class="my-4"
                clearable
                hide-details="auto"
                label="AGAFF"
                placeholder="Dato AGAFF"
                selectable="false"
                variant="outlined"
              ></v-text-field>

              <v-text-field
                v-model="dataCuenta.registro_imss"
                class="my-4"
                clearable
                hide-details="auto"
                label="IMSS"
                placeholder="Dato IMMS"
                selectable="false"
                variant="outlined"
              ></v-text-field>

              <v-text-field
                v-model="dataCuenta.password"
                :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.validPassword]"
                :type="show1 ? 'text' : 'password'"
                class="my-4"
                clearable
                hide-details="auto"
                label="Contraseña *"
                placeholder="Contraseña"
                variant="outlined"
                @click:append-inner="show1 = !show1"
              ></v-text-field>
              <v-checkbox
                v-model="dataCuenta.enviado"
                :center-affix="true"
                :color="colores.verdeBoton"
                hide-details
                true-icon="mdi-bell-ring"
              >
                <template v-slot:label>Recibir notificaciones</template>
              </v-checkbox>
            </v-card-text>
          </v-card>
          <div class="d-flex flex-column">
            <v-btn
              :color="colores.verdeBoton"
              block
              class="mt-4"
              prepend-icon="mdi-content-save-edit-outline"
              rounded="large"
              size="large"
              text="GUARDAR"
              variant="flat"
              @click="actualizarRegistro"
            >
              <template v-slot:prepend>
                <v-icon size="large"></v-icon>
              </template>
            </v-btn>
            <v-btn
              :color="colores.rojoIMPC"
              :to="{ name: 'dashboard' }"
              block
              class="mt-4"
              prepend-icon="mdi-content-save-off-outline"
              rounded="large"
              size="large"
              text="CANCELAR"
              variant="flat"
            >
              <template v-slot:prepend>
                <v-icon size="large"></v-icon>
              </template>
            </v-btn>
          </div>
        </v-form>
        <v-dialog v-model="loading">
          <div class="text-center">
            <v-progress-circular
              :size="60"
              :color="colores.rojoIMPC"
              indeterminate
            ></v-progress-circular>
          </div>
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
        :dialog-loop="dialogPropiedades.repetir"
        @cerrarDialog="cerrardialogPropiedades"
      />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { IonPage, IonContent, onIonViewDidEnter } from "@ionic/vue";
import { usePagoStore } from "@/store/pago";
import { useCuentaStore } from "@/store/cuenta";
import { useRouter, Router } from "vue-router";
import DialogAction from "../helper/DialogAction.vue";

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

export interface InformacionUsuarioArray {
  info: Info[];
}

export interface Info {
  cuentas_usuarios_id: number;
  id_colegio: number;
  cuenta_rfc: string;
  cuenta_nombre: string;
  cuenta_apaterno: string;
  cuenta_amatarno: string;
  cuenta_email: string;
  registro_agaff: string;
  registro_imss: string;
  expositor: string;
  articulo: string;
  status: string;
  users_usuarios_usuario_id: number;
  users_usuarios_usuario_nombre: string;
  users_usuarios_usuario_apaterno: string;
  users_usuarios_usuario_amaterno: string;
  users_usuarios_usuario_alias: string;
  users_usuarios_usuario_email: string;
  users_usuarios_rfc_usuario: string;
  users_usuarios_usuario_fecha_contrasena: string;
  usuario_status_acceso: string;
  usuario_imagen: string;
  enviado: string;
}

export default defineComponent({
  name: "cuenta",
  components: {
    IonContent,
    IonPage,
    DialogAction,
  },
  setup() {
    const pagoStore = usePagoStore();
    const cuentaStore = useCuentaStore();
    const router: Router = useRouter();

    const contentRef = ref<HTMLElement | null>(null);

    const scrollToTop = () => {
      if (contentRef.value) {
        contentRef.value.scrollTop = 0; // Scrolls to the top of the content
      }
    };

    const regexPassword = /^.{8,}$/;
    const isValid = ref(true);
    const formEl = ref<any>(null);
    const show1 = ref(false);

    const loading = ref(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const rules = {
      validPassword: (v: string) => {
        if (!v || v.trim().length === 0) {
          return true; // Si el campo está vacío, la validación se considera exitosa
        }
        return regexPassword.test(v) || "Contraseña no válida";
      },
      required: (v: string) => !!v || "Este campo es requerido",
      validEmail: (v: string) =>
        emailRegex.test(v) || "Correo electrónico no válido",
    };

    const show = ref(false);
    const colores = ref({
      rojoIMPC: "#B20000",
      rojoClaro: "#FAE6EA",
      grisOscuro: "#222222",
      verdeBoton: "#468C00",
    });

    const dialogPropiedades = ref({
      dialog: false,
      titulo: "",
      cuerpo: "",
      ruta: "",
      color: "",
      boton: "",
      velocidad: 0,
      componente: "",
      repetir: false,
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

    const dataInformacion = ref<InformacionUsuarioArray>({
      info: [],
    });

    const dataCuenta = ref({
      cuentas_usuarios_id: 0,
      cuenta_nombre: "",
      cuenta_apaterno: "",
      cuenta_amatarno: "",
      cuenta_email: "",
      cuenta_rfc: "",
      registro_agaff: "",
      registro_imss: "",
      users_usuarios_usuario_id: 0,
      password: "",
      enviado: true,
    });

    async function cargarContacto() {
      dataCuenta.value = {
        cuentas_usuarios_id: 0,
        cuenta_nombre: "",
        cuenta_apaterno: "",
        cuenta_amatarno: "",
        cuenta_email: "",
        cuenta_rfc: "",
        registro_agaff: "",
        registro_imss: "",
        users_usuarios_usuario_id: 0,
        password: "",
        enviado: true,
      };

      loading.value = true;

      try {
        await pagoStore.cargarContacto();

        await pagoStore.cargarContactoInformacion();

        dataContacto.value = pagoStore.object.contacto as InformacionUsuario;
        dataInformacion.value = pagoStore.object
          .informacion as InformacionUsuarioArray;

        if (dataContacto.value.informacion) {
          dataCuenta.value.cuentas_usuarios_id =
            dataContacto.value.informacion.cuentas_usuarios_id;
          dataCuenta.value.cuenta_nombre =
            dataContacto.value.informacion.cuenta_nombre;
          dataCuenta.value.cuenta_apaterno =
            dataContacto.value.informacion.cuenta_apaterno;
          dataCuenta.value.cuenta_amatarno =
            dataContacto.value.informacion.cuenta_amatarno;
          dataCuenta.value.cuenta_email =
            dataContacto.value.informacion.cuenta_email;
          dataCuenta.value.cuenta_rfc =
            dataContacto.value.informacion.cuenta_rfc;
          dataCuenta.value.registro_agaff =
            dataContacto.value.informacion.registro_agaff;
          dataCuenta.value.registro_imss =
            dataContacto.value.informacion.registro_imss;
        }

        if (
          Array.isArray(dataInformacion.value.info) &&
          dataInformacion.value.info.length > 0
        ) {
          dataCuenta.value.users_usuarios_usuario_id =
            dataInformacion.value.info[0].users_usuarios_usuario_id;
        }

        dataCuenta.value.enviado = true;
      } catch (error) {
        console.log(error);
      }

      loading.value = false;
    }

    async function actualizarRegistro() {
      loading.value = true;
      try {
        const isValidForm = await formEl.value?.validate();
        if (isValidForm.valid && dataContacto.value.informacion) {
          const formData = new URLSearchParams();

          formData.append(
            "datos[cuentas_usuarios_id]",
            dataCuenta.value.cuentas_usuarios_id.toString()
          );
          formData.append(
            "datos[users_usuarios_usuario_id]",
            dataCuenta.value.users_usuarios_usuario_id.toString()
          );
          formData.append(
            "datos[registro_agaff]",
            dataCuenta.value.registro_agaff
          );
          formData.append(
            "datos[registro_imss]",
            dataCuenta.value.registro_imss
          );
          formData.append(
            "datos[users_usuarios_usuario_email]",
            dataCuenta.value.cuenta_email
          );
          formData.append("datos[cuenta_email]", dataCuenta.value.cuenta_email);
          formData.append(
            "datos[enviado]",
            dataCuenta.value.enviado == true ? "Si" : "No"
          );

          if (
            typeof dataCuenta.value.password === "string" &&
            dataCuenta.value.password.trim() !== ""
          ) {
            formData.append("datos[password]", dataCuenta.value.password);
          }

          formData.append("datos[cuenta_rfc]", dataCuenta.value.cuenta_rfc);
          formData.append(
            "datos[users_usuarios_rfc_usuario]",
            dataCuenta.value.cuenta_rfc
          );

          await cuentaStore.actualizarCuenta(formData);

          if (cuentaStore.type == "success") {
            dialogPropiedades.value = {
              dialog: true,
              titulo: "Actualización de datos",
              cuerpo:
                "La información de su cuenta ha sido actualizada correctamente",
              ruta: "correct",
              color: colores.value.verdeBoton,
              boton: "Aceptar",
              velocidad: 1,
              componente: "dashboard",
              repetir: false,
            };
          } else {
            dialogPropiedades.value = {
              dialog: true,
              titulo: "Ocurrió un problema al actualizar los datos",
              cuerpo: "Cierre la aplicación e inténtelo más tarde.",
              ruta: "incorrect",
              color: colores.value.rojoIMPC,
              boton: "Cerrar",
              velocidad: 0.5,
              componente: "",
              repetir: false,
            };
          }
        } else if (!isValidForm.valid && dataContacto.value.informacion) {
          dialogPropiedades.value = {
            dialog: true,
            titulo: "Actualización de datos",
            cuerpo:
              "Por favor, asegúrese de llenar todos los campos requeridos para poder continuar.",
            ruta: "incorrect",
            color: colores.value.rojoIMPC,
            boton: "Cerrar",
            velocidad: 0.5,
            componente: "",
            repetir: false,
          };
        } else if (!dataContacto.value.informacion) {
          dialogPropiedades.value = {
            dialog: true,
            titulo: "Ocurrió un problema en la conexión",
            cuerpo: "Cierre la aplicación e inténtelo más tarde.",
            ruta: "incorrect",
            color: colores.value.rojoIMPC,
            boton: "Cerrar",
            velocidad: 0.5,
            componente: "",
            repetir: false,
          };
        }
      } catch (error) {
        dialogPropiedades.value = {
          dialog: true,
          titulo: "Actualización de datos",
          cuerpo: "Cierre la aplicación e inténtelo más tarde.",
          ruta: "incorrect",
          color: colores.value.rojoIMPC,
          boton: "Cerrar",
          velocidad: 0.5,
          componente: "",
          repetir: false,
        };
        return;
      }
      loading.value = false;
    }

    function cerrardialogPropiedades() {
      dialogPropiedades.value.dialog = false;
      if (dialogPropiedades.value.componente != "") {
        router.push({ name: dialogPropiedades.value.componente });
      }
    }

    onIonViewDidEnter(async () => {
      if (contentRef.value !== null) {
        contentRef.value.scrollTop = 0;
      }

      scrollToTop();
      await cargarContacto();
    });

    return {
      colores,
      formEl,
      show,
      rules,
      dataCuenta,
      isValid,
      show1,
      actualizarRegistro,
      dialogPropiedades,
      cerrardialogPropiedades,
      contentRef,
      loading,
    };
  },
});
</script>
<style>
.lottie-container {
  height: 150px;
}
</style>

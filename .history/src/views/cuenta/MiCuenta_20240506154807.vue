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
                :rules="[rules.required]"
                class="my-4"
                clearable
                hide-details="auto"
                label="AGAFF *"
                placeholder="Dato AGAFF"
                selectable="false"
                variant="outlined"
              ></v-text-field>

              <v-text-field
                v-model="dataCuenta.registro_imss"
                :rules="[rules.required]"
                class="my-4"
                clearable
                hide-details="auto"
                label="IMSS *"
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
              :to="{ name: 'dashboard' }"
            >
              <template v-slot:prepend>
                <v-icon class="mr-3" size="large"></v-icon>
              </template>
            </v-btn>
          </div>
        </v-form>
      </v-container>
      <v-dialog v-model="dialogPropiedades.dialog" max-width="500px">
        <v-card>
          <v-card-title class="text-grey-darken-1" style="text-align: center">
            {{ dialogPropiedades.mensajeTitulo }}</v-card-title
          >
          <lottie-animation
            v-if="dialogPropiedades.correcto"
            ref="anim"
            :animationData="CorrectAnimation"
            :loop="false"
            :autoPlay="true"
            :speed="0.5"
            class="lottie-container"
          />
          <lottie-animation
            v-else
            ref="anim"
            :animationData="IncorrectAnimation"
            :loop="false"
            :autoPlay="true"
            :speed="0.5"
            class="lottie-container"
          />
          <v-card-text class="text-justify">
            <span class="text-subtitle-1 text-grey-darken-1">
              {{ dialogPropiedades.mensajeCuerpo }}
            </span>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :color="colores.verdeBoton"
              block
              size="large"
              variant="flat"
              @click="cerrardialogPropiedades(dialogPropiedades.correcto)"
              >Aceptar</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { IonPage, IonContent, onIonViewDidEnter, alertController } from "@ionic/vue";
import { usePagoStore } from "@/store/pago";
import { useCuentaStore } from "@/store/cuenta";
import { useRouter, Router } from "vue-router";
import { LottieAnimation } from "lottie-web-vue";

import CorrectAnimation from "../../assets/images/correct.json";
import IncorrectAnimation from "../../assets/images/incorrect.json";

const showAlert = async (header: string, message: string) => {
  const alert = await alertController.create({
    header,
    message,
    buttons: ["OK"],
  });

  return alert;
};

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
    LottieAnimation,
  },
  setup() {
    const contentRef = ref<HTMLElement | null>(null);

    const scrollToTop = () => {
      if (contentRef.value) {
        contentRef.value.scrollTop = 0; // Scrolls to the top of the content
      }
    };

    const pagoStore = usePagoStore();
    const cuentaStore = useCuentaStore();
    const router: Router = useRouter();
    const regexPassword = /^.{8,}$/;
    const isValid = ref(true);
    const formEl = ref<any>(null);
    const show1 = ref(false);

    let anim = ref();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const rules = {
      validPassword: (v: string) => {
        if (!v || v.trim().length === 0) {
          return true; // Si el campo está vacío, la validación se considera exitosa
        }
        return regexPassword.test(v) || "Contraseña no válida";
      },
      required: (v: string) => !!v || "Este campo es requerido",
      validEmail: (v: string) => emailRegex.test(v) || "Correo electrónico no válido",
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
      mensajeTitulo: "",
      mensajeCuerpo: "",
      correcto: false,
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

      try {
        await pagoStore.cargarContacto();

        await pagoStore.cargarContactoInformacion();

        dataContacto.value = pagoStore.object.contacto as InformacionUsuario;

        dataInformacion.value = pagoStore.object.informacion as InformacionUsuarioArray;

        dataCuenta.value.cuentas_usuarios_id =
          dataContacto.value.informacion.cuentas_usuarios_id;
        dataCuenta.value.cuenta_nombre = dataContacto.value.informacion.cuenta_nombre;
        dataCuenta.value.cuenta_apaterno = dataContacto.value.informacion.cuenta_apaterno;
        dataCuenta.value.cuenta_amatarno = dataContacto.value.informacion.cuenta_amatarno;
        dataCuenta.value.cuenta_email = dataContacto.value.informacion.cuenta_email;
        dataCuenta.value.cuenta_rfc = dataContacto.value.informacion.cuenta_rfc;
        dataCuenta.value.registro_agaff = dataContacto.value.informacion.registro_agaff;
        dataCuenta.value.registro_imss = dataContacto.value.informacion.registro_imss;
        dataCuenta.value.users_usuarios_usuario_id =
          dataInformacion.value.info[0].users_usuarios_usuario_id;

        dataCuenta.value.enviado = true;
      } catch (error) {
        console.log(error);
      }
    }

    async function actualizarRegistro() {
      try {
        const isValidForm = await formEl.value?.validate();
        if (isValidForm.valid) {
          const formData = new URLSearchParams();

          formData.append(
            "datos[cuentas_usuarios_id]",
            dataCuenta.value.cuentas_usuarios_id.toString()
          );
          formData.append(
            "datos[users_usuarios_usuario_id]",
            dataCuenta.value.users_usuarios_usuario_id.toString()
          );
          formData.append("datos[registro_agaff]", dataCuenta.value.registro_agaff);
          formData.append("datos[registro_imss]", dataCuenta.value.registro_imss);
          formData.append(
            "datos[users_usuarios_usuario_email]",
            dataCuenta.value.cuenta_email
          );
          formData.append("datos[cuenta_email]", dataCuenta.value.cuenta_email);
          formData.append(
            "datos[enviado]",
            dataCuenta.value.enviado == true ? "Si" : "No"
          );
          if (dataCuenta.value.password != "") {
            formData.append("datos[password]", dataCuenta.value.password);
          }
          await cuentaStore.actualizarCuenta(formData);

          dialogPropiedades.value = {
            dialog: true,
            mensajeTitulo: "Actualización de datos",
            mensajeCuerpo:
              cuentaStore.type == "success"
                ? "La información de su cuenta ha sido actualizada"
                : cuentaStore.responseMessage,
            correcto: cuentaStore.type == "success" ? true : false,
          };
          /*
          const alert = await showAlert(
            "Actualización de datos",
            //cuentaStore.responseMessage
            "La información de su cuenta ha sido actualizada"
          );

          if (alert) {
            await alert.present();
            await alert.onDidDismiss();

            await formEl.value?.reset();

            router.push({ name: "dashboard" });
          }*/
        }
        /*else {
          await showAlert(
            "Actualización de datos",
            cuentaStore.responseMessage
          );
        }*/
      } catch (error) {
        console.log(error);
        return;
      }
    }

    function cerrardialogPropiedades(estado: boolean) {
      dialogPropiedades.value.dialog = false;
      if (estado) {
        router.push({ name: "dashboard" });
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
      CorrectAnimation,
      IncorrectAnimation,
      anim,
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
</style>

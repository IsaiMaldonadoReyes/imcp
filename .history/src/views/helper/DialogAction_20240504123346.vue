<template>
  <v-dialog v-model="dialogPropiedades.dialog" max-width="500px">
    <div ref="lottieContainer"></div>
    <div class="icon-box"></div>
    <v-card class="pa-6">
      <v-card-text
        class="text-h6 text-grey-darken-3 pt-15 text-center"
        :color="dialogPropiedades.color"
      >
        <span>{{ dialogPropiedades.mensajeTitulo }}</span>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="text-center">
        <span class="text-subtitle-1 text-grey-darken-1">
          {{ dialogPropiedades.mensajeCuerpo }}
        </span>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :color="dialogPropiedades.color"
          block
          size="large"
          variant="flat"
          @click="cerrarDialogPropiedades"
        >
          {{ dialogPropiedades.boton }}
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, watch } from "vue";
import { LottieAnimation } from "lottie-web-vue";
import CorrectAnimation from "../../assets/images/correct.json";
import { create } from "ionicons/icons";
//import IncorrectAnimation from "../../assets/images/incorrect.json";

export default defineComponent({
  name: "DialogAction",
  components: {
    LottieAnimation,
  },
  props: {
    dialogView: Boolean,
    dialogTitle: String,
    dialogContent: String,
    dialogRoute: String,
    dialogColour: String,
    dialogTextButton: String,
    dialogSpeed: Number,
  },
  setup(props, { emit }) {
    const dialogPropiedades = ref({
      dialog: ref(props.dialogView),
      mensajeTitulo: ref(props.dialogTitle),
      mensajeCuerpo: ref(props.dialogContent),
      ruta: ref(props.dialogRoute),
      color: ref(props.dialogColour),
      boton: ref(props.dialogTextButton),
      velocidad: ref(props.dialogSpeed),
    });

    const cerrarDialogPropiedades = () => {
      emit("cerrarDialog");
    };

    const lottieContainer = ref(null);
    let animationData = ref({});

    onMounted(async () => {
      // Importar dinámicamente el archivo JSON según el nombre pasado por props

      console.log("Mensaje desde onMounted");
      console.log(`@/images/${props.dialogRoute}.json`);

      const { default: data } = await import(`@/images/${props.dialogRoute}.json`);
      animationData = data;

      // Inicializar la animación de Lottie una vez que el archivo se haya cargado
      initLottie();
    });

    watch(
      [() => props.dialogView, () => props.dialogRoute],
      async ([newDialogView, newDialogRoute]) => {
        dialogPropiedades.value = {
          dialog: props.dialogView,
          mensajeTitulo: props.dialogTitle,
          mensajeCuerpo: props.dialogContent,
          ruta: props.dialogRoute,
          color: props.dialogColour,
          boton: props.dialogTextButton,
          velocidad: props.dialogSpeed,
        };

        console.log("Mensaje desde watch");
        console.log(newDialogView);
        console.log(newDialogRoute);

        if (newDialogView && newDialogRoute != "") {
          // Si el nombre del archivo cambia, cargar el nuevo archivo JSON
          const { default: data } = await import("../../assets/images/incorrect.json");
          animationData = data;
          initLottie();
        }
      }
    );

    function initLottie() {
      if (!lottieContainer.value || !animationData.value) return;

      // Inicializar la animación de Lottie con los datos cargados dinámicamente
      LottieAnimation.loadAnimation({
        container: lottieContainer.value,
        animationData: animationData,
        renderer: "svg",
        loop: true,
        autoplay: true,
      });
    }
    /*
    watch(
      () => props.dialogView,
      (newValue) => {
        dialogPropiedades.value = {
          dialog: props.dialogView,
          mensajeTitulo: props.dialogTitle,
          mensajeCuerpo: props.dialogContent,
          ruta: props.dialogRoute,
          color: props.dialogColour,
          boton: props.dialogTextButton,
          velocidad: props.dialogSpeed,
        };
      }
    );
    */

    return {
      dialogPropiedades,
      CorrectAnimation,
      cerrarDialogPropiedades,
      lottieContainer,
    };
  },
});
</script>
<style>
.lottie-container {
  height: 100px;
}

.icon-box {
  color: #fff;
  position: absolute;
  margin: 0 auto;
  left: 0;
  right: 0;
  top: -40px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  z-index: 2401;
  background: #fff;
  padding: 10px;
  text-align: center;
}
</style>

<template>
  <v-dialog v-model="dialogPropiedades.dialog" max-width="500px">
    <div class="icon-box" v-if="animationDataLoaded">
      <lottie-animation
        ref="anim"
        :animationData="animationData"
        :loop="false"
        :autoPlay="true"
        :speed="dialogPropiedades.velocidad"
        class="lottie-container"
      />
    </div>
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
import {
  defineComponent,
  ref,
  onMounted,
  watch,
  defineAsyncComponent,
  onBeforeMount,
} from "vue";
import { LottieAnimation } from "lottie-web-vue";
import animationData2 from "../../assets/images/correct.json";

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
    onMounted(() => {
      console.log(props.dialogRoute);
    });

    const dialogPropiedades = ref({
      dialog: ref(props.dialogView),
      mensajeTitulo: ref(props.dialogTitle),
      mensajeCuerpo: ref(props.dialogContent),
      ruta: ref(props.dialogRoute),
      color: ref(props.dialogColour),
      boton: ref(props.dialogTextButton),
      velocidad: ref(props.dialogSpeed),
    });

    //const animationData = () => import(`../../assets/images/${props.dialogRoute}.json`);

    //const animationData = require("../../assets/images/correct.json");
    //const json = require("../../assets/images/correct.json");
    //const animationData = json.default || json;
    let animationData = {};

    const cargarAnimationData = async () => {
      console.log(animationData2);

      try {
        const module = require(`../../assets/images/${props.dialogRoute}.json`);

        console.log(module);
        animationData = module.default;
        console.log(module.default);
        animationDataLoaded.value = true;
      } catch (error) {
        console.error("Error while loading animation:", error);
      }
    };

    const animationDataLoaded = ref(false);
    const cerrarDialogPropiedades = () => {
      emit("cerrarDialog");
    };

    // Llama a cargarAnimationData en el momento adecuado

    watch(
      () => props.dialogView,
      (newValue) => {
        /*import(`../../assets/images/${props.dialogRoute}.json`)
          .then((module) => {
            animationData = module.default;
          })
          .catch((error) => {
            console.error("Error while loading animation:", error);
          });
        animationData = defineAsyncComponent(
          () => import(`../../assets/images/${props.dialogRoute}.json`)
        );*/

        /*import(`../../assets/images/${props.dialogRoute}.json`)
          .then((data) => {
            LottieAnimation.import {  } from "module"; .loadAnimation({
              container: animationData.value,
              loop: true,
              autoplay: true,
              animationData: data.default,
              class: "lottie-container",
            });
          })
          .catch((error) => {
            console.error("Error while loading animation:", error);
          });*/

        if (newValue) {
          console.log(props.dialogRoute);
          cargarAnimationData();
        }

        dialogPropiedades.value = {
          dialog: props.dialogView,
          mensajeTitulo: props.dialogTitle,
          mensajeCuerpo: props.dialogContent,
          ruta: props.dialogRoute,
          color: props.dialogColour,
          boton: props.dialogTextButton,
          velocidad: props.dialogSpeed,
        };

        console.log(props.dialogRoute);
        // Importar dinámicamente el componente de animación basado en la ruta proporcionada
      }
    );

    return {
      animationData,
      dialogPropiedades,
      cerrarDialogPropiedades,
      animationDataLoaded,
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

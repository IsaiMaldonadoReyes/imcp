<template>
  <v-dialog v-model="dialogPropiedades.dialog" max-width="500px">
    <div class="icon-box">
      <lottie-animation ref="anim" :animation-data="{"v":"5.5.7","meta":{"g":"LottieFiles
      AE 0.1.20","a":"Kaique Marques","k":"","d":"Circle-X
      Animation","tc":"Red"},"fr":60,"ip":0,"op":90,"w":512,"h":512,"nm":"Comp
      1","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Linha
      384","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[256,256,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[670.588,670.588,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[-10,-10],[10,10]],"o":[[-10,-10],[10,10]],"v":[[-10,-10],[10,10]],"c":false},"ix":2},"nm":"Path
      1","mn":"ADBE Vector Shape -
      Group","hd":false,"_render":true},{"ty":"st","c":{"a":0,"k":[0.698,0,0,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":6,"ix":5},"lc":2,"lj":2,"bm":0,"nm":"Stroke
      1","mn":"ADBE Vector Graphic -
      Stroke","hd":false,"_render":true},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform","_render":true}],"nm":"Linha
      384","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector
      Group","hd":false,"_render":true},{"ty":"tm","s":{"a":0,"k":0,"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.004],"y":[1.019]},"o":{"x":[0.333],"y":[0]},"t":26,"s":[0]},{"t":53,"s":[100]}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim
      Paths 1","mn":"ADBE Vector Filter -
      Trim","hd":false,"_render":true}],"ip":11,"op":120,"st":11,"bm":0,"completed":true},{"ddd":0,"ind":2,"ty":4,"nm":"Linha
      383","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[256,256,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[670.588,670.588,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[10,-10],[-10,10]],"o":[[10,-10],[-10,10]],"v":[[10,-10],[-10,10]],"c":false},"ix":2},"nm":"Path
      1","mn":"ADBE Vector Shape -
      Group","hd":false,"_render":true},{"ty":"st","c":{"a":0,"k":[0.698,0,0,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":6,"ix":5},"lc":2,"lj":2,"bm":0,"nm":"Stroke
      1","mn":"ADBE Vector Graphic -
      Stroke","hd":false,"_render":true},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform","_render":true}],"nm":"Linha
      383","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector
      Group","hd":false,"_render":true},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.102],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":21,"s":[100]},{"t":53,"s":[0]}],"ix":1},"e":{"a":0,"k":100,"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim
      Paths 1","mn":"ADBE Vector Filter -
      Trim","hd":false,"_render":true}],"ip":11,"op":120,"st":11,"bm":0,"completed":true},{"ddd":0,"ind":3,"ty":4,"nm":"Elipse
      98","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[256,256,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[670.588,670.588,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[68,68],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"nm":"Ellipse
      Path 1","mn":"ADBE Vector Shape -
      Ellipse","hd":false,"_render":true},{"ty":"st","c":{"a":0,"k":[0.698,0,0,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":6,"ix":5},"lc":2,"lj":2,"bm":0,"nm":"Stroke
      1","mn":"ADBE Vector Graphic -
      Stroke","hd":false,"_render":true},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform","_render":true}],"nm":"Elipse
      98","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector
      Group","hd":false,"_render":true},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.085],"y":[0.995]},"o":{"x":[0.333],"y":[0]},"t":11,"s":[100]},{"t":74,"s":[0]}],"ix":1},"e":{"a":0,"k":100,"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim
      Paths 1","mn":"ADBE Vector Filter -
      Trim","hd":false,"_render":true}],"ip":11,"op":120,"st":11,"bm":0,"completed":true},{"ddd":0,"ind":4,"ty":4,"nm":"Linha
      386","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[256,256,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[670.588,670.588,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[-10,-10],[10,10]],"o":[[-10,-10],[10,10]],"v":[[-10,-10],[10,10]],"c":false},"ix":2},"nm":"Path
      1","mn":"ADBE Vector Shape -
      Group","hd":false,"_render":true},{"ty":"st","c":{"a":0,"k":[0.9885,0.9115,0.9115,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":6,"ix":5},"lc":2,"lj":2,"bm":0,"nm":"Stroke
      1","mn":"ADBE Vector Graphic -
      Stroke","hd":false,"_render":true},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform","_render":true}],"nm":"Linha
      384","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector
      Group","hd":false,"_render":true},{"ty":"tm","s":{"a":0,"k":0,"ix":1},"e":{"a":1,"k":[{"i":{"x":[0.004],"y":[1.019]},"o":{"x":[0.333],"y":[0]},"t":15,"s":[0]},{"t":42,"s":[100]}],"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim
      Paths 1","mn":"ADBE Vector Filter -
      Trim","hd":false,"_render":true}],"ip":0,"op":120,"st":0,"bm":0,"completed":true},{"ddd":0,"ind":5,"ty":4,"nm":"Linha
      385","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[256,256,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[670.588,670.588,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[10,-10],[-10,10]],"o":[[10,-10],[-10,10]],"v":[[10,-10],[-10,10]],"c":false},"ix":2},"nm":"Path
      1","mn":"ADBE Vector Shape -
      Group","hd":false,"_render":true},{"ty":"st","c":{"a":0,"k":[0.9885,0.9115,0.9115,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":6,"ix":5},"lc":2,"lj":2,"bm":0,"nm":"Stroke
      1","mn":"ADBE Vector Graphic -
      Stroke","hd":false,"_render":true},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform","_render":true}],"nm":"Linha
      383","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector
      Group","hd":false,"_render":true},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.102],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":10,"s":[100]},{"t":42,"s":[0]}],"ix":1},"e":{"a":0,"k":100,"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim
      Paths 1","mn":"ADBE Vector Filter -
      Trim","hd":false,"_render":true}],"ip":0,"op":120,"st":0,"bm":0,"completed":true},{"ddd":0,"ind":6,"ty":4,"nm":"Elipse
      99","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[256,256,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[670.588,670.588,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[68,68],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"nm":"Ellipse
      Path 1","mn":"ADBE Vector Shape -
      Ellipse","hd":false,"_render":true},{"ty":"st","c":{"a":0,"k":[0.9885,0.9115,0.9115,1],"ix":3},"o":{"a":0,"k":100,"ix":4},"w":{"a":0,"k":6,"ix":5},"lc":2,"lj":2,"bm":0,"nm":"Stroke
      1","mn":"ADBE Vector Graphic -
      Stroke","hd":false,"_render":true},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform","_render":true}],"nm":"Elipse
      98","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector
      Group","hd":false,"_render":true},{"ty":"tm","s":{"a":1,"k":[{"i":{"x":[0.085],"y":[0.995]},"o":{"x":[0.333],"y":[0]},"t":0,"s":[100]},{"t":63,"s":[0]}],"ix":1},"e":{"a":0,"k":100,"ix":2},"o":{"a":0,"k":0,"ix":3},"m":1,"ix":2,"nm":"Trim
      Paths 1","mn":"ADBE Vector Filter -
      Trim","hd":false,"_render":true}],"ip":0,"op":120,"st":0,"bm":0,"completed":true}],"markers":[],"__complete":true}
      " :loop="false" :autoPlay="true" :speed="dialogPropiedades.velocidad"
      class="lottie-container" renderer="svg" />
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

    let var1 = ref({});
    const animation = ref<any>(null);
    const input = ref(null);

    onMounted(async () => {
      /*const response = await fetch("../../assets/images/incorrect.json");
      const file = await response.json();
      console.log("cool file", file);*/
      console.log("../../assets/images/" + props.dialogRoute + ".json");

      /*await import("../../assets/images/" + props.dialogRoute + ".json").then(
        (module) => {
          var1.value = module.default; // modify var1 by assigning to var1.value
        }
      );

      LottieAnimation.loadAnimation({
        container: animation,
        animationData: JSON.parse(JSON.stringify(var1.value)),
        loop: "false",
        autoPlay: "true",
        speed: "dialogPropiedades.velocidad",
        class: "lottie-container",
      });*/
    });

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

    return {
      var1,
      dialogPropiedades,
      CorrectAnimation,
      cerrarDialogPropiedades,
      animation,
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

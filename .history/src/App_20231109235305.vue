<template>
  <ion-app>
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1">
          <ion-label>Tab 1</ion-label>
          <ion-icon name="home-outline"></ion-icon>
        </ion-tab-button>

        <ion-tab-button tab="tab2">
          <ion-label>Tab 2</ion-label>
          <ion-icon name="business-outline"></ion-icon>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-app>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>
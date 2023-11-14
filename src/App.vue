<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup>
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { useRouter } from "vue-router";

import { Storage } from "@ionic/storage";

const router = useRouter();
/*
const initStorage = async () => {
  const storage = new Storage();
  await storage.create();
  const isAuth = await storage.get("logged");

  const currentRoute = router.currentRoute.value;

  if (!isAuth && currentRoute.meta.requiresAuth) {
    router.push("/login");
  } else {
    router.push("/tabs/dashboard");
  }
};
*/
//initStorage();

</script>


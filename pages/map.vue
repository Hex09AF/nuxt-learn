<script setup lang="ts">
import { useMap } from "~/stores/map/map";

useHead({
  link: [
    {
      rel: "stylesheet",
      href: "https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css",
    },
  ],
});

useMap();
</script>

<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<style scoped>
div {
  height: 90%;
  width: 100%;
}
</style>

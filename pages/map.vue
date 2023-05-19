<script setup lang="ts">
import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"

useHead({
  link: [
    {
      rel: "preload",
      as: "style",
      href: "https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css",
      crossorigin: "",
    },
  ],
});

onMounted(() => {
  const config = useRuntimeConfig();
  mapboxgl.accessToken = config.public.mapBoxKey;
  const map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/mapbox/streets-v12", // style URL
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 9, // starting zoom
  });
});
</script>

<template>
  <div>
    hehe
    <div id="map"></div>
  </div>
</template>

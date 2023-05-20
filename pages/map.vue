<script setup lang="ts">
import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"

useHead({
  link: [
    {
      rel: "stylesheet",
      href: "https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css",
    },
  ],
});

const lon = ref(0),
  lat = ref(0);

onMounted(() => {
  const config = useRuntimeConfig();
  mapboxgl.accessToken = config.public.mapBoxKey;
  const map = new mapboxgl.Map({
    container: "map", // container ID
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: "mapbox://styles/mapbox/streets-v12", // style URL
    center: [lon.value, lat.value], // starting position [lng, lat]
    zoom: 1.5, // starting zoom
  });
  map.on("load", async () => {
    const geojson = getLocation({
      lon: lon.value,
      lat: lat.value,
    });

    map.addSource("iss", {
      type: "geojson",
      data: geojson,
    });

    map.addLayer({
      id: "iss",
      type: "symbol",
      source: "iss",
      layout: {
        "icon-image": "rocket",
      },
    });

    function getLocation({
      lon,
      lat,
    }: {
      lon: number;
      lat: number;
    }): GeoJSON.FeatureCollection {
      map.flyTo({
        center: [lon, lat],
        speed: 0.5,
      });
      return {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [lon, lat],
            },
            properties: {},
          },
        ],
      };
    }
    let previousTimeStamp = 0;

    function step(timestamp: number) {
      const per = timestamp - previousTimeStamp;

      lon.value = (lon.value + per / 50) ;

      const geojson = getLocation({ lon: lon.value, lat: lat.value });
      map.getSource("iss").setData(geojson);

      previousTimeStamp = timestamp;
      // requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
    // end
  });
});
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

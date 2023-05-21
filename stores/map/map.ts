import mapboxgl, { type GeoJSONSource } from "mapbox-gl";

interface Rocket {
  id: string;
  lat: number;
  lon: number;
}

function getLocation({
  lon,
  lat,
}: {
  lon: number;
  lat: number;
}): GeoJSON.FeatureCollection {
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

export const useMap = defineStore("map", () => {
  const rockets: Rocket[] = [];
  let map: mapboxgl.Map;

  function addRocket(id: string) {
    let lon = Math.random() * 360 - 180;
    let lat = Math.random() * 180 - 90;

    map.addSource(id, {
      type: "geojson",
      data: getLocation({
        lat,
        lon,
      }),
    });

    map.addLayer({
      id: id,
      type: "symbol",
      source: id,
      layout: {
        "icon-image": "rocket",
      },
    });

    return { id, lat, lon };
  }

  onMounted(() => {
    const config = useRuntimeConfig();
    mapboxgl.accessToken = config.public.mapBoxKey;
    map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [0, 0],
      zoom: 1.5,
    });
    map.on("load", async () => {
      rockets.push(addRocket("iss"));
      // rockets.push(addRocket("iss2"));
      // rockets.push(addRocket("iss3"));

      let previousTimeStamp = 0;

      function step(timestamp: number) {
        const per = timestamp - previousTimeStamp;
        rockets.forEach((rocket) => {
          // rocket.lon = ((rocket.lon + per / 50 + 180) % 360) - 180;
          rocket.lat = ((rocket.lat + per / 50 + 90) % 180) - 90;
          console.log(rocket);

          const geojson = getLocation({ lon: rocket.lon, lat: rocket.lat });
          const iss = map.getSource(rocket.id) as GeoJSONSource;

          iss.setData(geojson);
        });

        previousTimeStamp = timestamp;
        requestAnimationFrame(step);
      }

      requestAnimationFrame(step);
    });
  });
});

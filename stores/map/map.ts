import mapboxgl, { type GeoJSONSource } from "mapbox-gl";

interface Rocket {
  id: string;
  lat: number;
  lon: number;
  aLat: number;
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

  function addRocket(
    id: string,
    lon: number = Math.random() * 360 - 180,
    lat: number = Math.random() * 180 - 90
  ) {
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

    return { id, lat, lon, aLat: 1, aLon: 1 };
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
      rockets.push(addRocket("iss2"));
      rockets.push(addRocket("iss3"));

      let previousTimeStamp = 0;

      function step(timestamp: number) {
        const per = timestamp - previousTimeStamp;
        rockets.forEach((rocket) => {
          rocket.lon += per / 50;
          rocket.lat += rocket.aLat * (per / 50);
          if (rocket.lat > 90 || rocket.lat < -90) {
            rocket.lat = rocket.aLat * 90 - (rocket.lat - rocket.aLat * 90);
            rocket.lat = rocket.aLat * 90;
            rocket.aLat *= -1;
            rocket.lon += 180;
          }
          rocket.lon = ((rocket.lon + 180) % 360) - 180;

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

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMap, import.meta.hot));
}

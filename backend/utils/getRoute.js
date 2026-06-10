export const getRoute = async (
  startLat,
  startLng,
  endLat,
  endLng
) => {

  try {

    const response = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${endLng},${endLat}?overview=full&geometries=geojson`
    );

    const data = await response.json();

    const route = data.routes[0];

    return {

      distance: route.distance,

      duration: route.duration,

      routeCoordinates:
        route.geometry.coordinates.map(
          ([lng, lat]) => ({
            lat,
            lng
          })
        )

    };

  }

  catch (error) {

    console.log(error);

    return null;

  }

};
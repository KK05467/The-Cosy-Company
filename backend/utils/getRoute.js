/**
 * getRoute.js
 * Fetches a driving route between two points using the free OSRM API.
 * Returns distance (km), duration (seconds), and routeCoordinates [{lat, lng}].
 *
 * OSRM coordinate order is [lng, lat] — this util handles the conversion.
 */

export const getRoute = async (
  startLat,
  startLng,
  endLat,
  endLng
) => {
  try {
    const url =
      `https://router.project-osrm.org/route/v1/driving/` +
      `${startLng},${startLat};${endLng},${endLat}` +
      `?overview=full&geometries=geojson`;

    const response = await fetch(url);

    if (!response.ok) {
      console.error("OSRM error:", await response.text());
      return null;
    }

    const data = await response.json();

    if (!data.routes || data.routes.length === 0) {
      console.error("OSRM: No routes found");
      return null;
    }

    const route = data.routes[0];

    // OSRM returns [lng, lat] pairs — convert to {lat, lng} objects
    const routeCoordinates = route.geometry.coordinates.map(
      ([lng, lat]) => ({ lat, lng })
    );

    return {
      // Convert meters → km
      distance: parseFloat((route.distance / 1000).toFixed(2)),
      duration: route.duration, // seconds
      routeCoordinates,
    };
  } catch (error) {
    console.error("getRoute error:", error.message);
    return null;
  }
};
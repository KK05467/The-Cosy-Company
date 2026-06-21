/**
 * isPointOnRoute.js
 * Checks whether a given point lies "on" a route polyline,
 * defined as being within `threshold` meters of any coordinate in the route.
 *
 * point            : { lat, lng }
 * routeCoordinates : [{ lat, lng }, ...]
 * threshold        : meters (default 300m — generous enough for city streets)
 *
 * Returns: true | false
 */

import { distanceInMeters } from "./haversine.js";

export function isPointOnRoute(
  point,
  routeCoordinates,
  threshold = 300
) {
  if (!point || !routeCoordinates || routeCoordinates.length === 0) {
    return false;
  }

  for (const coord of routeCoordinates) {
    const distance = distanceInMeters(point, coord);
    if (distance <= threshold) {
      return true;
    }
  }

  return false;
}
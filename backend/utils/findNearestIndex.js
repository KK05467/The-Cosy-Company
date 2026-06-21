/**
 * findNearestIndex.js
 * Finds the index of the closest point in routeCoordinates to the given point.
 *
 * point            : { lat, lng }
 * routeCoordinates : [{ lat, lng }, ...]
 *
 * Returns: Number (index), or -1 if coordinates are empty.
 */

import { distanceInMeters } from "./haversine.js";

export function findNearestIndex(point, routeCoordinates) {
  if (!point || !routeCoordinates || routeCoordinates.length === 0) {
    return -1;
  }

  let nearestIndex = -1;
  let minDistance = Infinity;

  for (let i = 0; i < routeCoordinates.length; i++) {
    const distance = distanceInMeters(point, routeCoordinates[i]);

    if (distance < minDistance) {
      minDistance = distance;
      nearestIndex = i;
    }
  }

  return nearestIndex;
}
/**
 * calculateSegmentDistance.js
 * Calculates the road distance (in km) between two points
 * by walking the route polyline between their nearest indices.
 *
 * riderStart       : { lat, lng }
 * riderEnd         : { lat, lng }
 * routeCoordinates : [{ lat, lng }, ...]
 *
 * Returns: distance in KM, or 0 if invalid / reverse direction.
 */

import { distanceInMeters } from "./haversine.js";
import { findNearestIndex } from "./findNearestIndex.js";

export function calculateSegmentDistance(
  riderStart,
  riderEnd,
  routeCoordinates
) {
  const startIndex = findNearestIndex(riderStart, routeCoordinates);
  const endIndex = findNearestIndex(riderEnd, routeCoordinates);

  // Invalid indices or reverse direction
  if (
    startIndex === -1 ||
    endIndex === -1 ||
    endIndex <= startIndex
  ) {
    return 0;
  }

  let totalDistance = 0;

  for (let i = startIndex; i < endIndex; i++) {
    totalDistance += distanceInMeters(
      routeCoordinates[i],
      routeCoordinates[i + 1]
    );
  }

  // Convert meters → km
  return parseFloat((totalDistance / 1000).toFixed(2));
}
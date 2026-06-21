/**
 * haversine.js
 * Calculates the straight-line distance between two lat/lng points
 * using the Haversine formula.
 *
 * Both p1 and p2 must be { lat: Number, lng: Number }
 * Returns: distance in METERS
 */

export function distanceInMeters(p1, p2) {
  const R = 6371000; // Earth radius in meters

  const lat1 = (p1.lat * Math.PI) / 180;
  const lat2 = (p2.lat * Math.PI) / 180;

  const dLat = ((p2.lat - p1.lat) * Math.PI) / 180;
  const dLng = ((p2.lng - p1.lng) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}
function distanceInMeters(p1, p2) {

  const R = 6371000;

  const lat1 = p1[1] * Math.PI / 180;
  const lat2 = p2[1] * Math.PI / 180;

  const dLat =
    (p2[1] - p1[1]) * Math.PI / 180;

  const dLng =
    (p2[0] - p1[0]) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) *
    Math.sin(dLat / 2) +
    Math.cos(lat1) *
    Math.cos(lat2) *
    Math.sin(dLng / 2) *
    Math.sin(dLng / 2);

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return R * c;
}

export function findNearestIndex(
  point,
  routeCoordinates
) {

  let index = 0;
  let minDistance = Infinity;

  for (
    let i = 0;
    i < routeCoordinates.length;
    i++
  ) {

    const distance =
      distanceInMeters(
        point,
        routeCoordinates[i]
      );

    if (distance < minDistance) {

      minDistance = distance;
      index = i;

    }

  }

  return index;

}
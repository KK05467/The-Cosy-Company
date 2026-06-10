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

export function calculateSegmentDistance(
  riderStart,
  riderEnd,
  routeCoordinates
) {

  let startIndex = -1;
  let endIndex = -1;

  let minStart = Infinity;
  let minEnd = Infinity;

  for (
    let i = 0;
    i < routeCoordinates.length;
    i++
  ) {

    const d1 =
      distanceInMeters(
        riderStart,
        routeCoordinates[i]
      );

    if (d1 < minStart) {

      minStart = d1;
      startIndex = i;

    }

    const d2 =
      distanceInMeters(
        riderEnd,
        routeCoordinates[i]
      );

    if (d2 < minEnd) {

      minEnd = d2;
      endIndex = i;

    }

  }

  if (
    startIndex === -1 ||
    endIndex === -1 ||
    endIndex <= startIndex
  ) {

    return 0;

  }

  let totalDistance = 0;

  for (
    let i = startIndex;
    i < endIndex;
    i++
  ) {

    totalDistance +=
      distanceInMeters(
        routeCoordinates[i],
        routeCoordinates[i + 1]
      );

  }

  return totalDistance / 1000;
}